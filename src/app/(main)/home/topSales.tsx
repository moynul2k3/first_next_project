import React from "react";
import ProductCarousel from "@/utils/carousel/ProductCarousel"
import { fetchProducts, Products } from "@/lib/fetchData/fetchData";

export default async function topSales() {
	const productsData: Products[] = await fetchProducts();
	const Products = productsData.map((product) =>  ({
		id: product.id,
		name: product.name,
		image: product.image,
	}));


    //const shuffledSubCategories = subCategory
    //    .sort(() => Math.random() - 0.5) // Shuffle array
    //    .slice(0, 16); // Slice the first 28 items
	return (
		<div className="z-0 py-10 pt-16 text-[#1a1a1a] h-auto max-md:px-4 md:px-8 lg:px-20 xl:px-32">
			<p className="max-md:text-lg md:text-2xl m-0 p-0 font-semibold">Popular Categories</p>
			{ Products.length > 0 && <ProductCarousel Products={Products} /> }
		</div>
	)
}
