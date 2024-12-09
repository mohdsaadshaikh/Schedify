"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Component({ color, onChange }) {
  const colors = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#00FFFF",
    "#FF00FF",
    "#800080",
    "#008080",
    "#808080",
    "#FFA500",
    "#800000",
    "#008000",
    "#000080",
    "#808000",
    "#800080",
  ];

  const [selectedColor, setSelectedColor] = useState(color);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSelectedColor(value);
    onChange(value);
  };

  return (
    <div className="bg-background p-3 w-full max-w-md flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Picked Color</h2>
        <div
          className="w-8 h-8 rounded-full "
          style={{ backgroundColor: selectedColor }}
        />
      </div>

      <div className="grid grid-cols-5 gap-2">
        {colors.map((c, i) => (
          <button
            key={i}
            className={`w-8 h-8 rounded-full transition-all ${
              selectedColor === c
                ? "ring-2 ring-primary"
                : "hover:ring-2 hover:ring-muted"
            }`}
            style={{ backgroundColor: c }}
            onClick={(e) => {
              e.preventDefault();
              setSelectedColor(c);
              onChange(c);
            }}
          />
        ))}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="hex-color">Hex Color</Label>
        <div className="flex items-center gap-4">
          <Input
            id="hex-color"
            type="text"
            value={selectedColor}
            onChange={handleInputChange}
            className="flex-1"
          />
          <div
            className="w-8 h-8 rounded-full"
            style={{ backgroundColor: selectedColor }}
          />
        </div>
      </div>
    </div>
  );
}
