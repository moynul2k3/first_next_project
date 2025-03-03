import React from "react";
import ProductItem from "@/utils/products/products"
import { fetchProducts, Products } from "@/lib/fetchData/fetchData";

export default async function topSales() {
	const productsData: Products[] = await fetchProducts(null);
	const Products = productsData.map((product) =>  ({
		id: product.id,
		name: product.name,
		price: product.price,
		image: product.image? product.image : "/quanta.png",
	}));

	return (
		<div className="z-0 py-10 pt-16 text-[#1a1a1a] h-auto max-md:px-4 md:px-8 lg:px-20 xl:px-32">
			<p className="max-md:text-lg md:text-2xl m-0 p-0 font-semibold">Our Products</p>
			{ Products.length > 0 && <ProductItem Products={ Products } ClassName="grid max-md:grid-cols-2 max-lg:grid-cols-3 max-xl:grid-cols-4 xl:grid-cols-5 gap-2 max-md:gap-y-4 md:gap-y-3 xl:gap-y-5" /> }
		</div>
	)
}
