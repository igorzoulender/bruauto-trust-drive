import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Car, MessageSquare, ShoppingCart, Calendar, Plus, Trash2, Upload } from "lucide-react";

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
}

interface ContactRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  budget: string;
  message: string;
  date: string;
}

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

const Dashboard = () => {
  const { toast } = useToast();
  const [vehicles, setVehicles] = useState<VehicleData[]>([]);
  const [contacts, setContacts] = useState<ContactRequest[]>([]);
  const [orders, setOrders] = useState<VehicleOrder[]>([]);
  const [imagePreview, setImagePreview] = useState<string>("");

  // Formulaire véhicule
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
  });

  // Charger les données au démarrage
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const savedVehicles = localStorage.getItem("admin-vehicles");
    const savedContacts = localStorage.getItem("contact-requests");
    const savedOrders = localStorage.getItem("vehicle-orders");

    if (savedVehicles) setVehicles(JSON.parse(savedVehicles));
    if (savedContacts) setContacts(JSON.parse(savedContacts));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  };

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

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();

    const newVehicle: VehicleData = {
      id: Date.now().toString(),
      ...vehicleForm,
    };

    const updatedVehicles = [...vehicles, newVehicle];
    setVehicles(updatedVehicles);
    localStorage.setItem("admin-vehicles", JSON.stringify(updatedVehicles));

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
    });
    setImagePreview("");
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

  const handleDeleteContact = (id: string) => {
    const updatedContacts = contacts.filter((c) => c.id !== id);
    setContacts(updatedContacts);
    localStorage.setItem("contact-requests", JSON.stringify(updatedContacts));

    toast({
      title: "Contact supprimé",
      description: "La demande de contact a été supprimée.",
    });
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
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard Administrateur</h1>
          <p className="text-muted-foreground">Gérez vos véhicules et consultez les demandes clients</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Véhicules</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vehicles.length}</div>
              <p className="text-xs text-muted-foreground">Total en stock</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Contacts</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{contacts.length}</div>
              <p className="text-xs text-muted-foreground">Demandes reçues</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Commandes</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.length}</div>
              <p className="text-xs text-muted-foreground">Commandes en attente</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="vehicles" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="vehicles">Véhicules</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="orders">Commandes</TabsTrigger>
          </TabsList>

          {/* Véhicules Tab */}
          <TabsContent value="vehicles" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ajouter un véhicule</CardTitle>
                <CardDescription>Remplissez les informations du véhicule à ajouter</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddVehicle} className="space-y-6">
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </CardContent>
            </Card>

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
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts">
            <Card>
              <CardHeader>
                <CardTitle>Demandes de contact ({contacts.length})</CardTitle>
                <CardDescription>Liste de toutes les demandes de contact reçues</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Nom</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Téléphone</TableHead>
                        <TableHead>Véhicule</TableHead>
                        <TableHead>Budget</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contacts.map((contact) => (
                        <TableRow key={contact.id}>
                          <TableCell className="text-sm">{new Date(contact.date).toLocaleDateString()}</TableCell>
                          <TableCell className="font-medium">{contact.name}</TableCell>
                          <TableCell>{contact.email}</TableCell>
                          <TableCell>{contact.phone}</TableCell>
                          <TableCell>{contact.vehicle || "-"}</TableCell>
                          <TableCell>{contact.budget || "-"}</TableCell>
                          <TableCell className="max-w-xs truncate">{contact.message}</TableCell>
                          <TableCell>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteContact(contact.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {contacts.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      Aucune demande de contact pour le moment
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
