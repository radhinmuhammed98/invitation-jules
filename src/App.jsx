import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Html, Billboard, useTexture, Sparkles, Text } from "@react-three/drei";
import gsap from "gsap";
import Lenis from "lenis";

const EVENT_DATE = new Date("2026-06-14T15:00:00");
const GOLD = "#d6b36b";
const BROWN_DARK = "#130a06";
const BROWN_MID = "#2e1a12";
const BROWN_SOFT = "#4a2a1d";

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const targetRef = useRef(0);

  useEffect(() => {
    const tickerUpdate = () => {
      setProgress((prev) => prev + (targetRef.current - prev) * 0.08);
    };

    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    gsap.ticker.add(tickerUpdate);

    return () => {
      window.removeEventListener("scroll", onScroll);
      gsap.ticker.remove(tickerUpdate);
    };
  }, []);

  return progress;
}

function Countdown() {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000 * 60);
    return () => clearInterval(timer);
  }, []);

  const parts = useMemo(() => {
    const diffMs = Math.max(EVENT_DATE.getTime() - now, 0);
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
    const hours = totalHours % 24;
    const totalDays = Math.floor(totalHours / 24);
    const months = Math.floor(totalDays / 30.4375);
    const days = totalDays - Math.floor(months * 30.4375);

    return { months, days, hours };
  }, [now]);

  return (
    <aside className="countdown">
      <p className="countdown-title">Counting Down To Our Day</p>
      <div className="countdown-grid">
        <TimeBlock label="MONTHS" value={parts.months} />
        <TimeBlock label="DAYS" value={parts.days} />
        <TimeBlock label="HOURS" value={parts.hours} />
      </div>
    </aside>
  );
}

function TimeBlock({ label, value }) {
  return (
    <div className="time-block">
      <span className="time-value">{String(value).padStart(2, "0")}</span>
      <span className="time-label">{label}</span>
    </div>
  );
}

function CameraRig({ progress }) {
  const { camera } = useThree();

  useFrame(() => {
    const targetZ = 8 - progress * 60;
    camera.position.z += (targetZ - camera.position.z) * 0.08;
    camera.lookAt(0, 0, -20);
  });

  return null;
}

function FloralTunnel() {
  return (
    <>
      <Sparkles
        count={300}
        scale={[20, 20, 60]}
        size={2}
        speed={0.3}
        color="#ffffff"
        opacity={0.6}
        position={[0, 0, -25]}
      />
      <Sparkles
        count={200}
        scale={[25, 25, 70]}
        size={4}
        speed={0.1}
        color={GOLD}
        opacity={0.4}
        position={[0, 0, -25]}
      />
    </>
  );
}

