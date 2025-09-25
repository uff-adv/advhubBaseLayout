import { BrowserRouter, Routes, Route } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppHeader } from "@/components/AppHeader";
import { Home } from "@/pages/Home";
import NotFound from "@/pages/not-found";
import { AuthGuard } from "@/components/AuthGuard";

function ProtectedContent() {
  return (
    <div className="flex flex-col h-screen w-full">
      <AppHeader />
      <main className="flex-1 overflow-hidden">
      </main>
    </div>
  );
}

function App() {
  const basename = import.meta.env.VITE_BASENAME || "";

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter basename={basename}>
          {/* Temporarily disabled authentication */}
          {/* <AuthGuard> */}
            <ProtectedContent />
          {/* </AuthGuard> */}
        </BrowserRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
