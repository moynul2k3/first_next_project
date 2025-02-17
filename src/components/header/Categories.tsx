import Link from "next/link";

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
    //navigationMenuTriggerStyle,
    NavigationMenuContent,
    // NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const API_URL =
  process.env.NEXT_PUBLIC_PRODUCTION === "true"
    ? process.env.NEXT_PUBLIC_PRODUCTION_API
    : process.env.NEXT_PUBLIC_LOCAL_API;



export default async function Categories() {
  const res = await fetch(`${API_URL}/categories/`, {
    next: {
      revalidate: 15,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch data");

  const categories = await res.json();

  const navCategoriesStyle = {
    width: '600px',
    height: 'auto',
    maxHeight: '300px',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    overflow: 'auto',
    gap: '40px',
    justifyItems: 'center',
    alignItems: 'start',
  };

  return (
      <div className="flex flex-row-reverse justify-center  items-center max-md:px-4 md:px-8 lg:px-20 xl:px-32 max-md:hidden">
        {/*<NavigationMenu>
            <NavigationMenuList className="flex flex-nowrap overflow-x-auto w-auto">
                <NavigationMenuItem className="bg-transparent">
                  <Link href="/home" scroll={true} className={navigationMenuTriggerStyle()}>Home</Link>
                  
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>*/}

      <NavigationMenu className="">
          <Carousel className=" me-16 w-[600px] max-xl:px-4">
            <NavigationMenuList >
              <CarouselContent className="" >
                {categories.map((category: { id: number; name: string; subcategories: { id: number; name: string; image: string }[] }) => (
                    <CarouselItem id="categoryItem" key={category.id} className="basis-auto">
                      <NavigationMenuItem >
                          <NavigationMenuTrigger className="select-none ">{category.name}</NavigationMenuTrigger>
                            <NavigationMenuContent className="w-[800px]">
                              <div  className="p-5" style={navCategoriesStyle}>
                                  {category.subcategories.map((subcat) => (
                                      <Link href="/" key={subcat.id} className="flex justify-center items-center flex-col">
                                        <Avatar>
                                          <AvatarImage src={subcat.image} alt="{subcat.name}" />
                                          <AvatarFallback>{subcat.name}</AvatarFallback>
                                        </Avatar>
                                        <p>{subcat.name}</p>
                                      </Link>
                                  ))}
                                </div>
                            </NavigationMenuContent>
                      </NavigationMenuItem>
                    </CarouselItem>
                ))}
              </CarouselContent>
            </NavigationMenuList>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </NavigationMenu>
      </div>
    );
}
