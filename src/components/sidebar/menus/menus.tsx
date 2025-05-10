import React from "react";
import {
  BoxCubeIcon,
  CalenderIcon,
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
  ListIcon,
  PageIcon,
  PieChartIcon,
  PlugInIcon,
  TableIcon,
  UserCircleIcon,
} from "@/icons";
import type { NavItem } from "@/types/menus";

export const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    subItems: [{ name: "Ecommerce", path: "/admin/", pro: false }],
  },
  {
    icon: <CalenderIcon />,
    name: "Products",
    path: "/admin/product",
    subItems: [
      { name: "Categories", path: "/admin/product/category", pro: false },
    ],
  },
  {
    icon: <UserCircleIcon />,
    name: "Suppliers",
    path: "/admin/supplier",
  },
  {
    icon: <UserCircleIcon />,
    name: "Customers",
    path: "/admin/customer",
  },
  {
    icon: <UserCircleIcon />,
    name: "Orders",
    path: "/admin/order",
  },
  {
    icon: <UserCircleIcon />,
    name: "Transactions",
    path: "/admin/transaction",
    subItems: [
      { name: "Status", path: "/admin/transaction/status", pro: false },
      { name: "Type", path: "/admin/transaction/type", pro: false },
    ],
  },
  {
    icon: <UserCircleIcon />,
    name: "Reports",
    path: "/admin/report",
  },
];

export const othersItems: NavItem[] = [
  {
    icon: <UserCircleIcon />,
    name: "Users",
    path: "/admin/user",
  },
  {
    icon: <PieChartIcon />,
    name: "Charts",
    subItems: [
      { name: "Line Chart", path: "/line-chart", pro: false },
      { name: "Bar Chart", path: "/bar-chart", pro: false },
    ],
  },
  {
    icon: <BoxCubeIcon />,
    name: "UI Elements",
    subItems: [
      { name: "Alerts", path: "/alerts", pro: false },
      { name: "Avatar", path: "/avatars", pro: false },
      { name: "Badge", path: "/badge", pro: false },
      { name: "Buttons", path: "/buttons", pro: false },
      { name: "Images", path: "/images", pro: false },
      { name: "Videos", path: "/videos", pro: false },
    ],
  },
  {
    icon: <PlugInIcon />,
    name: "Authentication",
    subItems: [
      { name: "Sign In", path: "/signin", pro: false },
      { name: "Sign Up", path: "/signup", pro: false },
    ],
  },
];
