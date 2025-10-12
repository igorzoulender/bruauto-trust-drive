import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";

interface VehicleOrder {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  brand: string;
  customBrand?: string;
  fuelType: string;
  budget: string;
  year?: string;
  transmission?: string;
  color?: string;
  additionalFeatures?: string;
  comments?: string;
  date: string;
}

export default function OrdersAdmin() {
  const { toast } = useToast();
  const [orders, setOrders] = useState<VehicleOrder[]>([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    const savedOrders = localStorage.getItem("vehicle-orders");
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  };

  const handleDeleteOrder = (id: string) => {
    const updatedOrders = orders.filter((o) => o.id !== id);
    setOrders(updatedOrders);
    localStorage.setItem("vehicle-orders", JSON.stringify(updatedOrders));

    toast({
      title: "Commande supprimée",
      description: "La commande a été supprimée.",
    });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Commandes</h1>
        <p className="text-muted-foreground">Gérez les commandes de véhicules</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Commandes de véhicules ({orders.length})</CardTitle>
          <CardDescription>Liste de toutes les commandes reçues</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Téléphone</TableHead>
                  <TableHead>Marque</TableHead>
                  <TableHead>Carburant</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Transmission</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="text-sm">{new Date(order.date).toLocaleDateString()}</TableCell>
                    <TableCell className="font-medium">{order.fullName}</TableCell>
                    <TableCell>{order.phone}</TableCell>
                    <TableCell>
                      <Badge>{order.brand === "autre" ? order.customBrand : order.brand}</Badge>
                    </TableCell>
                    <TableCell>{order.fuelType}</TableCell>
                    <TableCell>{order.budget}</TableCell>
                    <TableCell>{order.transmission || "-"}</TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteOrder(order.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {orders.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                Aucune commande pour le moment
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
