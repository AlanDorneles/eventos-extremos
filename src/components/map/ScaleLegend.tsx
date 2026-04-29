import styles from "./ScaleLegend.module.css";

// labels top -> bottom: -100 .. 100 step 10
const labels: number[] = [];
for (let v = -100; v <= 100; v += 10) labels.push(v);

export function ScaleLegend() {
  return (
    <div className={styles.scaleLegend} aria-label="Escala de temperatura">
      <div className={styles.scaleBackground}>
        <div className={styles.scaleBar}>
          <div className={styles.unitLabel}>°C</div>
          <div className={styles.scaleTicks}>
            {labels.map((label) => (
              <div key={label} className={styles.tickRow}>
                <span className={styles.tickLine} />
                <span className={styles.tickLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
