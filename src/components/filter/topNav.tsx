"use client";
import React, { useState } from "react";
import CategoriesNav from "./CategoriesNav"

interface TopNavProps {
  sortOrder: "asc" | "desc" | null;
	setSortOrder: (order: "asc" | "desc" | null) => void;
	setSubcategories: (subcategories: string[]) => void; // NEW PROP
}

export default function TopNav({ sortOrder, setSortOrder, setSubcategories  }: TopNavProps) {
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : sortOrder === "desc" ? null : "asc");
  };

  const [showCategories, setShowCategories] = useState(false);

  return (
    <>
      <nav className="px-4 flex justify-between items-center gap-3 text-xs md:hidden fixed top-14 left-0 bg-white z-40 w-full h-8 border-b-[1px] border-black/10">
        <div className="flex justify-start items-center gap-3 text-xs">
          <button
            onClick={() => setShowCategories((prev) => !prev)}
            className="px-2 py-1 rounded focus:bg-red-500/10"
          >
            <i className="bx bx-filter-alt"></i> Categories
          </button>
          <button className="px-2 py-1 rounded focus:bg-red-500/10">Top Sales</button>
        </div>
        <button
          className="w-20 px-2 py-1 rounded focus:bg-red-500/10 flex justify-center items-center gap-2"
          onClick={toggleSortOrder}
        >
          Price{" "}
          {sortOrder === "asc" ? (
            <i className="bx bx-up-arrow-alt flex justify-center items-center text-[14px]"></i>
          ) : sortOrder === "desc" ? (
            <i className="bx bx-down-arrow-alt flex justify-center items-center text-[14px]"></i>
          ) : (
            <i className="bx bx-expand-vertical h-full flex justify-center items-center text-[10px]"></i>
          )}
        </button>
      </nav>

      {/* Categories Drawer */}
      <CategoriesNav show={showCategories} onClose={() => setShowCategories(false)} setSubcategories={setSubcategories} />
    </>
  );
}
