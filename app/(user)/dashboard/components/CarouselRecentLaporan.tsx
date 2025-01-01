/** @format */

import * as React from "react";
import CardLaporan from "./CardLaporan";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function CarouselSize({ recent }: any) {
  return (
    <Carousel
      opts={{
        align: "center",
      }}
      className='max-w-[950px]'>
      <CarouselContent>
        {recent.map((laporan: any, index: any) => (
          <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/3'>
            <div className='p-1 max-w-[400px]'>
              <CardLaporan laporan={laporan} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
