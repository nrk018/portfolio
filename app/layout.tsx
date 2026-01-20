import type { Metadata } from "next";
import "./globals.css";
import NavigationProvider from "@/components/NavigationProvider";
import ThemeProvider from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ThemeProvider>
          <NavigationProvider>
            {children}
          </NavigationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
