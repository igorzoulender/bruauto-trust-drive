import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import VehicleCard from "@/components/VehicleCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import carBmw from "@/assets/car-bmw.jpg";
import carToyota from "@/assets/car-toyota.jpg";
import carMercedes from "@/assets/car-mercedes.jpg";

const allVehicles = [
  {
    id: "1",
    brand: "BMW",
    model: "Série 3",
    year: 2022,
    price: 35000,
    image: carBmw,
    fuel: "Diesel",
    mileage: 45000,
    deliveryDays: 7,
    type: "Berline",
  },
  {
    id: "2",
    brand: "Toyota",
    model: "RAV4",
    year: 2023,
    price: 32000,
    image: carToyota,
    fuel: "Hybride",
    mileage: 25000,
    deliveryDays: 5,
    type: "SUV",
  },
  {
    id: "3",
    brand: "Mercedes",
    model: "Classe C",
    year: 2021,
    price: 38000,
    image: carMercedes,
    fuel: "Essence",
    mileage: 55000,
    deliveryDays: 10,
    type: "Berline",
  },
  {
    id: "4",
    brand: "BMW",
    model: "X5",
    year: 2022,
    price: 48000,
    image: carBmw,
    fuel: "Diesel",
    mileage: 35000,
    deliveryDays: 8,
    type: "SUV",
  },
  {
    id: "5",
    brand: "Toyota",
    model: "Corolla",
    year: 2023,
    price: 24000,
    image: carToyota,
    fuel: "Hybride",
    mileage: 15000,
    deliveryDays: 5,
    type: "Citadine",
  },
  {
    id: "6",
    brand: "Mercedes",
    model: "GLE",
    year: 2022,
    price: 55000,
    image: carMercedes,
    fuel: "Essence",
    mileage: 40000,
    deliveryDays: 12,
    type: "SUV",
  },
];

const Vehicles = () => {
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedFuel, setSelectedFuel] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<number[]>([60000]);

  const filteredVehicles = allVehicles.filter((vehicle) => {
    if (selectedBrand !== "all" && vehicle.brand !== selectedBrand) return false;
    if (selectedType !== "all" && vehicle.type !== selectedType) return false;
    if (selectedFuel !== "all" && vehicle.fuel !== selectedFuel) return false;
    if (vehicle.price > maxPrice[0]) return false;
    return true;
  });

  const resetFilters = () => {
    setSelectedBrand("all");
    setSelectedType("all");
    setSelectedFuel("all");
    setMaxPrice([60000]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Nos <span className="text-primary">véhicules</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Parcourez notre sélection de véhicules soigneusement inspectés et garantis.
              Trouvez la voiture qui correspond parfaitement à vos besoins.
            </p>
          </div>

          {/* Filters */}
          <div className="bg-card rounded-2xl p-8 shadow-card border border-border/50 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Brand Filter */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Marque
                </label>
                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes les marques" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les marques</SelectItem>
                    <SelectItem value="BMW">BMW</SelectItem>
                    <SelectItem value="Toyota">Toyota</SelectItem>
                    <SelectItem value="Mercedes">Mercedes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Type de véhicule
                </label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les types</SelectItem>
                    <SelectItem value="Citadine">Citadine</SelectItem>
                    <SelectItem value="Berline">Berline</SelectItem>
                    <SelectItem value="SUV">SUV</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Fuel Filter */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Carburant
                </label>
                <Select value={selectedFuel} onValueChange={setSelectedFuel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tous les carburants" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les carburants</SelectItem>
                    <SelectItem value="Essence">Essence</SelectItem>
                    <SelectItem value="Diesel">Diesel</SelectItem>
                    <SelectItem value="Hybride">Hybride</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Filter */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Budget maximum: {maxPrice[0].toLocaleString()}€
                </label>
                <Slider
                  value={maxPrice}
                  onValueChange={setMaxPrice}
                  max={60000}
                  min={20000}
                  step={5000}
                  className="mt-2"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                {filteredVehicles.length} véhicule{filteredVehicles.length > 1 ? "s" : ""} trouvé
                {filteredVehicles.length > 1 ? "s" : ""}
              </p>
              <Button variant="ghost" onClick={resetFilters}>
                Réinitialiser les filtres
              </Button>
            </div>
          </div>

          {/* Vehicle Grid */}
          {filteredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} {...vehicle} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground mb-6">
                Aucun véhicule ne correspond à vos critères.
              </p>
              <Button variant="hero" onClick={resetFilters}>
                Voir tous les véhicules
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Vehicles;
