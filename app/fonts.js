import { Roboto_Mono } from "next/font/google";
import localFont from "next/font/local";

export const robotoMono = Roboto_Mono({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

export const manoloMono = localFont({
    src: "../public/manolo-mono.ttf",
    variable: "--font-manolo-mono",
});