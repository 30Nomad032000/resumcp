"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

/* ─── Design Tokens ─── */
const T = {
  soil: "#1A1412",
  biolume: "#4ADE80",
  bone: "#F0ECE3",
  root: "#0D0D0D",
  soilLight: "#2A2320",
  biolumeDim: "#4ADE8033",
};

/* ═══════════════════════════════════════════════════════════
   A. NAVBAR — "The Floating Island"
   ═══════════════════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => setScrolled(!e.isIntersecting),
      { threshold: 0.1 }
    );
    const hero = document.getElementById("hero");
    if (hero) obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 flex items-center gap-8 transition-all duration-500"
      style={{
        borderRadius: "9999px",
        background: scrolled ? `${T.bone}E0` : "transparent",
        backdropFilter: scrolled ? "blur(24px) saturate(1.4)" : "none",
        border: scrolled ? `1px solid ${T.soil}15` : "1px solid transparent",
        boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.08)" : "none",
      }}
    >
      <span
        className="text-sm font-bold tracking-tight transition-colors duration-500"
        style={{
          fontFamily: "var(--font-geist-sans), sans-serif",
          color: scrolled ? T.soil : T.bone,
        }}
      >
        Resu<span style={{ color: T.biolume }}>MCP</span>
      </span>
      <div className="hidden md:flex items-center gap-6">
        {["Features", "Philosophy", "Protocol"].map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="text-xs tracking-wide transition-all duration-300 hover:-translate-y-[1px]"
            style={{
              fontFamily: "var(--font-geist-sans), sans-serif",
              color: scrolled ? T.soil + "AA" : T.bone + "BB",
            }}
          >
            {link}
          </a>
        ))}
      </div>
      <Link href="/builder">
        <MagneticButton small>Start Building</MagneticButton>
      </Link>
    </nav>
  );
}

/* ─── Magnetic Button ─── */
function MagneticButton({
  children,
  small,
  className = "",
  onClick,
  href,
}: {
  children: React.ReactNode;
  small?: boolean;
  className?: string;
  onClick?: () => void;
  href?: string;
}) {
  const Comp = href ? "a" : "button";
  return (
    <Comp
      href={href}
      onClick={onClick}
      className={`magnetic-btn relative overflow-hidden inline-flex items-center justify-center font-medium tracking-wide transition-transform ${
        small ? "px-5 py-2 text-xs" : "px-8 py-3.5 text-sm"
      } ${className}`}
      style={{
        borderRadius: "9999px",
        background: T.biolume,
        color: T.root,
        fontFamily: "var(--font-geist-sans), sans-serif",
      }}
    >
      <span className="magnetic-btn-bg" />
      <span className="relative z-10">{children}</span>
    </Comp>
  );
}

/* ═══════════════════════════════════════════════════════════
   B. HERO — Dense organic mycelium network + grid background
   ═══════════════════════════════════════════════════════════ */

function MyceliumCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animRef = useRef<number>(0);
  const visibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Cache dimensions — update on resize only
    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawGrid();
    };

    // --- Pre-render static grid to offscreen canvas ---
    let gridCanvas: HTMLCanvasElement;
    const drawGrid = () => {
      gridCanvas = document.createElement("canvas");
      gridCanvas.width = w * dpr;
      gridCanvas.height = h * dpr;
      const gc = gridCanvas.getContext("2d")!;
      gc.setTransform(dpr, 0, 0, dpr, 0, 0);
      gc.strokeStyle = "rgba(74, 222, 128, 0.03)";
      gc.lineWidth = 0.5;
      const gridSize = 60;
      gc.beginPath();
      for (let x = 0; x < w; x += gridSize) {
        gc.moveTo(x, 0); gc.lineTo(x, h);
      }
      for (let y = 0; y < h; y += gridSize) {
        gc.moveTo(0, y); gc.lineTo(w, y);
      }
      gc.stroke();
    };

    resize();
    window.addEventListener("resize", resize);

    // --- Pre-render glow sprite (replaces per-frame createRadialGradient) ---
    const GLOW_SIZE = 64;
    const glowSprite = document.createElement("canvas");
    glowSprite.width = GLOW_SIZE;
    glowSprite.height = GLOW_SIZE;
    const gs = glowSprite.getContext("2d")!;
    const grad = gs.createRadialGradient(GLOW_SIZE / 2, GLOW_SIZE / 2, 0, GLOW_SIZE / 2, GLOW_SIZE / 2, GLOW_SIZE / 2);
    grad.addColorStop(0, "rgba(74, 222, 128, 0.3)");
    grad.addColorStop(0.5, "rgba(74, 222, 128, 0.06)");
    grad.addColorStop(1, "rgba(74, 222, 128, 0)");
    gs.fillStyle = grad;
    gs.fillRect(0, 0, GLOW_SIZE, GLOW_SIZE);

    // --- Particles: reduced to 120 ---
    const TOTAL = 120;
    const nodes: { x: number; y: number; vx: number; vy: number; r: number; phase: number }[] = [];
    for (let i = 0; i < TOTAL; i++) {
      const clustered = i < TOTAL * 0.6;
      const cx = w * 0.62, cy = h * 0.42;
      const spread = Math.min(w, h) * 0.35;
      const angle = Math.random() * Math.PI * 2;
      const dist = clustered
        ? Math.random() * spread * (0.3 + Math.random() * 0.7)
        : Math.random() * Math.max(w, h) * 0.7;
      const r = i < 6 ? 3 + Math.random() * 3 : clustered ? 1 + Math.random() * 2 : 0.5 + Math.random() * 1;
      nodes.push({
        x: clustered ? cx + Math.cos(angle) * dist : Math.random() * w,
        y: clustered ? cy + Math.sin(angle) * dist : Math.random() * h,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        r, phase: Math.random() * Math.PI * 2,
      });
    }

    const CONNECT = 110; // reduced from 130
    const CONNECT_SQ = CONNECT * CONNECT; // avoid sqrt
    const MOUSE_R = 220;
    const MOUSE_R_SQ = MOUSE_R * MOUSE_R;

    // --- Spatial grid for O(n) neighbor lookups ---
    const CELL = CONNECT;
    let cols = 0, rows = 0;
    let grid: number[][] = [];
    const rebuildGrid = () => {
      cols = Math.ceil(w / CELL) + 1;
      rows = Math.ceil(h / CELL) + 1;
      grid = new Array(cols * rows);
      for (let i = 0; i < grid.length; i++) grid[i] = [];
      for (let i = 0; i < nodes.length; i++) {
        const c = Math.floor(nodes[i].x / CELL);
        const r = Math.floor(nodes[i].y / CELL);
        if (c >= 0 && c < cols && r >= 0 && r < rows) {
          grid[r * cols + c].push(i);
        }
      }
    };

    // --- Pause when off-screen ---
    const obs = new IntersectionObserver(([e]) => { visibleRef.current = e.isIntersecting; }, { threshold: 0 });
    obs.observe(canvas);

    const animate = () => {
      animRef.current = requestAnimationFrame(animate);
      if (!visibleRef.current) return; // skip when not visible

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // Blit cached grid
      ctx.drawImage(gridCanvas, 0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const t = Date.now() * 0.001;
      const mouseOn = mx > -500;

      // --- Update particles ---
      for (const p of nodes) {
        p.phase += 0.012;
        p.vx += Math.sin(t * 0.5 + p.y * 0.003) * 0.0015;
        p.vy += Math.cos(t * 0.5 + p.x * 0.003) * 0.0015;
        if (mouseOn) {
          const dx = mx - p.x, dy = my - p.y;
          const dSq = dx * dx + dy * dy;
          if (dSq < MOUSE_R_SQ && dSq > 1) {
            const d = Math.sqrt(dSq);
            const f = ((MOUSE_R - d) / MOUSE_R) * 0.006;
            p.vx += (dx / d) * f;
            p.vy += (dy / d) * f;
          }
        }
        p.vx *= 0.993; p.vy *= 0.993;
        p.x += p.vx; p.y += p.vy;
        if (p.x < -50) p.vx += 0.02;
        if (p.x > w + 50) p.vx -= 0.02;
        if (p.y < -50) p.vy += 0.02;
        if (p.y > h + 50) p.vy -= 0.02;
      }

      // --- Rebuild spatial grid ---
      rebuildGrid();

      // --- Draw connections (batched by alpha band) ---
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.strokeStyle = "rgba(74, 222, 128, 0.12)";
      ctx.lineWidth = 0.6;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cell = grid[r * cols + c];
          if (!cell.length) continue;
          // Check this cell + 4 neighbors (right, below, below-right, below-left)
          const neighbors = [r * cols + c];
          if (c + 1 < cols) neighbors.push(r * cols + c + 1);
          if (r + 1 < rows) {
            neighbors.push((r + 1) * cols + c);
            if (c + 1 < cols) neighbors.push((r + 1) * cols + c + 1);
            if (c - 1 >= 0) neighbors.push((r + 1) * cols + c - 1);
          }
          for (const ci of cell) {
            const a = nodes[ci];
            for (const ni of neighbors) {
              const ncell = grid[ni];
              for (const cj of ncell) {
                if (cj <= ci) continue;
                const b = nodes[cj];
                const dx = a.x - b.x, dy = a.y - b.y;
                const dSq = dx * dx + dy * dy;
                if (dSq < CONNECT_SQ) {
                  ctx.moveTo(a.x, a.y);
                  ctx.lineTo(b.x, b.y);
                }
              }
            }
          }
        }
      }
      ctx.stroke();

      // --- Mouse-proximity bright connections (small separate pass) ---
      if (mouseOn) {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(74, 222, 128, 0.35)";
        ctx.lineWidth = 1.2;
        const mc = Math.floor(mx / CELL), mr = Math.floor(my / CELL);
        const range = 3;
        for (let dr = -range; dr <= range; dr++) {
          for (let dc = -range; dc <= range; dc++) {
            const nr = mr + dr, nc = mc + dc;
            if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
            const cell = grid[nr * cols + nc];
            for (const ci of cell) {
              const a = nodes[ci];
              const dma = (a.x - mx) ** 2 + (a.y - my) ** 2;
              if (dma > MOUSE_R_SQ) continue;
              // Check neighbors of this particle
              const pc = Math.floor(a.x / CELL), pr = Math.floor(a.y / CELL);
              for (let dr2 = -1; dr2 <= 1; dr2++) {
                for (let dc2 = -1; dc2 <= 1; dc2++) {
                  const nr2 = pr + dr2, nc2 = pc + dc2;
                  if (nr2 < 0 || nr2 >= rows || nc2 < 0 || nc2 >= cols) continue;
                  for (const cj of grid[nr2 * cols + nc2]) {
                    if (cj <= ci) continue;
                    const b = nodes[cj];
                    const dSq = (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
                    if (dSq < CONNECT_SQ) {
                      ctx.moveTo(a.x, a.y);
                      ctx.lineTo(b.x, b.y);
                    }
                  }
                }
              }
            }
          }
        }
        ctx.stroke();
      }

      // --- Draw nodes using pre-rendered glow sprite ---
      for (const p of nodes) {
        const pulse = 0.5 + Math.sin(p.phase) * 0.3;
        const alpha = pulse * 0.5;
        const glowSize = p.r * 6;

        ctx.globalAlpha = alpha;
        ctx.drawImage(glowSprite, p.x - glowSize / 2, p.y - glowSize / 2, glowSize, glowSize);
        ctx.globalAlpha = 0.5 + alpha * 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "#4ADE80";
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // --- Mouse halo (single pre-computed gradient, reused) ---
      if (mouseOn) {
        ctx.globalAlpha = 0.07;
        ctx.drawImage(glowSprite, mx - MOUSE_R * 0.6, my - MOUSE_R * 0.6, MOUSE_R * 1.2, MOUSE_R * 1.2);
        ctx.globalAlpha = 1;
      }
    };
    animate();

    const onMouse = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const onTouch = (e: TouchEvent) => { if (e.touches[0]) mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; };
    const onLeave = () => { mouseRef.current = { x: -1000, y: -1000 }; };
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(animRef.current);
      obs.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0" style={{ zIndex: 1 }} />;
}

