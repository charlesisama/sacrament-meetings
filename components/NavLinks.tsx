"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationLinks = [
    { name: "Home", href: "/" },
    { name: "Meetings", href: "/meetings" },
    { name: "Current Meeting", href: "/meetings/current" },
];

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <nav
            aria-label="Main navigation"
            className="flex flex-wrap items-center gap-2"
        >
            {navigationLinks.map((link) => {
                const isActive =
                    pathname === link.href ||
                    (link.href !== "/" &&
                        pathname.startsWith(`${link.href}/`));

                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        aria-current={isActive ? "page" : undefined}
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${isActive
                                ? "bg-blue-600 text-white"
                                : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                            }`}
                    >
                        {link.name}
                    </Link>
                );
            })}
        </nav>
    );
}