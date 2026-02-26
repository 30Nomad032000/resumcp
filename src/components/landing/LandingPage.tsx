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
   B. HERO SECTION — "The Opening Shot"
   ═══════════════════════════════════════════════════════════ */
function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.3,
      });
      gsap.from(".hero-cta", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.8,
      });
      gsap.from(".hero-badge", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 1.0,
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative w-full flex flex-col justify-end overflow-hidden"
      style={{ height: "100dvh" }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1518882570713-3d0d4d18e36c?w=1920&q=80&auto=format)`,
        }}
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, ${T.soil} 0%, ${T.soil}CC 30%, ${T.soil}88 60%, transparent 100%)`,
        }}
      />

      {/* Content — bottom left */}
      <div className="relative z-10 px-8 md:px-16 pb-16 md:pb-24 max-w-4xl">
        <p
          className="hero-line text-sm tracking-[0.25em] uppercase mb-6"
          style={{ color: T.biolume, fontFamily: "var(--font-fira-code), 'Fira Code', monospace" }}
        >
          Privacy-first resume builder
        </p>
        <h1 className="hero-line">
          <span
            className="block text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
            style={{ color: T.bone, fontFamily: "var(--font-geist-sans), sans-serif" }}
          >
            Intelligence beneath
          </span>
          <span
            className="block mt-2 text-6xl md:text-8xl lg:text-[9rem] leading-[0.9]"
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
          className="hero-line mt-6 text-sm md:text-base max-w-lg leading-relaxed opacity-70"
          style={{ color: T.bone }}
        >
          Bring your own AI agent via WebMCP. Build resumes that pass ATS
          systems. Your data never leaves your browser.
        </p>
        <div className="hero-cta mt-8 flex items-center gap-4">
          <Link href="/builder">
            <MagneticButton>Start Building</MagneticButton>
          </Link>
          <span
            className="hero-badge text-xs tracking-wider opacity-50"
            style={{ color: T.bone, fontFamily: "var(--font-fira-code), 'Fira Code', monospace" }}
          >
            No sign-up required
          </span>
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
      Component: DiagnosticShuffler,
    },
    {
      title: "AI-Powered via WebMCP",
      desc: "Connect your AI agent through the browser's native ModelContext protocol. 18 tools, zero API keys.",
      Component: TelemetryTypewriter,
    },
    {
      title: "ATS-Ready Templates",
      desc: "Three templates with real selectable text in PDF exports. Schedule your perfect layout.",
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
        {cards.map(({ title, desc, Component }) => (
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
            <h3
              className="text-lg font-semibold tracking-tight mb-2"
              style={{ color: T.root, fontFamily: "var(--font-geist-sans), sans-serif" }}
            >
              {title}
            </h3>
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
      {/* Parallax texture */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.06]"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?w=1920&q=80&auto=format)`,
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
   E. PROTOCOL — "Sticky Stacking Archive"
   ═══════════════════════════════════════════════════════════ */

/* SVG Animations for each protocol card */
function RotatingMotif() {
  return (
    <svg viewBox="0 0 120 120" className="w-20 h-20 opacity-30 protocol-svg-spin">
      {[0, 30, 60, 90, 120, 150].map((angle) => (
        <ellipse
          key={angle}
          cx="60"
          cy="60"
          rx="50"
          ry="20"
          fill="none"
          stroke={T.biolume}
          strokeWidth="0.5"
          transform={`rotate(${angle} 60 60)`}
        />
      ))}
    </svg>
  );
}

function ScannerGrid() {
  return (
    <svg viewBox="0 0 120 80" className="w-24 h-16 opacity-30">
      {Array.from({ length: 8 }).map((_, r) =>
        Array.from({ length: 12 }).map((_, c) => (
          <circle
            key={`${r}-${c}`}
            cx={c * 10 + 5}
            cy={r * 10 + 5}
            r="1.5"
            fill={T.biolume + "40"}
          />
        ))
      )}
      <line
        x1="0"
        y1="0"
        x2="120"
        y2="0"
        stroke={T.biolume}
        strokeWidth="1"
        className="protocol-scanner"
      />
    </svg>
  );
}

function Waveform() {
  return (
    <svg viewBox="0 0 200 60" className="w-32 h-10 opacity-30">
      <path
        d="M0 30 Q10 30 20 30 T40 30 Q50 10 60 30 T80 30 Q90 50 100 30 T120 30 Q130 10 140 30 T160 30 Q170 50 180 30 T200 30"
        fill="none"
        stroke={T.biolume}
        strokeWidth="1.5"
        className="protocol-waveform"
      />
    </svg>
  );
}

function ProtocolSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".protocol-card");
      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: "top top",
            end: "bottom top",
            pin: true,
            pinSpacing: false,
            onUpdate: (self) => {
              const progress = self.progress;
              gsap.set(card, {
                scale: 1 - progress * 0.1,
                filter: `blur(${progress * 20}px)`,
                opacity: 1 - progress * 0.5,
              });
            },
          });
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const steps = [
    {
      num: "01",
      title: "Connect your agent",
      desc: "Open ResuMCP in a WebMCP-compatible browser. Your AI agent auto-discovers 18 tools for reading and writing resume data.",
      Visual: RotatingMotif,
    },
    {
      num: "02",
      title: "Shape your narrative",
      desc: "Your agent populates experience, education, skills, and projects — or fill the forms manually. Live preview updates instantly.",
      Visual: ScannerGrid,
    },
    {
      num: "03",
      title: "Export with precision",
      desc: "Download ATS-friendly PDFs with real selectable text. Choose from three templates or inject your own CSS.",
      Visual: Waveform,
    },
  ];

  return (
    <section id="protocol" ref={sectionRef} style={{ background: T.bone }}>
      <div className="px-8 md:px-16 pt-24 pb-8">
        <p
          className="text-xs tracking-[0.3em] uppercase mb-4"
          style={{ color: T.soil + "60", fontFamily: "var(--font-fira-code), 'Fira Code', monospace" }}
        >
          Protocol
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
          style={{ color: T.root, fontFamily: "var(--font-geist-sans), sans-serif" }}
        >
          Three steps. Nothing else.
        </h2>
      </div>
      {steps.map(({ num, title, desc, Visual }) => (
        <div
          key={num}
          className="protocol-card min-h-screen flex items-center px-8 md:px-16"
          style={{ background: T.bone }}
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-6 mb-6">
              <span
                className="text-6xl md:text-8xl font-bold"
                style={{
                  color: T.biolume + "20",
                  fontFamily: "var(--font-fira-code), 'Fira Code', monospace",
                }}
              >
                {num}
              </span>
              <Visual />
            </div>
            <h3
              className="text-2xl md:text-4xl font-bold tracking-tight mb-4"
              style={{ color: T.root, fontFamily: "var(--font-geist-sans), sans-serif" }}
            >
              {title}
            </h3>
            <p
              className="text-sm md:text-base leading-relaxed max-w-md"
              style={{ color: T.root + "88" }}
            >
              {desc}
            </p>
          </div>
        </div>
      ))}
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
      className="py-32 md:py-40 px-8 md:px-16 text-center"
      style={{ background: T.bone }}
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
      className="px-8 md:px-16 py-16"
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
function NoiseOverlay() {
  return (
    <svg className="fixed inset-0 w-full h-full pointer-events-none z-[9999] opacity-[0.04]">
      <filter id="noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.65"
          numOctaves="3"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN LANDING PAGE EXPORT
   ═══════════════════════════════════════════════════════════ */
export default function LandingPage() {
  return (
    <>
      <NoiseOverlay />
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
