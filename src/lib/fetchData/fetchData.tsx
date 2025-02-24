const API_URL =
    process.env.NEXT_PUBLIC_PRODUCTION === "true"
        ? process.env.NEXT_PUBLIC_PRODUCTION_API
        : process.env.NEXT_PUBLIC_LOCAL_API;


export interface BannerData {
    image: string;
    created_at: string;
}

export interface SubCategoryData {
    id: number;
    name: string;
    image: string;
}

export interface Products {
    id: number;
    name: string;
    image: string;
}


// Helper function to fetch Banners data
export async function fetchBanners() {
    const response = await fetch(`${API_URL}/banners/`, {
        cache: "force-cache", // Caching for performance
        next: { revalidate: 30 }, // Revalidate every 30 seconds
    });
    if (!response.ok) {
        throw new Error("Failed to fetch banners");
    }
    const data: BannerData[] = await response.json();
    return data;
};


// Helper function to fetch products data
//export async function fetchProducts() {
//    const response = await fetch(`${API_URL}/products/`, {
//        cache: "force-cache",
//        next: { revalidate: 30 },
//    });
//    if (!response.ok) {
//        throw new Error("Failed to fetch products");
//    }
//    // const data: Products[] = await response.json();
//    // return data;
//    return response.json();
//};


export async function fetchProducts(subcategories?: number[] | null) {
    const subcategoryQuery = subcategories && subcategories.length > 0 ? `subcategories=${subcategories.join(",")}` : "";
    const url = `${API_URL}/products/${subcategoryQuery ? `?${subcategoryQuery}` : ""}`;

    const response = await fetch(url, {
        next: { revalidate: 30 },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }

    return response.json();
}




export async function fetchSubCategories() {
    const response = await fetch(`${API_URL}/sub_categories/`, {
        cache: "force-cache",
        next: { revalidate: 30 },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch subcategories");
    }
    const data: SubCategoryData[] = await response.json();
    return data;
};

