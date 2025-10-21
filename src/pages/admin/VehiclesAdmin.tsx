import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2 } from "lucide-react";
import { AddVehicleModal } from "@/components/AddVehicleModal";

interface VehicleData {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  fuel: string;
  mileage: number;
  type: string;
  transmission: string;
  doors: number;
  seats: number;
  color: string;
  power: string;
  consumption: string;
  climateControl: boolean;
  deliveryDays: number;
  image: string;
  registered: boolean;
}

export default function VehiclesAdmin() {
  const { toast } = useToast();
  const [vehicles, setVehicles] = useState<VehicleData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = () => {
    const savedVehicles = localStorage.getItem("admin-vehicles");
    if (savedVehicles) setVehicles(JSON.parse(savedVehicles));
  };

  const handleVehicleAdded = (newVehicle: VehicleData) => {
    const updatedVehicles = [...vehicles, newVehicle];
    setVehicles(updatedVehicles);
    localStorage.setItem("admin-vehicles", JSON.stringify(updatedVehicles));
  };

  const handleDeleteVehicle = (id: string) => {
    const updatedVehicles = vehicles.filter((v) => v.id !== id);
    setVehicles(updatedVehicles);
    localStorage.setItem("admin-vehicles", JSON.stringify(updatedVehicles));

    toast({
      title: "Véhicule supprimé",
      description: "Le véhicule a été retiré de la liste.",
    });
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Véhicules</h1>
          <p className="text-muted-foreground">Gérez votre inventaire de véhicules</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} size="lg">
          <Plus className="w-5 h-5 mr-2" />
          Ajouter un véhicule
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des véhicules ({vehicles.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Marque</TableHead>
                  <TableHead>Modèle</TableHead>
                  <TableHead>Année</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicles.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell>
                      <img src={vehicle.image} alt={vehicle.model} className="w-16 h-16 object-cover rounded" />
                    </TableCell>
                    <TableCell className="font-medium">{vehicle.brand}</TableCell>
                    <TableCell>{vehicle.model}</TableCell>
                    <TableCell>{vehicle.year}</TableCell>
                    <TableCell>{vehicle.price.toLocaleString()}€</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{vehicle.type}</Badge>
                    </TableCell>
                    <TableCell>
                      {vehicle.registered ? (
                        <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                          Immatriculé
                        </Badge>
                      ) : (
                        <Badge variant="outline">À immatriculer</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteVehicle(vehicle.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {vehicles.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                Aucun véhicule ajouté pour le moment
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <AddVehicleModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onVehicleAdded={handleVehicleAdded}
      />
    </div>
  );
}
