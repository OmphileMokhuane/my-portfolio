"use client"

import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"

export default function Navbar() {
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    return (
        <div className="hidden md:block fixed top-4 right-0.5 -translate-x-1/2 z-50">
            {/* Glassmorphism Terminal-style navbar */}
            <div
                className="font-mono rounded-2xl overflow-hidden"
                style={{
                    background: 'rgba(0, 0, 0, 0.75)',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.18)'
                }}
            >
                {/* Terminal header with glass effect */}
                <div
                    className="px-4 py-1.5 flex items-center gap-2 border-b"
                    style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        borderBottomColor: 'rgba(255, 255, 255, 0.2)'
                    }}
                >
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    </div>
                    <span className="text-xs text-zinc-300 ml-2 font-semibold">
                        ~/portfolio/navigation
                    </span>
                </div>

                {/* Navigation content */}
                <Menubar className="rounded-none border-0 bg-transparent backdrop-blur-none px-2 py-2 h-auto">
                    <MenubarMenu>
                        <MenubarTrigger
                            onClick={() => scrollToSection('hero')}
                            className="cursor-pointer relative px-4 py-2 text-sm font-bold tracking-wide uppercase hover:bg-white/20 data-[state=open]:bg-white/20 transition-all group rounded text-white"
                        >
                            <span className="text-green-400 mr-2 group-hover:animate-pulse">$</span>
                            Home
                        </MenubarTrigger>
                    </MenubarMenu>

                    <MenubarMenu>
                        <MenubarTrigger
                            onClick={() => scrollToSection('about')}
                            className="cursor-pointer relative px-4 py-2 text-sm font-bold tracking-wide uppercase hover:bg-white/20 data-[state=open]:bg-white/20 transition-all group rounded text-white"
                        >
                            <span className="text-green-400 mr-2 group-hover:animate-pulse">$</span>
                            About
                        </MenubarTrigger>
                    </MenubarMenu>

                    <MenubarMenu>
                        <MenubarTrigger
                            onClick={() => scrollToSection('experience')}
                            className="cursor-pointer relative px-4 py-2 text-sm font-bold tracking-wide uppercase hover:bg-white/20 data-[state=open]:bg-white/20 transition-all group rounded text-white"
                        >
                            <span className="text-green-400 mr-2 group-hover:animate-pulse">$</span>
                            Experience
                        </MenubarTrigger>
                    </MenubarMenu>

                    <MenubarMenu>
                        <MenubarTrigger
                            onClick={() => scrollToSection('contact')}
                            className="cursor-pointer relative px-4 py-2 text-sm font-bold tracking-wide uppercase hover:bg-white/20 data-[state=open]:bg-white/20 transition-all group rounded text-white"
                        >
                            <span className="text-green-400 mr-2 group-hover:animate-pulse">$</span>
                            Contact
                        </MenubarTrigger>
                    </MenubarMenu>
                </Menubar>
            </div>

            {/* Optional: Status indicator with glass effect */}
            <div
                className="absolute -bottom-2 right-2 text-xs text-green-400 font-mono flex items-center gap-1 px-2 py-0.5 rounded-full font-semibold"
                style={{
                    background: 'rgba(0, 0, 0, 0.75)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.18)'
                }}
            >
                <span className="animate-pulse">●</span>
                <span className="text-white">[READY]</span>
            </div>
        </div>
    )
}