import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, MessageSquare, ShoppingCart } from "lucide-react";

interface Stats {
  vehicles: number;
  contacts: number;
  orders: number;
}

export default function DashboardHome() {
  const [stats, setStats] = useState<Stats>({
    vehicles: 0,
    contacts: 0,
    orders: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = () => {
    const savedVehicles = localStorage.getItem("admin-vehicles");
    const savedContacts = localStorage.getItem("contact-requests");
    const savedOrders = localStorage.getItem("vehicle-orders");

    setStats({
      vehicles: savedVehicles ? JSON.parse(savedVehicles).length : 0,
      contacts: savedContacts ? JSON.parse(savedContacts).length : 0,
      orders: savedOrders ? JSON.parse(savedOrders).length : 0,
    });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Tableau de bord</h1>
        <p className="text-muted-foreground">Vue d'ensemble de votre activité</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Véhicules</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.vehicles}</div>
            <p className="text-xs text-muted-foreground">Total en stock</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Contacts</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.contacts}</div>
            <p className="text-xs text-muted-foreground">Demandes reçues</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Commandes</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.orders}</div>
            <p className="text-xs text-muted-foreground">Commandes en attente</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
