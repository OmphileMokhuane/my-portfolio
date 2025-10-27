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
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
            <Menubar className="rounded-full shadow-lg border bg-white/80 backdrop-blur-md dark:bg-black/80 px-6">
                <MenubarMenu>
                    <MenubarTrigger
                        onClick={() => scrollToSection('hero')}
                        className="cursor-pointer"
                    >
                        Home
                    </MenubarTrigger>
                </MenubarMenu>

                <MenubarMenu>
                    <MenubarTrigger
                        onClick={() => scrollToSection('about')}
                        className="cursor-pointer"
                    >
                        About
                    </MenubarTrigger>
                </MenubarMenu>

                <MenubarMenu>
                    <MenubarTrigger
                        onClick={() => scrollToSection('experience')}
                        className="cursor-pointer"
                    >Experience</MenubarTrigger>
                </MenubarMenu>

                <MenubarMenu>
                    <MenubarTrigger
                        onClick={() => scrollToSection('contact')}
                        className="cursor-pointer"
                    >
                        Contact
                    </MenubarTrigger>
                </MenubarMenu>
            </Menubar>
        </div>
    )
}