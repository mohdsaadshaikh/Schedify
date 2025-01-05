"use client";
import { deleteTask } from "@/lib/actions/task.action";
import { Button } from "../ui/button";
import { CloseDialog } from "../ui/dialog";
import { toast } from "sonner";

export const DeleteTask = ({ taskId, fetchTasks }) => {
  const handleDeleteTask = async () => {
    try {
      await deleteTask(taskId);
      toast.success("Task deleted successfully");
      fetchTasks();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete task");
    }
  };

  return (
    <div className="w-full flex flex-col gap-8">
      <h3>Are you really want to delete this page</h3>
      <div className="flex justify-end gap-2">
        <CloseDialog asChild>
          <Button className="w-1/4">No</Button>
        </CloseDialog>
        <Button
          className="w-1/4"
          variant="destructive"
          onClick={() => handleDeleteTask()}
        >
          Yes
        </Button>
      </div>
    </div>
  );
};