function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.3,
      });
      gsap.from(".hero-cta", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.9,
      });
      gsap.from(".hero-badge", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 1.1,
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative w-full flex flex-col justify-end overflow-hidden"
      style={{ height: "100dvh", background: T.soil }}
    >
      <MyceliumCanvas />

      {/* Ambient glow — radial gradients only, no CSS blur */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background: `
            radial-gradient(ellipse 60% 50% at 70% 35%, ${T.biolume}0C 0%, transparent 100%),
            radial-gradient(ellipse 40% 40% at 55% 45%, ${T.biolume}08 0%, transparent 100%)
          `,
        }}
      />

      {/* Bottom gradient for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 3,
          background: `linear-gradient(to top, ${T.soil} 0%, ${T.soil}DD 15%, ${T.soil}88 35%, transparent 60%)`,
        }}
      />

      {/* Content — bottom left */}
      <div className="relative px-8 md:px-16 pb-16 md:pb-24 max-w-4xl" style={{ zIndex: 10 }}>
        <p
          className="hero-line text-xs tracking-[0.3em] uppercase mb-6 flex items-center gap-3"
          style={{ color: T.biolume, fontFamily: "var(--font-fira-code), 'Fira Code', monospace" }}
        >
          <span className="inline-block w-8 h-[1px]" style={{ background: T.biolume }} />
          Privacy-first resume builder
        </p>
        <h1 className="hero-line">
          <span
            className="block text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
            style={{ color: T.bone, fontFamily: "var(--font-geist-sans), sans-serif" }}
          >
            Intelligence beneath
          </span>
          <span
            className="block mt-1 text-6xl md:text-8xl lg:text-[9rem] leading-[0.9]"
            style={{
              color: T.biolume,
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 300,
            }}
          >
            the surface.
          </span>
        </h1>
        <p
          className="hero-line mt-6 text-sm md:text-base max-w-lg leading-relaxed"
          style={{ color: `${T.bone}99` }}
        >
          Bring your own AI agent via WebMCP. Build resumes that pass ATS
          systems. Your data never leaves your browser.
        </p>
        <div className="hero-cta mt-8 flex items-center gap-5">
          <Link href="/builder">
            <MagneticButton>Start Building</MagneticButton>
          </Link>
          <span
            className="hero-badge text-xs tracking-wider flex items-center gap-2"
            style={{ color: `${T.bone}55`, fontFamily: "var(--font-fira-code), 'Fira Code', monospace" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: T.biolume }} />
            No sign-up required
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 10 }}
      >
        <div className="hero-badge w-[1px] h-10 overflow-hidden">
          <div
            className="w-full h-full animate-scroll-line"
            style={{ background: `linear-gradient(to bottom, transparent, ${T.biolume}88, transparent)` }}
          />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   C. FEATURES — "Interactive Functional Artifacts"
   ═══════════════════════════════════════════════════════════ */

