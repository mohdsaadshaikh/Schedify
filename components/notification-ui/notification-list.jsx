"use client";
import { BellIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAllNotifications } from "@/lib/actions/notification.action";
import Image from "next/image";
import { Loader } from "../loader";

export const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = () => {
    setLoading(true);
    getAllNotifications()
      .then((res) => {
        setLoading(false);
        if (res.error) {
          console.error("Error:", res.error);
          setNotifications([]);
        } else setNotifications(res);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <ScrollArea className="h-72 rounded-md border">
      {loading ? (
        <div className="h-72 flex justify-center items-center">
          <Loader size="60px" />
        </div>
      ) : notifications.length > 0 ? (
        notifications.map((notification) => (
          <div
            key={notification.id}
            className="w-full flex items-center gap-4 p-4 duration-300 ease-in-out hover:bg-gradient-to-r from-slate-50 to-gray-300 dark:hover:bg-gradient-to-r dark:from-zinc-600 dark:to-zinc-900 bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all"
          >
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                {notification.message}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {new Date(notification.sentAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                · {new Date(notification.sentAt).toLocaleDateString()}
              </p>
            </div>

            <BellIcon className="w-4 h-4 mb-5" />
          </div>
        ))
      ) : (
        <p className="p-4 text-sm text-gray-500 dark:text-gray-400">
          No new notifications
        </p>
      )}
    </ScrollArea>
  );
};
