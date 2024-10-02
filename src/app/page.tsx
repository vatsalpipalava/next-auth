"use client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import messages from "@/app/messages.json";

export default function Home() {
  return (
    <main className="flex flex-grow flex-col items-center justify-center px-4 py-12 md:px-24">
      <section className="mb-8 text-center md:mb-12">
        <h1 className="text-3xl font-bold md:text-5xl">Random Conversions</h1>
        <p className="mt-3 text-base md:mt-4 md:text-lg">Conversions</p>
      </section>
      <Carousel
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
        className="w-full max-w-xs"
      >
        <CarouselContent>
          {
            messages.map((message, index)=>(<CarouselItem key={index}>
              <div className="p-1">
                <Card className="h-auto">
                  <CardHeader>
                    <CardTitle>
                      {message.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex h-full items-center justify-center p-6">
                    <span className="text-lg font-semibold">{message.content}</span>
                  </CardContent>
                  <CardFooter>
                    {message.received}
                  </CardFooter>
                </Card>
              </div>
            </CarouselItem>))
          }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </main>
  );
}