/* Card 1: Diagnostic Shuffler — "100% Private" */
function DiagnosticShuffler() {
  const [order, setOrder] = useState([0, 1, 2]);
  const labels = ["Zero server storage", "localStorage only", "No tracking pixels"];

  useEffect(() => {
    const interval = setInterval(() => {
      setOrder((prev) => {
        const next = [...prev];
        next.unshift(next.pop()!);
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-32 w-full">
      {order.map((idx, pos) => (
        <div
          key={idx}
          className="absolute left-0 right-0 px-4 py-3 border transition-all"
          style={{
            borderRadius: "1rem",
            background: T.bone,
            borderColor: pos === 0 ? T.biolume + "40" : T.soil + "10",
            top: `${pos * 16}px`,
            zIndex: 3 - pos,
            transform: `scale(${1 - pos * 0.04})`,
            opacity: 1 - pos * 0.2,
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            transitionDuration: "600ms",
            boxShadow: pos === 0 ? `0 4px 20px ${T.biolume}15` : "none",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: pos === 0 ? T.biolume : T.soil + "30" }}
            />
            <span
              className="text-sm"
              style={{
                fontFamily: "var(--font-fira-code), 'Fira Code', monospace",
                color: T.root,
                fontSize: "0.75rem",
              }}
            >
              {labels[idx]}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* Card 2: Telemetry Typewriter — "AI-Powered via WebMCP" */
function TelemetryTypewriter() {
  const messages = [
    "→ agent connected via navigator.modelContext",
    "→ registering 18 tools...",
    "→ set_personal_info({ name: 'Jane Doe' })",
    "→ add_experience({ company: 'Acme' })",
    "→ set_template('modern')",
    "→ generate_pdf() — print dialog opened",
  ];
  const [lines, setLines] = useState<string[]>([]);
  const [currentMsg, setCurrentMsg] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    if (currentMsg >= messages.length) {
      const timer = setTimeout(() => {
        setLines([]);
        setCurrentMsg(0);
        setCharIdx(0);
      }, 2000);
      return () => clearTimeout(timer);
    }

    const msg = messages[currentMsg];
    if (charIdx < msg.length) {
      const timer = setTimeout(() => setCharIdx((c) => c + 1), 30);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setLines((prev) => [...prev.slice(-4), msg]);
        setCurrentMsg((m) => m + 1);
        setCharIdx(0);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [currentMsg, charIdx, messages.length]);

  const currentText =
    currentMsg < messages.length
      ? messages[currentMsg].slice(0, charIdx)
      : "";

  return (
    <div
      className="p-3 h-40 overflow-hidden"
      style={{
        borderRadius: "0.75rem",
        background: T.root,
        fontFamily: "var(--font-fira-code), 'Fira Code', monospace",
        fontSize: "0.65rem",
        lineHeight: 1.8,
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ background: T.biolume }}
        />
        <span style={{ color: T.biolume, fontSize: "0.6rem", letterSpacing: "0.1em" }}>
          LIVE FEED
        </span>
      </div>
      {lines.map((line, i) => (
        <div key={i} style={{ color: T.bone + "60" }}>
          {line}
        </div>
      ))}
      {currentText && (
        <div style={{ color: T.biolume }}>
          {currentText}
          <span className="animate-pulse">▌</span>
        </div>
      )}
    </div>
  );
}

/* Card 3: Cursor Protocol Scheduler — "ATS-Ready Templates" */
function CursorScheduler() {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const [activeDay, setActiveDay] = useState(-1);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0, visible: false });
  const [pressing, setPressing] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let step = 0;
    const sequence = () => {
      if (step === 0) {
        setCursorPos({ x: 20, y: 60, visible: true });
        setSaved(false);
        setActiveDay(-1);
      } else if (step === 1) {
        setCursorPos({ x: 75, y: 42, visible: true }); // move to Wednesday
      } else if (step === 2) {
        setPressing(true);
      } else if (step === 3) {
        setPressing(false);
        setActiveDay(3); // Wednesday
      } else if (step === 4) {
        setCursorPos({ x: 145, y: 42, visible: true }); // move to Friday
      } else if (step === 5) {
        setPressing(true);
      } else if (step === 6) {
        setPressing(false);
        setActiveDay(5);
      } else if (step === 7) {
        setCursorPos({ x: 120, y: 70, visible: true }); // move to save
      } else if (step === 8) {
        setPressing(true);
      } else if (step === 9) {
        setPressing(false);
        setSaved(true);
      } else if (step === 10) {
        setCursorPos({ x: 180, y: 80, visible: false });
      }
      step++;
      if (step <= 10) {
        setTimeout(sequence, step <= 1 ? 500 : 400);
      } else {
        setTimeout(() => {
          step = 0;
          sequence();
        }, 2000);
      }
    };
    sequence();
  }, []);

  return (
    <div className="relative p-4" style={{ minHeight: "120px" }}>
      {/* Weekly grid */}
      <div className="flex gap-2 mb-3">
        {days.map((d, i) => (
          <div
            key={i}
            className="w-7 h-7 flex items-center justify-center text-[0.6rem] font-medium transition-all duration-300"
            style={{
              borderRadius: "0.5rem",
              background:
                activeDay === i || (activeDay === 5 && i === 3)
                  ? T.biolume
                  : T.soil + "08",
              color:
                activeDay === i || (activeDay === 5 && i === 3)
                  ? T.root
                  : T.root + "60",
              transform: pressing && ((activeDay === -1 && i === 3) || (activeDay === 3 && i === 5))
                ? "scale(0.9)"
                : "scale(1)",
              fontFamily: "var(--font-fira-code), 'Fira Code', monospace",
            }}
          >
            {d}
          </div>
        ))}
      </div>
      {/* Save button */}
      <div
        className="inline-flex items-center gap-2 px-3 py-1.5 text-[0.6rem] tracking-wider transition-all duration-200"
        style={{
          borderRadius: "0.5rem",
          border: `1px solid ${saved ? T.biolume : T.soil + "15"}`,
          color: saved ? T.biolume : T.root + "50",
          fontFamily: "var(--font-fira-code), 'Fira Code', monospace",
          transform: pressing && saved === false && activeDay === 5 ? "scale(0.95)" : "scale(1)",
        }}
      >
        {saved ? "✓ SAVED" : "SAVE"}
      </div>
      {/* Animated cursor */}
      {cursorPos.visible && (
        <svg
          className="absolute pointer-events-none transition-all duration-500"
          style={{
            left: cursorPos.x,
            top: cursorPos.y,
            transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
          width="16"
          height="20"
          viewBox="0 0 16 20"
        >
          <path
            d="M0 0L12 9L5 10L8 18L5 19L2 11L0 15Z"
            fill={T.biolume}
            stroke={T.root}
            strokeWidth="0.5"
          />
        </svg>
      )}
    </div>
  );
}

function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".feature-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".features-grid",
          start: "top 80%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const cards = [
    {
      title: "100% Private",
      desc: "Your data lives in localStorage. No servers, no databases, no third-party analytics. Export and leave — we keep nothing.",
      tag: null,
      Component: DiagnosticShuffler,
    },
    {
      title: "AI-Powered via WebMCP",
      desc: "Connect your AI agent through the browser's native ModelContext protocol. 18 tools, zero API keys. Requires Chrome Canary 146+ with the experimental flag enabled.",
      tag: "Experimental",
      Component: TelemetryTypewriter,
    },
    {
      title: "ATS-Ready Templates",
      desc: "Three templates with real selectable text in PDF exports. Schedule your perfect layout.",
      tag: null,
      Component: CursorScheduler,
    },
  ];

  return (
    <section
      id="features"
      ref={sectionRef}
      className="py-24 md:py-32 px-6 md:px-16"
      style={{ background: T.bone }}
    >
      <p
        className="text-xs tracking-[0.3em] uppercase mb-4"
        style={{ color: T.soil + "60", fontFamily: "var(--font-fira-code), 'Fira Code', monospace" }}
      >
        Core capabilities
      </p>
      <h2
        className="text-3xl md:text-4xl font-bold tracking-tight mb-16"
        style={{ color: T.root, fontFamily: "var(--font-geist-sans), sans-serif" }}
      >
        Three pillars. Zero compromise.
      </h2>
      <div className="features-grid grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map(({ title, desc, tag, Component }) => (
          <div
            key={title}
            className="feature-card p-6 border flex flex-col"
            style={{
              borderRadius: "2rem",
              background: T.bone,
              borderColor: T.soil + "0A",
              boxShadow: `0 2px 40px ${T.soil}08`,
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <h3
                className="text-lg font-semibold tracking-tight"
                style={{ color: T.root, fontFamily: "var(--font-geist-sans), sans-serif" }}
              >
                {title}
              </h3>
              {tag && (
                <span
                  className="text-[0.6rem] tracking-wider uppercase px-2 py-0.5 rounded-full"
                  style={{
                    background: `${T.biolume}18`,
                    color: T.biolume,
                    border: `1px solid ${T.biolume}30`,
                    fontFamily: "var(--font-fira-code), 'Fira Code', monospace",
                  }}
                >
                  {tag}
                </span>
              )}
            </div>
            <p
              className="text-xs leading-relaxed mb-6"
              style={{ color: T.root + "88" }}
            >
              {desc}
            </p>
            <div className="mt-auto">
              <Component />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   D. PHILOSOPHY — "The Manifesto"
   ═══════════════════════════════════════════════════════════ */
function PhilosophySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".philo-line", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".philo-content",
          start: "top 70%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative py-32 md:py-40 px-8 md:px-16 overflow-hidden"
      style={{ background: T.soil }}
    >
      {/* Organic texture — CSS-only, no external images */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 800px 600px at 20% 50%, ${T.biolume}22, transparent),
            radial-gradient(ellipse 600px 400px at 80% 30%, ${T.biolume}11, transparent),
            radial-gradient(ellipse 400px 300px at 60% 80%, ${T.biolume}18, transparent)
          `,
        }}
      />

      <div className="philo-content relative z-10 max-w-4xl">
        <p
          className="philo-line text-sm md:text-base leading-relaxed mb-8"
          style={{ color: T.bone + "66" }}
        >
          Most resume builders focus on:{" "}
          <span style={{ color: T.bone + "99" }}>
            collecting your data, locking you into subscriptions, owning your
            content.
          </span>
        </p>
        <p className="philo-line">
          <span
            className="block text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]"
            style={{ color: T.bone, fontFamily: "var(--font-geist-sans), sans-serif" }}
          >
            We focus on:
          </span>
          <span
            className="block text-5xl md:text-7xl lg:text-[6.5rem] leading-[0.95] mt-2"
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 300,
              color: T.biolume,
            }}
          >
            keeping it yours.
          </span>
        </p>
        <p
          className="philo-line mt-10 text-xs tracking-[0.2em] uppercase"
          style={{ color: T.bone + "44", fontFamily: "var(--font-fira-code), 'Fira Code', monospace" }}
        >
          Zero data collection &bull; Zero server storage &bull; Zero compromises
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   E. PROTOCOL — "Illuminated Steps"
   ═══════════════════════════════════════════════════════════ */

/* Animated SVG icons for each step */
function ProtocolIcon1() {
  return (
    <svg viewBox="0 0 80 80" className="w-full h-full">
      {/* Pulsing connection rings */}
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx="40"
          cy="40"
          r={16 + i * 10}
          fill="none"
          stroke={T.biolume}
          strokeWidth="1"
          opacity={0.6 - i * 0.15}
          strokeDasharray="4 6"
          className="protocol-svg-spin"
          style={{ animationDuration: `${8 + i * 4}s`, animationDirection: i % 2 ? "reverse" : "normal" }}
        />
      ))}
      {/* Center node */}
      <circle cx="40" cy="40" r="6" fill={T.biolume} opacity="0.9" />
      <circle cx="40" cy="40" r="10" fill="none" stroke={T.biolume} strokeWidth="1.5" opacity="0.5" />
      {/* Satellite dots — precomputed to avoid hydration mismatch */}
      {[
        { cx: "68", cy: "40" },
        { cx: "48.65", cy: "66.63" },
        { cx: "17.35", cy: "53.54" },
        { cx: "17.35", cy: "26.46" },
        { cx: "48.65", cy: "13.37" },
      ].map((pos, i) => (
        <circle
          key={i}
          cx={pos.cx}
          cy={pos.cy}
          r="2.5"
          fill={T.biolume}
          opacity="0.7"
        />
      ))}
    </svg>
  );
}

function ProtocolIcon2() {
  return (
    <svg viewBox="0 0 80 80" className="w-full h-full">
      {/* Data flow lines */}
      {[14, 28, 42, 56, 66].map((y, i) => (
        <g key={i}>
          <line
            x1="8"
            y1={y}
            x2="72"
            y2={y}
            stroke={T.biolume}
            strokeWidth="0.5"
            opacity="0.15"
          />
          <rect
            x={10 + i * 4}
            y={y - 2}
            width={20 + (i % 3) * 12}
            height="4"
            rx="2"
            fill={T.biolume}
            opacity={0.15 + (i * 0.12)}
          >
            <animate attributeName="width" values={`${20 + (i % 3) * 12};${30 + (i % 2) * 15};${20 + (i % 3) * 12}`} dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
          </rect>
        </g>
      ))}
      {/* Cursor / writing indicator */}
      <rect x="58" y="36" width="2" height="10" rx="1" fill={T.biolume} opacity="0.8">
        <animate attributeName="opacity" values="0.8;0.2;0.8" dur="1s" repeatCount="indefinite" />
      </rect>
    </svg>
  );
}

function ProtocolIcon3() {
  return (
    <svg viewBox="0 0 80 80" className="w-full h-full">
      {/* Document shape */}
      <rect x="18" y="10" width="44" height="56" rx="4" fill="none" stroke={T.biolume} strokeWidth="1.2" opacity="0.4" />
      <rect x="18" y="10" width="44" height="56" rx="4" fill={T.biolume} opacity="0.05" />
      {/* Text lines inside doc */}
      {[22, 28, 34, 40, 46].map((y, i) => (
        <rect key={i} x="26" y={y} width={i === 4 ? 18 : 28 - i * 2} height="2" rx="1" fill={T.biolume} opacity={0.25 + i * 0.05} />
      ))}
      {/* Download arrow */}
      <path
        d="M40 52 L40 68 M34 63 L40 69 L46 63"
        fill="none"
        stroke={T.biolume}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      >
        <animate attributeName="opacity" values="0.9;0.4;0.9" dur="2s" repeatCount="indefinite" />
      </path>
      {/* Checkmark */}
      <circle cx="54" cy="18" r="6" fill={T.biolume} opacity="0.2" />
      <path d="M51 18 L53 20 L57 16" fill="none" stroke={T.biolume} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
    </svg>
  );
}

function ProtocolSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".protocol-step", {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".protocol-grid",
          start: "top 75%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const steps = [
    {
      num: "01",
      title: "Connect your agent",
      desc: "Open ResuMCP in a WebMCP-compatible browser. Your AI agent auto-discovers 18 tools for reading and writing resume data.",
      Icon: ProtocolIcon1,
    },
    {
      num: "02",
      title: "Shape your narrative",
      desc: "Your agent populates experience, education, skills, and projects — or fill the forms manually. Live preview updates instantly.",
      Icon: ProtocolIcon2,
    },
    {
      num: "03",
      title: "Export with precision",
      desc: "Download ATS-friendly PDFs with real selectable text. Choose from three templates or inject your own CSS.",
      Icon: ProtocolIcon3,
    },
  ];

  return (
    <section
      id="protocol"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 md:px-16 overflow-hidden"
      style={{ background: T.soil }}
    >
      {/* Background grid + glow */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(${T.biolume}40 1px, transparent 1px),
            linear-gradient(90deg, ${T.biolume}40 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 70% 50% at 50% 50%, ${T.biolume}0A 0%, transparent 100%)` }}
      />

      {/* Header */}
      <div className="relative z-10 mb-16 md:mb-20">
        <p
          className="text-xs tracking-[0.3em] uppercase mb-4 flex items-center gap-3"
          style={{ color: T.biolume, fontFamily: "var(--font-fira-code), 'Fira Code', monospace" }}
        >
          <span className="inline-block w-8 h-[1px]" style={{ background: T.biolume }} />
          Protocol
        </p>
        <h2
          className="text-3xl md:text-5xl font-bold tracking-tight"
          style={{ color: T.bone, fontFamily: "var(--font-geist-sans), sans-serif" }}
        >
          Three steps.{" "}
          <span
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 300,
              color: T.biolume,
            }}
          >
            Nothing else.
          </span>
        </h2>
      </div>

      {/* Steps */}
      <div className="protocol-grid relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
        {steps.map(({ num, title, desc, Icon }, i) => (
          <div
            key={num}
            className="protocol-step group relative flex flex-col"
            style={{
              borderRadius: "1.5rem",
              border: `1px solid ${T.biolume}18`,
              background: `linear-gradient(160deg, ${T.soilLight}CC 0%, ${T.soil}DD 100%)`,
              backdropFilter: "blur(12px)",
              overflow: "hidden",
            }}
          >
            {/* Top glow bar */}
            <div
              className="h-[2px] w-full"
              style={{
                background: `linear-gradient(90deg, transparent 0%, ${T.biolume}60 50%, transparent 100%)`,
              }}
            />

            {/* Icon area */}
            <div className="relative px-6 pt-8 pb-4">
              <div
                className="w-20 h-20 mb-6 relative"
                style={{
                  filter: `drop-shadow(0 0 20px ${T.biolume}30)`,
                }}
              >
                <Icon />
              </div>

              {/* Step number */}
              <span
                className="absolute top-6 right-6 text-5xl font-bold select-none"
                style={{
                  color: T.biolume + "12",
                  fontFamily: "var(--font-fira-code), 'Fira Code', monospace",
                }}
              >
                {num}
              </span>
            </div>

            {/* Content */}
            <div className="px-6 pb-8 flex-1 flex flex-col">
              <h3
                className="text-xl md:text-2xl font-bold tracking-tight mb-3"
                style={{ color: T.bone, fontFamily: "var(--font-geist-sans), sans-serif" }}
              >
                {title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: T.bone + "77" }}
              >
                {desc}
              </p>

              {/* Bottom connector line (except last) */}
              {i < 2 && (
                <div className="hidden md:block absolute -right-4 top-1/2 w-8 h-[1px]" style={{ background: `linear-gradient(90deg, ${T.biolume}40, ${T.biolume}08)` }} />
              )}
            </div>

            {/* Hover glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at 50% 0%, ${T.biolume}08 0%, transparent 70%)`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Bottom timeline dots */}
      <div className="relative z-10 flex items-center justify-center mt-16 gap-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <div
              className="w-2 h-2 rounded-full"
              style={{
                background: T.biolume,
                boxShadow: `0 0 8px ${T.biolume}60`,
              }}
            />
            {i < 2 && (
              <div className="w-12 h-[1px]" style={{ background: `linear-gradient(90deg, ${T.biolume}50, ${T.biolume}10)` }} />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   F. CTA SECTION — "Get Started"
   ═══════════════════════════════════════════════════════════ */
function CtaSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-content > *", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".cta-content", start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="pt-32 md:pt-40 pb-48 md:pb-56 px-8 md:px-16 text-center"
      style={{ background: `linear-gradient(to bottom, ${T.bone} 60%, ${T.soil} 100%)` }}
    >
      <div className="cta-content max-w-2xl mx-auto">
        <p
          className="text-xs tracking-[0.3em] uppercase mb-6"
          style={{ color: T.soil + "50", fontFamily: "var(--font-fira-code), 'Fira Code', monospace" }}
        >
          Ready?
        </p>
        <h2
          className="text-4xl md:text-6xl font-bold tracking-tight mb-4"
          style={{ color: T.root, fontFamily: "var(--font-geist-sans), sans-serif" }}
        >
          Build something
          <br />
          <span
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 300,
              color: T.biolume,
            }}
          >
            worth keeping.
          </span>
        </h2>
        <p
          className="text-sm leading-relaxed mb-10 max-w-md mx-auto"
          style={{ color: T.root + "77" }}
        >
          No sign-up. No credit card. No data collected. Your resume, your
          browser, your rules.
        </p>
        <Link href="/builder">
          <MagneticButton>Start Building</MagneticButton>
        </Link>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   G. FOOTER
   ═══════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer
      className="px-8 md:px-16 py-16 -mt-16 relative z-10"
      style={{
        background: T.soil,
        borderRadius: "4rem 4rem 0 0",
      }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <span
            className="text-lg font-bold tracking-tight"
            style={{ color: T.bone, fontFamily: "var(--font-geist-sans), sans-serif" }}
          >
            Resu<span style={{ color: T.biolume }}>MCP</span>
          </span>
          <p
            className="mt-3 text-sm leading-relaxed max-w-xs"
            style={{ color: T.bone + "55" }}
          >
            Privacy-first resume builder. Bring your own AI agent, keep your
            data.
          </p>
        </div>
        <div>
          <p
            className="text-xs tracking-[0.2em] uppercase mb-4"
            style={{ color: T.bone + "44", fontFamily: "var(--font-fira-code), 'Fira Code', monospace" }}
          >
            Navigate
          </p>
          <div className="space-y-2">
            {[
              { label: "Builder", href: "/builder" },
              { label: "Features", href: "#features" },
              { label: "Protocol", href: "#protocol" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-sm transition-all duration-200 hover:-translate-y-[1px]"
                style={{ color: T.bone + "77" }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <p
            className="text-xs tracking-[0.2em] uppercase mb-4"
            style={{ color: T.bone + "44", fontFamily: "var(--font-fira-code), 'Fira Code', monospace" }}
          >
            Legal
          </p>
          <div className="space-y-2">
            <p className="text-sm" style={{ color: T.bone + "55" }}>
              No data collected.
            </p>
            <p className="text-sm" style={{ color: T.bone + "55" }}>
              MIT License
            </p>
          </div>
        </div>
      </div>
      <div
        className="mt-16 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ borderTop: `1px solid ${T.bone}10` }}
      >
        <div className="flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: T.biolume }}
          />
          <span
            className="text-[0.65rem] tracking-[0.15em]"
            style={{ color: T.bone + "44", fontFamily: "var(--font-fira-code), 'Fira Code', monospace" }}
          >
            SYSTEM OPERATIONAL
          </span>
        </div>
        <p
          className="text-[0.65rem] tracking-wider"
          style={{ color: T.bone + "33", fontFamily: "var(--font-fira-code), 'Fira Code', monospace" }}
        >
          &copy; 2026 ResuMCP. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════
   NOISE OVERLAY
   ═══════════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════
   MAIN LANDING PAGE EXPORT
   ═══════════════════════════════════════════════════════════ */
export default function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <PhilosophySection />
      <ProtocolSection />
      <CtaSection />
      <Footer />
    </>
  );
}
