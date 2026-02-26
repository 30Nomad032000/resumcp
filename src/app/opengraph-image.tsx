import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ResuMCP - Privacy-First Resume Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          background: "#1A1412",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.04,
            display: "flex",
            backgroundImage:
              "linear-gradient(rgba(74,222,128,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            width: "800px",
            height: "600px",
            right: "-100px",
            top: "-100px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(74,222,128,0.08) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Bottom glow */}
        <div
          style={{
            position: "absolute",
            width: "600px",
            height: "400px",
            left: "200px",
            bottom: "-150px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(74,222,128,0.05) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Decorative nodes — top right cluster */}
        {[
          { x: 900, y: 120, r: 6, o: 0.7 },
          { x: 950, y: 80, r: 4, o: 0.5 },
          { x: 1020, y: 150, r: 5, o: 0.6 },
          { x: 870, y: 180, r: 3, o: 0.4 },
          { x: 1060, y: 100, r: 3.5, o: 0.45 },
          { x: 980, y: 200, r: 4, o: 0.5 },
          { x: 1100, y: 180, r: 2.5, o: 0.35 },
        ].map((node, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: node.x,
              top: node.y,
              width: node.r * 2,
              height: node.r * 2,
              borderRadius: "50%",
              background: "#4ADE80",
              opacity: node.o,
              display: "flex",
            }}
          />
        ))}

        {/* Connection lines (simulated with thin divs) */}
        {[
          { x1: 900, y1: 120, x2: 950, y2: 80, o: 0.15 },
          { x1: 950, y1: 80, x2: 1020, y2: 150, o: 0.12 },
          { x1: 900, y1: 120, x2: 1020, y2: 150, o: 0.1 },
          { x1: 1020, y1: 150, x2: 1060, y2: 100, o: 0.12 },
          { x1: 870, y1: 180, x2: 900, y2: 120, o: 0.1 },
          { x1: 980, y1: 200, x2: 1020, y2: 150, o: 0.1 },
        ].map((line, i) => {
          const dx = line.x2 - line.x1;
          const dy = line.y2 - line.y1;
          const len = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          return (
            <div
              key={`line-${i}`}
              style={{
                position: "absolute",
                left: line.x1,
                top: line.y1,
                width: len,
                height: 1,
                background: "#4ADE80",
                opacity: line.o,
                transform: `rotate(${angle}deg)`,
                transformOrigin: "0 0",
                display: "flex",
              }}
            />
          );
        })}

        {/* Tag line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "1px",
              background: "#4ADE80",
              display: "flex",
            }}
          />
          <span
            style={{
              fontSize: "14px",
              letterSpacing: "0.25em",
              textTransform: "uppercase" as const,
              color: "#4ADE80",
              fontFamily: "monospace",
            }}
          >
            Privacy-first resume builder
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <span
            style={{
              fontSize: "72px",
              fontWeight: 700,
              color: "#F0ECE3",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Resu
            <span style={{ color: "#4ADE80" }}>MCP</span>
          </span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "24px",
            color: "rgba(240, 236, 227, 0.55)",
            marginTop: "20px",
            lineHeight: 1.5,
            maxWidth: "600px",
            display: "flex",
          }}
        >
          Bring your own AI agent via WebMCP. Build resumes that pass ATS systems. Your data never leaves your browser.
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "80px",
            right: "80px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#4ADE80",
                display: "flex",
              }}
            />
            <span
              style={{
                fontSize: "12px",
                letterSpacing: "0.15em",
                color: "rgba(240, 236, 227, 0.35)",
                fontFamily: "monospace",
              }}
            >
              100% PRIVATE &bull; NO SIGN-UP &bull; ATS-READY
            </span>
          </div>
          <span
            style={{
              fontSize: "12px",
              letterSpacing: "0.15em",
              color: "rgba(240, 236, 227, 0.25)",
              fontFamily: "monospace",
            }}
          >
            resumcp.dev
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
