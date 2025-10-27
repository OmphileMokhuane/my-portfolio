// components/VersionTag.jsx
export default function VersionTag() {
    const now = new Date();
    const version = `v${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(now.getDate()).padStart(2, "0")}`;
    return (
        <div className="absolute bottom-4 left-4 text-green-600 dark:text-green-500 text-xs font-mono opacity-50">
            {version}
        </div>
    );
}