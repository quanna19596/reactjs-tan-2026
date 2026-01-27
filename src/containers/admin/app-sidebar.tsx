import { ChevronUp, type LucideProps, User2 } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shadcn/ui/sidebar";
import { ThemeToggle } from "./theme-toggle";

type TAppSidebarItem = {
  id: string;
  title: string;
  url?: string;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  onClick: (item: { id: string; title: string; url?: string }) => void;
};

type TMenuGroup = {
  title: string;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  items: TAppSidebarItem[];
};

type TAppSidebarProps = {
  headerTitle: string;
  mainMenu: TMenuGroup[];
  footerMenu: TMenuGroup;
};

const AppSidebar = ({
  headerTitle,
  mainMenu,
  footerMenu,
}: TAppSidebarProps) => {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex justify-between items-center">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {headerTitle}
          </h4>
          <ThemeToggle />
        </div>
      </SidebarHeader>
      <SidebarContent>
        {mainMenu.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      asChild
                      onClick={() => {
                        item.onClick({
                          id: item.id,
                          title: item.title,
                          url: item.url || "",
                        });
                      }}
                    >
                      <div>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  {footerMenu.icon && <footerMenu.icon />} {footerMenu.title}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                {footerMenu.items.map((item) => (
                  <DropdownMenuItem
                    key={item.id}
                    onClick={() =>
                      item.onClick({
                        id: item.id,
                        title: item.title,
                      })
                    }
                  >
                    <span>{item.title}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
