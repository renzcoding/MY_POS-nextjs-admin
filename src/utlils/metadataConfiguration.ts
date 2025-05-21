import { Metadata } from "next";
import { getCurrentSegment } from "./globalFunctions";

export const defaultMetadata: Metadata = {
  title: {
    default: "TailAdmin Dashboard",
    template: "%s | TailAdmin Dashboard",
  },
  description: "TailAdmin - Tailwind CSS Admin Dashboard Template",
  openGraph: {
    title: "TailAdmin Dashboard",
    description: "TailAdmin - Tailwind CSS Admin Dashboard Template",
    url: "https://your-domain.com",
    siteName: "TailAdmin",
    type: "website",
  },
};

export const getMetadata = (title: string, description?: string): Metadata => {
  return {
    title: {
      default: title,
      template: `%s | TailAdmin Dashboard`,
    },
    description:
      description || "TailAdmin - Tailwind CSS Admin Dashboard Template",
    openGraph: {
      title,
      description:
        description || "TailAdmin - Tailwind CSS Admin Dashboard Template",
      url: "https://your-domain.com",
      siteName: "TailAdmin",
      type: "website",
    },
  };
};
