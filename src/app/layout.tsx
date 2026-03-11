import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppProvider } from "@/lib/AppContext";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";

export const metadata: Metadata = {
  title: "NETFY MOVIES - Stream Movies Online",
  description: "Watch unlimited movies and TV shows. Stream online or download for offline viewing.",
};

export const viewport: Viewport = {
  width: "device-width",
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <Header />
          <main style={{ 
            minHeight: '100vh',
            paddingTop: '80px',
            paddingBottom: 'calc(80px + env(safe-area-inset-bottom))'
          }}>
            {children}
          </main>
          <BottomNavigation />
        </AppProvider>
      </body>
    </html>
  );
}
