"use client";

import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

const Heading = () => {
  return (
    <div
      className="max-w-3xl space-y-4"
    >
      <h1
        className="text-3xl sm:text-5xl md:text-6xl font-bold"
      >
        Crafting Kitchens, Designing Dreams. Welcome to <span className="underline text-green-500">IBM Cuisine</span>.
         {" "} Where Wood Meets Elegance.
      </h1>
      <h3
        className="text-base sm:text-xl md:text-2xl font-medium"
      >
        IBM Cuisine s the creative space where exceptional kitchen designs
        and woodworking come to life.
      </h3>
      <div>
        <Button asChild size="lg" className="text-dark-400 bg-dark-700 hover:bg-dark-600">
          <Link href="?admin=true" className="space-x-2">
            Start Now
            <ArrowRightIcon className="w-6 h-6"/>
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default Heading