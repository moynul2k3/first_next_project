"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperCore } from "swiper/types";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Define the type for the slides prop
interface MySwiperProps {
    slides: string[]; // Expecting an array of image URLs
}

const MySwiper: React.FC<MySwiperProps> = ({ slides }) => {
    const swiperRef = useRef<SwiperCore | null>(null);

    useEffect(() => {
        return () => {
            if (swiperRef.current) {
                swiperRef.current.destroy(true, true);
            }
        };
    }, []);

    return (
        <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)} // Store Swiper instance
            effect="fade" // Fade effect for transitions
            pagination={{ dynamicBullets: true, clickable: true }} // Pagination settings
            modules={[EffectFade, Pagination, Autoplay]} // Swiper modules
            autoplay={{ delay: 3000 }} // Automatic slide transition every 3 seconds
            className="w-full h-full transition-all ease-in-out duration-700"
        >
            {slides.map((image, index) => (
                <SwiperSlide key={index}>
                    <div className="relative w-full h-full">
                        <Image 
                            src={image} 
                            alt={`Slide ${index + 1}`} 
                            fill // Use the `fill` prop to make the image fill the container
                            className="object-cover" // Ensure the image covers the area
                            priority // Mark the first image as high priority for faster loading
                        />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default MySwiper;
