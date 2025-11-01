"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ExperienceSection() {
    const sectionRef = useRef(null);
    const lenisRef = useRef(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const experiences = [
        {
            date: "January 2021 - December 2023",
            title: "B.Sc Information Technology",
            company: "North West University",
            description: "Studying Undergraduate B.Sc in Information Technology",
            type: "education"
        },
        {
            date: "July 2023 - May 2024",
            title: "Technical Support Engineer (Intern)",
            company: "MICT SETA - North West University",
            description: "Provided technical support and troubleshooting for university systems",
            type: "work"
        },
        {
            date: "October 2024 - November 2024",
            title: "Field Support Engineer (Temporary)",
            company: "PurpleBlue Technologies",
            description: "On-site technical support and system maintenance",
            type: "work"
        },
        {
            date: "December 2024 - Current",
            title: "Admin Clerk",
            company: "Boikhutso Mining and Engineering",
            description: "Administrative support and office management",
            type: "work"
        },
    ];

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        lenisRef.current = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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

        // Animate each timeline card as it enters the viewport
        experiences.forEach((_, index) => {
            gsap.from(`.experience-card-${index}`, {
                x: index % 2 === 0 ? -100 : 100,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: `.experience-card-${index}`,
                    start: "top 80%",
                    end: "top 50%",
                    toggleActions: "play none none reverse",
                },
            });
        });

        return () => {
            if (lenisRef.current) lenisRef.current.destroy();
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill(true, true));
        };
    }, [experiences]);

    return (
        <section
            ref={sectionRef}
            id="experience"
            className="relative w-full min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-start py-20 px-6 font-mono overflow-hidden"
        >

            {/* Terminal scan lines */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)] dark:bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.02)_2px,rgba(255,255,255,0.02)_4px)]" />
            </div>

            {/* Header - Terminal Style */}
            <div className="relative z-10 mb-16 text-center max-w-4xl">
                <div className="border-2 border-zinc-400 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 inline-block">
                    {/* Terminal header */}
                    <div className="bg-zinc-300 dark:bg-zinc-800 px-4 py-2 flex items-center gap-2 border-b-2 border-zinc-400 dark:border-zinc-700">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                        </div>
                        <span className="text-xs text-zinc-700 dark:text-zinc-300 ml-2">
                            EXPERIENCE.LOG
                        </span>
                    </div>

                    {/* Title */}
                    <div className="px-8 py-6">
                        <div className="flex items-center gap-2 text-green-600 dark:text-green-500 text-sm mb-2">
                            <span>$</span>
                            <span>cat experience.log</span>
                        </div>
                        <h2 className="text-5xl font-extrabold uppercase text-zinc-900 dark:text-zinc-100">
                            Experience <span className="text-green-600 dark:text-green-500">&gt;_</span>
                        </h2>
                    </div>
                </div>
            </div>

            {/* Timeline */}
            <div className="relative w-full max-w-4xl flex flex-col gap-8 z-10">
                {experiences.map((exp, index) => (
                    <div
                        key={index}
                        className={`flex items-start gap-6 experience-card-${index} ${
                            index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                        }`}
                    >
                        {/* Timeline connector */}
                        <div className="flex flex-col items-center flex-shrink-0">
                            <div className="w-5 h-5 bg-green-500 dark:bg-green-600 rounded-full border-2 border-zinc-900 dark:border-zinc-100 animate-pulse"></div>
                            {index !== experiences.length - 1 && (
                                <div className="w-0.5 h-full min-h-[80px] bg-gradient-to-b from-green-500 to-green-700 dark:from-green-600 dark:to-green-800 mt-2"></div>
                            )}
                        </div>

                        {/* Terminal Card */}
                        <div className="flex-1 border-2 border-zinc-400 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 shadow-lg hover:shadow-xl transition-shadow">
                            {/* Card Terminal Header */}
                            <div className="bg-zinc-300 dark:bg-zinc-800 px-4 py-1.5 flex items-center justify-between border-b-2 border-zinc-400 dark:border-zinc-700">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-red-500" />
                                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                                        <div className="w-2 h-2 rounded-full bg-green-500" />
                                    </div>
                                    <span className="text-xs text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                                        {exp.type === "education" ? "~/education" : "~/work"}
                                    </span>
                                </div>
                                <span className="text-xs text-green-600 dark:text-green-500 font-bold">
                                    [{index + 1}/{experiences.length}]
                                </span>
                            </div>

                            {/* Card Content */}
                            <div className="p-6 space-y-3">
                                {/* Date with terminal prompt */}
                                <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-500">
                                    <span>$</span>
                                    <span className="text-zinc-600 dark:text-zinc-400 font-semibold uppercase tracking-widest">
                                        {exp.date}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wide">
                                    {exp.title}
                                </h3>

                                {/* Company */}
                                <div className="flex items-start gap-2 text-sm">
                                    <span className="text-green-600 dark:text-green-500 mt-0.5">▸</span>
                                    <p className="text-zinc-700 dark:text-zinc-300 font-semibold">
                                        {exp.company}
                                    </p>
                                </div>

                                {/* Description */}
                                <div className="pt-2 border-t border-zinc-300 dark:border-zinc-700">
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                        {exp.description}
                                    </p>
                                </div>

                                {/* Terminal footer */}
                                <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-600 pt-2">
                                    <span className="animate-pulse">█</span>
                                    <span>EOF</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Decorative side text */}
            <div className="hidden lg:block absolute left-4 top-1/2 -translate-y-1/2">
                <div className="rotate-90 text-xs tracking-[0.3em] uppercase text-zinc-500 whitespace-nowrap origin-center">
                    <span className="text-green-600 dark:text-green-500">~/</span>
                    Career Timeline · 2021-2025
                </div>
            </div>

            {/* Blinking cursor decoration */}
            <div className="hidden lg:block absolute right-8 top-8 text-green-600 dark:text-green-500 text-2xl animate-pulse">
                █
            </div>
        </section>
    );
}