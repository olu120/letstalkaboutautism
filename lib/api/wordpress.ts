// lib/api/wordpress.ts
// Strongly-typed GraphQL client + WP data accessors

/* -------------------------------------------------------
   Shared Types
-------------------------------------------------------- */

export type MediaItem = {
  sourceUrl?: string | null;
  altText?: string | null;
};

type AcfMediaItemConnectionEdge = { node?: MediaItem | null } | null;

type AcfMediaItemConnection = {
  edges?: AcfMediaItemConnectionEdge[] | null;
  nodes?: (MediaItem | null)[] | null;
} | null;

/* -------------------------------------------------------
   Fetch Helper
-------------------------------------------------------- */

export async function fetchGraphQL<TData>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<TData> {
  const url = process.env.WORDPRESS_API_URL;
  if (!url) {
    throw new Error(
      "Missing WordPress API URL in environment variables (WORDPRESS_API_URL)"
    );
  }

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  const json = (await res.json()) as { data?: TData; errors?: unknown };

  if ("errors" in json && json.errors) {
    // eslint-disable-next-line no-console
    console.error("WPGraphQL errors:", JSON.stringify(json.errors, null, 2));
    throw new Error("GraphQL query failed");
  }

  return (json.data as TData) ?? ({} as TData);
}

/* -------------------------------------------------------
   Normalizers (Media)
-------------------------------------------------------- */

const normalizeMediaEdge = (
  edge: AcfMediaItemConnectionEdge | null | undefined
): MediaItem | null => {
  const n = edge?.node;
  return n?.sourceUrl ? n : null;
};

const normalizeGalleryFromEdges = (
  edges?: (AcfMediaItemConnectionEdge | null)[] | null
): MediaItem[] => {
  if (!edges) return [];
  return edges
    .map((e) => e?.node || null)
    .filter((n): n is MediaItem => !!n?.sourceUrl);
};

/* -------------------------------------------------------
   Site Settings
-------------------------------------------------------- */

type GetSiteSettingsResponse = {
  page?: {
    siteSettings?: {
      launchdate?: string | null;
      instagramurl?: string | null;
      linkedinurl?: string | null;
      whatsappurl?: string | null;
    } | null;
  } | null;
};

export async function getSiteSettings() {
  const query = `
    query GetSiteSettings {
      page(id: "site-settings", idType: URI) {
        siteSettings {
          launchdate
          instagramurl
          linkedinurl
          whatsappurl
        }
      }
    }
  `;
  const data = await fetchGraphQL<GetSiteSettingsResponse>(query);
  return data?.page?.siteSettings || {};
}

/* -------------------------------------------------------
   Homepage Content
-------------------------------------------------------- */

type MissionCardRaw = {
  cardTitle: string;
  cardDescription?: string | null;
  cardImage?: AcfMediaItemConnectionEdge | null;
};

export type MissionCard = {
  cardTitle: string;
  cardDescription?: string | null;
  cardImage?: MediaItem | null;
};

export type HomepageContent = {
  heroHeading?: string | null;
  heroSubheading?: string | null;
  heroPrimaryText?: string | null;
  heroPrimaryLink?: string | null;
  heroSecondaryText?: string | null;
  heroSecondaryLink?: string | null;

  missionCards?: MissionCard[] | null;

  stats?: { statNumber: string; statLabel: string }[] | null;

  quoteText?: string | null;
  quoteButtonText?: string | null;
  quoteButtonLink?: string | null;

  heroGallery?: MediaItem[] | null;
};

type GetHomepageContentResponse = {
  page?: {
    homepageContent?: {
      heroHeading?: string | null;
      heroSubheading?: string | null;
      heroPrimaryText?: string | null;
      heroPrimaryLink?: string | null;
      heroSecondaryText?: string | null;
      heroSecondaryLink?: string | null;
      missionCards?: MissionCardRaw[] | null;
      stats?: { statNumber: string; statLabel: string }[] | null;
      quoteText?: string | null;
      quoteButtonText?: string | null;
      quoteButtonLink?: string | null;
      heroGallery?: { edges?: (AcfMediaItemConnectionEdge | null)[] | null } | null;
    } | null;
  } | null;
};

