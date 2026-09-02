"use client";

import { useEffect, useState } from "react";

import styles from "./conditions-dashboard.module.css";

const WORTHING = {
  name: "Worthing Pier / Pier East demonstrator point",
  latitude: 50.8088,
  longitude: -0.3695
};

type WeatherHourly = {
  time: string[];
  temperature_2m: number[];
  precipitation: number[];
  windspeed_10m: number[];
  windgusts_10m: number[];
  pressure_msl: number[];
};

type TideReading = {
  time: string;
  value: number;
};

type TideExtreme = TideReading & {
  type: string;
};

type DailyWeather = {
  labels: string[];
  rain: number[];
  windMean: number[];
  tempMean: number[];
  tempMin: number[];
  tempMax: number[];
  gustMax: number[];
  pressureMin: number[];
};

type DashboardState =
  | { status: "loading"; message: string }
  | { status: "error"; message: string }
  | {
      status: "ready";
      weather: DailyWeather;
      tideReadings: TideReading[];
      tideExtremes: TideExtreme[];
      tideDatum: string;
      tideError?: string;
      start: string;
      end: string;
    };

const reviewWindows = [
  {
    label: "Current review window",
    start: "2026-08-11",
    end: "2026-09-01",
    note: "Latest prepared client preview range"
  },
  {
    label: "Works completion context",
    start: "2026-07-15",
    end: "2026-08-05",
    note: "Weather context around public completion timing"
  },
  {
    label: "Early summer baseline context",
    start: "2026-06-15",
    end: "2026-07-16",
    note: "Longer pre-handover comparison window"
  }
];

function defaultWindow() {
  return { start: reviewWindows[0].start, end: reviewWindows[0].end };
}

function formatDate(value: string) {
  return new Date(`${value}T12:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

function mean(values: number[]) {
  const clean = values.filter(Number.isFinite);
  return clean.length ? clean.reduce((sum, value) => sum + value, 0) / clean.length : 0;
}

function sum(values: number[]) {
  return values.filter(Number.isFinite).reduce((total, value) => total + value, 0);
}

function max(values: number[]) {
  const clean = values.filter(Number.isFinite);
  return clean.length ? Math.max(...clean) : 0;
}

function min(values: number[]) {
  const clean = values.filter(Number.isFinite);
  return clean.length ? Math.min(...clean) : 0;
}

function fmt(value: number, digits = 1) {
  return Number.isFinite(value) ? value.toFixed(digits) : "-";
}

function shortDate(value: string) {
  return new Date(`${value}T12:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short"
  });
}

function groupDaily(hourly: WeatherHourly): DailyWeather {
  const bucket = new Map<string, { rain: number; temp: number[]; wind: number[]; gust: number[]; pressure: number[] }>();

  hourly.time.forEach((time, index) => {
    const day = time.slice(0, 10);
    const item = bucket.get(day) ?? { rain: 0, temp: [], wind: [], gust: [], pressure: [] };
    item.rain += hourly.precipitation[index] || 0;
    if (Number.isFinite(hourly.temperature_2m[index])) item.temp.push(hourly.temperature_2m[index]);
    if (Number.isFinite(hourly.windspeed_10m[index])) item.wind.push(hourly.windspeed_10m[index]);
    if (Number.isFinite(hourly.windgusts_10m[index])) item.gust.push(hourly.windgusts_10m[index]);
    if (Number.isFinite(hourly.pressure_msl[index])) item.pressure.push(hourly.pressure_msl[index]);
    bucket.set(day, item);
  });

  const labels = [...bucket.keys()].sort();
  return {
    labels,
    rain: labels.map((day) => bucket.get(day)?.rain ?? 0),
    windMean: labels.map((day) => mean(bucket.get(day)?.wind ?? [])),
    tempMean: labels.map((day) => mean(bucket.get(day)?.temp ?? [])),
    tempMin: labels.map((day) => min(bucket.get(day)?.temp ?? [])),
    tempMax: labels.map((day) => max(bucket.get(day)?.temp ?? [])),
    gustMax: labels.map((day) => max(bucket.get(day)?.gust ?? [])),
    pressureMin: labels.map((day) => min(bucket.get(day)?.pressure ?? []))
  };
}

function dailyTideRanges(readings: TideReading[]) {
  const bucket = new Map<string, number[]>();
  readings.forEach((reading) => {
    const day = reading.time.slice(0, 10);
    bucket.set(day, [...(bucket.get(day) ?? []), reading.value]);
  });

  return [...bucket.entries()].map(([day, values]) => ({
    day,
    range: max(values) - min(values)
  }));
}

