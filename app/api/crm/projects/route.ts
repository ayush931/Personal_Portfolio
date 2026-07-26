import { NextResponse } from "next/server";
import { readProjects, saveProject, deleteProject } from "@/lib/projects-store";

export async function GET() {
  try {
    const projects = await readProjects();
    return NextResponse.json({ success: true, projects });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to fetch CRM projects." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, id, project } = body;

    if (action === "save" && project) {
      const saved = await saveProject(project);
      return NextResponse.json({ success: true, project: saved });
    }

    if (action === "delete" && id) {
      const ok = await deleteProject(id);
      return NextResponse.json({ success: ok });
    }

    return NextResponse.json({ success: false, message: "Invalid CRM project action." }, { status: 400 });
  } catch {
    return NextResponse.json({ success: false, message: "Server error executing CRM project operation." }, { status: 500 });
  }
}
