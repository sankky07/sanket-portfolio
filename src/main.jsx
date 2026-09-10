import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowDown, ArrowUpRight, Check, Copy, Github, Linkedin, Mail, Moon, Sun, Terminal, X, Play, ExternalLink } from "lucide-react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

const person = {
  name: "Sanket Kumar Sahu",
  email: "sanketsahu104@gmail.com",
  location: "Bangalore, Karnataka",
  github: "https://github.com/sankky07",
  linkedin: "https://www.linkedin.com/in/sanket-kumar-sahu",
};

const nav = ["about", "work", "experience", "skills", "contact"];

const projects = [
  {
    id: "01",
    title: "AI Code Review Assistant",
    eyebrow: "FULL-STACK · AI / LLM",
    description:
      "A full-stack AI-powered code review platform that connects GitHub repositories to automated review reports. The system identifies bugs, code smells, security issues and optimization opportunities.",
    stack: ["Java", "Spring Boot", "React.js", "PostgreSQL", "Gemini API", "GitHub API", "JWT", "OAuth"],
    architecture: ["GitHub API", "Spring Boot", "Review Engine", "Gemini API", "PostgreSQL"],
    github: "https://github.com/sankky07/CodeLens-Ai-Code-Review-Assistant",
    live: "https://code-lens-ai-code-review-assistant-three.vercel.app/",
  },
  {
    id: "02",
    title: "Purelane",
    eyebrow: "SHOPIFY · FREELANCE",
    description:
      "A live client-commissioned Shopify storefront built with reusable Liquid sections, custom product experiences and responsive desktop/mobile UI.",
    stack: ["Shopify Liquid", "JavaScript", "CSS", "JSON", "Git"],
    architecture: ["Shopify", "Liquid", "Reusable Sections", "Custom UX"],
    github: "https://github.com/sankky07/Purelane-Shopify",
    live: "https://dawn-zxlbw7ul.myshopify.com/",
  },
  {
    id: "03",
    title: "Online Code Compiler",
    eyebrow: "FULL-STACK · DEVELOPER TOOL",
    description:
      "A browser-based coding environment with a responsive execution interface and secure backend execution API.",
    stack: ["Java", "Spring Boot", "React.js", "REST APIs", "Judge0"],
    architecture: ["React Editor", "Spring Boot API", "Judge0", "Execution Result"],
    github: "https://github.com/sankky07/Online-Code-Compiler",
    live: "https://online-code-compiler-kappa.vercel.app/",
  },
];

const compilerLanguages = ["JavaScript", "Python", "Java", "C++", "C"];
const compilerDefaults = {
  JavaScript: `console.log("Hello from Sanket's portfolio");`,
  Python: `print("Hello from Sanket's portfolio")`,
  Java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello from Sanket's portfolio");\n    }\n}`,
  "C++": `#include <iostream>\nusing namespace std;\nint main() {\n    cout << "Hello from Sanket's portfolio";\n    return 0;\n}`,
  C: `#include <stdio.h>\nint main() {\n    printf("Hello from Sanket's portfolio");\n    return 0;\n}`,
};
const compilerApi = "https://online-code-compiler-ljop.onrender.com/execute";
const compilerLive = "https://online-code-compiler-kappa.vercel.app/";
const compilerRepo = "https://github.com/sankky07/Online-Code-Compiler";
const accentPalette = [
  ["Copper", "#B8794F"],
  ["Electric Blue", "#5B8CFF"],
  ["Violet", "#9B7BFF"],
  ["Emerald", "#39B98A"],
  ["Coral", "#FF7665"],
  ["Amber", "#E7A33E"],
  ["Rose", "#E66A9A"],
  ["Cyan", "#42C7D9"],
];
const defaultAccent = "#B8794F";
const resume = `${import.meta.env.BASE_URL}assets/Sanket-Kumar-Sahu-Resume.pdf`;
const profilePhoto = `${import.meta.env.BASE_URL}assets/sanket-profile.jpg`;

const skillGroups = {
  "LANGUAGES": ["Java", "JavaScript", "Python", "SQL"],
  "FRONTEND": ["React.js", "HTML5", "CSS3", "Tailwind CSS", "JSON", "Responsive UI"],
  "BACKEND": ["Spring Boot", "REST APIs", "Hibernate/JPA", "Node.js", "Maven"],
  "SECURITY": ["Spring Security", "JWT", "OAuth"],
  "DATABASES": ["PostgreSQL", "MySQL"],
  "AI / LLM": ["Gemini API", "LLM Integration", "Prompt Engineering", "RAG Concepts", "AI-Assisted Test Generation"],
  "TOOLS": ["Git", "GitHub", "Docker", "Kubernetes", "Linux", "Postman", "Jira", "MobaXterm", "Agile / Scrum"],
};

