"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { createTaskSchema } from "@/schemas/task.schema";
import ColorPicker from "@/components/ui/color-picker";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export const CreateTask = () => {
  const form = useForm({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      startTime: "",
      endTime: "",
      isRepeating: false,
      recurrence: "",
      color: "",
      priority: "",
      completed: false,
    },
  });

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onSubmit = (values) => {
    startTransition(() => {
      // Mock API Request (Replace this with actual API logic)
      fakeApiCall(values)
        .then(() => {
          toast.success("Task created successfully!");
          router.push("/tasks"); // Navigate to tasks page
        })
        .catch((error) => {
          toast.error("Failed to create task.");
          console.error(error);
        });
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 "
        autoComplete="off"
      >
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter task title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter task description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="Enter task category" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Start Time */}
        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Time</FormLabel>
              <FormControl>
                <Input type="time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* End Time */}
        <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Time</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Is Repeating */}
        <FormField
          control={form.control}
          name="isRepeating"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <Checkbox
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked)}
              />
              <FormLabel>Is Repeating</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Recurrence */}
        <FormField
          control={form.control}
          name="recurrence"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recurrence</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Recurrence" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center space-x-2 px-4 py-2 border rounded-md">
              <span>Select Color</span>
              <span
                className="w-4 h-4 rounded-full border"
                style={{
                  backgroundColor: form.watch("color") || "#000000", // Fallback for undefined
                }}
              />
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    {/* Replace ColorPicker with custom implementation */}
                    <div className="grid grid-cols-5 gap-2">
                      {colors.map((color, index) => (
                        <button
                          key={index}
                          className={`w-8 h-8 rounded-full transition-all ${
                            field.value === color
                              ? "ring-2 ring-primary"
                              : "hover:ring-2 hover:ring-muted"
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => field.onChange(color)} // Update the form value
                        />
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </PopoverContent>
        </Popover>

        {/* Priority */}
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Completed */}
        <FormField
          control={form.control}
          name="completed"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <Checkbox
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked)}
              />
              <FormLabel>Completed</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Creating Task..." : "Create Task"}
        </Button>
      </form>
    </Form>
  );
};

// Mock API function
const fakeApiCall = (values) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.2) resolve(values);
      else reject(new Error("API Error"));
    }, 2000);
  });
