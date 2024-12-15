"use client";
import { Button } from "@/components/ui/button";
import ColorPicker from "@/components/ui/color-picker";
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
import { createTask } from "@/lib/actions/task.action";
import { outfit } from "@/lib/fonts";
import { createTaskSchema } from "@/schemas/task.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Priority, Recurrence } from "@prisma/client";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CloseDialog } from "../ui/dialog";

export const CreateTask = ({ selectedDate }) => {
  const form = useForm({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      startTime: "",
      endTime: "",
      recurrence: "",
      color: "",
      priority: "",
      date: new Date(selectedDate),
    },
  });

  const [isPending, startTransition] = useTransition();

  const HandleCreateTask = (values) => {
    startTransition(() => {
      createTask({
        ...values,
        date: new Date(selectedDate),
      })
        .then((res) => {
          if (res?.success) {
            toast.success(res.success);
          } else if (res?.error) {
            console.log(res.error);
            toast.error(res.error);
          }
        })
        .catch((error) => {
          console.error("Error in createTask:", error);
          toast.error("Failed to create task.");
        });
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(HandleCreateTask)}
        className={`${outfit.className} space-y-4`}
      >
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

        <FormField
          control={form.control}
          name="recurrence"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recurrence</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Recurrence" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(Recurrence).map((recurrence, i) => (
                      <SelectItem key={i} value={recurrence}>
                        {recurrence}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(Priority).map((priority, i) => (
                      <SelectItem key={i} value={priority}>
                        {priority}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-3 w-full">
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Start Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>End Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <div className="flex justify-between items-center rounded-lg border border-input py-3 px-4 shadow-sm shadow-black/5 ">
              <p>Select color</p>
              <span
                className="w-8 h-8 rounded-full block border-2 cursor-pointer"
                style={{
                  backgroundColor: form.watch("color") || "#808080",
                }}
              />
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ColorPicker
                      {...field}
                      color={field.value}
                      onChange={(selectedColor) =>
                        field.onChange(selectedColor)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </PopoverContent>
        </Popover>

        <CloseDialog asChild>
          <Button
            type="submit"
            disabled={isPending}
            className="w-full btn-gradient"
          >
            {isPending ? "Creating Task..." : "Create Task"}
          </Button>
        </CloseDialog>
      </form>
    </Form>
  );
};

// const fakeApiCall = (values) =>
//   new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (Math.random() > 0.2) resolve(values);
//       else reject(new Error("API Error"));
//     }, 2000);
//   });
