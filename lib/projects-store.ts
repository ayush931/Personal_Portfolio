import { revalidatePath, unstable_cache } from "next/cache";
import { prisma } from "./prisma";

export interface ProjectData {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  impact: string;
  tech: string[];
  featured: boolean;
  year: string;
  github: string;
  demo: string;
  accentColor: string;
  order: number;
}

async function fetchProjectsFromDb(): Promise<ProjectData[]> {
  try {
    const dbProjects = await prisma.project.findMany({
      orderBy: { order: "asc" },
    });

    return dbProjects.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      tagline: p.tagline,
      description: p.description,
      category: p.category,
      impact: p.impact,
      tech: p.tech,
      featured: p.featured,
      year: p.year,
      github: p.github,
      demo: p.demo,
      accentColor: p.accentColor,
      order: p.order,
    }));
  } catch {
    return [];
  }
}

export const getCachedProjects = unstable_cache(
  async () => fetchProjectsFromDb(),
  ["all-projects-cache"],
  {
    revalidate: 3600,
    tags: ["projects-data"],
  }
);

export async function readProjects(): Promise<ProjectData[]> {
  return getCachedProjects();
}

export async function saveProject(
  data: Partial<ProjectData> & { title: string; description: string }
): Promise<ProjectData> {
  const slug =
    data.slug ||
    data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

  let saved: ProjectData;

  if (data.id) {
    const updated = await prisma.project.update({
      where: { id: data.id },
      data: {
        title: data.title,
        slug,
        tagline: data.tagline || "",
        description: data.description,
        category: data.category || "Full-Stack",
        impact: data.impact || "",
        tech: data.tech || [],
        featured: data.featured !== undefined ? data.featured : true,
        year: data.year || "2026",
        github: data.github || "",
        demo: data.demo || "",
        accentColor: data.accentColor || "#2563eb",
        order: data.order !== undefined ? data.order : 0,
      },
    });

    saved = {
      id: updated.id,
      slug: updated.slug,
      title: updated.title,
      tagline: updated.tagline,
      description: updated.description,
      category: updated.category,
      impact: updated.impact,
      tech: updated.tech,
      featured: updated.featured,
      year: updated.year,
      github: updated.github,
      demo: updated.demo,
      accentColor: updated.accentColor,
      order: updated.order,
    };
  } else {
    const created = await prisma.project.create({
      data: {
        title: data.title,
        slug,
        tagline: data.tagline || "",
        description: data.description,
        category: data.category || "Full-Stack",
        impact: data.impact || "",
        tech: data.tech || [],
        featured: data.featured !== undefined ? data.featured : true,
        year: data.year || "2026",
        github: data.github || "",
        demo: data.demo || "",
        accentColor: data.accentColor || "#2563eb",
        order: data.order !== undefined ? data.order : 0,
      },
    });

    saved = {
      id: created.id,
      slug: created.slug,
      title: created.title,
      tagline: created.tagline,
      description: created.description,
      category: created.category,
      impact: created.impact,
      tech: created.tech,
      featured: created.featured,
      year: created.year,
      github: created.github,
      demo: created.demo,
      accentColor: created.accentColor,
      order: created.order,
    };
  }

  try {
    revalidatePath("/");
    revalidatePath("/crm");
  } catch (e) {
    // Ignore in non-server action contexts
  }

  return saved;
}

export async function deleteProject(id: string): Promise<boolean> {
  try {
    await prisma.project.delete({ where: { id } });
    try {
      revalidatePath("/");
      revalidatePath("/crm");
    } catch (e) {
      // Ignore
    }
    return true;
  } catch {
    return false;
  }
}
