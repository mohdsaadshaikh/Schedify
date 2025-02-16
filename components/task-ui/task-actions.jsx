"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { editTaskSchema } from "@/schemas/task.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Priority, Recurrence } from "@prisma/client";
import { BellRing, Calendar, Repeat, Trash2 } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { DeleteTask } from "./delete-task";
import { editTask } from "@/lib/actions/task.action";

export const TaskActions = ({ task, fetchTasks }) => {
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
      notifyMe: task?.notifyMe || false,
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
          if (res?.success) {
            toast.success(res.success);
            fetchTasks();
          } else if (res?.error) {
            toast.error(res.error);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to edit task.");
        });
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(HandleEditTask)} className=" space-y-6">
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="text-sm ">
              {new Date(task?.date).toLocaleDateString("en-US", {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FormField
              control={form.control}
              name="notifyMe"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <BellRing
                      className={`h-8 w-8 border p-2 rounded-md cursor-pointer ${
                        field.value
                          ? "text-gray-200 bg-[#53ab8b] "
                          : "text-[#53ab8b] border-[#53ab8b]"
                      }`}
                      onClick={() => field.onChange(!field.value)}
                    />
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
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger showIcon={false} className="p-2 h-8 w-8">
                        <Repeat className="h-4 w-4  text-gray-500" />
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
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  disabled={isPending}
                  variant="ghost"
                  size="icon"
                >
                  <Trash2 />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Delete Task</DialogTitle>
                </DialogHeader>
                <DeleteTask taskId={task.id} fetchTasks={fetchTasks} />
              </DialogContent>
            </Dialog>
            <Popover>
              <PopoverTrigger asChild>
                <span
                  className="w-5 h-5 rounded-full block cursor-pointer"
                  style={{
                    backgroundColor: form.watch("color") || "#808080",
                  }}
                />
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
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 w-full border-b-2 border-[#53ab8b]">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      placeholder="Task title"
                      {...field}
                      className="border-none p-0 focus-visible:ring-0 focus:outline-0 focus-visible:outline-none focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="completed"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="h-5 w-5 rounded-full border-2 border-gray-300"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Add Details about your task..."
                    {...field}
                    className="border-none pl-0 bg-transparent  text-gray-500 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-3 w-full">
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
          </div>
        </div>
        <Button type="submit" disabled={isPending}>
          Edit Task
        </Button>
      </form>
    </Form>
  );
};