export async function getHomepageContent(): Promise<HomepageContent | null> {
  const query = `
    query HomepageContent {
      page(id: "home", idType: URI) {
        homepageContent {
          heroHeading
          heroSubheading
          heroPrimaryText
          heroPrimaryLink
          heroSecondaryText
          heroSecondaryLink

          missionCards {
            cardTitle
            cardDescription
            cardImage {
              node {
                sourceUrl
                altText
              }
            }
          }

          stats {
            statNumber
            statLabel
          }

          quoteText
          quoteButtonText
          quoteButtonLink

          heroGallery {
            edges {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    }
  `;

  const raw = await fetchGraphQL<GetHomepageContentResponse>(query);
  const hc = raw?.page?.homepageContent;
  if (!hc) return null;

  const missionCards: MissionCard[] =
    (hc.missionCards ?? []).map((c) => ({
      cardTitle: c.cardTitle,
      cardDescription: c.cardDescription ?? null,
      cardImage: normalizeMediaEdge(c.cardImage),
    })) ?? [];

  const heroGallery = normalizeGalleryFromEdges(hc.heroGallery?.edges);

  return {
    heroHeading: hc.heroHeading ?? null,
    heroSubheading: hc.heroSubheading ?? null,
    heroPrimaryText: hc.heroPrimaryText ?? null,
    heroPrimaryLink: hc.heroPrimaryLink ?? null,
    heroSecondaryText: hc.heroSecondaryText ?? null,
    heroSecondaryLink: hc.heroSecondaryLink ?? null,
    missionCards,
    stats: hc.stats ?? [],
    quoteText: hc.quoteText ?? null,
    quoteButtonText: hc.quoteButtonText ?? null,
    quoteButtonLink: hc.quoteButtonLink ?? null,
    heroGallery,
  };
}

/* -------------------------------------------------------
   Posts (Recent + Single)
-------------------------------------------------------- */

export type PostNode = {
  id: string;
  title: string;
  date: string;
  excerpt?: string | null;
  content?: string | null;
  uri: string;
  featuredImage?: { node?: { sourceUrl?: string | null } | null } | null;
  author?: { node?: { name?: string | null } | null } | null;
  categories?: { nodes?: { name: string; slug: string }[] | null } | null;
};

export async function getRecentPosts(): Promise<PostNode[]> {
  const query = `
    query RecentPosts {
      posts(first: 3, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
        nodes {
          id
          title
          date
          excerpt
          uri
          featuredImage { node { sourceUrl } }
          author { node { name } }
          categories { nodes { name slug } }
        }
      }
    }
  `;
  const data = await fetchGraphQL<{
    posts?: { nodes?: PostNode[] | null } | null;
  }>(query);

  return data?.posts?.nodes ?? [];
}

export async function getPostByUri(uri: string): Promise<PostNode | null> {
  const query = `
    query PostByUri($uri: ID!) {
      post(id: $uri, idType: URI) {
        id
        title
        date
        content
        excerpt
        uri
        featuredImage { node { sourceUrl } }
        author { node { name } }
        categories { nodes { name slug } }
      }
    }
  `;
  const data = await fetchGraphQL<{ post?: PostNode | null }>(query, { uri });
  return data?.post ?? null;
}

/* -------------------------------------------------------
   About Page Content
-------------------------------------------------------- */

export type AboutContent = {
  heroHeading?: string | null;
  heroSubheading?: string | null;
  heroBody?: string | null;
  heroImage?: MediaItem | null;

  journeyItems?: {
    year?: string | null;
    title?: string | null;
    description?: string | null;
  }[];

  coreValues?: {
    valueTitle?: string | null;
    valueDescription?: string | null;
    valueImage?: MediaItem | null;
  }[];

  leadershipTeam?: {
    name?: string | null;
    role?: string | null;
    bio?: string | null;
    photo?: MediaItem | null;
  }[];

  ctaText?: string | null;
  ctaButtonText?: string | null;
  ctaButtonLink?: string | null;
};

export async function getAboutContent(): Promise<AboutContent | null> {
  const query = `
    query AboutContent {
      page(id: "about", idType: URI) {
        aboutPageContent {
          heroHeading
          herosubheading
          herobody
          heroimage { node { sourceUrl altText } }

          journeyItems { year title description }

          corevalues {
            valueTitle
            valuedescription
            valueimage { node { sourceUrl altText } }
          }

          leadershipteam {
            name
            role
            bio
            photo { node { sourceUrl altText } }
          }

          ctatext
          ctaButtonText
          ctaButtonLink
        }
      }
    }
  `;

  const data = await fetchGraphQL<{
    page?: { aboutPageContent?: any | null } | null;
  }>(query);

  const ac = data?.page?.aboutPageContent;
  if (!ac) return null;

  return {
    heroHeading: ac.heroHeading ?? null,
    heroSubheading: ac.herosubheading ?? null,
    heroBody: ac.herobody ?? null,
    heroImage: normalizeMediaEdge(ac.heroimage),

    journeyItems: ac.journeyItems ?? [],

    coreValues: (ac.corevalues ?? []).map((v: any) => ({
      valueTitle: v.valueTitle ?? null,
      valueDescription: v.valuedescription ?? null,
      valueImage: normalizeMediaEdge(v.valueimage),
    })),

    leadershipTeam: (ac.leadershipteam ?? []).map((m: any) => ({
      name: m.name ?? null,
      role: m.role ?? null,
      bio: m.bio ?? null,
      photo: normalizeMediaEdge(m.photo),
    })),

    ctaText: ac.ctatext ?? null,
    ctaButtonText: ac.ctaButtonText ?? null,
    ctaButtonLink: ac.ctaButtonLink ?? null,
  };
}

