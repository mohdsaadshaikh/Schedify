"use client";

import { getTasksByDate } from "@/lib/actions/task.action";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { EditTask } from "./edit-task";
import { Skeleton } from "../ui/skeleton";

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

  const skeletonCount = Math.floor(Math.random() * 4) + 1;

  return (
    <ul>
      {isLoading
        ? Array.from({ length: skeletonCount }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full p-4 mb-4" />
          ))
        : tasks.length > 0 && (
            <div className="my-4 space-y-3">
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
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       setIsLoading(true);
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
//         setIsLoading(false);
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
//       {isLoading ? (
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
