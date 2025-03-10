"use client";

import { getTasksByDate } from "@/lib/actions/task.action";
import { useEffect, useState } from "react";

import { useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Skeleton } from "../ui/skeleton";
import { TaskActions } from "./task-actions";

export const TasksList = ({ date }) => {
  const [tasks, setTasks] = useState([]);
  const [isPending, startTransition] = useTransition();
  const [skeletonCount, setSkeletonCount] = useState(
    // Math.floor(Math.random() * 4) +
    1
  );

  const fetchTasks = () => {
    startTransition(() => {
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
        });
    });
  };
  useEffect(() => {
    fetchTasks();
  }, [date]);

  // const skeletonCount = Math.floor(Math.random() * 4) + 1;
  // if (isPending && skeletonCount === 0) {
  //   setSkeletonCount(Math.floor(Math.random() * 4) + 1);
  // }

  return (
    <ul>
      {isPending
        ? Array.from({ length: 1 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full p-4 mb-4" />
          ))
        : tasks?.length > 0 && (
            <div className="my-4 space-y-3">
              {tasks.map((task) => {
                return (
                  <li
                    key={task.id}
                    style={{ borderColor: task.color }}
                    className="cursor-pointer p-2 border-2 rounded-md transition-all duration-300 ease-in-out hover:bg-gradient-to-r from-slate-50 to-gray-300 dark:hover:bg-gradient-to-r dark:from-zinc-600 dark:to-zinc-900 bg-size-200 bg-pos-0 hover:bg-pos-100"
                  >
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className={task?.completed && "line-through"}>
                          {task.title}
                        </div>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader className="hidden">
                          <DialogTitle>Edit Task</DialogTitle>
                        </DialogHeader>
                        <TaskActions task={task} fetchTasks={fetchTasks} />
                      </DialogContent>
                    </Dialog>
                  </li>
                );
              })}
            </div>
          )}
    </ul>
  );
};
