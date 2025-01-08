"use client";

import { Image, Button } from "@nextui-org/react";
import { Divider } from "@nextui-org/divider";

import { title } from "@/components/primitives";
import { Card, CardFooter } from "@nextui-org/card";
import React from "react";

const rowsData = [
  {
    title: "Primera fila",
    subtitle: "Explora contenido relacionado con la primera categoría.",
    cards: [
      {
        image: "https://nextui.org/images/hero-card.jpeg",
        alt: "Card 1",
        footerText: "Disponible pronto.",
        footerTextColor: "text-white/80",
        buttonText: "Más info",
        buttonTextColor: "text-white",
        buttonLink: "https://www.youtube.com",
      },
      {
        image: "https://nextui.org/images/hero-card.jpeg",
        alt: "Card 2",
        footerText: "Próximamente.",
        footerTextColor: "text-gray-300",
        buttonText: "Detalles",
        buttonTextColor: "text-blue-500",
        buttonLink: "https://www.google.com",
      },
    ],
  },
  {
    title: "Segunda fila",
    subtitle: "Encuentra más contenido relacionado con esta categoría.",
    cards: [
      {
        image: "https://nextui.org/images/hero-card.jpeg",
        alt: "Card 3",
        footerText: "Coming soon.",
        footerTextColor: "text-green-500",
        buttonText: "Learn more",
        buttonTextColor: "text-red-500",
        buttonLink: "https://www.github.com",
      },
      {
        image: "https://nextui.org/images/hero-card.jpeg",
        alt: "Card 4",
        footerText: "Disponible pronto.",
        footerTextColor: "text-purple-500",
        buttonText: "Más info",
        buttonTextColor: "text-yellow-500",
        buttonLink: "https://www.facebook.com",
      },
    ],
  },
];

export default function DocsPage() {
  return (
    <div className="w-full h-auto">
      <h1 className={`${title()} text-center`}>Recursos</h1>
      <p className="mt-4 text-gray-600 text-lg text-center">
        Encuentra inspiración para antes de nuestra reunión.
      </p>
      <div className="w-full h-auto space-y-8">
        {rowsData.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex flex-col items-center sm:items-start justify-start p-4"
          >
            {/* Título y subtítulo de la fila */}
            <h1 className="text-2xl font-bold text-center sm:text-left">
              {row.title}
            </h1>
            <h2 className="text-lg text-gray-600 mt-2 text-center sm:text-left">
              {row.subtitle}
            </h2>

            {/* Divisor */}
            <Divider className="my-4" />

            {/* Fila de tarjetas */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {row.cards.map((card, cardIndex) => (
                <Card
                  key={cardIndex}
                  isFooterBlurred
                  className="border-none radius-lg"
                  style={{
                    width: "100%", // Asegura que las cartas ocupen el espacio disponible
                    maxWidth: "200px", // Tamaño por defecto
                  }}
                >
                  <Image
                    alt={card.alt}
                    className="object-cover sm:object-contain"
                    height={200} // Tamaño por defecto
                    src={card.image}
                    width={200} // Tamaño por defecto
                  />
                  <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                    <p className={`text-tiny ${card.footerTextColor}`}>
                      {card.footerText}
                    </p>
                    <Button
                      className={`text-tiny ${card.buttonTextColor} bg-black/20`}
                      color="default"
                      radius="lg"
                      size="sm"
                      variant="flat"
                      onClick={() => {
                        window.location.href = card.buttonLink;
                      }}
                    >
                      {card.buttonText}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
