"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { useTheme } from "next-themes";

export function ParticlesBackground() {
    const [init, setInit] = useState(false);
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = async (container?: Container): Promise<void> => {
        // console.log(container);
    };

    const isDark = resolvedTheme === "dark";

    const options: ISourceOptions = {
        background: {
            color: {
                value: "transparent",
            },
        },
        fpsLimit: 120,
        interactivity: {
            events: {
                onClick: {
                    enable: true,
                    mode: "push",
                },
                onHover: {
                    enable: true,
                    mode: "repulse",
                },
            },
            modes: {
                push: {
                    quantity: 4,
                },
                repulse: {
                    distance: 200,
                    duration: 0.4,
                },
            },
        },
        particles: {
            color: {
                value: isDark ? ["#06b6d4", "#7c3aed"] : ["#3b82f6", "#8b5cf6"],
            },
            links: {
                color: isDark ? "#ffffff" : "#000000",
                distance: 150,
                enable: true,
                opacity: isDark ? 0.2 : 0.1,
                width: 1,
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "bounce",
                },
                random: true,
                speed: 1,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                },
                value: 80, // Slightly reduced to prevent overwhelming light mode
            },
            opacity: {
                value: isDark ? 0.5 : 0.3,
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 3 },
            },
        },
        detectRetina: true,
    };

    if (!init) {
        return null;
    }

    return (
        <Particles
            key={resolvedTheme} // Force re-render on theme change
            id="tsparticles"
            particlesLoaded={particlesLoaded}
            options={options}
            className="absolute inset-0 -z-10"
        />
    );
}
