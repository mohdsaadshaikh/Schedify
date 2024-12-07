"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Lucide React Icons
import { outfit, roboto } from "@/lib/fonts";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { CreateTask } from "./create-task";

export const WeekDaysOverview = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getWeekDays = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1); // Start on Monday
    const days = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i); // Increment days
      days.push(day);
    }

    return days;
  };

  const handlePreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7); // Go back 7 days
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7); // Go forward 7 days
    setCurrentDate(newDate);
  };

  const weekDays = getWeekDays(currentDate);
  const formattedWeekDays = weekDays.map((day) => ({
    date: day.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }), // e.g., 03 Dec
    fullDate: day.toISOString().split("T")[0], // YYYY-MM-DD format for comparison
    dayName: day.toLocaleString("en", { weekday: "short" }), // Short day name (Mon, Tue)
  }));

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className={`${outfit.className} p-6`}>
      {/* Header */}
      <header className="flex justify-between items-center mb-8 mt-2">
        <h1 className="text-3xl font-bold text-[#53ab8b]">
          {currentDate.toLocaleString("en", { month: "long", year: "numeric" })}
        </h1>
        <div className="flex space-x-4">
          <Button onClick={handlePreviousWeek} variant="outline">
            <ChevronLeft />
          </Button>
          <Button variant="outline" onClick={handleNextWeek}>
            <ChevronRight />
          </Button>
        </div>
      </header>

      <div className="grid lg:grid-cols-7 md:grid-cols-1 sm:grid-cols-1 gap-6">
        {formattedWeekDays.map((day, index) => (
          <div
            key={index}
            className={`${
              today === day.fullDate &&
              "text-[#53ab8b] border-b-4 border-[#53ab8b]"
            }  py-2 min-w-[120px] border-b-2 flex justify-between`}
          >
            <div className="text-xl font-semibold">{day.date}</div>
            <div className="text-gray-500 text-lg">{day.dayName}</div>
          </div>
        ))}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Task</DialogTitle>
              <DialogDescription>
                Add details for your new task and click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <CreateTask />
            <DialogFooter>
              <Button type="submit">Save Task</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
