import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://fares-cv.vercel.app",
      lastModified: new Date("2026-08-20"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
