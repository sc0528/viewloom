const DATA_URL = "../analytics-data/snapshots.json";
const fmt = new Intl.NumberFormat("en-US");
const el = id => document.getElementById(id);
let latest, previous, activeSeries = "uniques";

const usableTraffic = snapshot => snapshot?.traffic?.available ? snapshot.traffic : null;
const metric = (group, key) => group && Number.isFinite(group[key]) ? group[key] : null;

function delta(current, prior) {
  if (current == null || prior == null) return ["First recorded snapshot", "neutral"];
  const value = current - prior;
  if (!value) return ["No change since prior capture", "neutral"];
  return [`${value > 0 ? "↑" : "↓"} ${fmt.format(Math.abs(value))} since prior capture`, value < 0 ? "down" : ""];
}

function setMetric(id, current, prior) {
  el(id).textContent = current == null ? "—" : fmt.format(current);
  const [copy, cls] = delta(current, prior);
  el(`${id}-delta`).textContent = copy;
  el(`${id}-delta`).className = cls;
}

function renderChart() {
  const points = usableTraffic(latest)?.views?.views || [];
  if (!points.length) {
    el("chart").innerHTML = '<p class="empty">Traffic history is temporarily unavailable.</p>';
    return;
  }
  const values = points.map(item => item[activeSeries] || 0);
  const width = 760, height = 290, left = 45, right = 18, top = 18, bottom = 42;
  const max = Math.max(...values, 1);
  const x = index => left + index * (width - left - right) / Math.max(points.length - 1, 1);
  const y = value => top + (height - top - bottom) * (1 - value / max);
  const line = values.map((value, index) => `${index ? "L" : "M"}${x(index)},${y(value)}`).join(" ");
  const area = `${line} L${x(values.length - 1)},${height-bottom} L${x(0)},${height-bottom} Z`;
  const grid = [0,.25,.5,.75,1].map(fraction => {
    const lineY = top + (height-top-bottom) * fraction;
    return `<line class="grid-line" x1="${left}" y1="${lineY}" x2="${width-right}" y2="${lineY}"/><text class="axis-label" x="3" y="${lineY+4}">${fmt.format(Math.round(max*(1-fraction)))}</text>`;
  }).join("");
  const labels = points.map((point,index) => index % 2 === 0 || index === points.length-1
    ? `<text class="axis-label" text-anchor="middle" x="${x(index)}" y="${height-16}">${new Date(point.timestamp).toLocaleDateString("en-US",{month:"short",day:"numeric",timeZone:"UTC"})}</text>` : "").join("");
  const dots = values.map((value,index) => `<circle class="series-point" cx="${x(index)}" cy="${y(value)}" r="4"><title>${fmt.format(value)}</title></circle>`).join("");
  el("chart").innerHTML = `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" aria-hidden="true">${grid}<path class="series-area" d="${area}"/><path class="series-line" d="${line}"/>${dots}${labels}</svg>`;
}

function insight(icon, title, copy, confidence) {
  return `<div class="insight"><span class="insight-icon">${icon}</span><div><strong>${title}</strong><p>${copy}</p></div><span class="confidence">${confidence}</span></div>`;
}

function renderInsights() {
  const current = usableTraffic(latest);
  if (!current) {
    el("insights").innerHTML = insight("!", "Traffic needs permission", "Public repository metrics are current, but GitHub withheld visitor and clone data.", "HIGH");
    return;
  }
  const visitors = current.views.uniques, cloners = current.clones.uniques;
  const priorVisitors = usableTraffic(previous)?.views?.uniques;
  const direction = priorVisitors == null ? "A baseline is now recorded." : visitors > priorVisitors ? "Discovery moved up since the prior capture." : visitors < priorVisitors ? "Discovery softened since the prior capture." : "Discovery held steady.";
  const conversion = visitors ? cloners / visitors * 100 : 0;
  const stars = latest.repository_metrics.stars, issues = latest.repository_metrics.open_issues;
  el("insights").innerHTML =
    insight("↗", `${fmt.format(visitors)} people found the repository.`, direction, priorVisitors == null ? "BASELINE" : "MEDIUM") +
    insight("⌁", `${fmt.format(cloners)} unique cloners show trial intent.`, `${conversion.toFixed(1)} unique clones per 100 unique visitors. Automation can contribute.`, "MEDIUM") +
    insight("★", `${fmt.format(stars)} stars and ${fmt.format(issues)} open issues.`, stars ? "Stars are the clearest public signal of sustained interest; issues may contain validation feedback." : "An unsolicited star or feedback issue will be the strongest early validation signal.", "HIGH");
}

