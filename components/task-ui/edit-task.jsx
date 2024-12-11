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
import { editTask } from "@/lib/actions/task.action";
import { outfit } from "@/lib/fonts";
import { editTaskSchema } from "@/schemas/task.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Priority, Recurrence } from "@prisma/client";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Checkbox } from "../ui/checkbox";
import { CloseDialog } from "../ui/dialog";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export const EditTask = ({ task }) => {
  const form = useForm({
    resolver: zodResolver(editTaskSchema),
    defaultValues: {
      title: task?.title || undefined,
      description: task?.description || undefined,
      startTime: task?.startTime
        ? new Date(task.startTime).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
        : undefined,
      endTime: task?.endTime
        ? new Date(task.endTime).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
        : undefined,
      recurrence: task?.recurrence || undefined,
      color: task?.color || undefined,
      priority: task?.priority || undefined,
      date: new Date(task?.date),
      completed: task?.completed || false,
    },
  });

  const [isPending, startTransition] = useTransition();

  const HandleEditTask = (values) => {
    startTransition(() => {
      editTask({
        ...values,
        id: task.id,
      })
        .then((res) => {
          console.log("Server response:", res);
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
        onSubmit={form.handleSubmit(HandleEditTask)}
        className={`${outfit.className} space-y-4`}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
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
                <Input {...field} />
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
                    <SelectValue />
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
                    <SelectValue />
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

        <FormField
          control={form.control}
          name="completed"
          render={({ field }) => (
            <FormItem className="w-1/2">
              <FormControl>
                <Checkbox
                  id="completed"
                  {...field}
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked)}
                />
              </FormControl>
              <Label className="ml-2" htmlFor="completed">
                {task?.completed ? "Completed" : "Mark as Completed"}
              </Label>
              <FormMessage />
            </FormItem>
          )}
        />

        <CloseDialog asChild>
          <Button
            type="submit"
            disabled={isPending}
            className="w-full btn-gradient"
          >
            {isPending ? "Editing Task..." : "Edit Task"}
          </Button>
        </CloseDialog>
      </form>
    </Form>
  );
};
