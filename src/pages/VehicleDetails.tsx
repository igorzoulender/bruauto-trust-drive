import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  ArrowLeft,
  Calendar,
  Gauge,
  Fuel,
  CheckCircle2,
  Shield,
  Clock,
  Phone,
  X,
  Car,
  Settings,
  Droplets,
  Zap,
  Users,
  Palette,
  DoorOpen,
} from "lucide-react";
import VehicleCard from "@/components/VehicleCard";

const VehicleDetails = () => {
  const { id } = useParams();
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Charger les véhicules depuis localStorage
  useEffect(() => {
    const savedVehicles = localStorage.getItem("admin-vehicles");
    if (savedVehicles) {
      setVehicles(JSON.parse(savedVehicles));
    }
  }, []);

  const vehicle = vehicles.find((v) => v.id === id);

  const similarVehicles = vehicles
    .filter((v) => v.type === vehicle?.type && v.id !== id)
    .slice(0, 8);

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-foreground mb-6">
              Véhicule non trouvé
            </h1>
            <Button asChild variant="hero">
              <Link to="/vehicules">Retour aux véhicules</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Back Button */}
          <Button asChild variant="ghost" className="mb-8">
            <Link to="/vehicules">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux véhicules
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images */}
            <div>
              <div className="mb-6">
                <div className="rounded-2xl overflow-hidden shadow-elegant">
                  <img
                    src={vehicle.image}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    className="w-full h-[500px] object-cover"
                    onClick={() => setIsGalleryOpen(true)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="border-accent/20">
                  <CardContent className="p-4 flex items-center gap-3">
                    <Shield className="w-8 h-8 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Inspection
                      </p>
                      <p className="font-semibold">150 Points</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-accent/20">
                  <CardContent className="p-4 flex items-center gap-3">
                    <Shield className="w-8 h-8 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Garantie</p>
                      <p className="font-semibold">12 Mois</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Détails véhicule */}
            <div>
              <Badge variant="secondary" className="mb-4">
                {vehicle.type}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {vehicle.brand}{" "}
                <span className="text-primary">{vehicle.model}</span>
              </h1>
              <p className="text-3xl font-bold text-primary mb-6">
                {vehicle.price.toLocaleString()} €
              </p>

              {/* Specs principales */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Année</p>
                      <p className="font-semibold">{vehicle.year}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <Gauge className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Kilométrage
                      </p>
                      <p className="font-semibold">
                        {vehicle.mileage.toLocaleString()} km
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <Fuel className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Carburant</p>
                      <p className="font-semibold">{vehicle.fuel}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Livraison</p>
                      <p className="font-semibold">
                        {vehicle.deliveryDays} jours
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>


              {/* ⚙️ Caractéristiques techniques */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Caractéristiques techniques
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <TechItem
                    icon={Settings}
                    label="Transmission"
                    value={vehicle.transmission}
                  />
                  <TechItem
                    icon={Zap}
                    label="Puissance"
                    value={vehicle.power}
                  />
                  <TechItem
                    icon={Droplets}
                    label="Consommation"
                    value={vehicle.consumption}
                  />
                  <TechItem
                    icon={DoorOpen}
                    label="Portes"
                    value={`${vehicle.doors}`}
                  />
                  <TechItem
                    icon={Users}
                    label="Places"
                    value={`${vehicle.seats}`}
                  />
                  <TechItem
                    icon={Palette}
                    label="Couleur"
                    value={vehicle.color}
                  />
                  {vehicle.climateControl && (
                    <TechItem icon={Car} label="Climatisation" value="Oui" />
                  )}
                </div>
              </div>

              {/* Boutons CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild variant="hero" size="lg" className="flex-1">
                  <Link to="/contact">Réserver ce véhicule</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="flex-1">
                  <Link to="/contact">
                    <Phone className="w-4 h-4 mr-2" />
                    Nous contacter
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Véhicules similaires */}
          {similarVehicles.length > 0 && (
            <div className="mt-20">
              <h2 className="text-3xl font-bold mb-8">Véhicules similaires</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {similarVehicles.map((vehicle) => (
                  <VehicleCard
                    key={vehicle.id}
                    {...vehicle}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
        <DialogContent className="max-w-7xl w-full p-0 bg-black/95 border-none">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 z-50 text-white hover:bg-white/20"
            onClick={() => setIsGalleryOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>
          <img
            src={vehicle.image}
            alt={`${vehicle.brand} ${vehicle.model}`}
            className="w-full max-h-[85vh] object-contain"
          />
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

// 🔧 Sous-composant pour une ligne de caractéristiques
const TechItem = ({ icon: Icon, label, value }) => (
  <Card className="border-accent/20">
    <CardContent className="p-4 flex items-center gap-3">
      <Icon className="w-5 h-5 text-primary" />
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </CardContent>
  </Card>
);

export default VehicleDetails;
