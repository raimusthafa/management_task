import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "./component/ui/navigation-menu";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task Management App",
  description: "A modern task management application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#f1f1f1]`}>
        <header className="border-b border-[#dbdbdb]">
          <div className="container mx-auto p-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/" className="font-medium text-[#8c0327] hover:text-[#8c0327]/90">Tasks</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/about" className="font-medium text-[#8c0327] hover:text-[#8c0327]/90">About</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </header>
        <main className="container mx-auto p-4">
          {children}
        </main>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#f1f1f1',
              color: '#8c0327',
              border: '1px solid #dbdbdb',
            },
            success: {
              style: {
                background: '#499380',
                color: 'white',
              },
            },
            error: {
              style: {
                background: '#d40014',
                color: 'white',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
