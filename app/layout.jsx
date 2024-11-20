import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { poppins } from "@/lib/fonts";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Schedify  |  Plan Your Day, Your Way",
  description: "Because Every Minute Matters.",
  icons: {
    icon: "/assets/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
