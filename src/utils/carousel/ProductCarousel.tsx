"use client"; // Required in Next.js 15+
import '@splidejs/splide/css';
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Splide from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';


interface Products {
    id: number;
    name: string;
    image: string;
}

interface CarouselProps {
    Products: Products[];
}

const ProductCarousel = ({ Products }: CarouselProps) => {
    const splideRef = useRef<HTMLDivElement | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (Products.length > 0) {
            setLoading(false); // Data is loaded
        }
    }, [Products]);

    useEffect(() => {
        if (!splideRef.current) return;

        // Initialize Splide
        const splide = new Splide(splideRef.current, {
            type: 'loop',
            rewind: false,
            gap: "1rem",
            drag: 'free',
            focus: 'center',
            pagination: true,
            autoWidth: true,
            autoHeight: false,
            autoScroll: {
                speed: 3,
                autoStart: true,
                pauseOnHover: true,
                pauseOnFocus: false,
            },
        });

        // Mount Splide with AutoScroll extension
        splide.mount({ AutoScroll });

        // Cleanup function to properly destroy Splide when component unmounts or when `Products` change
        return () => {
            splide.destroy();
        };
    }, [Products, loading]); // Re-run effect when `Products` data changes

    return (
        <section className="">
            { loading
                ? (
                    <div className="overflow-hidden ">
                        <div className=" mt-3 py-5 pb-10">
                            <ul className=" h-auto max-md:w-[180px] md:w-[300px] mt-5 flex flex-nowrap gap-2">
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <li key={index} className=" relative max-xl:rounded-md xl:rounded-xl overflow-hidden shadow-[-1px_0px_5px_#f002,1px_0px_5px_#0004] hover:shadow-[-1px_0px_5px_#CC1554,1px_0px_5px_#6A4385] transition-shadow duration-300 swiper-slide  max-md:pb-1 md:pb-2 bg-black/10">
                                        <div className="">
                                            <Skeleton className="absolute max-md:top-1 md:top-2 max-md:right-1 md:right-2 max-xl:h-6 xl:h-7 max-md:px-3 md:px-5  flex justify-center items-center max-xl:rounded-full xl:rounded-full bg-black/20">
                                                <p className="text-white font-semibold max-xl:text-[10px] xl:text-sm w-8"></p>
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
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )
                : (
                    <div ref={splideRef} className="splide">
                        <div className="splide__track mt-3 py-5 pb-10">
                            <ul className="splide__list h-auto max-md:w-[180px] md:w-[300px] mt-5">
                                {Products.map((Product) => (
                                    <li key={Product.id} className="splide__slide relative max-xl:rounded-md xl:rounded-xl overflow-hidden shadow-[-1px_0px_5px_#f002,1px_0px_5px_#0004] hover:shadow-[-1px_0px_5px_#CC1554,1px_0px_5px_#6A4385] transition-shadow duration-300 swiper-slide  max-md:pb-1 md:pb-2">
                                        <Link href="/about" className="">
                                            <div className="absolute max-md:top-1 md:top-2 max-md:right-1 md:right-2 max-xl:h-6 xl:h-7 max-md:px-3 md:px-5  flex justify-center items-center max-xl:rounded-full xl:rounded-full bg-[#3a3a3a]">
                                                <p className="text-white font-semibold max-xl:text-[10px] xl:text-sm ">- 40%</p>
                                            </div>
                                            <div className="w-full h-auto flex justify-center">
                                                <Image src={Product.image} alt={Product.name} width={300} height={400} className="max-md:h-[150px] md:h-[250px]" />
                                            </div>
                                            <div className="w-full text-center max-xl:mt-[2px] xl:mt-2 max-md:px-2 md:px-3">
                                                <p className="max-md:text-xs md:text-md xl:text-xl noto_sans line-clamp-2">{Product.name}</p>
                                                <div className="flex justify-between items-center max-xl:mt-[1px] xl:mt-1 max-xl:py-1 xl:py-2">
                                                    <p className="max-md:text-[10px] md:text-sm xl:text-lg">Points: 43</p>
                                                    <p className="max-xl:text-[10px] xl:text-[12px] font-semibold flex justify-center items-center">
                                                        <del className=""><span className="noto_sans">৳</span>800</del>&nbsp;&nbsp;&nbsp;
                                                        <span className="noto_sans max-md:text-[14px] md:text-[20px]">৳</span>&nbsp;
                                                        <span className="max-md:text-[12px] md:text-[16px]">400</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                        <div className=" flex justify-between items-center max-xl:gap-1 xl:gap-2 max-md:px-1 md:px-2">
                                            <Link href="/" className="w-full max-md:h-7 max-xl:h-8 xl:h-10 flex justify-center items-center max-xl:rounded-sm xl:rounded-md bg-gradient_bg hover:opacity-85 max-md:text-xs text-white">Buy Now</Link>
                                            <Link href="/" className="max-md:w-10 md:w-full max-md:h-7 max-xl:h-8 xl:h-10 flex justify-center items-center max-xl:rounded-sm xl:rounded-md bg-gradient_bg hover:opacity-85 max-md:text-xs text-white">
                                                <span className='max-md:hidden'>Add to Cart</span>
                                                <span className='md:hidden'><i className='bx bxs-cart-add text-xl h-full w-full flex justify-center items-center'></i></span>
                                            </Link>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
            )}
            
        </section>
    );
};

export default ProductCarousel;