function renderFunnel() {
  const traffic = usableTraffic(latest);
  const steps = [["Visitors", traffic?.views?.uniques], ["Cloners", traffic?.clones?.uniques], ["Stars", latest.repository_metrics.stars]];
  el("funnel").innerHTML = steps.map(([label,value], index) => {
    const rate = index && steps[index-1][1] ? `${(value / steps[index-1][1] * 100).toFixed(1)}% of prior step` : "rolling 14-day signal";
    return `<div class="funnel-step"><div><span>${label}</span><strong>${value == null ? "—" : fmt.format(value)}</strong></div><span>${rate}</span></div>`;
  }).join("");
}

function renderTable(id, rows, label) {
  el(id).innerHTML = rows?.length ? rows.slice(0,6).map(row =>
    `<tr><td title="${row[label]}">${row[label]}</td><td>${fmt.format(row.count)}</td><td>${fmt.format(row.uniques)}</td></tr>`
  ).join("") : '<tr><td colspan="3" class="empty">No data available</td></tr>';
}

function renderQuality() {
  const available = latest.traffic.available;
  el("quality").innerHTML = `<p class="quality-state ${available ? "" : "warning"}">${available ? "✓ Complete traffic capture" : "△ Public metrics only"}</p>
    <p>GitHub exposes repository traffic as a rolling 14-day window. Daily snapshots preserve directional history without overstating precision.</p>
    <p>${available ? "Visitors and views measure discovery. Clones can include CI, bots, and maintainer testing." : latest.traffic.errors.join(" · ") || "Traffic details were unavailable."}</p>`;
}

function render(data) {
  latest = data.snapshots?.at(-1);
  previous = data.snapshots?.at(-2);
  if (!latest) throw new Error("No snapshots");
  const current = usableTraffic(latest), prior = usableTraffic(previous);
  setMetric("visitors", metric(current?.views,"uniques"), metric(prior?.views,"uniques"));
  setMetric("views", metric(current?.views,"count"), metric(prior?.views,"count"));
  setMetric("cloners", metric(current?.clones,"uniques"), metric(prior?.clones,"uniques"));
  setMetric("stars", latest.repository_metrics.stars, previous?.repository_metrics?.stars);
  el("updated").textContent = `Last captured ${new Date(latest.captured_at).toLocaleString("en-US",{dateStyle:"medium",timeStyle:"short",timeZone:"UTC"})} UTC`;
  renderChart(); renderInsights(); renderFunnel();
  renderTable("paths", current?.popular_paths, "path");
  renderTable("referrers", current?.referrers, "referrer");
  renderQuality();
}

document.querySelectorAll("[data-series]").forEach(button => button.addEventListener("click", () => {
  document.querySelectorAll("[data-series]").forEach(item => item.classList.remove("active"));
  button.classList.add("active"); activeSeries = button.dataset.series; renderChart();
}));

fetch(DATA_URL, {cache:"no-store"})
  .then(response => { if (!response.ok) throw new Error(response.statusText); return response.json(); })
  .then(render)
  .catch(() => {
    document.querySelector("main").innerHTML = '<section class="panel"><h1>Product Signal is preparing its first capture.</h1><p class="caption">The daily workflow will publish data here after its first successful run.</p></section>';
    el("updated").textContent = "No capture published yet";
  });
