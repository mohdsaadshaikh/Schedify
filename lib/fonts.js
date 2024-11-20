import { Poppins, Stalemate, Inter } from "next/font/google";

export const stalemate = Stalemate({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-stalemate",
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});
