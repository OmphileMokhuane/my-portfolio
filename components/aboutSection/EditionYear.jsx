export default function EditionYear() {
    const now = new Date();
    const editionYear = now.getFullYear();
    return (
        <div className="rotate-90 text-xs tracking-[0.3em] uppercase text-zinc-500 whitespace-nowrap origin-center">
            <span className="text-green-600 dark:text-green-500">~/</span>
            Portfolio Edition · {editionYear}
        </div>
    )
}
