"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ModeToggle from "./ModeToggle";

const links = [
    { href: "/", label: "Home" },
    { href: "/ask", label: "Ask" },
    { href: "/contact", label: "Contact" },
];

const Navbar = () => {
    const pathname = usePathname();
    return (
        <div>
            <ul className="mx-auto my-0 flex max-w-desktop items-center justify-end gap-4 px-4 py-2">
                {links.map((link) => (
                    <li key={link.href}>
                        <Link
                            className={`link ${pathname === link.href ? "active border-b-2 border-green-500 dark:border-[#BADA55]" : ""}`}
                            href={link.href}
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}

                <ModeToggle></ModeToggle>
            </ul>
        </div>
    );
};

export default Navbar;
