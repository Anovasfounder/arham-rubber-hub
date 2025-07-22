import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import AuthForm from "@/components/auth/AuthForm";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardOverview from "@/pages/dashboard/DashboardOverview";
import StudentsPage from "@/pages/dashboard/StudentsPage";
import TeachersPage from "@/pages/dashboard/TeachersPage";
import ClassesPage from "@/pages/dashboard/ClassesPage";
import AssignmentsPage from "@/pages/dashboard/AssignmentsPage";
import AttendancePage from "@/pages/dashboard/AttendancePage";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

// Dashboard Routes component
const DashboardRoutes = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<DashboardOverview />} />
        <Route path="/dashboard" element={<DashboardOverview />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/classes" element={<ClassesPage />} />
        <Route path="/my-classes" element={<ClassesPage />} />
        <Route path="/subjects" element={<div className="p-8 text-center text-gray-500">Subjects page coming soon...</div>} />
        <Route path="/assignments" element={<AssignmentsPage />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/grades" element={<div className="p-8 text-center text-gray-500">Grades page coming soon...</div>} />
        <Route path="/schedule" element={<div className="p-8 text-center text-gray-500">Schedule page coming soon...</div>} />
        <Route path="/reports" element={<div className="p-8 text-center text-gray-500">Reports page coming soon...</div>} />
        <Route path="/settings" element={<div className="p-8 text-center text-gray-500">Settings page coming soon...</div>} />
        <Route path="/children" element={<div className="p-8 text-center text-gray-500">Children page coming soon...</div>} />
        <Route path="/communication" element={<div className="p-8 text-center text-gray-500">Communication page coming soon...</div>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </DashboardLayout>
  );
};

// Main App Routes
const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={user ? <Navigate to="/app" replace /> : <Index />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/auth" element={user ? <Navigate to="/app" replace /> : <AuthForm />} />
      
      {/* Protected dashboard routes */}
      <Route 
        path="/app/*" 
        element={
          <ProtectedRoute>
            <DashboardRoutes />
          </ProtectedRoute>
        } 
      />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
