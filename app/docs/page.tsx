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
        image: "https://static-00.iconduck.com/assets.00/pinterest-icon-2048x2048-d7p0u7c5.png",
        alt: "Pinterest",
        footerText: "Pinterest",
        footerTextColor: "text-white/80",
        buttonText: "Ver",
        buttonTextColor: "text-white",
        buttonLink: "https://www.pinterest.com",
      },
      {
        image: "https://cdn.dribbble.com/userupload/9750980/file/original-abb9e2f8242f871c34d0727ba7868aa7.png?resize=752x&vertical=center",
        alt: "Dribbble",
        footerText: "Dribbble",
        footerTextColor: "text-gray-800",
        buttonText: "Ver",
        buttonTextColor: "text-pink-500",
        buttonLink: "https://dribbble.com/search/websites",
      },
      {
        image: "https://image.spreadshirtmedia.com/image-server/v1/products/T1459A839PA3861PT28D1040125286W10000H2134/views/1,width=550,height=550,appearanceId=839,backgroundColor=F2F2F2/httpster-sticker.jpg",
        alt: "Httpster",
        footerText: "Httpster",
        footerTextColor: "text-gray-800",
        buttonText: "Ver",
        buttonTextColor: "text-yellow-200",
        buttonLink: "https://httpster.net",
      },
      {
        image: "https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxo4K81Ei7WzcnqEk8W.MgwZYL9v6HqLuMfZlIwt20gJkLnz8LlzJLalI2ZDsdWnc5u8_qMqCT1QDNkpL7Gsf9m4-&format=source&h=210",
        alt: "canva",
        footerText: "Canva",
        footerTextColor: "text-white",
        buttonText: "Ver",
        buttonTextColor: "text-blue-400",
        buttonLink: "https://canva.com",
      },
    ],
  },
  {
    title: "Segunda fila",
    subtitle: "Encuentra más contenido relacionado con esta categoría.",
    cards: [
      {
        image: "https://nextui.org/images/hero-card.jpeg",
        alt: "GitHub",
        footerText: "GitHub",
        footerTextColor: "text-green-500",
        buttonText: "Learn more",
        buttonTextColor: "text-red-500",
        buttonLink: "https://www.github.com",
      },
      {
        image: "https://nextui.org/images/hero-card.jpeg",
        alt: "Facebook",
        footerText: "Facebook",
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
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
                    className="object-cover"
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
