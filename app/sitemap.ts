import type { MetadataRoute } from "next";

const siteUrl = "https://sashank-reddy-portfolio.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
  ];
}
