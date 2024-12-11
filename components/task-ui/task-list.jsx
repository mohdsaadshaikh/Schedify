"use client";

import { getTasksByDate } from "@/lib/actions/task.action"; // Server Action
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { EditTask } from "./edit-task";

export const TasksList = ({ date }) => {
  console.log(date);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = () => {
      setIsLoading(true);
      getTasksByDate(date)
        .then((res) => {
          if (res.error) {
            console.error("Error:", res.error);
            setTasks([]);
          } else {
            setTasks(res);
          }
        })
        .catch((err) => {
          console.error("Error in fetching tasks:", err);
          setTasks([]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchTasks();
  }, [date]);

  return (
    tasks.length > 0 && (
      <ul className="mt-4 space-y-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="cursor-pointer p-2 border rounded-md transition-all duration-300 ease-in-out hover:bg-gradient-to-r from-slate-50 to-gray-300 dark:hover:bg-gradient-to-r dark:from-zinc-600 dark:to-zinc-900 bg-size-200 bg-pos-0 hover:bg-pos-100"
          >
            <Dialog>
              <DialogTrigger asChild>
                <div className={task?.completed && "line-through"}>
                  {task.title}
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Task</DialogTitle>
                </DialogHeader>
                <EditTask task={task} />
              </DialogContent>
            </Dialog>
          </li>
        ))}
      </ul>
    )
  );
};
