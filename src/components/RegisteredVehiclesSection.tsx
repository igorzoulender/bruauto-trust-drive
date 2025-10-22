import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck } from "lucide-react";
import VehicleCard from "./VehicleCard";
import { useState, useEffect } from "react";

const RegisteredVehiclesSection = () => {
  const [registeredVehicles, setRegisteredVehicles] = useState<any[]>([]);

  useEffect(() => {
    const savedVehicles = localStorage.getItem("admin-vehicles");
    if (savedVehicles) {
      const vehicles = JSON.parse(savedVehicles);
      const registered = vehicles.filter((v: any) => v.registered === true).slice(0, 4);
      setRegisteredVehicles(registered);
    }
  }, []);

  return (
    <section className="py-16 sm:py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header avec badge */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-6 animate-scale-in">
            <BadgeCheck className="w-4 h-4 text-accent" />
            <span className="text-xs sm:text-sm font-medium text-accent">
              Disponibles Immédiatement
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            Véhicules déjà <span className="text-primary">immatriculés</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground px-4">
            Repartez immédiatement avec votre nouveau véhicule. Ces véhicules sont déjà
            immatriculés et prêts à prendre la route dès aujourd'hui.
          </p>
        </div>

        {/* Grid de véhicules */}
        {registeredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 mb-12 animate-fade-in">
            {registeredVehicles.map((vehicle, index) => (
              <div key={vehicle.id} className="animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                <VehicleCard {...vehicle} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground animate-fade-in px-4">
            <p className="text-base sm:text-lg mb-4">Aucun véhicule immatriculé pour le moment</p>
            <p className="text-sm">Ajoutez des véhicules depuis le dashboard administrateur</p>
          </div>
        )}

        {/* CTA */}
        <div className="text-center animate-fade-in">
          <Button asChild variant="default" size="xl" className="group">
            <Link to="/vehicules">
              <span className="hidden sm:inline">Voir tous les véhicules immatriculés</span>
              <span className="sm:hidden">Tous les immatriculés</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RegisteredVehiclesSection;
