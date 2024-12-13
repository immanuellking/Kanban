import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { poppins } from "@/components/font";
import { DialogProvider } from "@/context/dialogContext";
import CreateNewBoardModal from "@/components/CreateNewBoardModal";
import TaskViewModal from "@/components/TaskViewModal";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: {
    template: "%s / Kanban",
    default: "Kanban Task Manager App",
  },
  description:
    "Kanban task management app built with Next.js, Tailwind CSS, Mongoose, and MongoDB, offering streamlined task and column management with a responsive interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <DialogProvider>
        <html lang="en">
          <body className={poppins.className}>
            {children}
            <TaskViewModal />
            <CreateNewBoardModal />
            <Toaster />
          </body>
        </html>
      </DialogProvider>
    </ClerkProvider>
  );
}
