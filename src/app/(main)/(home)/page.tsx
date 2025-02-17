import React from 'react'
import Hero from "./hero"
import SubCategories from "./subCategories"
import TopSales from "./popularProducts"
import OurProducts from "./ourProducts"
export default async function Home() {
  return (
      <main>
        <Hero />
        <SubCategories />
        <TopSales />
        <OurProducts  />
      </main>
    )
}
