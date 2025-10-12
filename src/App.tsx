import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Vehicles from "./pages/Vehicles";
import VehicleDetails from "./pages/VehicleDetails";
import Contact from "./pages/Contact";
import OrderVehicle from "./pages/OrderVehicle";
import AdminLayout from "./pages/AdminLayout";
import DashboardHome from "./pages/admin/DashboardHome";
import VehiclesAdmin from "./pages/admin/VehiclesAdmin";
import OrdersAdmin from "./pages/admin/OrdersAdmin";
import ContactsAdmin from "./pages/admin/ContactsAdmin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/vehicules" element={<Vehicles />} />
          <Route path="/vehicule/:id" element={<VehicleDetails />} />
          <Route path="/commander" element={<OrderVehicle />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="vehicles" element={<VehiclesAdmin />} />
            <Route path="orders" element={<OrdersAdmin />} />
            <Route path="contacts" element={<ContactsAdmin />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
