import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { poppins } from "@/lib/fonts";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

export const metadata = {
  title: "Schedify  |  Plan Your Day, Your Way",
  description: "Because Every Minute Matters.",
  icons: {
    icon: "/assets/logo.png",
  },
};

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <SessionProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
