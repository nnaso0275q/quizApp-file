"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/(protected)/AppSidebar";
import Header from "./Header";

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <SidebarProvider>
        <AppSidebar open />
        <main className="mt-[75px]">
          <SidebarTrigger />
          <div className="bg-background">{children}</div>
        </main>
      </SidebarProvider>
    </div>
  );
};
