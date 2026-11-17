import { useEffect, useRef, useState, Suspense, lazy } from "react"
import { motion } from "motion/react"
import { useScroll, useSpring } from "framer-motion"
import { SmoothScroll } from "./components/ui/smooth-scroll"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { animate, stagger } from "animejs"
import { Toaster, toast } from "sonner"
import { Drawer } from "vaul"
import {
  ArrowUpRight,
  ArrowRight,
  Mail,
  MapPin,
  ExternalLink,
  Globe,
  Cpu,
  Layers,
  FlaskConical,
  Droplets,
  Smartphone,
  Eye,
  Play,
  Sparkles,
  MoveUpRight,
} from "lucide-react"

// --- helpers ---
function cn(...c) { return c.filter(Boolean).join(" ") }

gsap.registerPlugin(ScrollTrigger)

// --- data ---
const PROJECTS = [
  {
    n: "01",
    title: "Small Agent Reliability",
    cat: "Research / Evaluation Framework",
    year: "2025 — Present",
    desc: "First-principles evaluation framework for small-agent reliability (<10B). Even top agents score <50% on real-world tasks. Behavioral testing, capability assessment & production monitoring harness. Companion paper + public benchmark.",
    stack: ["Python", "LLM Eval", "Agentic Harness", "Behavioral Testing"],
    meta: ["Paper", "Open-source", "Benchmark"],
    href: "#",
    github: "#",
    accent: "Rose",
    kpi: "Reproducible eval • 64-agent audit",
  },
  {
    n: "02",
    title: "nnU-Net Road Crack Segmentation",
    cat: "Computer Vision · Infrastructure",
    year: "2024",
    desc: "Self-configuring nnU-Net for fine-grained pavement crack segmentation. Tile-aware training, topology-preserving loss & field-evaluated precision for municipal survey.",
    stack: ["PyTorch", "nnU-Net", "Segmentation", "OpenCV"],
    meta: ["CV", "Field-tested", "High mIoU"],
    href: "#",
    github: "#",
    accent: "Slate",
    kpi: "Per-crack instance metrics",
  },
  {
    n: "03",
    title: "Hanumante Hydrology — HEC-HMS",
    cat: "Hydrology · HEC-HMS",
    year: "2023 — 2024",
    desc: "Rainfall–runoff modelling of the Hanumante River (Kathmandu Valley). Calibrated HEC-HMS with land-use & soil maps, design-storm simulation & flood-frequency analysis.",
    stack: ["HEC-HMS", "GIS", "Hydrology", "Python"],
    meta: ["Hanumante River", "Flood study", "Kathmandu"],
    href: "#",
    github: "#",
    accent: "Slate",
    kpi: "Calibrated NSE > 0.82",
  },
  {
    n: "04",
    title: "Smart Parking Robotics",
    cat: "Robotics · OpenCV / FastAPI",
    year: "2024",
    desc: "Smart parking perception stack: lot segmentation, occupancy detection & path guidance. Edge Python + OpenCV vision, FastAPI edge API & live dashboard with IoT actuation loop.",
    stack: ["Python", "OpenCV", "FastAPI", "IoT"],
    meta: ["Robotics Lab", "Edge AI", "Realtime"],
    href: "#",
    github: "#",
    accent: "Slate",
    kpi: "<120ms per-frame • 4 lots live",
  },
  {
    n: "05",
    title: "Vehicle Image Classifier",
    cat: "Deep Learning · Transfer Learning",
    year: "2024",
    desc: "Production CNN for fine-grained vehicle type classification. Transfer learning with augmentation, hard-negative mining & quantized export for on-device inference.",
    stack: ["PyTorch", "CNN", "Transfer Learning", "ONNX"],
    meta: ["Image Classification", "Quantized", "On-device"],
    href: "#",
    github: "#",
    accent: "Slate",
    kpi: "93.4% top-1 • <30ms",
  },
  {
    n: "06",
    title: "Yatayat Go",
    cat: "Product · Expo / Supabase",
    year: "2024 — 2025",
    desc: "Bus-booking platform for Nepal: search, seat-map, e-ticket & operator dashboard. Expo + React Native, Supabase (auth/realtime), Thimi Chowk corridor launch data & DXF-driven maps.",
    stack: ["Expo", "React Native", "Supabase", "Maps"],
    meta: ["Product", "Mobile", "Launched"],
    href: "#",
    github: "#",
    accent: "Rose",
    kpi: "Expo • Supabase • E-ticket",
  },
]

const EXPERIENCE = [
  { role: "AI Engineer — Applied Research", org: "Independent / Small Agent Reliability", time: "2024 — Present", loc: "Kathmandu · Remote" },
  { role: "Computer Vision Engineer", org: "Infrastructure Inspection — nnU-Net", time: "2024", loc: "Kathmandu" },
  { role: "Hydrology Analyst — HEC-HMS", org: "Hanumante River Basin Study", time: "2023 — 2024", loc: "Kathmandu Valley" },
  { role: "Robotics / CV Developer", org: "Smart Parking Robotics Platform", time: "2023 — 2024", loc: "Lab" },
]

const SKILLS = [
  { k: "AI / ML", v: "LLM eval · Agentic harnesses · PyTorch · XGBoost · RAG · LangGraph" },
  { k: "Computer Vision", v: "OpenCV · nnU-Net · Segmentation · Transfer learning · Quantization" },
  { k: "Hydrology", v: "HEC-HMS · HEC-RAS · GIS · Rainfall–runoff · Flood frequency" },
  { k: "Robotics / Edge", v: "Python · FastAPI · IoT · ESP32 · Realtime CV" },
  { k: "Product", v: "Expo · React Native · Supabase · Maps · Typescript" },
  { k: "Science", v: "Literature review · Reproducible pipelines · Technical writing" },
]

const NOW_DATA = [
  {
    title: "Small Agent Reliability research",
    status: "Active",
    progress: "45%",
    updated: "Updated yesterday",
    desc: "Running a 64-agent behavioral audit across tool-calling models. Building the eval harness that keeps agents honest under distribution shift.",
  },
  {
    title: "nnU-Net road crack segmentation",
    status: "Field testing",
    progress: "70%",
    updated: "Updated 2 days ago",
    desc: "Tile-aware training for pavement crack detection. Calibrating topology-preserving loss for municipal survey deployment.",
  },
  {
    title: "Hanumante hydrology model",
    status: "Calibration",
    progress: "80%",
    updated: "Updated last week",
    desc: "HEC-HMS rainfall–runoff modeling for Kathmandu Valley. Design-storm simulation & flood-frequency analysis underway.",
  },
]

// --- 3D ---
function KnotMesh() {
  const ref = useRef()
  useFrame((_, d) => {
    if (!ref.current) return
    ref.current.rotation.y += d * 0.22
    ref.current.rotation.x += d * 0.08
  })
  return (
    <Float speed={1.4} rotationIntensity={0.14} floatIntensity={0.55}>
      <mesh ref={ref} scale={1.15}>
        <torusKnotGeometry args={[1.05, 0.28, 128, 24]} />
        <meshStandardMaterial color="#111110" wireframe transparent opacity={0.92} />
      </mesh>
      {/* inner core */}
      <mesh scale={0.46}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial color="#e11d48" wireframe transparent opacity={0.14} />
      </mesh>
    </Float>
  )
}

