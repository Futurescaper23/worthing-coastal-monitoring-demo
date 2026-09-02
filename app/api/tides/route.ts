import { NextResponse } from "next/server";

const DEFAULT_DATUM = "CD";

export async function GET(request: Request) {
  try {
    const apiKey = process.env.WORLDTIDES_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "WORLDTIDES_API_KEY is not configured for this demonstrator." },
        { status: 500 }
      );
    }

    const url = new URL(request.url);
    const latitude = url.searchParams.get("lat") ?? "50.8088";
    const longitude = url.searchParams.get("lon") ?? "-0.3695";
    const startDate = url.searchParams.get("start_date");
    const endDate = url.searchParams.get("end_date");

    if (!startDate || !endDate) {
      return NextResponse.json({ error: "start_date and end_date are required." }, { status: 400 });
    }

    const start = new Date(`${startDate}T00:00:00`);
    const end = new Date(`${endDate}T00:00:00`);
    const days = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / 86400000) + 1);
    const upstream = new URL("https://www.worldtides.info/api/v3");
    upstream.searchParams.set("key", apiKey);
    upstream.searchParams.set("lat", latitude);
    upstream.searchParams.set("lon", longitude);
    upstream.searchParams.set("date", startDate);
    upstream.searchParams.set("days", String(Math.min(days, 31)));
    upstream.searchParams.set("datum", DEFAULT_DATUM);
    upstream.searchParams.set("localtime", "");
    upstream.searchParams.set("heights", "");
    upstream.searchParams.set("extremes", "");

    const response = await fetch(upstream, { next: { revalidate: 60 * 30 } });
    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json({ error: `WorldTides API error ${response.status}: ${text}` }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({
      items: (data.heights || []).map((item: { date?: string; dt?: number; height?: number }) => ({
        time: item.date || new Date((item.dt ?? 0) * 1000).toISOString(),
        value: item.height
      })),
      extremes: (data.extremes || []).map((item: { date?: string; dt?: number; height?: number; type?: string }) => ({
        time: item.date || new Date((item.dt ?? 0) * 1000).toISOString(),
        value: item.height,
        type: item.type
      })),
      datum: data.datum || data.responseDatum || DEFAULT_DATUM,
      timezone: data.timezone || null
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Tide feed could not be loaded." },
      { status: 500 }
    );
  }
}
