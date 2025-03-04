"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SideNav from "@/components/filter/sideNav";
import TopNav from "@/components/filter/topNav";
import { fetchProducts, Products } from "@/lib/fetchData/fetchData";
import ProductItem from "@/utils/products/products";
import { Skeleton } from "@/components/ui/skeleton";
import BottomNav from "@/components/filter/bottomSearchNav"

const ProductsPage = () => {
  const [loading, setLoading] = useState(true);
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [products, setProducts] = useState<Products[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null); // Default: null (no sorting)
  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || ""; // Get search query from URL

  useEffect(() => {
      if (products.length > 0) {
          setLoading(false); // Data is loaded
      }
  }, [products]);

  useEffect(() => {
  const getProducts = async () => {
    const numericSubcategories = subcategories.map(Number); // Convert to numbers
    console.log("Fetching products for subcategories:", numericSubcategories);

    try {
      const productsData: Products[] = await fetchProducts(numericSubcategories);
      //let sortedProducts = [...productsData];

        if (sortOrder === "asc") {
          productsData.sort((a, b) => a.price - b.price);
        } else if (sortOrder === "desc") {
          productsData.sort((a, b) => b.price - a.price);
        }

      setProducts(
          productsData.map((product) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image ? product.image : "/quanta.png",
        }))
      );
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  getProducts();
  }, [subcategories, sortOrder]); 
  
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  return (
    <div className="flex max-md:mt-14  md:pt-20 h-screen w-full fixed top-0 left-0 max-md:px-0 md:px-0 lg:px-20 xl:px-32">
      <SideNav onFilterChange={setSubcategories} />
      <main className="flex-1 p-4 overflow-y-auto pb-20">
        <TopNav sortOrder={ sortOrder } setSortOrder={ setSortOrder } setSubcategories={ setSubcategories } />

        { loading?(
            <ul className={`h-auto w-full grid max-md:grid-cols-2 max-lg:grid-cols-3 lg:grid-cols-4 gap-2 max-md:gap-y-4 md:gap-y-3 xl:gap-y-5`}>
						{ Array.from({ length: 20 }).map((_, index) => (
                <div key={index}>
                  <div  className="bg-black/10 relative max-xl:rounded-md xl:rounded-xl overflow-hidden shadow-[-1px_0px_5px_#f002,1px_0px_5px_#0004] hover:shadow-[-1px_0px_5px_#CC1554,1px_0px_5px_#6A4385] transition-shadow duration-300 swiper-slide  max-md:pb-1 md:pb-2">
                      <div className="">
                          <Skeleton className="absolute max-md:top-1 md:top-2 max-md:right-1 md:right-2 max-xl:h-6 xl:h-7 max-md:px-3 md:px-5  flex justify-center items-center max-xl:rounded-full xl:rounded-full bg-black/20">
                              <p className="text-white font-semibold max-xl:text-[10px] xl:text-sm w-8">     </p>
                          </Skeleton>
                          <div className="w-full h-auto flex justify-center max-md:h-[150px] md:h-[200px] xl:h-[250px]">
                              
                          </div>
                          <div className="w-full text-center max-xl:mt-[2px] xl:mt-2 max-md:px-2 md:px-3">
                              <Skeleton className="bg-black/20 max-md:text-xs md:text-md xl:text-xl noto_sans line-clamp-2 w-full h-4"></Skeleton>
                              <div className="flex justify-between items-center gap-10 max-xl:mt-[1px] xl:mt-1 max-xl:py-1 xl:py-2">
                                  <Skeleton className="bg-black/20 w-10 h-3 max-md:text-[10px] md:text-sm xl:text-lg"></Skeleton>
                                  <Skeleton className="bg-black/20 w-10 h-3 max-xl:text-[10px] xl:text-[12px] font-semibold flex justify-center items-center">
                                      
                                  </Skeleton>
                              </div>
                          </div>
                      </div>
                      <div className=" flex justify-between items-center max-xl:gap-1 xl:gap-2 max-md:px-1 md:px-2">
                          <Skeleton  className="bg-black/20 w-full max-md:h-7 max-xl:h-8 xl:h-10 flex justify-center items-center max-xl:rounded-sm xl:rounded-md  hover:opacity-85 max-md:text-xs text-white">Buy Now</Skeleton>
                          <Skeleton className="bg-black/20 max-md:w-10 md:w-full max-md:h-7 max-xl:h-8 xl:h-10 flex justify-center items-center max-xl:rounded-sm xl:rounded-md hover:opacity-85 max-md:text-xs text-white">
                              <span className='max-md:hidden'>Add to Cart</span>
                              <span className='md:hidden'><i className='bx bxs-cart-add text-xl h-full w-full flex justify-center items-center'></i></span>
                          </Skeleton>
                      </div>
    							</div>
    					  </div>
            ))}
            </ul>
          ): filteredProducts.length > 0 ? <ProductItem Products={ filteredProducts } ClassName="grid max-md:grid-cols-2 max-lg:grid-cols-3 lg:grid-cols-4 gap-2 max-md:gap-y-4 md:gap-y-3 xl:gap-y-5" />
          : (
              <div className="h-full w-full flex justify-center items-center flex-col">
                <i className='bx bx-search text-8xl text-center' ></i>
                <p className="text-3xl text-center">Search No Result</p>
                <p className="text-center">We&apos;re sorry. We cannot find any matches for your search term.</p>
            </div>
          )
          }

      </main>
      <div className="fixed md:hidden px-4 bottom-0 right-0 w-full z-50 bg-white pt-2 pb-5 border-t-[1px] border-black/10">
        <BottomNav />
      </div>
    </div>
  );
};

export default ProductsPage;
