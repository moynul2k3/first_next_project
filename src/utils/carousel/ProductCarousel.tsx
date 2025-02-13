"use client"; // Required in Next.js 15+
import '@splidejs/react-splide/css';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Splide } from '@splidejs/splide';
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
    }, [Products]); // Re-run effect when `Products` data changes

    return (
        <section className="mt-10 max-md:px-4 md:px-8 lg:px-20 xl:px-32">
            <p className="text-2xl m-0 p-0 font-semibold text-[#1a1a1a]">Products</p>
            <div ref={splideRef} className="splide">
                <div className="splide__track mt-3">
                    <ul className="splide__list h-auto w-[300px] mt-5 bg-black">
                        {Products.map((Product) => (
                            <li key={Product.id} className="splide__slide relative max-xl:rounded-md xl:rounded-xl overflow-hidden bg-red-200 hover:shadow-xl shadow-black/70 transition-shadow duration-300 swiper-slide max-md:pb-1 md:pb-3 lg:pb-5">
                                <Link href="/about" className="">
                                    <div className="absolute top-0 right-0 max-xl:h-8 max-xl:w-8 xl:h-20 xl:w-20 flex justify-center items-center max-xl:rounded-bl-md xl:rounded-bl-xl bg-[#f00] ">
                                        <p className="text-white font-semibold max-xl:leading-4 xl:leading-5 max-xl:text-xs">40% <br/> OFF</p>
                                    </div>
                                    <div className="w-full flex justify-center">
                                        <Image src={Product.image} alt={Product.name} width={300} height={400} className="max-sm:h-[110px] sm:h-[180px] xl:h-[250px]" />
                                    </div>
                                    <div className="w-full text-center max-xl:mt-[2px] xl:mt-2 max-xl:px-1 xl:px-4">
                                        <p className="max-md:text-xs md:text-md xl:text-xl font-semibold noto_sans line-clamp-1">{Product.name}</p>
                                        <p className="max-md:text-[10px] md:text-sm xl:text-lg">Description</p>
                                        <div className="flex justify-between items-center max-xl:mt-[1px] xl:mt-2 max-xl:pb-1 xl:pb-3 max-xl:px-3 xl:px-1">
                                            <p className="max-md:text-[10px] md:text-sm xl:text-lg">Points: 43</p>
                                            <p className="max-xl:text-xs xl:text-sm font-semibold flex justify-center items-center">
                                                <del className=""><span className="noto_sans">৳</span>800</del>&nbsp;&nbsp;&nbsp;
                                                <span className="noto_sans max-xl:text-[8px] xl:text-[25px]">৳</span>&nbsp;
                                                <span className="max-xl:text-[12px] xl:text-[20px]">400</span>
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                                <div className="flex justify-between items-center gap-2 px-2">
                                    <Link href="/" className="w-full h-10 flex justify-center items-center rounded-md bg-red-400 hover:bg-red-500">Send Message</Link>
                                    <Link href="/" className="w-full h-10 flex justify-center items-center rounded-md bg-red-400 hover:bg-red-500">Add to Cart</Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default ProductCarousel;
