"use client"; // Required in Next.js 15+
import '@splidejs/splide/css';
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Splide from '@splidejs/splide';
import { Grid } from '@splidejs/splide-extension-grid';

interface SubCategory {
    id: number;
    name: string;
    image: string;
}

interface CarouselProps {
    subCategories: SubCategory[];
    Rows?: number;
}

const CatCarousel = ({ subCategories, Rows = 2 }: CarouselProps) => {
    const splideRef = useRef<HTMLDivElement>(null!);
    const [loading, setLoading] = useState(true);
    const [itemsCount, setItemsCount] = useState(16);

      // Function to update count based on screen width
      const updateItemsCount = () => {
        const width = window.innerWidth;
        if (width <= 1400) {
          setItemsCount(8);  // Extra small screens
        } else if (width <= 1024) {
          setItemsCount(5);  // Small screens
        } else if (width <= 480) {
          setItemsCount(3); // Medium screens
        } else {
          setItemsCount(10); // Large screens
        }
      };

    useEffect(() => {
        if (subCategories.length > 0) {
            setLoading(false); // Data is loaded
        }
    }, [subCategories]);

    useEffect(() => {
        updateItemsCount(); 
        window.addEventListener("resize", updateItemsCount);
        if (!splideRef.current) return;

        const splide = new Splide(splideRef.current, {
            grid: {
                rows: Rows,
                cols: 8,
                gap: { row: '2px', col: '2px' },
            },
            type: 'loop',
            rewind: false,
            gap: "2px",
            drag: 'free',
            focus: 'center',
            pagination: false,
            autoWidth: false,
            autoHeight: false,
            breakpoints: {
                1400: {  // Large screens (≤1400px)
                    grid: { rows: Rows, cols: 8 },
                },
                1024: {   // Small screens (≤1024px)
                    grid: { rows: Rows, cols: 5 },
                },
                480: {   // Extra small screens (≤480px)
                    grid: { rows: Rows, cols: 3 },
                },
            },
        });

        splide.mount({ Grid });

        return () => {
            splide.destroy();
            window.removeEventListener("resize", updateItemsCount);
        };
    }, [loading, subCategories, Rows]);

    return (
        <section>
            { loading ? (
                <div className=" mt-5">
                    <div className=" mt-3 mb-5">
                        <ul className="grid max-md:grid-cols-3 md:grid-cols-5 xl:grid-cols-8 grid-rows-2 gap-[10px]">
                            {Array.from({ length: itemsCount }).map((_, index) => (
                                <Skeleton key={index} className=" group max-md:h-[80px] md:h-[100px] xl:h-[150px] shadow-slate-700  bg-black/10 rounded shadow-md ">
                                    <div className="flex flex-col items-center justify-center h-full w-full" >
                                        <div className="h-[60px] w-full flex justify-center items-center">
                                            <Skeleton className="h-[50px] w-[50px] bg-white/10"></Skeleton>
                                        </div>
                                        <div className="px-3 py-2 w-full">
                                            <Skeleton className="text-sm text-center w-full h-3 bg-white/10"></Skeleton>
                                        </div>
                                    </div>
                                </Skeleton>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <div ref={splideRef} className="splide mt-5">
                    <div className="splide__track mt-3 mb-5">
                        <ul className="splide__list">
                            {subCategories.map((subcat) => (
                                <li key={subcat.id} className="splide__slide group max-md:h-[80px] md:h-[100px] xl:h-[150px] max-md:w-[80px] md:w-[100px] xl:w-[150px] bg-white rounded splide__slide group  hover:shadow-[-1px_0px_5px_#f00,1px_0px_5px_#f00] origin-center hover:rotate-6 transition ease-in-out delay-150">
                                    <Link
                                        href={`/product/filters?group=${subcat.id}&name=${encodeURIComponent(subcat.name)}`}
                                        className="flex flex-col items-center justify-center h-full w-full"
                                    >
                                        <div className="h-[70%] w-full flex justify-center items-center overflow-hidden ">
                                            <Image
                                                src={subcat.image}
                                                alt={subcat.name}
                                                width={50}
                                                height={50}
                                                className=" h-full w-auto p-2"
                                            />
                                        </div>
                                        <div className="px-1 h-[30%]">
                                            <p className="text-sm text-center">{subcat.name}</p>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) }
        </section>
    );
};

export default CatCarousel;
