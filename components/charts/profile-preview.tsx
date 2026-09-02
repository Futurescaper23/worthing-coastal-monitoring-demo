import { profileSeries } from "@/lib/site-data";

import styles from "./profile-preview.module.css";

const width = 760;
const height = 360;
const padding = {
  top: 42,
  right: 36,
  bottom: 58,
  left: 74
};

const allPoints = profileSeries.flatMap((series) => series.points);
const rawMin = Math.min(...allPoints);
const rawMax = Math.max(...allPoints);
const yMin = Math.floor((rawMin - 0.15) * 10) / 10;
const yMax = Math.ceil((rawMax + 0.15) * 10) / 10;
const yRange = Math.max(yMax - yMin, 0.1);
const chartWidth = width - padding.left - padding.right;
const chartHeight = height - padding.top - padding.bottom;
const xStep = chartWidth / Math.max(profileSeries[0]?.points.length - 1, 1);
const yTicks = [yMax, (yMax + yMin) / 2, yMin];

function xPosition(index: number) {
  return padding.left + index * xStep;
}

function yPosition(point: number) {
  return padding.top + ((yMax - point) / yRange) * chartHeight;
}

function linePath(points: number[]) {
  return points
    .map((point, index) => {
      const x = xPosition(index);
      const y = yPosition(point);
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

export function ProfilePreview() {
  const referenceSeries = profileSeries[0];
  const laterSeries = profileSeries[1];
  const deltaIndex = Math.min(2, referenceSeries.points.length - 1, laterSeries.points.length - 1);
  const deltaX = xPosition(deltaIndex);
  const referenceY = yPosition(referenceSeries.points[deltaIndex]);
  const laterY = yPosition(laterSeries.points[deltaIndex]);
  const deltaValue = laterSeries.points[deltaIndex] - referenceSeries.points[deltaIndex];

  return (
    <div className={styles.chartWrap}>
      <div className={styles.chartIntro}>
        <div>
          <p className={styles.eyebrow}>Public profile method</p>
          <h3>Sample cross-shore profile view</h3>
          <p>
            This panel shows the intended profile-comparison layout: shared elevation scale, cross-shore distance and
            epoch-to-epoch difference. Values are demonstration values until raw CCO profile files are ingested.
          </p>
        </div>
        <span className={styles.dataBadge}>Sample plot — raw values required</span>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className={styles.chart} role="img" aria-label="Historical profile preview">
        <defs>
          <linearGradient id="gainStroke" x1="0%" x2="100%">
            <stop offset="0%" stopColor="#5bc1ff" />
            <stop offset="100%" stopColor="#96ecff" />
          </linearGradient>
          <linearGradient id="lossStroke" x1="0%" x2="100%">
            <stop offset="0%" stopColor="#ff7f88" />
            <stop offset="100%" stopColor="#ff505e" />
          </linearGradient>
        </defs>
        {yTicks.map((tick) => {
          const y = yPosition(tick);
          return (
            <g key={tick}>
              <line x1={padding.left} x2={width - padding.right} y1={y} y2={y} className={styles.gridLine} />
              <text x={padding.left - 14} y={y + 4} textAnchor="end" className={styles.axisText}>
                {tick.toFixed(1)}m
              </text>
            </g>
          );
        })}
        <line
          x1={padding.left}
          x2={width - padding.right}
          y1={height - padding.bottom}
          y2={height - padding.bottom}
          className={styles.axisLine}
        />
        <line
          x1={padding.left}
          x2={padding.left}
          y1={padding.top}
          y2={height - padding.bottom}
          className={styles.axisLine}
        />
        <text x={padding.left - 46} y={padding.top - 12} className={styles.axisTitle}>
          Elevation
        </text>
        <text x={width - padding.right} y={height - 20} textAnchor="end" className={styles.axisTitle}>
          Cross-shore distance from promenade to lower beach
        </text>
        <text x={padding.left + 10} y={height - 20} className={styles.axisText}>
          Promenade / crest
        </text>
        <text x={width - padding.right - 6} y={height - 42} textAnchor="end" className={styles.axisText}>
          Foreshore
        </text>
        {profileSeries.map((series, index) => (
          <path
            key={series.name}
            d={linePath(series.points)}
            className={index === 0 ? styles.seriesLoss : styles.seriesGain}
          />
        ))}
        <line x1={deltaX} x2={deltaX} y1={laterY} y2={referenceY} className={styles.deltaLine} />
        <circle cx={deltaX} cy={laterY} r="4.8" className={styles.deltaDotGain} />
        <circle cx={deltaX} cy={referenceY} r="4.8" className={styles.deltaDotLoss} />
        <g className={styles.deltaCallout}>
          <rect x={deltaX + 16} y={Math.min(laterY, referenceY) - 32} width="162" height="48" rx="14" />
          <text x={deltaX + 30} y={Math.min(laterY, referenceY) - 12}>
            Sample height delta
          </text>
          <text x={deltaX + 30} y={Math.min(laterY, referenceY) + 8}>
            Not measured evidence
          </text>
        </g>
      </svg>
      <div className={styles.legend}>
        {profileSeries.map((series, index) => (
          <div key={series.name} className={styles.legendItem}>
            <span className={`${styles.legendSwatch} ${index === 0 ? styles.legendLoss : styles.legendGain}`} />
            <div>
              <strong>{series.name}</strong>
              <p>{series.date}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.chartNotes}>
        <span>Confirmed public route: CCO 4dSU16 Worthing summary reports for March 2025 and March 2026.</span>
        <span>Measured repair impact would require raw profile files, the client UAV baseline and agreed thresholds.</span>
      </div>
      <div className={styles.sourceGrid}>
        <article>
          <strong>Public source</strong>
          <span>Channel Coastal Observatory reports catalogue</span>
        </article>
        <article>
          <strong>Confirmed report epochs</strong>
          <span>Mar 2025 and Mar 2026, 4dSU16 Worthing summary reports</span>
        </article>
        <article>
          <strong>Datum / CRS</strong>
          <span>To be confirmed during raw profile ingestion</span>
        </article>
        <article>
          <strong>Checked</strong>
          <span>2 Sep 2026</span>
        </article>
      </div>
    </div>
  );
}
