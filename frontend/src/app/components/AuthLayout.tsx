import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  sideContent?: ReactNode;
}

export default function AuthLayout({
  children,
  sideContent,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <main className="flex w-full lg:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>

      {/* Right side - Welcome content */}
      <aside className="hidden lg:flex w-1/2 items-center justify-center bg-gray-50 p-12">
        <div className="max-w-md">
          {sideContent}
        </div>
      </aside>
    </div>
  );
}
