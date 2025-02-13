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

    useEffect(() => {
        if (subCategories.length > 0) {
            setLoading(false); // Data is loaded
        }
    }, [subCategories]);

    useEffect(() => {
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
        });

        splide.mount({ Grid });

        return () => {splide.destroy()};
    }, [loading, subCategories, Rows]);

    return (
        <section>
            { loading ? (
                <div className=" mt-5">
                    <div className=" mt-3 mb-5">
                        <ul className="grid grid-cols-8 grid-rows-2 gap-[10px]">
                            {Array.from({ length: 16 }).map((_, index) => (
                                <Skeleton key={index} className=" group h-[150px] shadow-slate-700  bg-black/10 rounded shadow-md ">
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
                                <li key={subcat.id} className="splide__slide group h-[150px] w-[150px] bg-white rounded splide__slide group  hover:shadow-[-1px_0px_5px_#f00,1px_0px_5px_#f00] origin-center hover:rotate-6 transition ease-in-out delay-150">
                                    <Link
                                        href={`/product/filters?group=${subcat.id}&name=${encodeURIComponent(subcat.name)}`}
                                        className="flex flex-col items-center justify-center h-full w-full"
                                    >
                                        <div className="h-[60px] w-full flex justify-center items-center">
                                            <Image
                                                src={subcat.image}
                                                alt={subcat.name}
                                                width={50}
                                                height={50}
                                                className="h-[50px] w-[50px] object-cover"
                                            />
                                        </div>
                                        <div className="px-3 py-2">
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
