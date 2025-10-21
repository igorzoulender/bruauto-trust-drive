import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";

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

interface AddVehicleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVehicleAdded: (vehicle: VehicleData) => void;
}

export function AddVehicleModal({ open, onOpenChange, onVehicleAdded }: AddVehicleModalProps) {
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string>("");
  const [vehicleForm, setVehicleForm] = useState({
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    price: 0,
    fuel: "",
    mileage: 0,
    type: "",
    transmission: "Automatique",
    doors: 5,
    seats: 5,
    color: "",
    power: "",
    consumption: "",
    climateControl: true,
    deliveryDays: 7,
    image: "",
    registered: false,
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setVehicleForm({ ...vehicleForm, image: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newVehicle: VehicleData = {
      id: Date.now().toString(),
      ...vehicleForm,
    };

    onVehicleAdded(newVehicle);

    toast({
      title: "Véhicule ajouté !",
      description: `${vehicleForm.brand} ${vehicleForm.model} a été ajouté avec succès.`,
    });

    // Reset form
    setVehicleForm({
      brand: "",
      model: "",
      year: new Date().getFullYear(),
      price: 0,
      fuel: "",
      mileage: 0,
      type: "",
      transmission: "Automatique",
      doors: 5,
      seats: 5,
      color: "",
      power: "",
      consumption: "",
      climateControl: true,
      deliveryDays: 7,
      image: "",
      registered: false,
    });
    setImagePreview("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ajouter un véhicule</DialogTitle>
          <DialogDescription>Remplissez les informations du véhicule à ajouter</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="brand">Marque *</Label>
              <Input
                id="brand"
                required
                value={vehicleForm.brand}
                onChange={(e) => setVehicleForm({ ...vehicleForm, brand: e.target.value })}
                placeholder="BMW"
              />
            </div>
            <div>
              <Label htmlFor="model">Modèle *</Label>
              <Input
                id="model"
                required
                value={vehicleForm.model}
                onChange={(e) => setVehicleForm({ ...vehicleForm, model: e.target.value })}
                placeholder="Série 3"
              />
            </div>
            <div>
              <Label htmlFor="year">Année *</Label>
              <Input
                id="year"
                type="number"
                required
                value={vehicleForm.year}
                onChange={(e) => setVehicleForm({ ...vehicleForm, year: parseInt(e.target.value) })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="price">Prix (€) *</Label>
              <Input
                id="price"
                type="number"
                required
                value={vehicleForm.price}
                onChange={(e) => setVehicleForm({ ...vehicleForm, price: parseInt(e.target.value) })}
                placeholder="35000"
              />
            </div>
            <div>
              <Label htmlFor="mileage">Kilométrage *</Label>
              <Input
                id="mileage"
                type="number"
                required
                value={vehicleForm.mileage}
                onChange={(e) => setVehicleForm({ ...vehicleForm, mileage: parseInt(e.target.value) })}
                placeholder="45000"
              />
            </div>
            <div>
              <Label htmlFor="deliveryDays">Délai livraison (jours)</Label>
              <Input
                id="deliveryDays"
                type="number"
                value={vehicleForm.deliveryDays}
                onChange={(e) => setVehicleForm({ ...vehicleForm, deliveryDays: parseInt(e.target.value) })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="fuel">Carburant *</Label>
              <Select
                value={vehicleForm.fuel}
                onValueChange={(value) => setVehicleForm({ ...vehicleForm, fuel: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Essence">Essence</SelectItem>
                  <SelectItem value="Diesel">Diesel</SelectItem>
                  <SelectItem value="Hybride">Hybride</SelectItem>
                  <SelectItem value="Électrique">Électrique</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="type">Type *</Label>
              <Select
                value={vehicleForm.type}
                onValueChange={(value) => setVehicleForm({ ...vehicleForm, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Berline">Berline</SelectItem>
                  <SelectItem value="SUV">SUV</SelectItem>
                  <SelectItem value="Citadine">Citadine</SelectItem>
                  <SelectItem value="Compacte">Compacte</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="transmission">Transmission *</Label>
              <Select
                value={vehicleForm.transmission}
                onValueChange={(value) => setVehicleForm({ ...vehicleForm, transmission: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Automatique">Automatique</SelectItem>
                  <SelectItem value="Manuelle">Manuelle</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="color">Couleur *</Label>
              <Input
                id="color"
                required
                value={vehicleForm.color}
                onChange={(e) => setVehicleForm({ ...vehicleForm, color: e.target.value })}
                placeholder="Noir"
              />
            </div>
            <div>
              <Label htmlFor="power">Puissance *</Label>
              <Input
                id="power"
                required
                value={vehicleForm.power}
                onChange={(e) => setVehicleForm({ ...vehicleForm, power: e.target.value })}
                placeholder="184ch"
              />
            </div>
            <div>
              <Label htmlFor="consumption">Consommation *</Label>
              <Input
                id="consumption"
                required
                value={vehicleForm.consumption}
                onChange={(e) => setVehicleForm({ ...vehicleForm, consumption: e.target.value })}
                placeholder="4.8L/100km"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="doors">Nombre de portes</Label>
              <Input
                id="doors"
                type="number"
                value={vehicleForm.doors}
                onChange={(e) => setVehicleForm({ ...vehicleForm, doors: parseInt(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="seats">Nombre de places</Label>
              <Input
                id="seats"
                type="number"
                value={vehicleForm.seats}
                onChange={(e) => setVehicleForm({ ...vehicleForm, seats: parseInt(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="registered">Statut du véhicule</Label>
              <Select
                value={vehicleForm.registered ? "yes" : "no"}
                onValueChange={(value) => setVehicleForm({ ...vehicleForm, registered: value === "yes" })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">À immatriculer</SelectItem>
                  <SelectItem value="yes">Immatriculé (disponible immédiatement)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="image">Image du véhicule</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="cursor-pointer"
            />
            {imagePreview && (
              <div className="mt-4">
                <img src={imagePreview} alt="Preview" className="max-h-48 rounded-lg" />
              </div>
            )}
          </div>

          <Button type="submit" size="lg" className="w-full">
            <Plus className="w-5 h-5 mr-2" />
            Ajouter le véhicule
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
