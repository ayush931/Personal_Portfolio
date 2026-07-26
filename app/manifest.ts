import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ayush — Full Stack & Systems Engineer",
    short_name: "Ayush",
    description:
      "Personal Portfolio & Systems Engineering Showcase of Ayush Kumar",
    start_url: "/",
    display: "standalone",
    background_color: "#090d16",
    theme_color: "#2563eb",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
