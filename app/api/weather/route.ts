import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const source = url.searchParams.get("source");
    const latitude = url.searchParams.get("latitude");
    const longitude = url.searchParams.get("longitude");
    const startDate = url.searchParams.get("start_date");
    const endDate = url.searchParams.get("end_date");

    if (!source || !latitude || !longitude || !startDate || !endDate) {
      return NextResponse.json(
        { error: "source, latitude, longitude, start_date, and end_date are required." },
        { status: 400 }
      );
    }

    const baseUrl = source === "forecast"
      ? "https://api.open-meteo.com/v1/forecast"
      : "https://archive-api.open-meteo.com/v1/archive";
    const upstream = new URL(baseUrl);
    upstream.searchParams.set("latitude", latitude);
    upstream.searchParams.set("longitude", longitude);
    upstream.searchParams.set("start_date", startDate);
    upstream.searchParams.set("end_date", endDate);
    upstream.searchParams.set("hourly", "temperature_2m,precipitation,windspeed_10m,windgusts_10m,pressure_msl");
    upstream.searchParams.set("timezone", "Europe/London");

    const response = await fetch(upstream, { next: { revalidate: 60 * 60 } });
    const payload = await response.json();

    return NextResponse.json(payload, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Weather feed could not be loaded." },
      { status: 500 }
    );
  }
}
