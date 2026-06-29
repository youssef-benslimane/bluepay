import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { buildDemoCalendarLinks } from "@/lib/calendar";

const querySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  heure: z.string().regex(/^\d{2}:\d{2}$/),
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const parsed = querySchema.safeParse({
    date: searchParams.get("date"),
    heure: searchParams.get("heure"),
  });

  if (!parsed.success) {
    return NextResponse.json({ success: false, message: "Paramètres invalides" }, { status: 400 });
  }

  const { icsContent, icsFileName } = buildDemoCalendarLinks(parsed.data);

  return new NextResponse(icsContent, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${icsFileName}"`,
    },
  });
}
