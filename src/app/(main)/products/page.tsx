"use client";
import { useEffect, useState } from "react";
import SideNav from "@/components/filter/sideNav";
import { fetchProducts, Products } from "@/lib/fetchData/fetchData";
import ProductItem from "@/utils/products/products";

const ProductsPage = () => {
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
  const getProducts = async () => {
    const numericSubcategories = subcategories.map(Number); // Convert to numbers
    console.log("Fetching products for subcategories:", numericSubcategories);

    try {
      const productsData: Products[] = await fetchProducts(numericSubcategories);
      setProducts(
        productsData.map((product) => ({
          id: product.id,
          name: product.name,
          image: product.image ? product.image : "/quanta.png",
        }))
      );
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  getProducts();
}, [subcategories]); 

  return (
    <div className="flex pt-20 h-screen w-full fixed top-0 left-0 max-md:px-4 md:px-8 lg:px-20 xl:px-32">
      <SideNav onFilterChange={setSubcategories} />
      <main className="flex-1 p-4 overflow-y-auto">
        <h1 className="text-2xl font-bold">Products</h1>
        <p>Selected Filters: {subcategories.join(", ") || "None"}</p>
        {products.length > 0 ? <ProductItem Products={products} /> : <p>No products available</p>}
      </main>
    </div>
  );
};

export default ProductsPage;
