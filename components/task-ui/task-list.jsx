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
  async function getTasks() {
    const res = await fetch(`http://localhost:3000/api/tasks?date=${date}`);
    const data = await res.json();
    return data;
  }
  const [tasks, setTasks] = useState([]);
  const [isPending, startTransition] = useTransition();
  const [skeletonCount, setSkeletonCount] = useState(
    // Math.floor(Math.random() * 4) +
    1
  );

  const fetchTasks = () => {
    startTransition(() => {
      getTasksByDate(date)
        // getTasks()
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

// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   DndContext,
//   closestCenter,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import {
//   arrayMove,
//   SortableContext,
//   sortableKeyboardCoordinates,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";
// import { SortableItem } from "./sortable-item"; // Component for sortable items
// import { getTasksByDate } from "@/lib/actions/task.action"; // Server actions
// import { Skeleton } from "../ui/skeleton";

// export const TasksList = ({ date }) => {
//   const [tasks, setTasks] = useState([]);
//   const [isPending, setisPending] = useState(true);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       setisPending(true);
//       try {
//         const res = await getTasksByDate(date);
//         if (res.error) {
//           console.error("Error fetching tasks:", res.error);
//           setTasks([]);
//         } else {
//           setTasks(res);
//         }
//       } catch (error) {
//         console.error("Error:", error);
//         setTasks([]);
//       } finally {
//         setisPending(false);
//       }
//     };

//     fetchTasks();
//   }, [date]);

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
//   );

//   const handleDragEnd = async ({ active, over }) => {
//     if (active.id !== over.id) {
//       const oldIndex = tasks.findIndex((task) => task.id === active.id);
//       const newIndex = tasks.findIndex((task) => task.id === over.id);

//       const updatedTasks = arrayMove(tasks, oldIndex, newIndex);
//       setTasks(updatedTasks);

//       // Update database with new order
//       try {
//         // await updateTaskDate(active.id, date); // Update task's date in the database
//         console.log("Task updated successfully!");
//       } catch (error) {
//         console.error("Error updating task:", error);
//       }
//     }
//   };
//   const skeletonCount = Math.floor(Math.random() * 4) + 1;

//   return (
//     <div>
//       {isPending ? (
//         Array.from({ length: skeletonCount }).map((_, i) => (
//           <Skeleton key={i} className="h-4 w-full p-4 mb-4" />
//         ))
//       ) : (
//         <DndContext
//           sensors={sensors}
//           collisionDetection={closestCenter}
//           onDragEnd={handleDragEnd}
//         >
//           <SortableContext
//             items={tasks.map((task) => task.id)}
//             strategy={verticalListSortingStrategy}
//           >
//             <ul className="my-4 space-y-3">
//               {tasks.map((task) => (
//                 <SortableItem key={task.id} id={task.id} task={task} />
//               ))}
//             </ul>
//           </SortableContext>
//         </DndContext>
//       )}
//     </div>
//   );
// };
