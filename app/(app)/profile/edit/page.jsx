import { EditProfile } from "@/components/edit-profile";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChangePassword } from "@/components/change-password";

const page = () => {
  return (
    <Tabs defaultValue="edit-profile">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="edit-profile">Edit Profile</TabsTrigger>
        <TabsTrigger value="edit-password">Change Password</TabsTrigger>
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
