"use client"
import React, {useState } from 'react'

type SearchBarProps = {
    onSearch?: (query: string) => void;
};
export default function SearchBar({ onSearch }: SearchBarProps) {
    const [query, setQuery] = useState<string>("");

    const handleSearch = (e: React.FormEvent) => {
        if (!onSearch) return;
        e.preventDefault();
        onSearch(query);
    };
    return (
        <div className="flex justify-center max-xl:w-full md:w-2/3 xl:w-1/2 h-full max-h-12  shadow-sm bg-white rounded-full overflow-hidden">
            <form onSubmit={handleSearch} className="flex justify-between items-center w-full h-full py-1 px-1">
                <input
                    type="text"
                    placeholder="Search..."
                    className="h-full w-full flex justify-center items-center outline-none bg-transparent rounded-s-full ps-5"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className="h-full px-4 flex justify-center items-center gap-2 bg-red-400 hover:bg-red-500 rounded-full text-white">
                    <i className='bx bx-search text-xl text-center' ></i>
                    <span className='max-md:hidden'>Search</span>
                </button>
            </form>
        </div>
    );
}



{/*<input
                    type="text"
                    placeholder="Search..."
                    className="p-2 ps-10 outline-none  h-full bg-black"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className="bg-red-500 text-white w-10 h-full me-1 hover:bg-red-600 flex justify-center items-center gap-2 rounded-full px-14">
                    <i className='bx bx-search text-xl text-center' ></i>
                    <span className='max-md:hidden'>Search</span>
                </button>*/}