import React from "react";
import SubCategories from "@/utils/carousel/SubCatCarousel"
import { fetchSubCategories, SubCategoryData } from "@/lib/fetchData/fetchData";

export default async function subCategories() {
	const subCategoryData: SubCategoryData[] = await fetchSubCategories();
	const subCategory = subCategoryData.map((subCat) =>  ({
		id: subCat.id,
		name: subCat.name,
		image: subCat.image,
	}));


    //const shuffledSubCategories = subCategory
    //    .sort(() => Math.random() - 0.5) // Shuffle array
    //    .slice(0, 16); // Slice the first 28 items
	return (
		<div className="z-0 py-10 pt-16 bg-[#1a1a1a] text-[#1a1a1a] h-auto max-md:px-4 md:px-8 lg:px-20 xl:px-32">
			<p className="text-2xl m-0 p-0 font-semibold text-white">Popular Categories</p>
			{ subCategory.length > 0 && <SubCategories Rows={ 2 } subCategories={ subCategory } /> }
		</div>
	)
}
