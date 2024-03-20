import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "jrsharma",
    description: "Jyoti Ranjan Sharma's Zone",
    openGraph: {
        title: "Jyoti Ranjan Sharma",
        description: "Jyoti's web space",
        type: "website",
        images: "https://media.licdn.com/dms/image/D4D03AQE8VzaQFT4aYA/profile-displayphoto-shrink_800_800/0/1676665199222?e=1716422400&v=beta&t=aBPYY9-JocaTtu2EHyX22DqA9wJ7t2sYXwsziRkli6A",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Navbar></Navbar>
                    {children}
                    <Analytics />
                    <SpeedInsights></SpeedInsights>
                </ThemeProvider>
            </body>
        </html>
    );
}