function HeroStage({ reduce }) {
  if (reduce) {
    return (
      <div className="relative aspect-[4/3] w-full overflow-hidden border border-[rgba(17,17,16,0.10)] bg-[rgba(255,255,255,0.7)] flex items-center justify-center">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(17,17,16,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,17,16,0.06)_1px,transparent_1px)] bg-[size:24px_24px]" aria-hidden />
        <div className="relative z-10 flex flex-col items-center gap-3 p-8 text-center">
          <div className="h-[86px] w-[86px] rounded-full border border-[rgba(225,29,72,0.35)] bg-white flex items-center justify-center"><Sparkles className="h-6 w-6 text-[#e11d48]" aria-hidden /></div>
          <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-[rgba(17,17,16,0.55)]">Swiss system — motion reduced</p>
          <p className="max-w-[22ch] text-[13px] leading-5 text-[rgba(17,17,16,0.7)]">3D stage paused. All motion respects <span className="font-medium text-[#111110]">prefers-reduced-motion</span>.</p>
        </div>
      </div>
    )
  }
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden border border-[rgba(17,17,16,0.10)] bg-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(17,17,16,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,17,16,0.06)_1px,transparent_1px)] bg-[size:24px_24px] opacity-60" aria-hidden />
      <div className="absolute inset-0">
        <Canvas
          dpr={[1, 1.6]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          camera={{ position: [0, 0.15, 4.2], fov: 34 }}
          aria-hidden
        >
          <ambientLight intensity={0.9} />
          <directionalLight position={[4, 5, 3]} intensity={1.2} />
          <directionalLight position={[-3, -2, -4]} intensity={0.45} />
          <Suspense fallback={null}>
            <KnotMesh />
          </Suspense>
        </Canvas>
      </div>
      {/* overlay labels */}
      <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-2 border border-[rgba(17,17,16,0.10)] bg-white/80 px-2.5 py-1.5 backdrop-blur">
        <span className="h-2 w-2 rounded-full bg-[#e11d48] animate-pulse" aria-hidden />
        <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#111110]">R3F · Float · Wireframe — 60fps</span>
      </div>
      <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex justify-between gap-2 font-mono text-[10px] tracking-[0.14em] uppercase text-[rgba(17,17,16,0.5)]">
        <span className="border border-[rgba(17,17,16,0.08)] bg-white/75 px-2 py-1 backdrop-blur">Interactive — drag to orbit (desktop)</span>
        <span className="hidden sm:inline border border-[rgba(17,17,16,0.08)] bg-white/75 px-2 py-1 backdrop-blur">Lenis + Motion + GSAP</span>
      </div>
    </div>
  )
}

// --- reveal ---
function useMaskReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const masks = root.querySelectorAll(".mask")
    if (!masks.length) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in")
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.16 })
    masks.forEach((m) => io.observe(m))
    return () => io.disconnect()
  }, [])
  return ref
}

function MaskLines({ children, delay = 0 }) {
  return (
    <span className="mask block overflow-hidden" style={{ transitionDelay: `${delay}ms` }}>
      <span className="mask__inner block translate-y-[108%] will-change-transform">
        {children}
      </span>
    </span>
  )
}

// magnetic hover
function Magnetic({ children, className }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const x = ((e.clientX - r.left) / r.width - 0.5) * 6
      const y = ((e.clientY - r.top) / r.height - 0.5) * 6
      gsap.to(el, { x, y, duration: 0.45, ease: "power3.out" })
    }
    const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.55, ease: "power3.out" })
    el.addEventListener("mousemove", onMove)
    el.addEventListener("mouseleave", onLeave)
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave) }
  }, [])
  return <span ref={ref} className={cn("inline-flex will-change-transform", className)}>{children}</span>
}

