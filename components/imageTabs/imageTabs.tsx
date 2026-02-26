"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import Image from "next/image";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const imagesButtons = [
  {
    label: "Organize Aplicações",
    value: "/next.svg",
    id: 0,
  },
  {
    label: "Seja Contratado",
    value: "/next.svg",
    id: 1,
  },
  {
    label: "Gerencie Quadros",
    value: "/next.svg",
    id: 2,
  },
] as const;

type ImageValue = (typeof imagesButtons)[number]["value"];

export function ImageTabs() {
  const [currentImage, setCurrentImage] = useState<ImageValue>("/next.svg");

  return (
    <section className="border-t border-secondary/5 py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <RadioGroup
            onValueChange={(value) => setCurrentImage(value as ImageValue)}
            defaultValue="organize-applications"
            className="flex items-center gap-2 justify-center mb-8"
          >
            {imagesButtons.map((item) => (
              <div key={item.id}>
                <RadioGroupItem
                  value={item.value}
                  id={item.value}
                  className="hidden"
                />
                <Button
                  variant={"secondary"}
                  className={cn(
                    currentImage === item.value &&
                      "bg-secondary/5 text-secondary hover:bg-secondary/5 hover:text-secondary",
                  )}
                  asChild
                >
                  <Label htmlFor={item.value}>{item.label}</Label>
                </Button>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-xl border border-secondary/20 shadow-xl p-2">
          <Image
            src={currentImage}
            alt={currentImage}
            height={800}
            width={1200}
          />
        </div>
      </div>
    </section>
  );
}