/* -------------------------------------------------------
   SERVICES PAGE CONTENT (ACF) — FINAL
   NOTE: These keys MUST match your schema.
-------------------------------------------------------- */

/* -------------------------------------------------------
   SERVICES PAGE CONTENT (ACF) — schema-correct
-------------------------------------------------------- */

export type ServicesContent = {
  heroHeading?: string | null;
  heroBody?: string | null;

  offerHeading?: string | null;
  offerCards?: {
    title: string;
    body?: string | null;
    bullets?: string[];
  }[] | null;

  lifeStageHeading?: string | null;
  lifeStagePrograms?: {
    stageLabel: string;
    title: string;
    body?: string | null;
    tags?: string[];
  }[] | null;

  faqHeading?: string | null;
  faqs?: {
    question: string;
    answer?: string | null;
  }[] | null;

  ctaBody?: string | null;
  ctaButtonText?: string | null;
  ctaButtonLink?: string | null;
};

type ServicesPageRaw = {
  page?: {
    servicespagecontent?: {
      heroheading?: string | null;
      herobody?: string | null;

      offerheading?: string | null;
      offercards?: {
        cardtitle?: string | null;
        cardbody?: string | null;
        cardbullets?: { bullettext?: string | null }[] | null;
      }[] | null;

      lifestageheading?: string | null;
      lifestageprograms?: {
        stagelabel?: string | null;
        programtitle?: string | null;
        programbody?: string | null;
        programtags?: { tagtext?: string | null }[] | null;
      }[] | null;

      faqheading?: string | null;
      faqs?: {
        question?: string | null;
        answer?: string | null;
      }[] | null;

      ctabody?: string | null;
      ctabuttontext?: string | null;
      ctabuttonlink?: string | null;
    } | null;
  } | null;
};

export async function getServicesPageContent(): Promise<ServicesContent | null> {
  const query = `
    query ServicesPage {
      page(id: "services", idType: URI) {
        servicespagecontent {
          heroheading
          herobody

          offerheading
          offercards {
            cardtitle
            cardbody
            cardbullets {
              bullettext
            }
          }

          lifestageheading
          lifestageprograms {
            stagelabel
            programtitle
            programbody
            programtags {
              tagtext
            }
          }

          faqheading
          faqs {
            question
            answer
          }

          ctabody
          ctabuttontext
          ctabuttonlink
        }
      }
    }
  `;

  const data = await fetchGraphQL<ServicesPageRaw>(query);
  const raw = data?.page?.servicespagecontent;
  if (!raw) return null;

  return {
    heroHeading: raw.heroheading ?? null,
    heroBody: raw.herobody ?? null,

    offerHeading: raw.offerheading ?? null,
    offerCards:
      raw.offercards?.map((c) => ({
        title: c.cardtitle ?? "",
        body: c.cardbody ?? null,
        bullets: (c.cardbullets ?? [])
          .map((b) => b?.bullettext ?? "")
          .filter(Boolean),
      })) ?? [],

    lifeStageHeading: raw.lifestageheading ?? null,
    lifeStagePrograms:
      raw.lifestageprograms?.map((p) => ({
        stageLabel: p.stagelabel ?? "",
        title: p.programtitle ?? "",
        body: p.programbody ?? null,
        tags: (p.programtags ?? [])
          .map((t) => t?.tagtext ?? "")
          .filter(Boolean),
      })) ?? [],

    faqHeading: raw.faqheading ?? null,
    faqs:
      raw.faqs?.map((f) => ({
        question: f.question ?? "",
        answer: f.answer ?? null,
      })) ?? [],

    ctaBody: raw.ctabody ?? null,
    ctaButtonText: raw.ctabuttontext ?? null,
    ctaButtonLink: raw.ctabuttonlink ?? null,
  };
}
