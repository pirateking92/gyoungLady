"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="border-b sticky top-0 bg-white z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold hover:text-gray-600 transition">
            Art Conservation
          </Link>
          <ul className="flex gap-8">
            <li>
              <Link
                href="/"
                className={`hover:text-gray-600 transition ${
                  isActive("/") ? "font-semibold border-b-2 border-black" : ""
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className={`hover:text-gray-600 transition ${
                  pathname?.startsWith("/projects") ? "font-semibold border-b-2 border-black" : ""
                }`}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`hover:text-gray-600 transition ${
                  isActive("/about") ? "font-semibold border-b-2 border-black" : ""
                }`}
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
