import { EditProfile } from "@/components/edit-profile";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChangePassword } from "@/components/change-password";
import { currentUser } from "@/lib/serverHooks";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Ban } from "lucide-react";

const page = async () => {
  const user = await currentUser();
  return (
    <Tabs defaultValue="edit-profile">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="edit-profile">Edit Profile</TabsTrigger>
        {user?.isOAuth ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative left-10 cursor-not-allowed">
                  <TabsTrigger
                    value="edit-password"
                    className="pointer-events-none"
                  >
                    Change Password
                  </TabsTrigger>
                </div>
              </TooltipTrigger>
              <TooltipContent className="flex gap-2 items-center">
                <Ban className="text-destructive" size={18} />
                <p>OAuth users cannot change their password directly.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <TabsTrigger value="edit-password">Change Password</TabsTrigger>
        )}
      </TabsList>
      <TabsContent value="edit-profile">
        <EditProfile />
      </TabsContent>
      <TabsContent value="edit-password">
        <ChangePassword />
      </TabsContent>
    </Tabs>
  );
};

export default page;