function FloatingRings() {
  const rings = Array.from({ length: 6 }).map((_, i) => ({
    z: -8 - i * 8,
    rotX: Math.random() * Math.PI,
    rotY: Math.random() * Math.PI,
  }));

  return (
    <group>
      {rings.map((ring, i) => (
        <Float key={i} speed={1.5} rotationIntensity={1} floatIntensity={2}>
          <mesh position={[0, 0, ring.z]} rotation={[ring.rotX, ring.rotY, 0]}>
            <torusGeometry args={[3.5, 0.05, 16, 100]} />
            <meshStandardMaterial color={GOLD} metalness={1} roughness={0.1} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function Verse({ progress }) {
  const opacity = Math.max(0, 1 - progress * 8);
  const scale = 1 + progress * 20;

  return (
    <group position={[0, 0, 2]}>
      <Text
        position={[0, 0.4, 0]}
        fontSize={0.4}
        color="#f5d78f"
        anchorX="center"
        anchorY="middle"
        fillOpacity={opacity}
        maxWidth={4}
        textAlign="center"
      >
        "And We created you in pairs"
      </Text>
      <Text
        position={[0, -0.2, 0]}
        fontSize={0.2}
        color="#f5d78f"
        anchorX="center"
        anchorY="middle"
        fillOpacity={opacity * 0.8}
      >
        (Surah An-Naba 78:8)
      </Text>

      {progress > 0 && progress < 0.3 && (
        <Sparkles
          count={100}
          scale={[scale, scale, scale * 0.5]}
          size={1.5}
          speed={0.4}
          color="#f5d78f"
          opacity={Math.max(0, 1 - progress * 5)}
          position={[0, 0, -1]}
        />
      )}
    </group>
  );
}

function PhotoPlane({ url, z, rot = [0, 0, 0] }) {
  const texture = useTexture(url);

  return (
    <Float speed={1.2} rotationIntensity={0.35} floatIntensity={1.6}>
      <group position={[0, 0, z]} rotation={rot}>
        <Billboard>
          <mesh position={[0, 0, -0.05]}>
            <planeGeometry args={[8.8, 5.8]} />
            <meshStandardMaterial color="#20110b" metalness={0.3} roughness={0.65} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <planeGeometry args={[8.2, 5.2]} />
            <meshStandardMaterial map={texture} toneMapped transparent />
          </mesh>
        </Billboard>
      </group>
    </Float>
  );
}

function EndSceneKiosk() {
  return (
    <group position={[0, -0.4, -55]}>
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[10, 6]} />
        <meshStandardMaterial color={BROWN_MID} metalness={0.5} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[10.2, 6.2]} />
        <meshStandardMaterial color={GOLD} metalness={0.8} roughness={0.3} />
      </mesh>

      <Text
        fontSize={1.2}
        color={GOLD}
        anchorX="center"
        anchorY="middle"
        position={[0, 1.8, 0]}
        maxWidth={20}
      >
        Althaf Hameed & Fathima
      </Text>
      <Text
        fontSize={0.5}
        color="#f5ddaa"
        anchorX="center"
        anchorY="middle"
        position={[0, 0.4, 0]}
        maxWidth={18}
      >
        Sunday, June 14, 2026 at 3:00 PM
      </Text>
      <Text
        fontSize={0.4}
        color="#f5ddaa"
        anchorX="center"
        anchorY="middle"
        position={[0, -0.2, 0]}
        maxWidth={18}
      >
        Surabhi Auditorium, Perambra
      </Text>
      <Html center position={[0, -1.8, 0]} zIndexRange={[100, 0]}>
        <div className="kiosk-actions">
          <a
            className="maps-btn"
            href="https://maps.google.com/?q=Surabhi+Auditorium+Perambra"
            target="_blank"
            rel="noreferrer"
          >
            Get Directions
          </a>
          <div className="action-row">
            <a href="data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ADTSTART:20260614T093000Z%0ADTEND:20260614T113000Z%0ASUMMARY:Althaf%20%26%20Fathima%20Wedding%0ALOCATION:Surabhi%20Auditorium%2C%20Perambra%0AEND:VEVENT%0AEND:VCALENDAR" className="action-btn" download="wedding_invitation.ics">Save to Calendar</a>
            <a href="https://wa.me/?text=Join%20us%20for%20the%20wedding%20of%20Althaf%20%26%20Fathima%20on%20June%2014%2C%202026!%20%23Wedding" target="_blank" rel="noreferrer" className="action-btn">Share on WhatsApp</a>
          </div>
        </div>
      </Html>
    </group>
  );
}

function Scene({ progress }) {
  return (
    <>
      <color attach="background" args={[BROWN_DARK]} />
      <fog attach="fog" args={[BROWN_DARK, 18, 92]} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[2, 4, 2]} intensity={1.5} color="#ffd580" />
      <pointLight position={[-8, 2, -16]} intensity={1.5} color="#c89a58" />

      <Sparkles
        count={240}
        scale={[90, 45, 100]}
        size={3}
        speed={0.26}
        color={GOLD}
        noise={0.45}
        opacity={0.85}
      />

      <FloralTunnel />
      <FloatingRings />

      <CameraRig progress={progress} />
      <Verse progress={progress} />

      <PhotoPlane url="/photo1.jpg" z={0} rot={[0.02, -0.22, 0]} />
      <PhotoPlane url="/photo2.jpg" z={-20} rot={[-0.02, 0.2, 0]} />
      <PhotoPlane url="/photo3.jpg" z={-40} rot={[0.04, -0.12, 0]} />

      <EndSceneKiosk />
    </>
  );
}

export default function App() {
  const progress = useScrollProgress();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    let reqId;
    function raf(time) {
      lenis.raf(time);
      reqId = requestAnimationFrame(raf);
    }

    reqId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(reqId);
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleOpen = () => {
    setIsOpened(true);
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="app-shell">
      <div className={`intro-envelope ${isOpened ? "hidden" : ""}`}>
        <h1>Invitation</h1>
        <button className="open-btn" onClick={handleOpen}>
          Click to Open
        </button>
      </div>
      <div className="gradient-layer" />

      <Canvas camera={{ position: [0, 0, 8], fov: 46 }}>
        <Scene progress={progress} />
      </Canvas>

      <div className="scroll-sections">
        <div className="section-container">
          <h1 className="brutalist-text">ALTHAF & FATHIMA</h1>
        </div>

        <div className="section-container">
          <div className="floral-border">
            <h2 className="elegant-title">Counting Down</h2>
            <Countdown />
          </div>
        </div>

        <div className="section-container">
          <div className="floral-border">
            <h2 className="elegant-title">The Venue</h2>
            <div className="map-container">
              <iframe
                title="Surabhi Auditorium Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1136.216393527961!2d75.7330554!3d11.5645831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba680482b84501b%3A0xe7bc32fcf224c657!2sSurabhi%20Auditorium!5e0!3m2!1sen!2sin!4v1715424000000!5m2!1sen!2sin"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <audio ref={audioRef} src="/quran.mp3" preload="auto" hidden loop />
      <button className="audio-toggle" onClick={toggleAudio}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <div className="scroll-space" />
    </div>
  );
}
