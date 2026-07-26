import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { addCrmMessage } from "@/lib/crm-store";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please provide a valid email address."),
  subject: z.string().min(3, "Subject must be at least 3 characters."),
  message: z.string().min(10, "Message must be at least 10 characters long."),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    const clientIp = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "Unknown Device";

    // Store message in CRM
    addCrmMessage({
      name: validatedData.name,
      email: validatedData.email,
      subject: validatedData.subject,
      message: validatedData.message,
      ip: clientIp.split(",")[0].trim(),
      userAgent,
    });

    const apiKey = process.env.RESEND_API_KEY;

    if (apiKey) {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ["ayush931@example.com"],
        subject: `[Portfolio Inquiry] ${validatedData.subject}`,
        text: `Name: ${validatedData.name}\nEmail: ${validatedData.email}\n\nMessage:\n${validatedData.message}`,
      });
    } else {
      console.log("[Contact API] Resend API key omitted; simulated email & stored in CRM:", validatedData);
    }

    return NextResponse.json({ success: true, message: "Thank you! Your message has been sent successfully and logged in CRM." });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: "Failed to send message. Please try again later." }, { status: 500 });
  }
}
