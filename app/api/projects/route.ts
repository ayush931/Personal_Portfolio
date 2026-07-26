import { NextResponse } from "next/server";
import { readProjects } from "@/lib/projects-store";

export async function GET() {
  try {
    const projects = await readProjects();
    return NextResponse.json({ success: true, projects });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to fetch projects." }, { status: 500 });
  }
}
