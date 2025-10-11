import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import VehicleCard from "@/components/VehicleCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import carBmw from "@/assets/car-bmw.jpg";
import carToyota from "@/assets/car-toyota.jpg";
import carMercedes from "@/assets/car-mercedes.jpg";
import { allVehicles } from "@/data/vehiclesData";

const Vehicles = () => {
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedFuel, setSelectedFuel] = useState<string>("all");
  const [selectedTransmission, setSelectedTransmission] =
    useState<string>("all");
  const [hasClimateControl, setHasClimateControl] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<number[]>([60000]);

  // Récupérer toutes les valeurs uniques pour les filtres
  const brands = [...new Set(allVehicles.map((vehicle) => vehicle.brand))];
  const types = [...new Set(allVehicles.map((vehicle) => vehicle.type))];
  const fuels = [...new Set(allVehicles.map((vehicle) => vehicle.fuel))];
  const transmissions = [
    ...new Set(allVehicles.map((vehicle) => vehicle.transmission)),
  ];

  const filteredVehicles = allVehicles.filter((vehicle) => {
    if (selectedBrand !== "all" && vehicle.brand !== selectedBrand)
      return false;
    if (selectedType !== "all" && vehicle.type !== selectedType) return false;
    if (selectedFuel !== "all" && vehicle.fuel !== selectedFuel) return false;
    if (
      selectedTransmission !== "all" &&
      vehicle.transmission !== selectedTransmission
    )
      return false;
    if (hasClimateControl !== "all") {
      const hasClimate = hasClimateControl === "yes";
      if (vehicle.climateControl !== hasClimate) return false;
    }
    if (vehicle.price > maxPrice[0]) return false;
    return true;
  });

  const resetFilters = () => {
    setSelectedBrand("all");
    setSelectedType("all");
    setSelectedFuel("all");
    setSelectedTransmission("all");
    setHasClimateControl("all");
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
              Parcourez notre sélection de véhicules soigneusement inspectés et
              garantis. Trouvez la voiture qui correspond parfaitement à vos
              besoins.
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
                    {brands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
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
                    {types.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
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
                    {fuels.map((fuel) => (
                      <SelectItem key={fuel} value={fuel}>
                        {fuel}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Transmission Filter */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Boîte de vitesse
                </label>
                <Select
                  value={selectedTransmission}
                  onValueChange={setSelectedTransmission}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes les boîtes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les boîtes</SelectItem>
                    {transmissions.map((transmission) => (
                      <SelectItem key={transmission} value={transmission}>
                        {transmission}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Climate Control Filter */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Climatisation
                </label>
                <Select
                  value={hasClimateControl}
                  onValueChange={setHasClimateControl}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Climatisation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Peu importe</SelectItem>
                    <SelectItem value="yes">Avec climatisation</SelectItem>
                    <SelectItem value="no">Sans climatisation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Filter */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Budget maximum: {maxPrice[0].toLocaleString()}€
                </label>
                <Slider
                  value={maxPrice}
                  onValueChange={setMaxPrice}
                  max={80000}
                  min={10000}
                  step={5000}
                  className="mt-2"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                {filteredVehicles.length} véhicule
                {filteredVehicles.length > 1 ? "s" : ""} trouvé
                {filteredVehicles.length > 1 ? "s" : ""}
              </p>
              <Button variant="ghost" onClick={resetFilters}>
                Réinitialiser les filtres
              </Button>
            </div>
          </div>

          {/* Vehicle Grid */}
          {filteredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
