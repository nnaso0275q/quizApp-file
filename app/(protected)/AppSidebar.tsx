"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ItemsType } from "@/types";

export function AppSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [items, setItems] = useState<ItemsType[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

console.log("items", items)

  useEffect(() => {
    const saved = localStorage.getItem("articles");
    if (saved) setItems(JSON.parse(saved));
  }, []);

  //   try {
  //   const response = await fetch("/api/quiz", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ summary }),
  //   });
  //   // const data = await response.json();

  //   router.push(
  //     `/quizzes?title=${encodeURIComponent(
  //       title
  //     )}&summary=${encodeURIComponent(summary)}`
  //   );
  // } catch (error) {
  //   console.log("Error:", error);
  //   alert("failed");
  // }

  const handleSelectedItem = (id: number) => {
    setSelectedId(id);
    router.push(`article?id=${id}`);
  };

  const selectedItems = items.find((item) => item.id === Number(id));

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent className="mt-[60px]" />

      <div className="text-black font-semibold pl-6 ">History</div>
      <SidebarGroupContent>
        <SidebarMenu className="px-4 ">
          {items?.map((item) => {
            return (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  asChild
                  onClick={() => handleSelectedItem(item.id)}
                  className={`cursor-pointer ${
                    selectedItems?.id === item.id
                      ? "bg-gray-200 font-semibold"
                      : "hover:bg-gray-200 transition-all duration-300"
                  }`}
                >
                  <div className="cursor-default text-black font-medium h-fit py-2 text-base">
                    {item.title}
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>

      <SidebarFooter />
    </Sidebar>
  );
}
