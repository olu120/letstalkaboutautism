// lib/api/wordpress.ts
// Strongly-typed GraphQL client + WP data accessors

export type MediaItem = {
  sourceUrl?: string | null;
  altText?: string | null;
};

type AcfMediaItemConnectionEdge = { node?: MediaItem | null } | null;

type AcfMediaItemConnection = {
  edges?: AcfMediaItemConnectionEdge[] | null;
  nodes?: (MediaItem | null)[] | null;
} | null;

type MissionCardRaw = {
  cardTitle: string;
  cardDescription?: string | null;
  cardImage?: AcfMediaItemConnectionEdge | null; // edge in your schema
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

  heroGallery?: MediaItem[] | null; // normalized gallery list
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
      heroGallery?: {
        edges?: (AcfMediaItemConnectionEdge | null)[] | null;
      } | null;
    } | null;
  } | null;
};

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

export type RecentPost = {
  id: string;
  title: string;
  date: string;
  excerpt?: string | null;
  uri: string;
  featuredImage?: { node?: MediaItem | null } | null;
  author?: { node?: { name?: string | null } | null } | null;
  categories?: { nodes?: { name: string; slug: string }[] | null } | null;
};

type RecentPostsResponse = {
  posts?: {
    nodes?: RecentPost[] | null;
  } | null;
};

export type FullPost = {
  id: string;
  title: string;
  date: string;
  content?: string | null;
  excerpt?: string | null;
  uri: string;
  featuredImage?: { node?: MediaItem | null } | null;
  author?: { node?: { name?: string | null } | null } | null;
  categories?: { nodes?: { name: string; slug: string }[] | null } | null;
};

// ---------- Fetch Helper ----------
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

// ---------- Normalizers ----------
const normalizeMedia = (
  m:
    | MediaItem
    | AcfMediaItemConnection
    | AcfMediaItemConnectionEdge
    | null
    | undefined
): MediaItem | null => {
  if (!m) return null;

  // Direct MediaItem
  const maybeMedia = m as MediaItem;
  if (maybeMedia?.sourceUrl) return maybeMedia;

  // Single EDGE object: { node: { sourceUrl, altText } }
  const maybeEdge = m as AcfMediaItemConnectionEdge;
  if (maybeEdge?.node?.sourceUrl) return maybeEdge.node;

  // Connection (edges/nodes)
  const conn = m as AcfMediaItemConnection;
  const list =
    (conn?.edges?.map((e) => e?.node || null) ??
      conn?.nodes ??
      []) as (MediaItem | null)[];
  return list.find((n) => n?.sourceUrl) || null;
};

const normalizeGallery = (
  g: AcfMediaItemConnection | null | undefined
): MediaItem[] => {
  if (!g) return [];
  const list =
    (g.edges?.map((e) => e?.node || null) ??
      g.nodes ??
      []) as (MediaItem | null)[];
  return list.filter((n): n is MediaItem => !!n?.sourceUrl);
};

// ---------- Queries ----------
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

  const missionCards: MissionCard[] = (hc.missionCards ?? []).map((c) => ({
    cardTitle: c.cardTitle,
    cardDescription: c.cardDescription ?? null,
    cardImage: normalizeMedia(c.cardImage ?? null),
  }));

  const heroGallery = normalizeGallery(
    (hc.heroGallery as unknown as AcfMediaItemConnection) ?? null
  );

  const normalized: HomepageContent = {
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

  return normalized;
}

export async function getRecentPosts(): Promise<RecentPost[]> {
  const query = `
    query RecentPosts {
      posts(first: 3, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
        nodes {
          id
          title
          date
          excerpt
          uri
          featuredImage { node { sourceUrl altText } }
          author { node { name } }
          categories { nodes { name slug } }
        }
      }
    }
  `;

  const data = await fetchGraphQL<RecentPostsResponse>(query);
  return data?.posts?.nodes ?? [];
}

/**
 * Robust single-post resolver by URI.
 * WPGraphQL is strict about leading/trailing slashes and /blog base.
 * We try several candidates automatically.
 */
// 2) single post by URI (robust resolver + slug fallback)
export async function getPostByUri(uri: string): Promise<FullPost | null> {
  const query = `
    query PostById($id: ID!) {
      post(id: $id, idType: URI) {
        id
        title
        date
        content
        excerpt
        uri
        featuredImage { node { sourceUrl altText } }
        author { node { name } }
        categories { nodes { name slug } }
      }
    }
  `;

  const ensureLeadingSlash = (u: string) => (u.startsWith("/") ? u : `/${u}`);
  const ensureTrailingSlash = (u: string) => (u.endsWith("/") ? u : `${u}/`);

  const base = ensureTrailingSlash(ensureLeadingSlash(uri));

  const candidates = Array.from(
    new Set([
      base,
      base.replace(/\/+$/, ""),
      `/blog${base}`.replace(/\/blog\/blog\//, "/blog/"),
      base.replace(/^\/blog/, ""),
    ])
  ).filter(Boolean);

  for (const candidate of candidates) {
    // ✅ Bypass Next cache for debugging + correctness
    const data = await fetchGraphQL<{ post?: FullPost | null }>(query, {
      id: candidate,
    });

    if (data?.post) return data.post;
  }

  return null;
}
