"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { robotoMono, manoloMono } from "@/app/fonts"; // ✅ imported from shared fonts file
import VersionTag from "@/components/heroSection/VersionTag"; // ✅ your new server-side version tag

export default function HeroSection() {
    const experienceRef = useRef(null);
    const topRef = useRef(null);
    const middleRef = useRef(null);
    const bottomRef = useRef(null);
    const tlRef = useRef(null);
    const lenisRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        lenisRef.current = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        lenisRef.current.on("scroll", ScrollTrigger.update);

        function raf(time) {
            lenisRef.current.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        if (!experienceRef.current || !topRef.current || !middleRef.current || !bottomRef.current) {
            return;
        }

        // initial state
        gsap.set(middleRef.current, { scale: 0.1, opacity: 0 });

        // scroll animation
        tlRef.current = gsap.timeline({
            scrollTrigger: {
                trigger: experienceRef.current,
                start: "top top",
                end: "+=2000",
                scrub: 1,
                pin: experienceRef.current,
                pinSpacing: true,
                markers: false,
            },
        });

        tlRef.current.to(middleRef.current, {
            scale: 1,
            opacity: 1,
            duration: 1,
        }, 0);

        return () => {
            if (tlRef.current) tlRef.current.kill();
            if (lenisRef.current) lenisRef.current.destroy();
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill(true, true));
        };
    }, []);

    return (
        <section
            ref={experienceRef}
            className="relative w-full h-screen overflow-hidden bg-zinc-50 dark:bg-black"
            id="hero"
        >
            {/* Background overlays */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)] dark:bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.02)_2px,rgba(255,255,255,0.02)_4px)]" />
            </div>

            {/* Top Left - Terminal Prompt */}
            <div ref={topRef} className={`absolute top-8 left-8 z-10 ${manoloMono.className}`}>
                <div className="border-2 border-zinc-300 dark:border-zinc-700 bg-zinc-100/90 dark:bg-zinc-900/90 px-6 py-4 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-500 text-sm mb-2">
                        <span>$</span>
                        <span>init portfolio</span>
                    </div>
                    <div className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">
                        Welcome<span className="animate-pulse text-green-600 dark:text-green-500">_</span>
                    </div>
                </div>
            </div>

            {/* Center - Terminal Window */}
            <div className="absolute inset-0 flex justify-center items-center z-10">
                <div ref={middleRef} className={`text-center ${robotoMono.className}`}>
                    <div className="border-2 border-zinc-400 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 shadow-2xl max-w-3xl mx-auto">
                        <div className="bg-zinc-300 dark:bg-zinc-800 px-4 py-2 flex items-center gap-2 border-b-2 border-zinc-400 dark:border-zinc-700">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                            </div>
                            <span className="text-xs text-zinc-700 dark:text-zinc-300 ml-2">
                                ~/portfolio/index.sh
                            </span>
                        </div>

                        <div className="px-8 py-12 bg-black text-green-500 text-left font-mono">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-green-600">$</span>
                                    <span className="text-zinc-400">whoami</span>
                                </div>
                                <h1 className="text-5xl md:text-6xl font-bold text-green-400 pl-4">
                                    Omphile Mokhuane
                                </h1>

                                <div className="flex items-center gap-2 mt-6">
                                    <span className="text-green-600">$</span>
                                    <span className="text-zinc-400">cat role.txt</span>
                                </div>
                                <p className="text-2xl md:text-3xl text-green-500 pl-4">
                                    &gt; Junior Front-end Developer
                                </p>

                                <div className="flex items-center gap-2 mt-6">
                                    <span className="text-green-600">$</span>
                                    <span className="text-zinc-400">location</span>
                                </div>
                                <p className="text-2xl md:text-3xl text-green-500 pl-4">
                                    &gt; Rustenburg, North West
                                </p>

                                <div className="flex items-center gap-2 mt-6">
                                    <span className="text-green-600">$</span>
                                    <span className="text-zinc-400">status</span>
                                </div>
                                <div className="pl-4 text-sm text-zinc-500 space-y-1">
                                    <p>[<span className="text-green-500">●</span>] System ready</p>
                                    <p>[<span className="text-green-500">●</span>] Loading portfolio...</p>
                                    <p>[<span className="text-green-500">●</span>] Scroll to explore <span className="animate-pulse">▼</span></p>
                                </div>

                                <div className="flex items-center gap-2 mt-4">
                                    <span className="text-green-600">$</span>
                                    <span className="animate-pulse">█</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Right - Output */}
            <div ref={bottomRef} className={`absolute bottom-8 right-8 text-right z-10 ${manoloMono.className}`}>
                <div className="border-2 border-zinc-300 dark:border-zinc-700 bg-zinc-100/90 dark:bg-zinc-900/90 px-6 py-4 backdrop-blur-sm">
                    <div className="flex items-center justify-end gap-2 text-green-600 dark:text-green-500 text-xs mb-2">
                        <span className="opacity-60">OUTPUT:</span>
                        <span className="animate-pulse inline-block rotate-90">▶</span>
                    </div>
                    <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                        To My Portfolio Website
                    </div>
                    <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 flex items-center justify-end gap-2">
                        <span>[SCROLL]</span>
                        <span className="animate-bounce">↓</span>
                    </div>
                </div>
            </div>

            {/* Top-right status */}
            <div className="absolute top-4 right-4 text-green-600 dark:text-green-500 text-xs font-mono opacity-50">
                [ONLINE]
            </div>

            {/* ✅ Server-side Version Tag */}
            <VersionTag />
        </section>
    );
}