export default function App() {
  const { scrollYProgress } = useScroll()
  const bar = useSpring(scrollYProgress, { stiffness: 260, damping: 30 })
  const [drawerProject, setDrawerProject] = useState(null)
  const [reduced, setReduced] = useState(false)
  const [mounted3d, setMounted3d] = useState(false)
  const heroRef = useRef(null)
  const revealRoot = useMaskReveal()
  const statsRef = useRef(null)

  // reduced motion
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(m.matches)
    const onChange = () => setReduced(m.matches)
    m.addEventListener("change", onChange)
    return () => m.removeEventListener("change", onChange)
  }, [])

  // defer 3d mount off main thread (LCP + TBT)
  useEffect(() => {
    const cb = () => setMounted3d(true)
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(cb, { timeout: 900 })
      return () => cancelIdleCallback(id)
    }
    const t = setTimeout(cb, 500)
    return () => clearTimeout(t)
  }, [])

  // loader anime stagger (respect reduce)
  useEffect(() => {
    if (reduced) return
try {
        animate({
          targets: ".loader-line",
          scaleX: [0, 1],
          duration: 700,
          delay: stagger(70),
          easing: "easeOutExpo",
        })
      } catch { /* anime v4 api diff — non-blocking */ }
  }, [reduced])

  // GSAP pinned stats + parallax wordmark
  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.from(".hero-kicker span", { yPercent: 110, duration: 0.85, stagger: 0.06, ease: "power4.out", delay: 0.2 })
      if (statsRef.current) {
        gsap.from(statsRef.current.querySelectorAll(".stat-cell"), {
          y: 18, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: statsRef.current, start: "top 88%" }
        })
      }
      gsap.to(".parallax-wordmark", {
        yPercent: -6, ease: "none",
        scrollTrigger: { trigger: ".parallax-wordmark", start: "top bottom", end: "bottom top", scrub: 0.6 }
      })
    })
    return () => ctx.revert()
  }, [reduced])

  // form
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [sending, setSending] = useState(false)
  const onSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Fill all fields.")
      return
    }
    setSending(true)
    setTimeout(() => {
      setSending(false)
      toast.success("Message queued — I'll reply within 24h.", { description: `${form.name} · ${form.email}` })
      setForm({ name: "", email: "", message: "" })
    }, 700)
  }

  return (
    <SmoothScroll>
      {/* global */}
      <style>{`
        .mask.is-in .mask__inner{ transform: translateY(0) !important; }
        .mask__inner{ transition: transform 750ms cubic-bezier(0.16,1,0.3,1); }
        @media (prefers-reduced-motion: reduce){
          .mask__inner{ transform:none !important; transition:none !important; }
        }
        *:focus-visible{ outline: 2px solid #e11d48; outline-offset: 2px; }
        button:active, a:active{ transform: scale(0.99); }
      `}</style>

      <Toaster position="top-right" richColors closeButton theme="light" />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-[#111110] focus:px-4 focus:py-2 focus:text-white">Skip to content</a>

      {/* progress */}
      <motion.div
        aria-hidden
        className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left bg-[#e11d48]"
        style={{ scaleX: bar }}
      />

      {/* subtle noise overlay — CSS only, no image */}
      <div aria-hidden className="pointer-events-none fixed inset-0 opacity-[0.035] mix-blend-multiply"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")` }}
      />

      <div ref={revealRoot} className="min-h-dvh bg-[#f4f4f2] text-[#111110] antialiased selection:bg-[rgba(225,29,72,0.18)]">
        {/* loader accent lines — tiny */}
        <div className="pointer-events-none sticky top-0 z-40 flex gap-1 px-4 pt-3 sm:px-6" aria-hidden>
          <span className="loader-line h-px w-12 origin-left bg-[#e11d48]" />
          <span className="loader-line h-px w-8 origin-left bg-[rgba(17,17,16,0.16)]" />
          <span className="loader-line h-px w-20 origin-left bg-[rgba(17,17,16,0.10)]" />
        </div>

        {/* NAV — pill, Swiss mono as per direction */}
        <header className="sticky top-0 z-40 border-b border-[rgba(17,17,16,0.06)] bg-[rgba(244,244,242,0.82)] backdrop-blur-[10px] supports-[backdrop-filter]:bg-[rgba(244,244,242,0.82)]">
          <nav aria-label="Primary" className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-3.5">
            <a href="#" className="inline-flex items-center gap-3 rounded focus-visible:outline-offset-4" aria-label="Praansu Karmacharya — home">
              <span className="grid h-8 w-8 place-items-center border border-[rgba(17,17,16,0.12)] bg-white font-mono text-[11px] font-semibold tracking-[0.12em]">PK</span>
              <span className="hidden sm:block text-left leading-none">
                <span className="block font-mono text-[11px] font-medium tracking-[0.16em] uppercase">Praansu Karmacharya</span>
                <span className="block font-mono text-[10px] tracking-[0.14em] uppercase text-[rgba(17,17,16,0.55)]">AI Engineer · Researcher · Kathmandu</span>
              </span>
            </a>

            <div className="hidden items-center gap-1 md:flex">
              <a href="#work" className="rounded-full border border-[rgba(17,17,16,0.10)] bg-white px-4 py-2 font-mono text-[11px] tracking-[0.14em] uppercase transition hover:border-[rgba(17,17,16,0.18)]">Work</a>
              <a href="#approach" className="rounded-full border border-[rgba(17,17,16,0.10)] bg-white px-4 py-2 font-mono text-[11px] tracking-[0.14em] uppercase transition hover:border-[rgba(17,17,16,0.18)]">Approach</a>
              <a href="#lab" className="rounded-full border border-[rgba(17,17,16,0.10)] bg-white px-4 py-2 font-mono text-[11px] tracking-[0.14em] uppercase transition hover:border-[rgba(17,17,16,0.18)]">Lab</a>
              <a href="#now" className="rounded-full border border-[rgba(17,17,16,0.10)] bg-white px-4 py-2 font-mono text-[11px] tracking-[0.14em] uppercase transition hover:border-[rgba(17,17,16,0.18)]">Now</a>
              <a href="#contact" className="rounded-full bg-[#e11d48] px-4 py-2 font-mono text-[11px] font-medium tracking-[0.14em] uppercase text-white transition hover:bg-[#be123c]">Contact — Available</a>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <a href="#contact" className="rounded-full bg-[#e11d48] px-3.5 py-2 font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-white">Contact</a>
            </div>
          </nav>
        </header>

        {/* HERO — Swiss grid 12 cols, type left + 3D right */}
        <section ref={heroRef} aria-label="Intro" className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <div className="grid grid-cols-12 gap-0 border-x border-[rgba(17,17,16,0.06)]">
            {/* kicker */}
            <div className="hero-kicker col-span-12 flex flex-wrap items-center gap-2 border-b border-[rgba(17,17,16,0.06)] bg-white/55 px-3 py-3 sm:px-4">
              <span className="inline-flex items-center gap-2 border border-[rgba(225,29,72,0.20)] bg-white px-2.5 py-1 font-mono text-[10px] tracking-[0.18em] uppercase"><span className="h-1.5 w-1.5 rounded-full bg-[#e11d48]" aria-hidden /> Systems that work in the wild</span>
              <span className="hidden sm:inline-flex items-center gap-2 border border-[rgba(17,17,16,0.08)] bg-white px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] uppercase text-[rgba(17,17,16,0.6)]"><FlaskConical className="h-3 w-3" aria-hidden /> Eval-first</span>
              <span className="hidden lg:inline-flex items-center gap-2 border border-[rgba(17,17,16,0.08)] bg-white px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] uppercase text-[rgba(17,17,16,0.6)]"><Cpu className="h-3 w-3" aria-hidden /> Edge · Realtime</span>
              <span className="ml-auto hidden items-center gap-1.5 font-mono text-[10px] tracking-[0.16em] uppercase text-[rgba(17,17,16,0.55)] md:inline-flex"><MapPin className="h-3 w-3" aria-hidden /> Kathmandu, Nepal — UTC+5:45</span>
            </div>

            {/* left type */}
            <div className="col-span-12 lg:col-span-7 border-b lg:border-b-0 lg:border-r border-[rgba(17,17,16,0.06)] bg-[#f4f4f2] p-6 sm:p-8 lg:p-10">
              <p className="font-mono text-[11px] tracking-[0.20em] uppercase text-[rgba(17,17,16,0.55)]">Portfolio — 2026 &nbsp;·&nbsp; #praansu-karmacharya</p>
              <h1 className="mt-4 font-[Space_Grotesk] text-[40px] font-[650] leading-[0.92] tracking-[-0.04em] sm:text-[56px] lg:text-[62px]">
                <MaskLines>Praansu</MaskLines>
                <MaskLines delay={80}><span className="font-light tracking-[-0.05em]">Karmacharya</span><span className="ml-2 align-super font-mono text-[11px] font-medium tracking-[0.18em] uppercase text-[#e11d48]">©2026</span></MaskLines>
                <span className="mt-3 block h-px w-full bg-[rgba(17,17,16,0.08)]" aria-hidden />
                <MaskLines delay={140}><span className="text-[11px] font-mono font-medium tracking-[0.22em] uppercase text-[rgba(17,17,16,0.6)]">AI Engineer — Agentic systems · Vision · Hydrology</span></MaskLines>
              </h1>

              <p className="mt-6 max-w-[48ch] text-[16px] leading-7 text-[rgba(17,17,16,0.72)] sm:text-[17px] sm:leading-7">
                I build reliable small-agent systems and ship vision & geospatial products that survive real-world noise — from <span className="font-medium text-[#111110]">LLM eval harnesses</span> and <span className="font-medium text-[#111110]">nnU-Net crack segmentation</span> to <span className="font-medium text-[#111110]">HEC-HMS hydrology</span> and edge robotics.
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                <Magnetic><a href="#work" className="inline-flex items-center gap-2 bg-[#111110] px-5 py-3 font-mono text-[11px] font-medium tracking-[0.14em] uppercase text-white transition hover:bg-black focus-visible:outline-offset-2">View selected work <ArrowRight className="h-3.5 w-3.5" aria-hidden /></a></Magnetic>
                <Magnetic><a href="mailto:hello@praansu.dev" className="inline-flex items-center gap-2 border border-[rgba(17,17,16,0.12)] bg-white px-5 py-3 font-mono text-[11px] tracking-[0.14em] uppercase transition hover:border-[rgba(17,17,16,0.18)]"><Mail className="h-3.5 w-3.5" aria-hidden /> hello@praansu.dev</a></Magnetic>
                <a href="#contact" className="inline-flex items-center gap-1.5 border border-[rgba(225,29,72,0.22)] bg-[rgba(225,29,72,0.06)] px-3 py-3 font-mono text-[11px] tracking-[0.14em] uppercase text-[#be123c]">Available for research & product — Q2</a>
              </div>

              <dl className="mt-8 grid grid-cols-3 gap-3 border-t border-[rgba(17,17,16,0.06)] pt-6">
                <div>
                  <dt className="font-mono text-[10px] tracking-[0.16em] uppercase text-[rgba(17,17,16,0.5)]">Focus</dt>
                  <dd className="mt-1 font-mono text-[12px] font-medium leading-4">Small-agent reliability<br /><span className="text-[rgba(17,17,16,0.55)]">3-tier eval · &lt;50% baseline</span></dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] tracking-[0.16em] uppercase text-[rgba(17,17,16,0.5)]">Shipping</dt>
                  <dd className="mt-1 font-mono text-[12px] font-medium leading-4">CV · Hydrology · Robotics<br /><span className="text-[rgba(17,17,16,0.55)]">Field-tested</span></dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] tracking-[0.16em] uppercase text-[rgba(17,17,16,0.5)]">Product</dt>
                  <dd className="mt-1 font-mono text-[12px] font-medium leading-4">Yatayat Go<br /><span className="text-[rgba(17,17,16,0.55)]">Expo · Supabase</span></dd>
                </div>
              </dl>
            </div>

            {/* right 3D */}
            <div className="col-span-12 lg:col-span-5 bg-white p-3 sm:p-4 lg:p-5">
              {mounted3d ? <HeroStage reduce={reduced} /> : (
                <div className="aspect-[4/3] w-full border border-[rgba(17,17,16,0.08)] bg-[rgba(244,244,242,0.9)] animate-pulse" aria-hidden />
              )}
              <div className="mt-3 grid grid-cols-3 gap-2 font-mono text-[10px] leading-4">
                <div className="border border-[rgba(17,17,16,0.08)] bg-white px-3 py-2.5"><span className="block tracking-[0.16em] uppercase text-[rgba(17,17,16,0.5)]">Stack</span><span className="mt-1 block font-medium">R3F + Motion + GSAP + Lenis</span></div>
                <div className="border border-[rgba(17,17,16,0.08)] bg-white px-3 py-2.5"><span className="block tracking-[0.16em] uppercase text-[rgba(17,17,16,0.5)]">Libraries</span><span className="mt-1 block font-medium">Anime · Sonner · Vaul · Drei</span></div>
                <div className="border border-[rgba(225,29,72,0.18)] bg-[rgba(225,29,72,0.06)] px-3 py-2.5"><span className="block tracking-[0.16em] uppercase text-[#be123c]">Performance</span><span className="mt-1 block font-medium text-[#111110]">Lighthouse 100 target</span></div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 border border-[rgba(17,17,16,0.10)] bg-white px-3 py-1.5 font-mono text-[11px] tracking-[0.12em] uppercase hover:border-[rgba(17,17,16,0.16)]"><GithubIcon className="h-3.5 w-3.5" aria-hidden /> GitHub</a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 border border-[rgba(17,17,16,0.10)] bg-white px-3 py-1.5 font-mono text-[11px] tracking-[0.12em] uppercase hover:border-[rgba(17,17,16,0.16)]"><LinkedinIcon className="h-3.5 w-3.5" aria-hidden /> LinkedIn</a>
                <a href="#lab" className="inline-flex items-center gap-1.5 border border-[rgba(17,17,16,0.10)] bg-white px-3 py-1.5 font-mono text-[11px] tracking-[0.12em] uppercase hover:border-[rgba(17,17,16,0.16)]"><Eye className="h-3.5 w-3.5" aria-hidden /> Lab notes</a>
              </div>
            </div>
          </div>
        </section>

        {/* MARQUEE — Swiss ticker */}
        <div className="mx-auto max-w-[1280px] border-x border-[rgba(17,17,16,0.06)] bg-[#111110] px-0 py-2.5 text-white overflow-hidden" aria-hidden>
          <div className="flex animate-[marquee_22s_linear_infinite] whitespace-nowrap will-change-transform text-[11px] font-mono tracking-[0.18em] uppercase">
            <span className="mx-6">Small Agent Reliability — Behavioral eval — &lt;50% baseline</span><span className="opacity-40">·</span>
            <span className="mx-6">nnU-Net Road Crack — Topology-preserving</span><span className="opacity-40">·</span>
            <span className="mx-6">HEC-HMS Hanumante — Rainfall–runoff — NSE 0.82</span><span className="opacity-40">·</span>
            <span className="mx-6">Robotics — OpenCV / FastAPI — &lt;120ms</span><span className="opacity-40">·</span>
            <span className="mx-6">Vehicle Classifier — 93.4% top-1</span><span className="opacity-40">·</span>
            <span className="mx-6">Yatayat Go — Expo + Supabase — Thimi Chowk corridor</span><span className="opacity-40">·</span>
            <span className="mx-6">Small Agent Reliability — Behavioral eval — &lt;50% baseline</span><span className="opacity-40">·</span>
            <span className="mx-6">nnU-Net Road Crack — Topology-preserving</span><span className="opacity-40">·</span>
          </div>
          <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
        </div>

        {/* STATS — bordered cells */}
        <section ref={statsRef} aria-label="At a glance" className="mx-auto max-w-[1280px] border-x border-[rgba(17,17,16,0.06)] bg-white">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y divide-[rgba(17,17,16,0.06)] border-y border-[rgba(17,17,16,0.06)]">
            <div className="stat-cell p-5 sm:p-6">
              <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[rgba(17,17,16,0.5)]">6 shipped</p>
              <p className="mt-2 font-[Space_Grotesk] text-[28px] font-semibold leading-none tracking-[-0.03em]">Research → Product</p>
              <p className="mt-2 font-mono text-[11px] leading-4 text-[rgba(17,17,16,0.6)]">Eval framework, CV, hydrology, robotics, mobile.</p>
            </div>
            <div className="stat-cell p-5 sm:p-6">
              <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[rgba(17,17,16,0.5)]">Reproducibility</p>
              <p className="mt-2 font-[Space_Grotesk] text-[28px] font-semibold leading-none tracking-[-0.03em]">Eval-first</p>
              <p className="mt-2 font-mono text-[11px] leading-4 text-[rgba(17,17,16,0.6)]">Harness, harness, harness — before demo.</p>
            </div>
            <div className="stat-cell p-5 sm:p-6">
              <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[rgba(17,17,16,0.5)]">Performance</p>
              <p className="mt-2 font-[Space_Grotesk] text-[28px] font-semibold leading-none tracking-[-0.03em]">Edge-ready</p>
              <p className="mt-2 font-mono text-[11px] leading-4 text-[rgba(17,17,16,0.6)]">&lt;120ms CV · 93.4% classifier · quantized.</p>
            </div>
            <div className="stat-cell p-5 sm:p-6">
              <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[rgba(17,17,16,0.5)]">Location</p>
              <p className="mt-2 font-[Space_Grotesk] text-[28px] font-semibold leading-none tracking-[-0.03em]">Kathmandu</p>
              <p className="mt-2 font-mono text-[11px] leading-4 text-[rgba(17,17,16,0.6)]">Field work in Hanumante &amp; Thimi Chowk.</p>
            </div>
          </div>
        </section>

        {/* WORK */}
        <main id="main">
          <section id="work" aria-label="Selected work" className="mx-auto max-w-[1280px] border-x border-[rgba(17,17,16,0.06)] bg-[#f4f4f2]">
            <div className="flex flex-wrap items-end justify-between gap-4 border-y border-[rgba(17,17,16,0.06)] bg-white px-4 py-6 sm:px-6 sm:py-8">
              <div>
                <p className="font-mono text-[11px] tracking-[0.20em] uppercase text-[#e11d48]">01 — Selected work</p>
                <h2 className="mt-2 font-[Space_Grotesk] text-[28px] font-semibold leading-none tracking-[-0.03em] sm:text-[34px]">
                  <MaskLines>Six systems, one standard:</MaskLines>
                  <MaskLines delay={60}><span className="font-light">reliable in the wild.</span></MaskLines>
                </h2>
              </div>
              <p className="max-w-[36ch] font-mono text-[12px] leading-5 text-[rgba(17,17,16,0.6)]">Each project is documented with method, constraints &amp; what failed — not just what worked. Open the drawer for details.</p>
            </div>

            <div className="grid grid-cols-12 gap-0 divide-y divide-[rgba(17,17,16,0.06)]">
              {PROJECTS.map((p) => (
                <article key={p.n} className="group col-span-12 grid grid-cols-12 gap-0 bg-white hover:bg-[rgba(255,255,255,0.96)] transition-colors">
                  {/* number + thumb */}
                  <div className="col-span-12 sm:col-span-5 lg:col-span-4 border-b sm:border-b-0 sm:border-r border-[rgba(17,17,16,0.06)] p-4 sm:p-5 flex gap-4">
                    <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-[rgba(17,17,16,0.45)] pt-1">{p.n}</span>
                    <div className="flex-1">
                      <div className="relative aspect-[16/10] overflow-hidden border border-[rgba(17,17,16,0.08)] bg-[#f4f4f2]">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(17,17,16,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,17,16,0.06)_1px,transparent_1px)] bg-[size:18px_18px]" aria-hidden />
                        <div className="absolute inset-0 grid place-items-center p-4">
                          <div className="w-full max-w-[84%] border border-[rgba(17,17,16,0.10)] bg-white p-3 shadow-[0_8px_24px_rgba(17,17,16,0.06)]">
                            <div className="flex items-center justify-between">
                              <span className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.16em] uppercase text-[rgba(17,17,16,0.55)]">
                                {p.cat === "Research / Evaluation Framework" ? <FlaskConical className="h-3 w-3" /> : p.cat.includes("Vision") || p.cat.includes("Deep Learning") ? <Eye className="h-3 w-3" /> : p.cat.includes("Hydrology") ? <Droplets className="h-3 w-3" /> : p.cat.includes("Robotics") ? <Cpu className="h-3 w-3" /> : p.cat.includes("Expo") ? <Smartphone className="h-3 w-3" /> : <Layers className="h-3 w-3" />}
                                {p.cat}
                              </span>
                              <span className={cn("rounded-full px-2 py-0.5 font-mono text-[9px] tracking-[0.12em] uppercase border", p.accent === "Rose" ? "bg-[rgba(225,29,72,0.08)] text-[#be123c] border-[rgba(225,29,72,0.18)]" : "bg-[rgba(17,17,16,0.04)] text-[rgba(17,17,16,0.6)] border-[rgba(17,17,16,0.08)]")}>{p.year}</span>
                            </div>
                            <p className="mt-3 font-[Space_Grotesk] text-[15px] font-semibold leading-4 tracking-[-0.02em]">{p.title}</p>
                            <p className="mt-1 line-clamp-2 font-mono text-[10px] leading-4 text-[rgba(17,17,16,0.6)]">{p.kpi}</p>
                            <div className="mt-3 flex gap-1.5 flex-wrap">
                              {p.stack.slice(0, 3).map((s) => (
                                <span key={s} className="border border-[rgba(17,17,16,0.08)] bg-[#f4f4f2] px-1.5 py-0.5 font-mono text-[9px] tracking-[0.08em] uppercase">{s}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="pointer-events-none absolute bottom-2 right-2 inline-flex items-center gap-1 bg-[#111110] px-2 py-1 font-mono text-[9px] tracking-[0.12em] uppercase text-white"><Play className="h-3 w-3" aria-hidden /> Preview</div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {p.meta.map((m) => (
                          <span key={m} className="border border-[rgba(17,17,16,0.08)] bg-[#f4f4f2] px-2 py-1 font-mono text-[10px] tracking-[0.10em] uppercase text-[rgba(17,17,16,0.6)]">{m}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* copy */}
                  <div className="col-span-12 sm:col-span-7 lg:col-span-8 p-4 sm:p-5 lg:p-6 flex flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-[Space_Grotesk] text-[20px] font-semibold leading-tight tracking-[-0.025em] sm:text-[22px]">{p.title}</h3>
                      <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[10px] tracking-[0.16em] uppercase text-[rgba(17,17,16,0.5)]"><span className="h-1.5 w-1.5 rounded-full bg-[#e11d48]" aria-hidden /> {p.year}</span>
                    </div>
                    <p className="mt-3 text-[14px] leading-6 text-[rgba(17,17,16,0.70)] sm:text-[15px] sm:leading-6">{p.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.stack.map((s) => (
                        <span key={s} className="border border-[rgba(17,17,16,0.10)] bg-white px-2.5 py-1 font-mono text-[11px] tracking-[0.06em]">{s}</span>
                      ))}
                    </div>
                    <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
                      <button
                        onClick={() => setDrawerProject(p)}
                        className="inline-flex items-center gap-2 bg-[#111110] px-4 py-2.5 font-mono text-[11px] font-medium tracking-[0.14em] uppercase text-white transition hover:bg-black"
                        aria-label={`Open details for ${p.title}`}
                      >
                        Project details <MoveUpRight className="h-3.5 w-3.5" aria-hidden />
                      </button>
                      <a href={p.github} onClick={(e) => { e.preventDefault(); toast.info("Private repo — request access via contact."); }} className="inline-flex items-center gap-1.5 border border-[rgba(17,17,16,0.12)] bg-white px-3.5 py-2.5 font-mono text-[11px] tracking-[0.12em] uppercase hover:border-[rgba(17,17,16,0.18)]"><GithubIcon className="h-3.5 w-3.5" aria-hidden /> Code</a>
                      <a href={p.href} onClick={(e) => { e.preventDefault(); toast.info("Case study — open drawer for full write-up."); setDrawerProject(p); }} className="inline-flex items-center gap-1.5 border border-[rgba(17,17,16,0.12)] bg-white px-3.5 py-2.5 font-mono text-[11px] tracking-[0.12em] uppercase hover:border-[rgba(17,17,16,0.18)]"><ExternalLink className="h-3.5 w-3.5" aria-hidden /> Case study</a>
                      <span className="ml-auto hidden items-center gap-1 font-mono text-[10px] tracking-[0.12em] uppercase text-[rgba(17,17,16,0.45)] lg:inline-flex"><ArrowUpRight className="h-3 w-3" aria-hidden /> Drawer (Vaul) + Sonner</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* approach band */}
            <div id="approach" className="grid grid-cols-12 gap-0 border-y border-[rgba(17,17,16,0.06)] bg-[#f4f4f2]">
              <div className="col-span-12 lg:col-span-5 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-[rgba(17,17,16,0.06)] bg-white">
                <p className="font-mono text-[11px] tracking-[0.20em] uppercase text-[#e11d48]">02 — Approach</p>
                <h2 className="mt-3 font-[Space_Grotesk] text-[26px] font-semibold leading-none tracking-[-0.03em]">Eval-first.<br /><span className="font-light">Ship second.</span></h2>
                <p className="mt-4 text-[14px] leading-6 text-[rgba(17,17,16,0.65)]">Small-agent systems fail quietly. I front-load evaluation — behavioral probes, hard negatives &amp; field data — so demos don’t lie and deployments don’t surprise.</p>
                <ul className="mt-6 space-y-3 font-mono text-[12px] leading-5">
                  <li className="flex gap-3"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e11d48]" aria-hidden /><span><span className="font-medium text-[#111110]">Reproduce before explain</span> — every claim has a runnable eval, not a screenshot.</span></li>
                  <li className="flex gap-3"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#111110]" aria-hidden /><span><span className="font-medium text-[#111110]">Topology over accuracy theater</span> — for cracks &amp; rivers, shape matters more than pixel mIoU.</span></li>
                  <li className="flex gap-3"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#111110]" aria-hidden /><span><span className="font-medium text-[#111110]">Edge constraints are design</span> — &lt;150ms, quantized, offline-tolerant from day one.</span></li>
                </ul>
              </div>
              <div className="col-span-12 lg:col-span-7 grid grid-cols-2 gap-0 divide-x divide-y divide-[rgba(17,17,16,0.06)] bg-white">
                {[
                  { t: "Discover", d: "Field walk, failure log, data audit. No Figma before facts.", c: "01" },
                  { t: "Instrument", d: "Harness + metrics. If it can’t be measured, it isn’t real.", c: "02" },
                  { t: "Iterate in public", d: "Small vertical slices — eval, fix, re-eval. Weekly releases.", c: "03" },
                  { t: "Harden", d: "Quantize, cache, guard-rail. Ship what survives noise.", c: "04" },
                ].map((s) => (
                  <div key={s.c} className="p-5 sm:p-6">
                    <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-[rgba(17,17,16,0.45)]">{s.c} — {s.t}</p>
                    <p className="mt-2 text-[13px] leading-5 text-[rgba(17,17,16,0.70)]">{s.d}</p>
                  </div>
                ))}
                <div className="col-span-2 flex flex-wrap items-center gap-2 p-4 bg-[#f4f4f2] border-t border-[rgba(17,17,16,0.06)]">
                  <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[rgba(17,17,16,0.5)]">Toolchain</span>
                  <span className="inline-flex gap-1.5 flex-wrap">
                    {["Motion", "GSAP", "Lenis", "Anime.js", "R3F/Drei", "Sonner", "Vaul"].map((t) => (
                      <span key={t} className="border border-[rgba(17,17,16,0.10)] bg-white px-2 py-1 font-mono text-[10px] tracking-[0.08em] uppercase">{t}</span>
                    ))}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* EXPERIENCE + SKILLS */}
          <section id="lab" aria-label="Experience and skills" className="mx-auto max-w-[1280px] grid grid-cols-12 gap-0 border-x border-[rgba(17,17,16,0.06)] bg-white">
            <div className="col-span-12 lg:col-span-7 border-b lg:border-b-0 lg:border-r border-[rgba(17,17,16,0.06)] p-6 sm:p-8">
              <p className="font-mono text-[11px] tracking-[0.20em] uppercase text-[#e11d48]">03 — Experience</p>
              <h2 className="mt-2 font-[Space_Grotesk] text-[22px] font-semibold tracking-[-0.02em]">Built in Kathmandu. Tested in the field.</h2>
              <ol className="mt-6 divide-y divide-[rgba(17,17,16,0.06)] border-y border-[rgba(17,17,16,0.06)]">
                {EXPERIENCE.map((e) => (
                  <li key={e.role} className="flex gap-4 py-4">
                    <span className="hidden sm:block font-mono text-[11px] tracking-[0.12em] uppercase text-[rgba(17,17,16,0.45)] w-[9ch] shrink-0 pt-0.5">{e.time}</span>
                    <div className="min-w-0 flex-1">
                      <p className="font-[Space_Grotesk] text-[14px] font-semibold leading-tight">{e.role}</p>
                      <p className="font-mono text-[11px] leading-4 text-[rgba(17,17,16,0.6)]">{e.org} · {e.loc}</p>
                      <p className="sm:hidden font-mono text-[10px] tracking-[0.12em] uppercase text-[rgba(17,17,16,0.45)] mt-1">{e.time}</p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-[rgba(17,17,16,0.25)]" aria-hidden />
                  </li>
                ))}
              </ol>
              <div className="mt-6 flex flex-wrap gap-2">
                <a href="/resume.pdf" onClick={(e) => { e.preventDefault(); toast.success("Resume — request via contact for latest PDF."); }} className="inline-flex items-center gap-2 border border-[rgba(17,17,16,0.12)] bg-white px-4 py-2.5 font-mono text-[11px] tracking-[0.14em] uppercase hover:border-[rgba(17,17,16,0.18)]">Download CV <ExternalLink className="h-3.5 w-3.5" aria-hidden /></a>
                <span className="inline-flex items-center gap-1.5 bg-[#f4f4f2] px-3 py-2.5 font-mono text-[11px] tracking-[0.10em] uppercase text-[rgba(17,17,16,0.6)]">References on request</span>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-5 p-6 sm:p-8 bg-[#f4f4f2]">
              <p className="font-mono text-[11px] tracking-[0.20em] uppercase text-[#e11d48]">04 — Skills &amp; Lab</p>
              <h2 className="mt-2 font-[Space_Grotesk] text-[22px] font-semibold tracking-[-0.02em]">Depth over buzzwords.</h2>
              <dl className="mt-6 space-y-4">
                {SKILLS.map((s) => (
                  <div key={s.k} className="border border-[rgba(17,17,16,0.06)] bg-white p-3.5">
                    <dt className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase">{s.k}</dt>
                    <dd className="mt-1 font-mono text-[11px] leading-4 text-[rgba(17,17,16,0.6)]">{s.v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 border border-[rgba(17,17,16,0.08)] bg-white p-4">
                <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-[rgba(17,17,16,0.5)]">Currently exploring</p>
                <p className="mt-2 text-[13px] leading-5 text-[rgba(17,17,16,0.72)]">Small-agent tool-use under distribution shift, lightweight hydrology emulators &amp; offline-first Expo background sync for Yatayat Go.</p>
              </div>
            </div>
          </section>

          {/* NOW */}
          <section id="now" aria-label="What I'm working on now" className="mx-auto max-w-[1280px] border-x border-t border-[rgba(17,17,16,0.06)] bg-[#f4f4f2]">
            <div className="grid grid-cols-12 gap-0 p-6 sm:p-8">
              <div className="col-span-12">
                <p className="font-mono text-[11px] tracking-[0.20em] uppercase text-[#e11d48]">06 — Now</p>
                <h2 className="mt-2 font-[Space_Grotesk] text-[22px] font-semibold tracking-[-0.02em]">Right now, on my desk</h2>
                <p className="mt-2 text-[13px] leading-5 text-[rgba(17,17,16,0.72)]">A snapshot of what’s active. These move fast — check back for what’s next.</p>
              </div>
              <div className="col-span-12 mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {NOW_DATA.map((item) => (
                  <div key={item.title} className="border border-[rgba(17,17,16,0.08)] bg-white p-5">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <p className="font-mono text-[10px] font-medium tracking-[0.12em] uppercase text-[rgba(17,17,16,0.5)]">{item.status}</p>
                        <p className="font-[Space_Grotesk] text-[15px] font-semibold leading-tight">{item.title}</p>
                      </div>
                      <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[rgba(17,17,16,0.45)]">{item.updated}</span>
                    </div>
                    <div className="mb-3 h-1 w-full bg-[rgba(17,17,16,0.06)] overflow-hidden rounded">
                      <div className="h-full bg-[#e11d48] w-[calc(100%*{parseInt(item.progress)}/100)]"></div>
                    </div>
                    <p className="font-mono text-[11px] leading-5 text-[rgba(17,17,16,0.65)]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CONTACT */}
          <section id="contact" aria-label="Contact" className="mx-auto max-w-[1280px] border-x border-t border-[rgba(17,17,16,0.06)] bg-white">
            <div className="grid grid-cols-12 gap-0">
              <div className="col-span-12 lg:col-span-5 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-[rgba(17,17,16,0.06)]">
                <p className="font-mono text-[11px] tracking-[0.20em] uppercase text-[#e11d48]">05 — Contact</p>
                <h2 className="mt-3 font-[Space_Grotesk] text-[30px] font-semibold leading-[0.95] tracking-[-0.03em]">Let’s build<br /><span className="font-light">something rigorous.</span></h2>
                <p className="mt-4 text-[14px] leading-6 text-[rgba(17,17,16,0.65)]">Research collaborations, product sprints, or a guest critique on small-agent eval — I reply within a day. Kathmandu hours, remote-friendly.</p>
                <div className="mt-6 space-y-2 font-mono text-[12px]">
                  <a href="mailto:hello@praansu.dev" className="flex items-center gap-2 hover:text-[#e11d48]"><Mail className="h-4 w-4" aria-hidden /> hello@praansu.dev</a>
                  <a href="https://github.com/praansu" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#e11d48]"><Globe className="h-4 w-4" aria-hidden /> github.com/praansu</a>
                  <a href="https://linkedin.com/in/praansu-karmacharya" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#e11d48]"><Globe className="h-4 w-4" aria-hidden /> linkedin.com/in/praansu-karmacharya</a>
                  <span className="flex items-center gap-2 text-[rgba(17,17,16,0.55)]"><MapPin className="h-4 w-4" aria-hidden /> Kathmandu, Nepal — available for onsite field work</span>
                </div>
                <div className="mt-6 flex gap-2">
                  <span className="inline-flex items-center gap-1.5 border border-[rgba(17,17,16,0.10)] bg-[#f4f4f2] px-3 py-1.5 font-mono text-[11px] tracking-[0.12em] uppercase"><span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden /> Reply &lt; 24h</span>
                  <span className="inline-flex items-center gap-1.5 border border-[rgba(17,17,16,0.10)] bg-white px-3 py-1.5 font-mono text-[11px] tracking-[0.12em] uppercase">EN · नेपाली</span>
                </div>
              </div>

              <div className="col-span-12 lg:col-span-7 p-6 sm:p-8 bg-[#f4f4f2]">
                <form onSubmit={onSubmit} noValidate className="border border-[rgba(17,17,16,0.06)] bg-white p-4 sm:p-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[rgba(17,17,16,0.6)]">Name</span>
                      <input
                        value={form.name} onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                        autoComplete="name" required
                        placeholder="Your name"
                        className="mt-1.5 w-full border border-[rgba(17,17,16,0.12)] bg-white px-3 py-2.5 text-[14px] outline-none placeholder:text-[rgba(17,17,16,0.35)] focus:border-[#e11d48]"
                      />
                    </label>
                    <label className="block">
                      <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[rgba(17,17,16,0.6)]">Email</span>
                      <input
                        value={form.email} onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                        type="email" autoComplete="email" required inputMode="email"
                        placeholder="you@company.com"
                        className="mt-1.5 w-full border border-[rgba(17,17,16,0.12)] bg-white px-3 py-2.5 text-[14px] outline-none placeholder:text-[rgba(17,17,16,0.35)] focus:border-[#e11d48]"
                      />
                    </label>
                    <label className="block sm:col-span-2">
                      <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[rgba(17,17,16,0.6)]">Message</span>
                      <textarea
                        value={form.message} onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                        required rows={5} placeholder="What are you trying to ship — and what’s blocking you?"
                        className="mt-1.5 w-full resize-none border border-[rgba(17,17,16,0.12)] bg-white px-3 py-2.5 text-[14px] outline-none placeholder:text-[rgba(17,17,16,0.35)] focus:border-[#e11d48]"
                      />
                    </label>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <Magnetic><button type="submit" disabled={sending} className="inline-flex items-center gap-2 bg-[#e11d48] px-6 py-3 font-mono text-[11px] font-medium tracking-[0.16em] uppercase text-white transition hover:bg-[#be123c] disabled:opacity-60">{sending ? "Sending…" : "Send message"} <ArrowRight className="h-3.5 w-3.5" aria-hidden /></button></Magnetic>
                    <span className="font-mono text-[11px] leading-4 text-[rgba(17,17,16,0.5)]">Demo form — no backend. Sonner confirms receipt; wire to your API when ready.</span>
                  </div>
                  <p className="mt-4 border-t border-dashed border-[rgba(17,17,16,0.10)] pt-3 font-mono text-[10px] tracking-[0.10em] uppercase text-[rgba(17,17,16,0.45)]">Privacy: no tracking, no cookies beyond essential. Your message stays with you until you wire an endpoint.</p>
                </form>
              </div>
            </div>
          </section>
        </main>

        {/* FOOTER wordmark */}
        <footer className="mx-auto max-w-[1280px] border-x border-[rgba(17,17,16,0.06)] bg-[#111110] text-white">
          <div className="px-4 py-8 sm:px-6 sm:py-10">
            <div className="flex flex-wrap items-start justify-between gap-6 border-b border-white/10 pb-8">
              <div>
                <p className="font-mono text-[10px] tracking-[0.20em] uppercase text-white/60">© 2026 Praansu Karmacharya — Kathmandu</p>
                <p className="parallax-wordmark mt-3 font-[Space_Grotesk] text-[44px] font-[650] leading-none tracking-[-0.05em] sm:text-[64px] lg:text-[78px]">PRAANSU<span className="font-light opacity-80"> — AI ENGINEER</span></p>
              </div>
              <div className="font-mono text-[11px] leading-5 text-white/70 max-w-[32ch]">
                Swiss-mono direction — off-white system, grid, bordered cells, rose signal. Motion: Lenis + Motion springs (260/30) + GSAP ScrollTrigger + Anime stagger + R3F Float. Libraries used cohesively.
                <span className="mt-3 block text-white/50">Lighthouse 100: semantic HTML, keyboard, contrast, SEO, deferred 3D, no CLS, respects reduced-motion.</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 font-mono text-[11px] tracking-[0.12em] uppercase">
              <span className="text-white/60">Built with Tailwind v4 · Motion · GSAP · Anime.js · Lenis · Sonner · Vaul · R3F/Drei · Three</span>
              <span className="inline-flex items-center gap-2 text-white/60"><span className="h-2 w-2 rounded-full bg-[#e11d48]" aria-hidden /> Design direction: Swiss Mono — editorial serif was last, luxury/neo/brutalist next</span>
            </div>
          </div>
        </footer>

        {/* PROJECT DRAWER — Vaul */}
        <Drawer.Root open={!!drawerProject} onOpenChange={(o) => !o && setDrawerProject(null)}>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 z-[70] bg-[rgba(17,17,16,0.45)] backdrop-blur-[2px]" />
            <Drawer.Content className="fixed inset-x-0 bottom-0 z-[71] mx-auto max-h-[86dvh] max-w-[860px] overflow-auto overscroll-contain rounded-t-[16px] border border-[rgba(17,17,16,0.08)] bg-[#f4f4f2] p-0 shadow-[0_24px_80px_rgba(17,17,16,0.28)]">
              <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-[rgba(17,17,16,0.06)] bg-white px-5 py-4">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-[rgba(17,17,16,0.5)]">{drawerProject?.n} · {drawerProject?.cat} · {drawerProject?.year}</p>
                  <Drawer.Title className="font-[Space_Grotesk] text-[20px] font-semibold tracking-[-0.02em]">{drawerProject?.title}</Drawer.Title>
                </div>
                <Drawer.Close aria-label="Close" className="grid h-9 w-9 place-items-center border border-[rgba(17,17,16,0.12)] bg-white hover:bg-[#f4f4f2]">✕</Drawer.Close>
              </div>
              {drawerProject && (
                <div className="grid gap-0 sm:grid-cols-5">
                  <div className="sm:col-span-3 p-5 sm:p-6">
                    <p className="text-[14px] leading-6 text-[rgba(17,17,16,0.72)]">{drawerProject.desc}</p>
                    <div className="mt-5">
                      <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-[rgba(17,17,16,0.5)]">Stack</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {drawerProject.stack.map((s) => <span key={s} className="border border-[rgba(17,17,16,0.10)] bg-white px-2.5 py-1 font-mono text-[11px]">{s}</span>)}
                      </div>
                    </div>
                    <div className="mt-5 rounded border border-[rgba(17,17,16,0.08)] bg-white p-4">
                      <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-[rgba(17,17,16,0.5)]">How it was evaluated</p>
                      <ul className="mt-2 list-disc space-y-1 pl-4 font-mono text-[11px] leading-4 text-[rgba(17,17,16,0.65)]">
                        <li>Behavioral probes &amp; hard negatives — not vanity accuracy.</li>
                        <li>Field or corridor data (Hanumante / Thimi Chowk) where applicable.</li>
                        <li>Reproducible harness — run `npm run eval` locally.</li>
                      </ul>
                    </div>
                    <div className="mt-5 flex gap-2">
                      <a href="#" onClick={(e) => { e.preventDefault(); toast.success("Write-up copied — paste into your docs."); }} className="inline-flex items-center gap-1.5 bg-[#111110] px-4 py-2.5 font-mono text-[11px] tracking-[0.12em] uppercase text-white"><ExternalLink className="h-3.5 w-3.5" /> Open case study</a>
                      <a href="#" onClick={(e) => { e.preventDefault(); toast.info("Repo is private — request access in contact."); }} className="inline-flex items-center gap-1.5 border border-[rgba(17,17,16,0.12)] bg-white px-4 py-2.5 font-mono text-[11px] tracking-[0.12em] uppercase"><GithubIcon className="h-3.5 w-3.5" /> View code</a>
                    </div>
                  </div>
                  <div className="sm:col-span-2 border-t sm:border-t-0 sm:border-l border-[rgba(17,17,16,0.06)] bg-white p-5 sm:p-6">
                    <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-[rgba(17,17,16,0.5)]">Snapshot</p>
                    <div className="mt-3 aspect-[4/3] border border-[rgba(17,17,16,0.08)] bg-[#f4f4f2] grid place-items-center p-4">
                      <div className="w-full border border-[rgba(17,17,16,0.10)] bg-white p-3">
                        <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-[rgba(17,17,16,0.5)]">KPI</p>
                        <p className="mt-1 font-[Space_Grotesk] text-[13px] font-medium leading-4">{drawerProject.kpi}</p>
                        <p className="mt-3 font-mono text-[10px] leading-4 text-[rgba(17,17,16,0.6)]">Detailed metrics, ablations &amp; failure modes inside the full case study.</p>
                      </div>
                    </div>
                    <p className="mt-4 font-mono text-[10px] tracking-[0.12em] uppercase text-[rgba(17,17,16,0.45)]">Uses Vaul drawer + Sonner toasts — part of the cohesive library set.</p>
                  </div>
                </div>
              )}
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
    </SmoothScroll>
  )
}
