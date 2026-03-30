import { useCallback, useEffect, useState } from "react";
import Particles from "@tsparticles/react";
import { type Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim"; // slim to keep it lightweight!

export const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  // Fully disable particles when user prefers reduced motion
  if (prefersReducedMotion) return null;

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'auto' }}>
      <Particles
        id="tsparticles"
        {...{ init: particlesInit }}
        options={{
          fullScreen: { enable: false },
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: {
                enable: !isMobile, // Disable hover on mobile
                mode: "repulse",
              },
            },
            modes: {
              repulse: {
                distance: 100,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: ["#e0c184", "#2ec878"], // gold and emerald green
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.1,
              width: 1,
              triangles: {
                enable: !isMobile, // Disable triangles on mobile for perf
                opacity: 0.05,
              }
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: isMobile ? 0.5 : 0.8, // Slower on mobile
              straight: false,
            },
            number: {
              density: {
                enable: true,
              },
              value: isMobile ? 25 : 60, // Reduced particle count on mobile
            },
            opacity: {
              value: isMobile ? 0.3 : 0.4,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};
