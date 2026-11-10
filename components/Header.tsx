import Link from "next/link";
import NavLinks from "./NavLinks";

export default function Header() {
    const currentDate = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <header className="site-header border-b border-slate-200 bg-white">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <Link href="/" className="font-bold text-slate-900">
                        <span className="text-xl">Sacrament Meeting Planner</span>
                        <span className="block text-sm font-normal text-slate-500">
                            Riverside Ward
                        </span>
                    </Link>

                    <div className="text-sm text-slate-500 sm:text-right">
                        <p className="font-medium text-slate-700">
                            {currentDate}
                        </p>
                        <p>Meeting Programs &amp; Agendas</p>
                    </div>
                </div>

                <NavLinks />
            </div>
        </header>
    );
}