"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import Header from "./Header";
import AppSidebar from "./AppSidebar";

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <SidebarProvider>
        <AppSidebar />
        <main className="mt-[75px]">
          <SidebarTrigger />
          <div className="bg-background">{children}</div>
        </main>
      </SidebarProvider>
    </div>
  );
};
