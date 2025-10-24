// lib/api/wordpress.ts
export async function fetchGraphQL(query: string, variables: any = {}) {
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
    // Cache on the server for 60s to reduce load on WP
    next: { revalidate: 60 },
  });

  const json = await res.json();

  // Better dev logging: print the exact GraphQL errors so we see which field failed
  if (json.errors) {
    console.error("WPGraphQL errors:", JSON.stringify(json.errors, null, 2));
    throw new Error("GraphQL query failed");
  }

  return json.data;
}

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
  const data = await fetchGraphQL(query);
  return data?.page?.siteSettings || {};
}