const chartPad = {
  top: 22,
  right: 34,
  bottom: 38,
  left: 48
};

function domain(values: number[], floorAtZero = false) {
  const clean = values.filter(Number.isFinite);
  const low = floorAtZero ? 0 : Math.min(...clean);
  const high = Math.max(...clean);
  const span = Math.max(high - low, 0.1);
  return {
    min: low,
    max: high + span * 0.08
  };
}

function yFor(value: number, minValue: number, maxValue: number, height: number) {
  const plotHeight = height - chartPad.top - chartPad.bottom;
  return chartPad.top + ((maxValue - value) / Math.max(maxValue - minValue, 0.1)) * plotHeight;
}

function xFor(index: number, count: number, width: number) {
  const plotWidth = width - chartPad.left - chartPad.right;
  return chartPad.left + (index / Math.max(count - 1, 1)) * plotWidth;
}

function chartPath(values: number[], width: number, height: number, minValue: number, maxValue: number) {
  if (!values.length) return "";

  return values
    .map((value, index) => {
      const x = xFor(index, values.length, width);
      const y = yFor(value, minValue, maxValue, height);
      return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

function axisTicks(minValue: number, maxValue: number) {
  const mid = minValue + (maxValue - minValue) / 2;
  return [maxValue, mid, minValue];
}

function bottomTicks(labels: string[]) {
  if (labels.length <= 1) return labels.map((label, index) => ({ label, index }));
  const mid = Math.floor((labels.length - 1) / 2);
  return [0, mid, labels.length - 1].map((index) => ({ label: labels[index], index }));
}

function ChartAxes({
  labels,
  minValue,
  maxValue,
  width,
  height,
  unit,
  rightUnit
}: {
  labels: string[];
  minValue: number;
  maxValue: number;
  width: number;
  height: number;
  unit: string;
  rightUnit?: string;
}) {
  return (
    <>
      {axisTicks(minValue, maxValue).map((tick) => {
        const y = yFor(tick, minValue, maxValue, height);
        return (
          <g key={`${unit}-${tick}`}>
            <line x1={chartPad.left} x2={width - chartPad.right} y1={y} y2={y} className={styles.gridLine} />
            <text x={chartPad.left - 10} y={y + 4} textAnchor="end" className={styles.axisText}>
              {fmt(tick, unit === "hPa" ? 0 : 1)}
            </text>
          </g>
        );
      })}
      <line x1={chartPad.left} x2={chartPad.left} y1={chartPad.top} y2={height - chartPad.bottom} className={styles.axisLine} />
      <line x1={chartPad.left} x2={width - chartPad.right} y1={height - chartPad.bottom} y2={height - chartPad.bottom} className={styles.axisLine} />
      <text x={chartPad.left - 32} y={chartPad.top - 8} className={styles.axisLabel}>
        {unit}
      </text>
      {rightUnit ? (
        <text x={width - chartPad.right + 8} y={chartPad.top - 8} className={styles.axisLabel}>
          {rightUnit}
        </text>
      ) : null}
      {bottomTicks(labels).map((tick) => (
        <text key={`${tick.label}-${tick.index}`} x={xFor(tick.index, labels.length, width)} y={height - 12} textAnchor="middle" className={styles.axisText}>
          {shortDate(tick.label)}
        </text>
      ))}
    </>
  );
}

function barWidth(count: number, width: number) {
  return Math.max((width - chartPad.left - chartPad.right) / Math.max(count, 1) - 3, 4);
}

function MultiLineChart({
  title,
  labels,
  datasets,
  unit,
  summary
}: {
  title: string;
  labels: string[];
  datasets: Array<{ label: string; values: number[]; tone: "blue" | "pink" | "gold" }>;
  unit: string;
  summary: string;
}) {
  const width = 520;
  const height = 220;
  const allValues = datasets.flatMap((dataset) => dataset.values);
  const chartDomain = domain(allValues, unit === "km/h");

  return (
    <article className={styles.chartCard}>
      <div className={styles.panelTitle}>
        <h3>{title}</h3>
        <span>
          {summary || `${fmt(min(allValues), 1)}-${fmt(max(allValues), 1)} ${unit}`}
        </span>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className={styles.chart} role="img" aria-label={title}>
        <ChartAxes labels={labels} minValue={chartDomain.min} maxValue={chartDomain.max} width={width} height={height} unit={unit} />
        {datasets.map((dataset) => (
          <path
            key={dataset.label}
            d={chartPath(dataset.values, width, height, chartDomain.min, chartDomain.max)}
            className={styles[`line${dataset.tone}`]}
          />
        ))}
      </svg>
      <div className={styles.chartLegend}>
        {datasets.map((dataset) => (
          <span key={dataset.label}>
            <i className={styles[`legend${dataset.tone}`]} />
            {dataset.label}
          </span>
        ))}
      </div>
    </article>
  );
}

function RainPressureChart({ labels, rain, pressure }: { labels: string[]; rain: number[]; pressure: number[] }) {
  const width = 520;
  const height = 220;
  const rainDomain = domain(rain, true);
  const pressureDomain = domain(pressure);
  const bw = barWidth(rain.length, width);
  const pressurePath = pressure
    .map((value, index) => {
      const x = xFor(index, pressure.length, width);
      const y = yFor(value, pressureDomain.min, pressureDomain.max, height);
      return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <article className={styles.chartCard}>
      <div className={styles.panelTitle}>
        <h3>Rainfall And Pressure Context</h3>
        <span>{fmt(sum(rain), 0)} mm rain / {fmt(min(pressure), 1)} hPa low</span>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className={styles.chart} role="img" aria-label="Rainfall and pressure context">
        <ChartAxes labels={labels} minValue={rainDomain.min} maxValue={rainDomain.max} width={width} height={height} unit="mm" rightUnit="hPa" />
        {axisTicks(pressureDomain.min, pressureDomain.max).map((tick) => (
          <text key={`pressure-${tick}`} x={width - chartPad.right + 10} y={yFor(tick, pressureDomain.min, pressureDomain.max, height) + 4} className={styles.axisText}>
            {fmt(tick, 0)}
          </text>
        ))}
        {rain.map((value, index) => {
          const x = chartPad.left + index * (bw + 3);
          const barHeight = ((value - rainDomain.min) / Math.max(rainDomain.max - rainDomain.min, 0.1)) * (height - chartPad.top - chartPad.bottom);
          return (
            <rect
              key={`${value}-${index}`}
              x={x}
              y={height - chartPad.bottom - barHeight}
              width={bw}
              height={barHeight}
              rx="4"
              className={styles.rainBar}
            />
          );
        })}
        <path d={pressurePath} className={styles.linegold} />
      </svg>
      <div className={styles.chartLegend}>
        <span><i className={styles.legendblue} />Rainfall (mm)</span>
        <span><i className={styles.legendgold} />Pressure (hPa)</span>
      </div>
    </article>
  );
}

function TideChart({
  readings,
  extremes,
  datum,
  error
}: {
  readings: TideReading[];
  extremes: TideExtreme[];
  datum: string;
  error?: string;
}) {
  const width = 520;
  const height = 240;
  const values = readings.map((reading) => reading.value);
  const chartDomain = domain(values, true);
  const labels = readings.map((reading) => reading.time.slice(0, 10));
  const hasLiveFeed = readings.length > 0 && !error;

  return (
    <article className={styles.chartCard}>
      <div className={styles.panelTitle}>
        <h3>Tide Height And Exposure</h3>
        <span>{hasLiveFeed ? `WorldTides live feed / ${datum}` : "Prepared tide display - sample values not shown"}</span>
      </div>
      {hasLiveFeed ? (
        <svg viewBox={`0 0 ${width} ${height}`} className={styles.chart} role="img" aria-label="Tide height and exposure">
          <ChartAxes labels={labels} minValue={chartDomain.min} maxValue={chartDomain.max} width={width} height={height} unit="m" />
          <path d={chartPath(values, width, height, chartDomain.min, chartDomain.max)} className={styles.lineblue} />
          {extremes.slice(0, 24).map((extreme) => {
            const index = readings.findIndex((reading) => reading.time.slice(0, 13) === extreme.time.slice(0, 13));
            if (index < 0) return null;
            const x = xFor(index, readings.length, width);
            const y = yFor(extreme.value, chartDomain.min, chartDomain.max, height);
            return (
              <circle
                key={`${extreme.time}-${extreme.type}`}
                cx={x}
                cy={y}
                r="4"
                className={extreme.type === "High" ? styles.highTideDot : styles.lowTideDot}
              />
            );
          })}
        </svg>
      ) : (
        <div className={styles.emptyChart}>
          <strong>Prepared tide display</strong>
          <span>Live tide heights will appear here when the WorldTides provider key is connected.</span>
          <span>No tidal range or tide-height claim is being shown in this preview state.</span>
        </div>
      )}
    </article>
  );
}

export function ConditionsDashboard() {
  const [dateWindow, setDateWindow] = useState(defaultWindow);
  const [state, setState] = useState<DashboardState>({ status: "loading", message: "Loading Worthing conditions..." });

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      try {
        setState({ status: "loading", message: "Loading Worthing weather and tide context..." });
        const weatherUrl = new URL("/api/weather", window.location.origin);
        weatherUrl.searchParams.set("source", "archive");
        weatherUrl.searchParams.set("latitude", String(WORTHING.latitude));
        weatherUrl.searchParams.set("longitude", String(WORTHING.longitude));
        weatherUrl.searchParams.set("start_date", dateWindow.start);
        weatherUrl.searchParams.set("end_date", dateWindow.end);

        const weatherResponse = await fetch(weatherUrl);
        if (!weatherResponse.ok) throw new Error(`Weather feed returned ${weatherResponse.status}`);
        const weatherPayload = await weatherResponse.json();
        const weather = groupDaily(weatherPayload.hourly);

        let tideReadings: TideReading[] = [];
        let tideExtremes: TideExtreme[] = [];
        let tideDatum = "CD";
        let tideError: string | undefined;

        try {
          const tideUrl = new URL("/api/tides", window.location.origin);
          tideUrl.searchParams.set("lat", String(WORTHING.latitude));
          tideUrl.searchParams.set("lon", String(WORTHING.longitude));
          tideUrl.searchParams.set("start_date", dateWindow.start);
          tideUrl.searchParams.set("end_date", dateWindow.end);
          const tideResponse = await fetch(tideUrl);
          const tidePayload = await tideResponse.json();
          if (!tideResponse.ok) throw new Error(tidePayload.error || `Tide feed returned ${tideResponse.status}`);
          tideReadings = tidePayload.items || [];
          tideExtremes = tidePayload.extremes || [];
          tideDatum = tidePayload.datum || "CD";
        } catch (error) {
          tideError = error instanceof Error ? error.message : "Tide feed unavailable.";
        }

        if (!cancelled) {
          setState({
            status: "ready",
            weather,
            tideReadings,
            tideExtremes,
            tideDatum,
            tideError,
            start: dateWindow.start,
            end: dateWindow.end
          });
        }
      } catch (error) {
        if (!cancelled) {
          setState({
            status: "error",
            message: error instanceof Error ? error.message : "Conditions dashboard could not load."
          });
        }
      }
    }

    loadData();

    return () => {
      cancelled = true;
    };
  }, [dateWindow]);

  const ready = state.status === "ready" ? state : null;
  const dailyTides = ready ? dailyTideRanges(ready.tideReadings) : [];
  const selectedWindow =
    reviewWindows.find((item) => item.start === dateWindow.start && item.end === dateWindow.end) ?? reviewWindows[0];
  const metrics = ready
    ? [
        ["Total Rainfall", `${fmt(sum(ready.weather.rain), 0)} mm`, "Across the selected Worthing window"],
        ["Peak Wind Gust", `${fmt(max(ready.weather.gustMax), 1)} km/h`, "Strongest daily gust context"],
        ["Lowest Pressure", `${fmt(min(ready.weather.pressureMin), 1)} hPa`, "Storm-system proxy marker"],
        ["Mean Temperature", `${fmt(mean(ready.weather.tempMean), 1)} C`, "Average air temperature"],
        [
          "Storm-Like Days",
          `${ready.weather.labels.filter((_, index) => ready.weather.gustMax[index] >= 45 || ready.weather.rain[index] >= 15 || ready.weather.pressureMin[index] <= 995).length}`,
          "Rain >=15 mm, gust >=45 km/h or pressure <=995 hPa"
        ],
        [
          "Max Tidal Range",
          ready.tideReadings.length && !ready.tideError ? `${fmt(max(dailyTides.map((item) => item.range)), 2)} m` : "Not shown",
          ready.tideError ? "WorldTides not connected in this preview" : `WorldTides live feed, ${ready.tideDatum}`
        ]
      ]
    : [];

  return (
    <section className={styles.dashboard}>
      <div className={styles.hero}>
        <article className={styles.panel}>
          <p className={styles.eyebrow}>Worthing conditions interface</p>
          <h2>Weather, tide and survey-window context</h2>
          <p>
            This view is pointed at Worthing Pier / Pier East and provides context for interpreting survey timing,
            weather exposure and environmental conditions around visible change.
          </p>
        </article>
        <article className={styles.panel}>
          <p className={styles.eyebrow}>Current view</p>
          <h2>{formatDate(dateWindow.start)} to {formatDate(dateWindow.end)}</h2>
          <p>
            {selectedWindow.note}. Weather uses Open-Meteo archive data for the Worthing Pier point. Tide heights are only
            labelled as live when WorldTides returns values.
          </p>
        </article>
      </div>

      <div className={styles.controls}>
        <div className={styles.locationBlock}>
          <span>Location</span>
          <strong>{WORTHING.name}</strong>
          <small>{WORTHING.latitude.toFixed(4)}, {WORTHING.longitude.toFixed(4)}</small>
        </div>
        <div className={styles.windowPicker} aria-label="Survey-window options">
          <span>Review window</span>
          <div>
            {reviewWindows.map((item) => {
              const isActive = item.start === dateWindow.start && item.end === dateWindow.end;
              return (
                <button
                  key={`${item.start}-${item.end}`}
                  type="button"
                  className={isActive ? styles.activeWindow : undefined}
                  onClick={() => setDateWindow({ start: item.start, end: item.end })}
                >
                  <strong>{item.label}</strong>
                  <small>{formatDate(item.start)} to {formatDate(item.end)}</small>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {state.status !== "ready" ? (
        <div className={styles.panel}>
          <p className={styles.statusText}>{state.message}</p>
        </div>
      ) : null}

      {ready ? (
        <>
          <div className={styles.metricGrid}>
            {metrics.map(([label, value, note]) => (
              <article key={label} className={styles.metric}>
                <p>{label}</p>
                <strong>{value}</strong>
                <span>{note}</span>
              </article>
            ))}
          </div>

          <div className={styles.chartGrid}>
            <TideChart
              readings={ready.tideReadings}
              extremes={ready.tideExtremes}
              datum={ready.tideDatum}
              error={ready.tideError}
            />
            <RainPressureChart labels={ready.weather.labels} rain={ready.weather.rain} pressure={ready.weather.pressureMin} />
            <MultiLineChart
              title="Wind Speed And Gust Profile"
              labels={ready.weather.labels}
              unit="km/h"
              summary={`${fmt(mean(ready.weather.windMean), 1)} km/h mean / ${fmt(max(ready.weather.gustMax), 1)} km/h gust`}
              datasets={[
                { label: "Mean wind (km/h)", values: ready.weather.windMean, tone: "blue" },
                { label: "Peak gust (km/h)", values: ready.weather.gustMax, tone: "pink" }
              ]}
            />
            <MultiLineChart
              title="Temperature Profile"
              labels={ready.weather.labels}
              unit="C"
              summary={`${fmt(mean(ready.weather.tempMean), 1)} C mean`}
              datasets={[
                { label: "Mean temp (C)", values: ready.weather.tempMean, tone: "gold" },
                { label: "Min temp (C)", values: ready.weather.tempMin, tone: "blue" },
                { label: "Max temp (C)", values: ready.weather.tempMax, tone: "pink" }
              ]}
            />
          </div>

          <div className={styles.insightGrid}>
            <article className={styles.panel}>
              <p className={styles.eyebrow}>Plain-English readout</p>
              <h3>What this tells the client</h3>
              <p>
                This window saw {fmt(sum(ready.weather.rain), 0)} mm of rain, peak gusts of{" "}
                {fmt(max(ready.weather.gustMax), 1)} km/h and a lowest pressure reading of{" "}
                {fmt(min(ready.weather.pressureMin), 1)} hPa. That gives context for whether a survey window followed
                calm weather, rainfall, or more energetic conditions.
              </p>
              <p>
                {ready.tideReadings.length && !ready.tideError
                  ? `The largest daily tidal range in this window is approximately ${fmt(max(dailyTides.map((item) => item.range)), 2)} m, useful for explaining beach exposure and survey timing.`
                  : "The tide panel is prepared for WorldTides data once the provider key is connected. Until then, this page makes no tide-height or tidal-range claim."}
              </p>
            </article>

            <article className={styles.panel}>
              <p className={styles.eyebrow}>Important limit</p>
              <h3>Context, not proof</h3>
              <p>
                Weather and tide conditions help explain when surveys happen and what might have influenced visible
                beach state. They do not prove repair performance without the client UAV baseline, real profile
                ingestion and agreed thresholds.
              </p>
              {ready.tideError ? <p className={styles.warning}>Tide feed note: {ready.tideError}</p> : null}
            </article>
          </div>
        </>
      ) : null}
    </section>
  );
}
