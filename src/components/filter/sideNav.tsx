import React, { useState, useEffect } from "react";

const API_URL =
    process.env.NEXT_PUBLIC_PRODUCTION === "true"
        ? process.env.NEXT_PUBLIC_PRODUCTION_API
        : process.env.NEXT_PUBLIC_LOCAL_API;

interface Subcategory {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

const SideNav: React.FC<{ onFilterChange: (selected: string[]) => void }> = ({ onFilterChange }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openCategories, setOpenCategories] = useState<{ [key: string]: boolean }>({});
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);

  // Fetch categories from REST API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_URL}/categories/`); // Replace with actual API URL
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const toggleCategory = (categoryId: string) => {
    setOpenCategories((prev) => ({ ...prev, [categoryId]: !prev[categoryId] }));
  };

  const handleCheckboxChange = (subcategoryId: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategoryId) ? prev.filter((id) => id !== subcategoryId) : [...prev, subcategoryId]
    );
  };

  useEffect(() => {
    onFilterChange(selectedSubcategories);
  }, [selectedSubcategories, onFilterChange]);

  return (
    <aside className="max-lg:hidden w-64 px-4 bg-white h-full overflow-y-auto sideNav shadow-md shadow-black/10 transition-all ease-in-out duration-200 ">
      <h2 className="text-lg font-semibold mb-3 sticky  top-0 left-0 bg-white py-4 z-40">Shop By Category</h2>

      {loading && <p>Loading categories...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && categories.length === 0 && <p>No categories available.</p>}

      {!loading &&
        !error &&
        categories.map((category) => (
          <div key={category.id} className="mb-2 ">
            <button
              onClick={() => toggleCategory(category.id)}
              className={` w-full text-left font-medium flex justify-start items-center gap-3 px-2`}
            >
              
              <span>
                {/*{ openCategories[category.id] ? "▲" : "<i class='bx bx-chevron-right'></i>" }*/}
                {openCategories[category.id]?<i className='bx bx-chevron-right rotate-90 transition-all ease-in-out duration-200 '></i>:<i className='bx bx-chevron-right  transition-all ease-in-out duration-200'></i>}
              </span>
              {category.name}
            </button>
            {openCategories[category.id] && (
              <div className="ml-4 mt-2">
                {category.subcategories.map((sub) => (
                  <label key={sub.id} className="flex items-center ps-4 space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedSubcategories.includes(sub.id)}
                      onChange={() => handleCheckboxChange(sub.id)}
                      className="w-4 h-4"
                    />
                    <span>{sub.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
    </aside>
  );
};

export default SideNav;
