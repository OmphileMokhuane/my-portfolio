"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import EditionYear from "@/components/aboutSection/EditionYear";

export default function AboutSection() {
    const terminalRef = useRef(null)

    const birthYear = 2002
    const age = new Date().getFullYear() - birthYear



    useEffect(() => {
        // Typing effect for terminal
        const terminalText = terminalRef.current?.querySelector('.terminal-text')
        if (terminalText) {
            const text = terminalText.textContent || ''
            terminalText.textContent = ''
            let i = 0
            const typeWriter = () => {
                if (i < text.length) {
                    terminalText.textContent += text.charAt(i)
                    i++
                    setTimeout(typeWriter, 50)
                }
            }
            setTimeout(typeWriter, 500)
        }
    }, [])

    return (
        <section
            id="about"
            className="relative w-full min-h-screen bg-zinc-50 dark:bg-zinc-950 overflow-hidden flex items-center justify-center px-6 py-20 font-mono"
        >
            {/* Terminal-style scanlines overlay */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)] dark:bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.02)_2px,rgba(255,255,255,0.02)_4px)]" />
            </div>

            <div className="max-w-7xl w-full relative grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column — Image with Terminal Frame */}
                <div className="relative order-2 lg:order-1 flex justify-center items-center">
                    {/* Terminal window wrapper */}
                    <div className="relative w-full max-w-[480px]">
                        {/* Terminal header */}
                        <div className="bg-zinc-800 dark:bg-zinc-900 px-4 py-2 flex items-center gap-2 border border-zinc-700">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                            </div>
                            <span className="text-xs text-zinc-400 ml-2">
                                ~/portfolio/about.jpg
                            </span>
                        </div>

                        {/* Image container */}
                        <div className="relative w-full h-[620px] border-x border-b border-zinc-700 shadow-md overflow-hidden bg-black">
                            <Image
                                src="/portfolio_img.png"
                                alt="Retro magazine portrait"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 480px"
                                className="object-cover filter grayscale contrast-110 brightness-95"
                                priority
                            />

                            {/* Terminal-style caption overlay */}
                            <div className="absolute bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-green-500/30">
                                <div className="px-4 py-3 font-mono">
                                    <p className="text-xs text-green-500 flex items-center gap-2">
                                        <span className="animate-pulse">▶</span>
                                        <span className="opacity-60">PROFILE_DATA:</span>
                                    </p>
                                    <div className="text-sm text-green-400 mt-1 ml-4 font-mono">
                                        <p>{`{ name: `}<span className="text-green-300">&quot;Omphile Mokhuane&quot;</span>{` }`}</p>
                                        <p>{`{ age:  `}<span className="animate-pulse">&quot;{age}&quot;</span>{` }`}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column — Terminal-style Text */}
                <div className="order-1 lg:order-2 flex flex-col justify-center relative space-y-8">
                    {/* Terminal window header */}
                    <div className="border-2 border-zinc-400 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 shadow-lg">
                        {/* Terminal title bar */}
                        <div className="bg-zinc-300 dark:bg-zinc-800 px-4 py-2 flex items-center justify-between border-b-2 border-zinc-400 dark:border-zinc-700">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                                </div>
                                <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 ml-2">
                                    ABOUT.TXT
                                </span>
                            </div>
                            <span className="text-xs text-zinc-600 dark:text-zinc-400">
                                [READONLY]
                            </span>
                        </div>

                        {/* Terminal content */}
                        <div ref={terminalRef} className="p-6 space-y-4">
                            {/* Command prompt style header */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-green-600 dark:text-green-500">
                                    <span>$</span>
                                    <span className="terminal-text">cat about.txt</span>
                                </div>
                                <div className="h-px bg-zinc-300 dark:bg-zinc-700" />
                            </div>

                            {/* Header */}
                            <div>
                                <h1 className="text-5xl lg:text-6xl font-extrabold uppercase leading-tight text-zinc-900 dark:text-zinc-100 tracking-tight">
                                    About <span className="text-zinc-500">&gt;_</span>
                                </h1>
                                <p className="text-xs text-zinc-600 dark:text-zinc-400 tracking-widest mt-2 uppercase">
                                    Celebrating creativity & code
                                </p>
                            </div>

                            {/* Main Copy with line numbers */}
                            <div className="text-zinc-800 dark:text-zinc-200 leading-relaxed text-base space-y-3">
                                <div className="flex gap-4">
                                    <span className="text-zinc-400 text-xs select-none">01</span>
                                    <p>
                                        I&apos;m a junior front-end developer,
                                        with a Bachelor of Science in Information Technology from the North West University.

                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-zinc-400 text-xs select-none">02</span>
                                    <p>
                                        I&apos;m currently learning web development with Next.js and Tailwind CSS to strengthen my skills and explore new technologies.
                                        I’ve started building real-world projects to apply what I learn and continue improving as a developer.
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-zinc-400 text-xs select-none">03</span>
                                    <p>
                                        Every project is a chance to build something elegant, functional, and
                                        built to last.
                                    </p>
                                </div>
                            </div>

                            {/* Technical Skills Terminal command */}
                            <div className="pt-4">
                                <div className="flex items-center gap-2 text-green-600 dark:text-green-500 text-sm mb-3">
                                    <span>$</span>
                                    <span>ls ./skills/technical</span>
                                </div>

                                {/* Technical Skills grid */}
                                <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                                    {[
                                        "HTML",
                                        "CSS",
                                        "JavaScript",
                                        "MySQL",
                                        "Node.js",
                                        "Next.js",
                                        "Tailwind",
                                        "C#",
                                        "Java",
                                    ].map((skill, index) => (
                                        <div
                                            key={skill}
                                            className="border border-zinc-400 dark:border-zinc-700 bg-zinc-50 dark:bg-black px-3 py-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:border-green-500 dark:hover:border-green-500 transition-all group"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-green-600 dark:text-green-500 group-hover:animate-pulse text-xs">
                                                    [{index + 1}]
                                                </span>
                                                <span className="font-bold tracking-wider uppercase">
                                                    {skill}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Soft Skills Terminal command */}
                            <div className="pt-2">
                                <div className="flex items-center gap-2 text-green-600 dark:text-green-500 text-sm mb-3">
                                    <span>$</span>
                                    <span>ls ./skills/professional</span>
                                </div>

                                {/* Soft Skills list */}
                                <div className="space-y-2 text-sm">
                                    {[
                                        "Customer Service",
                                        "Technical Support",
                                        "Troubleshooting",
                                    ].map((skill, index) => (
                                        <div
                                            key={skill}
                                            className="border border-zinc-400 dark:border-zinc-700 bg-zinc-50 dark:bg-black px-3 py-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:border-green-500 dark:hover:border-green-500 transition-all group"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-green-600 dark:text-green-500 group-hover:animate-pulse text-xs">
                                                    ▸
                                                </span>
                                                <span className="font-medium tracking-wide">
                                                    {skill}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Terminal prompt footer */}
                            <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-600 text-sm pt-2">
                                <span className="animate-pulse">█</span>
                                <span className="text-xs">END OF FILE</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative vertical text with terminal styling */}
            <div className="hidden lg:block absolute left-4 top-1/2 -translate-y-1/2 space-y-4">
                <EditionYear />
            </div>

            {/* Blinking cursor decoration */}
            <div className="hidden lg:block absolute right-8 top-8 text-green-600 dark:text-green-500 text-2xl animate-pulse">
                █
            </div>
        </section>
    )
}