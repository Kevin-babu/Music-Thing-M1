import Sidebar from './cards/Sidebar';
import React, { useEffect, useRef, useState } from "react";
// import {
//   Search,
//   FileText,
//   Calculator,
//   Terminal,
//   Image as ImageIcon,
//   Brain,
// } from "lucide-react";
import "./Dashboard.css";
import Player from './cards/Player';

/**
 * Project dashboard — frosted glass, dark themed.
 * Plain CSS only (no Tailwind, no react-bootstrap import — that package
 * isn't available in this sandbox). Markup follows a Bootstrap-style
 * container/row/col shape so it slots into a Bootstrap layout cleanly.
 */

const GENRES = [
  { label: "Lo-fi", v: 82 },
  { label: "Electronic", v: 74 },
  { label: "Indie", v: 68 },
  { label: "Jazz", v: 55 },
  { label: "Hip-hop", v: 40 },
  { label: "Classical", v: 30 },
];

const TOOLS = [
  { name: "web_search", desc: "Live web lookups", active: true },
  { name: "file_creation", desc: "Docs, sheets, slides", active: true },
  { name: "calculator", desc: "Arithmetic & unit conv.", active: false },
  { name: "code_execution", desc: "Sandboxed runtime", active: true },
  { name: "image_search", desc: "Visual reference lookup", active: false },
  { name: "memory", desc: "Cross-session recall", active: true },
];

function RadarChart() {
  const cx = 110, cy = 96, R = 62;
  const n = GENRES.length;
  const pt = (i, r) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
  };
  const rings = [0.25, 0.5, 0.75, 1];
  const dataPts = GENRES.map((d, i) => pt(i, R * (d.v / 100)));

  return (
    <svg viewBox="0 0 220 200" width="100%" style={{ maxWidth: 230 }}>
      {rings.map((f, idx) => (
        <polygon
          key={idx}
          points={GENRES.map((_, i) => pt(i, R * f).join(",")).join(" ")}
          fill="none"
          stroke="rgba(255,255,255,0.09)"
          strokeWidth="1"
        />
      ))}
      {GENRES.map((_, i) => {
        const p = pt(i, R);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={p[0]}
            y2={p[1]}
            stroke="rgba(255,255,255,0.09)"
          />
        );
      })}
      <polygon
        points={dataPts.map((p) => p.join(",")).join(" ")}
        fill="rgba(143,227,232,0.16)"
        stroke="#8fe3e8"
        strokeWidth="1.6"
      />
      {dataPts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="2.6" fill="#8fe3e8" />
      ))}
      {GENRES.map((d, i) => {
        const p = pt(i, R + 16);
        const anchor =
          Math.abs(p[0] - cx) < 2 ? "middle" : p[0] > cx ? "start" : "end";
        return (
          <text
            key={d.label}
            x={p[0]}
            y={p[1]}
            textAnchor={anchor}
            dominantBaseline="middle"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10.5,
              fill: "#5d6b78",
            }}
          >
            {d.label}
          </text>
        );
      })}
    </svg>
  );
}

function useAnimatedTokens(target, duration = 1100) {
  const [value, setValue] = useState(0);
  const startRef = useRef(null);

  useEffect(() => {
    let raf;
    const step = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const p = Math.min((ts - startRef.current) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return (value / 1_000_000).toFixed(2) + "M";
}

export default function Dashboard({ setPage , accessToken}) {
  const tokenLabel = useAnimatedTokens(1_420_000);

    return (
        <div className='' style={{height:"100%", width:"100%", display:"flex", flexDirection:"row", overflow:"hidden"}}>
            <div className='m-1' style={{ width:"90px", display:"flex", flexDirection:"row", overflow:"hidden"}}>
                <Sidebar setPage={setPage}/>
            </div>
        <div className="pd-root mt-4">
        <div className="pd-container">
            <div className="pd-head">
            <h1>Project overview</h1>
            <div className="pd-live">
                <span className="pd-dot-pulse" /> live · updated just now
            </div>
            </div>

            <div className="pd-row">
            {/* MODEL / TOKENS */}
            <div className="pd-col pd-col-7">
                <div className="pd-panel">
                <div className="pd-panel-title">
                    <h2>Model &amp; usage</h2>
                    <span className="pd-sub">session</span>
                </div>

                <div className="pd-model-row">
                    <span className="pd-badge">claude-sonnet-5</span>
                    <span className="pd-model-meta">200K context · temp 1.0</span>
                </div>

                <div className="pd-stat-line">
                    <span className="pd-stat-big">{tokenLabel}</span>
                    <span className="pd-stat-big-label">tokens processed today</span>
                </div>

                <div className="pd-split-bar">
                    <div className="pd-in" style={{ width: "68%" }} />
                    <div className="pd-out" style={{ width: "32%" }} />
                </div>
                <div className="pd-split-legend">
                    <span>
                    <span className="pd-swatch pd-swatch-in" />
                    input <b>68%</b>
                    </span>
                    <span>
                    <span className="pd-swatch pd-swatch-out" />
                    output <b>32%</b>
                    </span>
                </div>

                <div className="pd-subgrid">
                    <div className="pd-mini-stat">
                    <div className="v">3,208</div>
                    <div className="l">requests</div>
                    </div>
                    <div className="pd-mini-stat">
                    <div className="v">640ms</div>
                    <div className="l">avg latency</div>
                    </div>
                    <div className="pd-mini-stat">
                    <div className="v">$4.82</div>
                    <div className="l">spend today</div>
                    </div>
                </div>
                </div>
            </div>

            {/* MUSIC MAP */}
            <div className="pd-col pd-col-5">
                <div className="pd-panel pd-panel-center">
                <div className="pd-panel-title">
                    <h2>Listening profile</h2>
                    <span className="pd-sub">genre affinity</span>
                </div>
                <div className="pd-radar-wrap">
                    <RadarChart />
                    <div className="pd-top-genre">
                    Leaning toward <b>lo-fi</b> and <b>electronic</b>
                    </div>
                </div>
                </div>
            </div>
            </div>

            {/* TOOLS */}
            <div className="pd-row">
            <div className="pd-col pd-col-12">
                <div className="pd-panel">
                <div className="pd-panel-title">
                    <h2>Tools exposed to this project</h2>
                    <span className="pd-sub">
                    {TOOLS.length} total ·{" "}
                    {TOOLS.filter((t) => t.active).length} active
                    </span>
                </div>
                <div className="pd-tools-grid">
                    {[0, 1].map((col) => (
                    <div key={col}>
                        {TOOLS.filter((_, i) => i % 2 === col).map((tool) => {
                        // const Icon = tool.icon;
                        return (
                            <div className="pd-tool-row" key={tool.name}>
                            <div className="pd-tool-left">
                                <div className="pd-tool-icon">
                                {/* <Icon size={15} strokeWidth={2} /> */}
                                </div>
                                <div>
                                <div className="pd-tool-name">{tool.name}</div>
                                <div className="pd-tool-desc">{tool.desc}</div>
                                </div>
                            </div>
                            <div
                                className={
                                "pd-tool-status " +
                                (tool.active ? "pd-status-active" : "pd-status-idle")
                                }
                            >
                                <span className="pd-status-dot" />
                                {tool.active ? "active" : "idle"}
                            </div>
                            </div>
                        );
                        })}
                    </div>
                    ))}
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
        {/* <Player accessToken={accessToken}/> */}
            
        </div>
    )
}