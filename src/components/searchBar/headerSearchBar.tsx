"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
    const [query, setQuery] = useState<string>("");
    const [isScrolled, setIsScrolled] = useState(false);
    
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };

        setIsScrolled(window.scrollY > 100);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const currentQuery = searchParams.get("q") || "";
        setQuery(currentQuery);
    }, [searchParams]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedQuery = query.trim();

        if (trimmedQuery) {
            router.push(`/products?q=${encodeURIComponent(trimmedQuery)}`);
        } else {
            router.push(`/products`); // Removes searchParams when empty
        }
    };

    if (!isScrolled && pathname === "/") return null;

    return (
        <div className="flex justify-center w-full h-full max-h-12 rounded-lg shadow-sm bg-black/5 border-[1px] border-black/10 max-md:hidden">
            <form onSubmit={handleSearch} className="flex items-center w-full h-full">
                <input
                    type="text"
                    placeholder="Search..."
                    className="flex-grow p-2 ps-10 outline-none bg-transparent h-full"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className="text-white h-full w-10 bg-gradient_bg hover:opacity-85 flex justify-center items-center gap-2 rounded-lg md:px-5 xl:px-14">
                    <i className="bx bx-search text-xl text-center"></i>
                    <span className="max-xl:hidden">Search</span>
                </button>
            </form>
        </div>
    );
}