function App() {
  const [dark, setDark] = useState(true);
  const [active, setActive] = useState("home");
  const [challenge, setChallenge] = useState(null);
  const [stack, setStack] = useState([]);
  const [terminal, setTerminal] = useState(false);
  const [command, setCommand] = useState("");
  const [egg, setEgg] = useState(false);
  const [eggMessage, setEggMessage] = useState({ title: "You found the quiet part.", detail: "Curiosity is a good engineering trait." });
  const [copied, setCopied] = useState(false);
  const [openProject, setOpenProject] = useState(null);
  const [compilerOpen, setCompilerOpen] = useState(false);
  const [compilerLanguage, setCompilerLanguage] = useState("JavaScript");
  const [compilerCode, setCompilerCode] = useState(compilerDefaults.JavaScript);
  const [compilerInput, setCompilerInput] = useState("");
  const [compilerOutput, setCompilerOutput] = useState("");
  const [compilerBusy, setCompilerBusy] = useState(false);
  const [compilerError, setCompilerError] = useState("");
  const [resumeOpen, setResumeOpen] = useState(false);
  const [thinkMode, setThinkMode] = useState(0);
  const [activeSkill, setActiveSkill] = useState("BACKEND");
  const [discovered, setDiscovered] = useState({});
  const [viewMode, setViewMode] = useState(null);
  const [splash, setSplash] = useState(true);
  const [hintTick, setHintTick] = useState(0);
  const [curiosityPulse, setCuriosityPulse] = useState("");
  const [thought, setThought] = useState(null);
  const [runtimeLayer, setRuntimeLayer] = useState(false);
  const [runtimePanel, setRuntimePanel] = useState(false);
  const [systemNote, setSystemNote] = useState(null);
  const [explored, setExplored] = useState(new Set());
  const [runtimeEvents, setRuntimeEvents] = useState([]);
  const [runtimeStatus, setRuntimeStatus] = useState("IDLE");
  const [sessionStarted] = useState(() => Date.now());
  const [runtimeNow, setRuntimeNow] = useState(() => Date.now());
  const [curiousColorPrompt, setCuriousColorPrompt] = useState(false);
  const [accent, setAccent] = useState(defaultAccent);
  const viewModeRef = useRef(viewMode);
  const lenisRef = useRef(null);
  const thoughtTimerRef = useRef(null);
  const systemNoteTimerRef = useRef(null);
  const eggTimerRef = useRef(null);
  useEffect(() => { viewModeRef.current = viewMode; }, [viewMode]);
  useEffect(() => {
    return () => {
      window.clearTimeout(thoughtTimerRef.current);
      window.clearTimeout(eggTimerRef.current);
      window.clearTimeout(systemNoteTimerRef.current);
    };
  }, []);


  const discover = (key) => {
    setDiscovered((prev) => ({ ...prev, [key]: (prev[key] || 0) + 1 }));
  };

  const showThought = (message, duration = 4600) => {
    if (viewModeRef.current !== "curious") return;
    setThought(message);
    window.clearTimeout(thoughtTimerRef.current);
    thoughtTimerRef.current = window.setTimeout(() => setThought(null), duration);
  };

  const showSystemNote = (message, duration = 3200) => {
    if (viewModeRef.current !== "curious") return;
    window.clearTimeout(systemNoteTimerRef.current);
    setSystemNote({ message, duration, id: Date.now() + Math.random() });
    systemNoteTimerRef.current = window.setTimeout(() => {
      setSystemNote(null);
    }, duration);
  };

  const hideEgg = () => {
    window.clearTimeout(eggTimerRef.current);
    setEgg(false);
  };

  const showEgg = (duration = 4600) => {
    window.clearTimeout(eggTimerRef.current);
    setEgg(true);
    eggTimerRef.current = window.setTimeout(() => setEgg(false), duration);
  };

  useEffect(() => {
    if (!systemNote) return;
    const timer = window.setTimeout(() => setSystemNote(null), systemNote.duration);
    return () => window.clearTimeout(timer);
  }, [systemNote]);

  const openRuntime = () => {
    markExplore("runtime", "opened PORTFOLIO.RUNTIME");
    setRuntimePanel(true);
  };

  const logRuntime = (type, detail) => {
    if (viewMode !== "curious") return;
    setRuntimeStatus("OBSERVING");
    setRuntimeEvents((prev) => [
      {
        type,
        detail,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        })
      },
      ...prev
    ].slice(0, 12));
    window.clearTimeout(window.__runtimeIdleTimer);
    window.__runtimeIdleTimer = window.setTimeout(() => setRuntimeStatus("LISTENING"), 1400);
  };

  const markExplore = (key, detail = key) => {
    if (viewMode !== "curious") return;
    setSystemNote(null);
    logRuntime("EVENT", detail);
    setExplored((prev) => {
      if (prev.has(key)) return prev;
      const next = new Set(prev);
      next.add(key);
      if (next.size === 3) {
        window.setTimeout(() => showThought("You're not browsing anymore.", 4600), 350);
      }
      if (next.size >= 4) setRuntimeLayer(true);
      return next;
    });
  };

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (!runtimePanel) return;
    const previous = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyTouch: body.style.touchAction,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
      scrollY: window.scrollY,
    };
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.touchAction = "none";
    body.style.position = "fixed";
    body.style.top = `-${previous.scrollY}px`;
    body.style.width = "100%";
    if (lenisRef.current) lenisRef.current.stop();
    const timer = window.setInterval(() => setRuntimeNow(Date.now()), 1000);
    return () => {
      window.clearInterval(timer);
      html.style.overflow = previous.htmlOverflow;
      body.style.overflow = previous.bodyOverflow;
      body.style.touchAction = previous.bodyTouch;
      body.style.position = previous.bodyPosition;
      body.style.top = previous.bodyTop;
      body.style.width = previous.bodyWidth;
      window.scrollTo(0, previous.scrollY);
      if (lenisRef.current) lenisRef.current.start();
    };
  }, [runtimePanel]);

  useEffect(() => {
    if (!runtimePanel) return;
    const blockOutside = (e) => {
      const panel = e.target?.closest?.(".runtime-panel");
      if (!panel) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    const keepPanelScrollLocal = (e) => {
      const panel = e.target?.closest?.(".runtime-panel");
      if (panel) e.stopPropagation();
    };
    window.addEventListener("wheel", blockOutside, { passive: false, capture: true });
    window.addEventListener("touchmove", blockOutside, { passive: false, capture: true });
    window.addEventListener("wheel", keepPanelScrollLocal, { passive: true });
    window.addEventListener("touchmove", keepPanelScrollLocal, { passive: true });
    return () => {
      window.removeEventListener("wheel", blockOutside, { capture: true });
      window.removeEventListener("touchmove", blockOutside, { capture: true });
      window.removeEventListener("wheel", keepPanelScrollLocal);
      window.removeEventListener("touchmove", keepPanelScrollLocal);
    };
  }, [runtimePanel]);

  useEffect(() => {
    if (viewMode !== "curious") return;

    const dismiss = () => {
      setSystemNote(null);
    };

    const onScroll = () => {
      dismiss();
      logRuntime("SCROLL", `depth ${Math.round(window.scrollY)}px`);
    };

    const onPointer = (e) => {
      dismiss();
      const target = e.target;
      const interactive = target?.closest("button, a, input, textarea");
      if (interactive) {
        const label = (interactive.innerText ||
          interactive.getAttribute("aria-label") ||
          interactive.getAttribute("href") ||
          "control").replace(/\s+/g, " ").trim().slice(0, 70);
        logRuntime("CLICK", label || "control");
      }
    };

    const onKey = (e) => {
      if (e.key === "Escape") {
        setThought(null);
        setSystemNote(null);
      }
      if (!["Shift", "Control", "Alt", "Meta"].includes(e.key)) {
        logRuntime("KEY", e.key === " " ? "SPACE" : e.key);
      }
    };

    const onWheel = () => dismiss();
    const onTouchStart = () => dismiss();

    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("wheel", onWheel, { passive: true, capture: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true, capture: true });
    window.addEventListener("pointerdown", onPointer, { capture: true });
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("wheel", onWheel, { capture: true });
      window.removeEventListener("touchstart", onTouchStart, { capture: true });
      window.removeEventListener("pointerdown", onPointer, { capture: true });
      window.removeEventListener("keydown", onKey);
    };
  }, [viewMode]);

  const applyAccent = (color, label) => {
    setAccent(color);
    document.documentElement.style.setProperty("--accent", color);
    document.documentElement.style.setProperty("--accent-soft", `${color}18`);
    setCuriousColorPrompt(false);
    logRuntime("ACCENT", label);
    showThought(`${label} looks good here.`, 4600);
  };

  const enterPortfolio = (mode) => {
    viewModeRef.current = mode;
    setViewMode(mode);
    setSplash(false);
    if (mode === "curious") {
      setCuriousColorPrompt(true);
      window.clearTimeout(thoughtTimerRef.current);
      // Do not reveal Curious View thoughts until the visitor has chosen
      // an accent (or explicitly continued with the default Copper).
      // The color prompt owns the first interaction.

    }
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const runCompiler = async () => {
    markExplore("compiler");
    showThought("Okay. You actually ran something.", 4600);
    setCompilerBusy(true);
    setCompilerOutput("");
    setCompilerError("");
    try {
      const response = await fetch(compilerApi, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: compilerLanguage,
          code: compilerCode,
          input: compilerInput,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || `Compiler returned ${response.status}`);
      setCompilerOutput(data.output || data.compileOutput || data.stdout || "Program finished with no output.");
      if (data.error || data.stderr) setCompilerError(data.error || data.stderr);
    } catch (error) {
      setCompilerError(error.message || "Execution failed. Open the live compiler to try again.");
    } finally {
      setCompilerBusy(false);
    }
  };

  const selectCompilerLanguage = (language) => {
    markExplore(`compiler:${language}`, `compiler language: ${language}`);
    showThought(`${language} selected.`, 4600);
    setCompilerLanguage(language);
    setCompilerCode(compilerDefaults[language]);
    setCompilerOutput("");
    setCompilerError("");
  };

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1,
    });

    lenisRef.current = lenis;

    let frame;
    const raf = (time) => {
      lenis.raf(time);
      ScrollTrigger.update();
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const revealEls = gsap.utils.toArray(".reveal");
    revealEls.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        }
      );
    });

    gsap.utils.toArray(".hero-word").forEach((el, i) => {
      gsap.fromTo(
        el,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.05, delay: i * 0.1, ease: "power4.out" }
      );
    });

    const sections = ["home", ...nav];
    const observers = sections.map((id) => {
      const node = document.getElementById(id);
      if (!node) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-35% 0px -55% 0px" }
      );
      observer.observe(node);
      return observer;
    });

    return () => {
      cancelAnimationFrame(frame);
      lenisRef.current = null;
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      observers.forEach((o) => o?.disconnect());
    };
  }, []);

  useEffect(() => {
  const keyHandler = (e) => {
    if (e.key === "/" && viewModeRef.current === "curious" && !terminalRef.current) {
      e.preventDefault();
      markExplore("slash");
      setTerminal(true);
      showThought("Good. You found the door.", 4600);
      return;
    }

    if (e.key === "Escape") {
      setTerminal(false);
      setOpenProject(null);
      setResumeOpen(false);
      return;
    }

    if (e.key.toLowerCase() === "s" && !terminalRef.current) {
      if (egg) hideEgg();
      else showEgg();
    }
  };

  window.addEventListener("keydown", keyHandler);

  return () => {
    window.removeEventListener("keydown", keyHandler);
  };
}, []);

