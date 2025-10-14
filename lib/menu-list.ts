import {
    Tag,
    Users,
    Settings,
    Bookmark,
    SquarePen,
    LayoutGrid,
    LucideIcon,
    UserRound,
    MessageSquare,
    UserRoundPlus,
    Calendar,
    Ticket,
    Star,
    Heart,
    FileText,
    Calculator,
    FileCheck,
    BarChart3,
    Pin,
    Workflow,
    Calendar1
} from "lucide-react";
import { FaMeta } from "react-icons/fa6";

type Submenu = {
    href: string;
    label: string;
    active?: boolean;
};

type Menu = {
    href: string;
    label: string;
    active?: boolean;
    icon: any;
    submenus?: Submenu[];
};

type Group = {
    groupLabel: string;
    menus: Menu[];
};

export function getMenuList(pathname: string, user_role: string): Group[] {
    const menuList: Group[] = [
        {
            groupLabel: "",
            menus: [
                {
                    href: "/dashboard",
                    label: "Dashboard",
                    icon: LayoutGrid,
                    submenus: []
                }
            ]
        },
        {
            groupLabel: "Contents",
            menus: [
                {
                    href: "/1",
                    label: "Criar Campanha",
                    icon: Pin
                },
                 {
                    href: "/2",
                    label: "Automações",
                    icon: Workflow
                },
                {
                    href: "/calendar",
                    label: "Calendário",
                    icon: Calendar1
                }
            ]
        },
        {
            groupLabel: "Settings",
            menus: [
                {
                    href: "/account",
                    label: "Conta",
                    icon: Settings
                }
            ]
        }
    ];
    if (user_role === "SUPPORT") {
        menuList.push({
            groupLabel: "Suport",
            menus: [
               {
                href : "",
                label : "Suport",
                icon : LayoutGrid,
                submenus : [
                    
                    {
                        href: "/admin/manage-users",
                        label: "Manage Users",
                    },
                ]
               }
            ]
        });
    }
    if (user_role === "ADMIN") {
        menuList.push({
            groupLabel: "Admin",
            menus: [
               {
                href : "",
                label : "Admin",
                icon : LayoutGrid,
                submenus : [
                    
                    {
                        href: "/admin/manage-users",
                        label: "Manage Users",
                    },
                    {
                        href: "/admin/dashboard",
                        label: "Dashboard",
                    }
                ]
               }
            ]
        });
    }

    return menuList;
}
