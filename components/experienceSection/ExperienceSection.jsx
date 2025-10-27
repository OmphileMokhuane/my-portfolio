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
        { date: "January 2021 - December, 2023", description: "North West University: Studying Undergraduate B.Sc in Information Technology" },
        { date: "July, 2023 - May, 2024", description: "MICT SETA - North West University: Technical Support Engineer (Intern)" },
        { date: "October, 2024 - November, 2024", description: "PurpleBlue Technologies: Field Support Engineer (Temporary)" },
        { date: "December, 2024 - Current", description: "Boikhutso Mining and Engineering: Admin Clerk" },
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

        // Animate each timeline card as it enters viewport
        experiences.forEach((_, index) => {
            gsap.from(`.experience-card-${index}`, {
                y: 100,
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
            <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-8">
                Experience Timeline
            </h2>

            <div className="relative w-full max-w-4xl flex flex-col gap-16">
                {experiences.map((exp, index) => (
                    <div
                        key={index}
                        className={`flex items-start gap-6 experience-card-${index}`}
                    >
                        {/* Bullet + line */}
                        <div className="flex flex-col items-center">
                            <div className="w-4 h-4 bg-green-500 rounded-full mt-1"></div>
                            {index !== experiences.length - 1 && (
                                <div className="w-px flex-1 bg-green-500 mt-1"></div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="bg-black/80 dark:bg-zinc-900/80 border border-green-500 rounded-lg p-6 text-green-400 shadow-lg flex-1">
                            <div className="text-xs text-green-500 mb-2">{exp.date}</div>
                            <p className="text-base">{exp.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