const terminalRef = useRef(false);
useEffect(() => {
  terminalRef.current = terminal;
}, [terminal]);

  const go = (id) => {
    markExplore(`section:${id}`);
    if (id === "about") showThought("This is usually where people stop reading.");
    if (id === "work") showThought("Now you're looking at the useful part.");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1300);
    } catch {}
  };

  const runCommand = (e) => {
    if (e.key !== "Enter") return;
    const cmd = command.trim().toLowerCase();
    setCommand("");
    const commands = {
      home: "home", about: "about", work: "work", projects: "work",
      experience: "experience", skills: "skills", contact: "contact",
    };
    if (commands[cmd]) {
      discover("terminal");
      setTerminal(false);
      setTimeout(() => go(commands[cmd]), 80);
    } else if (["help", "?"].includes(cmd)) {
      discover("terminal-help");
      setEggMessage({ title: "Available: about · work · skills · contact", detail: "Undocumented: secret · sudo hire sanket · ping sanket · inspect · trace · whois sanket" });
      showEgg();
    } else if (cmd === "inspect") {
      markExplore("inspect");
      setTerminal(false);
      openRuntime();
      showSystemNote("You found the layer underneath the portfolio.", 2800);
    } else if (cmd === "trace") {
      markExplore("trace");
      setEggMessage({ title: "VISITOR TRACE", detail: "navigation detected · intent uncertain · curiosity increasing" });
      showEgg();
    } else if (cmd === "whois sanket") {
      markExplore("whois");
      setEggMessage({ title: "whois sanket", detail: "engineer · builder · automation · AI/LLM · probably still debugging something" });
      showEgg();
    } else if (cmd === "secret") {
      discover("secret");
      setEggMessage({ title: "You found a hidden command.", detail: "Good engineers read the comments — and the interfaces." });
      showEgg();
    } else if (cmd === "sudo hire sanket") {
      discover("hire");
      setEggMessage({ title: "ACCESS GRANTED.", detail: "Java ✓  Spring Boot ✓  React ✓  AI / LLM ✓  Problem Solving ✓" });
      showEgg();
    } else if (cmd === "ping sanket") {
      discover("status");
      setEggMessage({ title: "ping sanket → 200 OK", detail: "connection established · something is still running" });
      showEgg();
    } else if (cmd === "hello" || cmd === "hi") {
      setEggMessage({ title: "Hello.", detail: "Try help. Or try being curious." });
      showEgg();
    } else if (cmd === "clear") {
      // clear is naturally represented by the reset input
    }
  };

  const stackReady = useMemo(() => stack.length >= 3, [stack]);

  return (
    <div className="app">
      {splash && (
        <div className="portfolio-splash">
          <div className="splash-grid" />
          <div className="splash-content">
            <div className="splash-top">
              <span>SS / PORTFOLIO SYSTEM</span>
              <span>v24</span>
            </div>
            <div className="splash-title">
              <span>DESIGN.</span>
              <span>ENGINEER.</span>
              <span>BUILD.</span>
            </div>
            <p className="splash-copy">Choose how you want to experience the work.</p>
            <div className="splash-choices">
              <button onClick={() => enterPortfolio("recruiter")}>
                <span>01</span><strong>RECRUITER VIEW</strong>
                <small>Fast route · projects · experience · skills</small>
              </button>
              <button onClick={() => enterPortfolio("curious")}>
                <span>02</span><strong>CURIOUS VIEW</strong>
                <small>Full portfolio · hidden interactions · experiments</small>
              </button>
            </div>
            <div className="splash-foot">
              <span>NO ACCOUNT · NO TRACKING · JUST A PORTFOLIO</span>
              <span>SELECT A MODE →</span>
            </div>
          </div>
        </div>
      )}
      <header className="island-wrap">
        <nav className="island">
          <button className={`brand ${viewMode === "curious" ? "curiosity-pulse" : ""}`} onClick={() => { discover("logo"); setEggMessage({ title: "You found the quiet part.", detail: "Curiosity is a good engineering trait." }); showEgg(); go("home"); }} aria-label="Home">SS{viewMode === "curious" && <span className="micro-hint logo-hint">Psst...</span>}</button>
          <div className="nav-links">
            {nav.map((item) => (
              <button key={item} className={active === item ? "active" : ""} onClick={() => go(item)}>
                {item.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="view-switch" aria-label="Portfolio view">
            <button className={viewMode === "recruiter" ? "active" : ""} onClick={() => { setViewMode("recruiter"); }}>RECRUITER</button>
            <button className={viewMode === "curious" ? "active" : ""} onClick={() => { if (viewMode !== "curious") { viewModeRef.current = "curious"; setViewMode("curious"); setCuriousColorPrompt(true); window.setTimeout(() => showThought("Curious mode enabled.", 4600), 60); } }}>CURIOUS</button>
          </div>
          <button className="theme" onClick={() => { setDark((v) => !v); logRuntime("THEME", dark ? "switched to light" : "switched to dark"); }} aria-label="Toggle theme">
            {dark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </nav>
      </header>

      <main>
        <section id="home" className="hero section">
          <div className="hero-identity">
            <div className="identity-copy">
              <span className="identity-mark">●</span>
              <div>
                <strong>{person.name.toUpperCase()}</strong>
                <span>SOFTWARE ENGINEER · JAVA · AI · AUTOMATION</span>
                {viewMode === "recruiter" && <small className="view-note">RECRUITER VIEW · SKILLS · EXPERIENCE · PROJECTS</small>}
                {viewMode === "curious" && <small className="view-note">CURIOUS VIEW · THERE IS MORE HERE</small>}
              </div>
            </div>
            <div className="identity-actions">
              <button onClick={() => setResumeOpen(true)}>VIEW RESUME <ArrowUpRight size={13} /></button>
              <a href={resumeFile} download>DOWNLOAD <ArrowDown size={13} /></a>
            </div>
          </div>

          <div className="hero-stage">
            <div className="hero-center">
              <div className="hero-line"><span className="hero-word">DESIGN.</span></div>
              <div className="hero-line"><span className="hero-word">ENGINEER.</span></div>
              <div className="hero-line"><span className="hero-word">BUILD.</span></div>
            </div>
            <div className="hero-portrait">
              <img src={profilePhoto} alt="Sanket Kumar Sahu" />
              <span>SOFTWARE ENGINEER</span>
            </div>
          </div>

          <div className="hero-footer">
            <div className="hero-footer-copy">
              <p className="hero-description"><span>Building backend systems,</span> full-stack products and intelligent workflows.</p>
              {viewMode === "curious" && <button className="curiosity-hint" onClick={() => { markExplore("hero"); showThought("That was the visible layer.", 4600); setTerminal(true); }}> This is the visible layer. <span>/ to inspect →</span></button>}
              <button onClick={() => go("about")}>EXPLORE <ArrowDown size={14} /></button>
            </div>
          </div>
        </section>

        <section id="about" className="section section-space reveal">
          <div className="kicker">01 / ABOUT</div>
          <div className="about-grid">
            <h2>Engineering that turns <em>complex workflows</em> into useful software.</h2>
            <div className="body-copy">
              <p>
                Software Engineer with hands-on experience developing Java, Spring Boot and REST APIs,
                alongside full-stack applications using React.js, JavaScript, PostgreSQL and MySQL.
              </p>
              <p>
                Focused on backend development, secure authentication, enterprise workflow automation
                and AI-enabled applications. Working knowledge includes Python, LLMs, prompt engineering and RAG concepts.
              </p>
              <div className="fact-row">
                <span>BANGALORE, INDIA</span>
                <span>SOFTWARE ENGINEER</span>
                <span>OPEN TO OPPORTUNITIES</span>
              </div>
            </div>
          </div>
        </section>

        <section className={`section interactive reveal ${viewMode === "recruiter" ? "recruiter-hide" : ""}`}>
          <div className="kicker">INTERACTION / 01</div>
          <div className="interaction-head">
            <div>
              <h2>Can you <em>break my code?</em></h2>
              <p>One small security review. Think like a code reviewer.</p>
              {!discovered.challenge && <span className="inline-hint">One of these is wrong</span>}
            </div>
            <span className="mono-note">01 CHALLENGE</span>
          </div>
          <div className="challenge">
            <div className="challenge-top">
              <span>Review.java</span><span>SECURITY / JAVA</span>
            </div>
            <pre>{`public void processUser(String id) {
    User user = database.find(id);
    System.out.println(user.getPassword());
}`}</pre>
            <div className="choices">
              {["Nothing is wrong", "Password exposure", "Invalid Java syntax", "Database connection issue"].map((answer) => (
                <button
                  key={answer}
                  className={challenge === answer ? (answer === "Password exposure" ? "right" : "wrong") : ""}
                  onClick={() => { setChallenge(answer); discover("challenge"); }}
                >
                  {answer}
                </button>
              ))}
            </div>
            {challenge && (
              <div className="challenge-result">
                <strong>{challenge === "Password exposure" ? "Correct." : "Not quite."}</strong>
                <span>The password is being sent to application output. Sensitive credentials should not be exposed in logs or console output.</span>
              </div>
            )}
          </div>
        </section>

        

        <section id="work" className="section section-space reveal">
          <div className="kicker">02 / SELECTED WORK</div>
          <div className="project-list">
            {projects.map((project) => (
              <article className="project" key={project.id}>
                <div className="project-meta">
                  <span>{project.eyebrow}</span>
                </div>
                <div
                  className="project-main"
                  role="button"
                  tabIndex={0}
                  onClick={() => setOpenProject(project)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpenProject(project); } }}
                >
                  <div className="project-number">{project.id}</div>
                  <div className="project-copy">
                    <h2>{project.title}</h2>
                    <p>{project.description}</p>
                    <div className="tags">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    <div className="project-links">
                      {project.id === "03" && (
                        <button className="compile-project-btn" onClick={(e) => { e.stopPropagation(); setCompilerLanguage("javascript"); setCompilerOpen(true); }}>
                          <Play size={13} /> COMPILE CODE
                        </button>
                      )}
                      {project.live && <a href={project.live} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}><ExternalLink size={13} /> LIVE</a>}
                      {project.github && <a href={project.github} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}><Github size={13} /> GITHUB</a>}
                    </div>
                  </div>
                  <ArrowUpRight className="project-icon" size={21} />
                </div>
              </article>
            ))}
          </div>
        </section>

        
      <section id="how-i-think" className="section section-space reveal think-section">
        <div className="kicker">04 / HOW I THINK</div>
        <div className="section-head">
          <h2>Problem → <em>system</em>.</h2>
        </div>
          <div className="think-grid">
            {[
              ["CODE REVIEW", "Repository → analysis → report", "GitHub API · Spring Boot · Gemini · PostgreSQL"],
              ["CODE EXECUTION", "Editor → execution → output", "React · Spring Boot · Judge0"],
              ["AUTOMATION", "Workflow → API → validation", "NGAGE Studio · Jira · AI-generated tests"],
            ].map(([label, flow, stackText], index) => (
              <button key={label} className={`think-card ${thinkMode === index ? "active" : ""}`} onClick={() => { setThinkMode(index); discover("think"); }}>
                <span>0{index + 1} / {label}</span>
                <strong>{flow}</strong>
                <small>{stackText}</small>
              </button>
            ))}
          </div>
          <div className="think-detail">
            {viewMode === "curious" && <button className="think-hint" onClick={() => { markExplore("thinking"); showThought("Yes. The answer changes depending on what you ask.", 4600); }}>↳ try selecting one · it changes what I reveal</button>}
            <span>SELECTED SYSTEM</span>
            <strong>
              {[
                "I start by locating the source of truth, isolate the analysis boundary, then turn findings into an actionable report.",
                "I keep editing, execution and result handling separate so failures are observable and the interface stays predictable.",
                "I remove repetitive manual steps by connecting the workflow, API layer and validation into one repeatable path.",
              ][thinkMode]}
            </strong>
          </div>
        <div className="think-flow">
          <span>PROBLEM</span><i>→</i><span>ARCHITECTURE</span><i>→</i><span>IMPLEMENTATION</span><i>→</i><span>RESULT</span>
        </div>
      </section>
      
      <section id="experience" className="section section-space reveal">
          <div className="kicker">03 / EXPERIENCE</div>
          <div className="experience">
            <div className="exp-date"><span>SEP 2025 — NOV 2025</span><br /><span>01 / 01 ROLE</span></div>
            <div className="exp-main">
              <h2>Comviva</h2>
              <h3>Intern Engineer Trainee · Bangalore</h3>
              <ul>
                <li>Developed backend modules using Java, Spring Boot and REST APIs for enterprise campaign processing and secure FTP workflows.</li>
                <li>Replaced Java WatchService with a configurable Timer Poller, improving FTP Proxy compatibility with Docker/Kubernetes.</li>
                <li>Integrated NGAGE Studio and Jira APIs with AI-generated test cases to automate QA workflows and reduce manual test-case creation and verification.</li>
                <li>Built a Post Load Validation utility automating dashboard metric calculation and pre/post data-load comparison, eliminating manual reconciliation.</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="skills" className="section section-space reveal">
          <div className="kicker">04 / TOOLKIT</div>
          <div className="skills">
            {Object.entries(skillGroups).map(([group, items]) => (
              <React.Fragment key={group}>
                <button className={`skill-group ${activeSkill === group ? "active" : ""}`} onClick={() => setActiveSkill(group)}>
                  <span className="skill-label">{group}</span>
                  <div className="skill-items">{items.map((item) => <span key={item}>{item}</span>)}</div>
                  <span className="skill-open">{activeSkill === group ? "SELECTED" : "EXPLORE"}</span>
                </button>
                {activeSkill === group && (
                  <div className="skill-focus skill-focus-inline">
                    <span>FOCUS / {activeSkill}</span>
                    <p>{{
                      "LANGUAGES": "Core programming layer for backend services, scripting and data work.",
                      "FRONTEND": "Responsive interfaces and product surfaces built around React and clean UI systems.",
                      "BACKEND": "Java, Spring Boot and REST services for structured application logic and integrations.",
                      "SECURITY": "Authentication and authorization patterns using Spring Security, JWT and OAuth.",
                      "DATABASES": "Relational persistence with PostgreSQL and MySQL.",
                      "AI / LLM": "LLM integration, prompt design, retrieval concepts and AI-assisted engineering workflows.",
                      "TOOLS": "The delivery layer: source control, containers, APIs, Linux and agile engineering tools.",
                    }[activeSkill]}</p>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </section>

        <section className={`section terminal-section reveal ${viewMode === "recruiter" ? "recruiter-hide" : ""}`}>
          <div className="terminal-preview">
            <div className="terminal-bar"><span><Terminal size={14} /> sanket@builder</span><span>interactive {!discovered.terminal && "· type help"}</span></div>
            <div className="terminal-content">
              <div>
                <span className="terminal-muted">$ whoami</span>
                <strong>software engineer · java · ai · automation</strong>
              </div>
              <button onClick={() => { discover("terminal"); setTerminal(true); }}>OPEN TERMINAL <ArrowUpRight size={14} /></button>
            </div>
          </div>
        </section>

        <section id="contact" className={`section contact reveal ${viewMode === "recruiter" ? "recruiter-contact" : ""}`}> 
          <div className="kicker">05 / CONTACT</div>
          <div className="contact-grid">
            <div>
              <h2>Let's build something <em>useful.</em></h2>
              <p>Open to software engineering opportunities and conversations around backend, full-stack and AI-enabled systems.</p>
            </div>
            <div className="contact-links">
              <a href={`mailto:${person.email}`}><Mail size={16} /> {person.email}</a>
              <button onClick={copyEmail}>{copied ? <Check size={16} /> : <Copy size={16} />} {copied ? "COPIED" : "COPY EMAIL"}</button>
              <a href={person.github} target="_blank" rel="noreferrer"><Github size={16} /> GITHUB</a>
              <a href={person.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> LINKEDIN</a>
            </div>
          </div>
        </section>

        <section className="section education reveal">
          <div className="kicker">EDUCATION</div>
          <div className="education-row">
            <div><span>2022 — 2026</span><strong>Institute of Technical Education & Research</strong></div>
            <div><span>B.TECH · COMPUTER SCIENCE ENGINEERING</span><strong>SOA University · Bhubaneswar, Odisha · CGPA 7.07</strong></div>
          </div>
        </section>

</main>

      <footer className="footer">
        <button className="system-status" onClick={() => { discover("status"); setEggMessage({ title: "ping sanket → 200 OK", detail: "connection established · something is still running" }); showEgg(); }}>SYSTEM STATUS <b>●</b> ONLINE{!discovered.status && <span> · something is still running</span>}</button>
        <span>© {new Date().getFullYear()} {person.name.toUpperCase()}</span>
        <button onClick={() => { discover("logo"); setEggMessage({ title: "You found the quiet part.", detail: "Curiosity is a good engineering trait." }); if (egg) hideEgg(); else showEgg(); }}>SS</button>
        <span>BUILT WITH INTENT.</span>
      </footer>

      {openProject && (
        <div className="modal-backdrop" onMouseDown={() => setOpenProject(null)}>
          <div className="project-modal" onMouseDown={(e) => e.stopPropagation()}>
            <div className="modal-top"><span>{openProject.id} / CASE STUDY</span><button onClick={() => setOpenProject(null)}><X size={17} /></button></div>
            <div className="modal-inner">
              <span className="modal-eyebrow">{openProject.eyebrow}</span>
              <h2>{openProject.title}</h2>
              <p>{openProject.description}</p>
              <div className="modal-section">
                <span>ARCHITECTURE</span>
                <div className="case-flow">{openProject.architecture.map((item, i) => <React.Fragment key={item}><div>{item}</div>{i < openProject.architecture.length - 1 && <span>→</span>}</React.Fragment>)}</div>
              </div>
              <div className="modal-section">
                <span>STACK</span>
                <div className="tags">{openProject.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </div>
              <div className="modal-project-links">
                {openProject.live ? <a href={openProject.live} target="_blank" rel="noreferrer"><ExternalLink size={15} /> OPEN LIVE WEBSITE</a> : <span className="disabled-link"><ExternalLink size={15} /> LIVE LINK NOT ADDED</span>}
                {openProject.github ? <a href={openProject.github} target="_blank" rel="noreferrer"><Github size={15} /> OPEN GITHUB REPO</a> : <span className="disabled-link"><Github size={15} /> REPO LINK NOT ADDED</span>}
              </div>
            </div>
          </div>
        </div>
      )}

      {resumeOpen && (
        <div className="modal-backdrop" onMouseDown={() => setResumeOpen(false)}>
          <div className="resume-modal" onMouseDown={(e) => e.stopPropagation()}>
            <div className="modal-top">
              <span>RESUME / SANKET KUMAR SAHU</span>
              <button onClick={() => setResumeOpen(false)}><X size={17} /></button>
            </div>
            <iframe title="Sanket Kumar Sahu Resume" src={resumeFile} />
            <div className="resume-actions">
              <a href={resumeFile} target="_blank" rel="noreferrer">OPEN PDF <ExternalLink size={13} /></a>
              <a href={resumeFile} download>DOWNLOAD PDF <ArrowDown size={13} /></a>
            </div>
          </div>
        </div>
      )}

      {compilerOpen && (
        <div className="modal-backdrop" onMouseDown={() => setCompilerOpen(false)}>
          <div className="compiler-modal" onMouseDown={(e) => e.stopPropagation()}>
            <div className="modal-top">
              <span>LIVE CODE COMPILER</span>
              <button onClick={() => setCompilerOpen(false)}><X size={17} /></button>
            </div>
            <div className="compiler-toolbar">
              <div className="compiler-languages">
                {compilerLanguages.map((language) => (
                  <button key={language} className={compilerLanguage === language ? "active" : ""} onClick={() => selectCompilerLanguage(language)}>
                    {language}
                  </button>
                ))}
              </div>
              <button className="run-button" onClick={runCompiler} disabled={compilerBusy}>
                <Play size={14} /> {compilerBusy ? "RUNNING..." : "RUN CODE"}
              </button>
            </div>
            <div className="compiler-note">
              Please wait a few more moments — Judge0 is doing its thing. I haven't unlocked the “pay for faster servers” DLC yet. 😌
            </div>
            <div className="compiler-grid">
              <div className="compiler-pane">
                <div className="compiler-label">SOURCE / {compilerLanguage.toUpperCase()}</div>
                <textarea value={compilerCode} onChange={(e) => setCompilerCode(e.target.value)} spellCheck="false" />
              </div>
              <div className="compiler-pane">
                <div className="compiler-label">INPUT</div>
                <textarea className="compiler-input" value={compilerInput} onChange={(e) => setCompilerInput(e.target.value)} spellCheck="false" placeholder="Optional stdin" />
                <div className="compiler-label output-label">OUTPUT</div>
                <pre className="compiler-output">{compilerOutput || (compilerError ? "" : "Run the program to see output.")}</pre>
                {compilerError && <pre className="compiler-error">{compilerError}</pre>}
              </div>
            </div>
            <div className="compiler-footer">
              <span>EXECUTES THROUGH MY DEPLOYED COMPILER API</span>
              <div>
                <a href={compilerLive} target="_blank" rel="noreferrer">OPEN LIVE APP <ExternalLink size={13} /></a>
                <a href={compilerRepo} target="_blank" rel="noreferrer">VIEW SOURCE <Github size={13} /></a>
              </div>
            </div>
          </div>
        </div>
      )}

      {curiousColorPrompt && viewMode === "curious" && (
        <div className="curious-color-backdrop" onClick={() => setCuriousColorPrompt(false)}>
          <section className="curious-color-modal" onClick={(e) => e.stopPropagation()}>
            <button className="curious-color-close" onClick={() => setCuriousColorPrompt(false)} aria-label="Close">
              <X size={15} />
            </button>
            <span className="curious-color-kicker">CURIOUS VIEW</span>
            <h2>May I get to know what's your favourite color?</h2>
            <div className="curious-palette">
              {accentPalette.map(([label, color]) => (
                <button
                  key={color}
                  className={`color-swatch ${accent === color ? "selected" : ""}`}
                  style={{ "--swatch": color }}
                  onClick={() => applyAccent(color, label)}
                  aria-label={`Choose ${label}`}
                  title={label}
                >
                  <span />
                  <small>{label}</small>
                </button>
              ))}
            </div>
            <button className="curious-copper-choice" onClick={() => applyAccent(defaultAccent, "Copper")}>
              Continue with my favourite color · Copper
            </button>
          </section>
        </div>
      )}

      {thought && (
        <div className="transient-thought" aria-live="polite">
          {thought}
        </div>
      )}

      {systemNote && (
        <div className="system-note" role="status" aria-live="polite">
          <span></span>
          <strong>{systemNote.message}</strong>
        </div>
      )}

      {runtimePanel && (
        <div className="runtime-panel-backdrop" onClick={() => setRuntimePanel(false)}>
          <section className="runtime-panel runtime-monitor" onClick={(e) => e.stopPropagation()} onWheel={(e) => e.stopPropagation()} onTouchMove={(e) => e.stopPropagation()}>
            <button className="runtime-close" onClick={() => setRuntimePanel(false)}>ESC / CLOSE</button>
            <div className="runtime-head">
              <span>PORTFOLIO.RUNTIME</span><span>LIVE SESSION</span>
            </div>
            <div className="runtime-title">THE PORTFOLIO IS A SYSTEM.</div>
            <p className="runtime-intro">
              The visible page is the presentation layer. This is the runtime layer,
              updating from what happens inside this session.
            </p>
            <div className="runtime-status-line">
              <span><i /> {runtimeStatus}</span>
              <span>SESSION · {Math.floor((runtimeNow - sessionStarted) / 1000)}s</span>
            </div>
            <div className="runtime-tree">
              <div><b>UI</b><span>ONLINE</span></div>
              <div><b>CONTENT</b><span>ONLINE</span></div>
              <div><b>INTERACTION ENGINE</b><span>ACTIVE</span></div>
              <div><b>VISITOR TRACE</b><span>{runtimeEvents.length ? "UPDATING" : "WAITING"}</span></div>
              <div className="runtime-unknown"><b>UNKNOWN</b><span>???</span></div>
            </div>
            <div className="runtime-grid">
              <div><small>SECTIONS TOUCHED</small><p>{[...explored].filter((x) => x.startsWith("section:")).length}</p></div>
              <div><small>UNIQUE DISCOVERIES</small><p>{explored.size}</p></div>
              <div><small>EVENTS IN SESSION</small><p>{runtimeEvents.length}</p></div>
            </div>
            <div className="runtime-events">
              <div className="runtime-events-head"><span>LIVE EVENT STREAM</span><span>SESSION ONLY</span></div>
              {runtimeEvents.length === 0 ? (
                <p className="runtime-empty">waiting for something to happen...</p>
              ) : runtimeEvents.map((event, i) => (
                <div className="runtime-event" key={`${event.time}-${i}`}>
                  <time>{event.time}</time><b>{event.type}</b><span>{event.detail}</span>
                </div>
              ))}
            </div>
            <div className="runtime-terminal">
              <span>$ inspect --self</span>
              <p>Rendering ............... OK</p>
              <p>Interaction layer ....... ACTIVE</p>
              <p>Visitor trace ........... SESSION ONLY</p>
              <p>External tracking ....... NONE</p>
              <p className="runtime-final">Current hypothesis: you are still looking for something.</p>
              <p className="runtime-accent">STATUS: CORRECT.</p>
            </div>
          </section>
        </div>
      )}

      {terminal && (
        <div className="modal-backdrop" onMouseDown={() => setTerminal(false)}>
          <div className="terminal-modal" onMouseDown={(e) => e.stopPropagation()}>
            <div className="modal-top"><span>TERMINAL</span><button onClick={() => setTerminal(false)}><X size={17} /></button></div>
            <div className="terminal-output">
              <p>Welcome to sanket.dev</p>
              <p>Available commands: about · work · experience · skills · contact</p>
              <p className="terminal-discovery">Try <strong>help</strong> or <strong>?</strong>. One command is deliberately irresponsible.</p>
            </div>
            <div className="command-line"><span>›</span><input autoFocus value={command} onChange={(e) => setCommand(e.target.value)} onKeyDown={runCommand} placeholder="type a command" /></div>
          </div>
        </div>
      )}

      {egg && (
        <button className="egg" onClick={hideEgg}>
          <span>SYSTEM NOTE</span>
          <strong>{eggMessage.title}</strong>
          <small>{eggMessage.detail}</small>
        </button>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
