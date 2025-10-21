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
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header avec badge */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-6">
            <BadgeCheck className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">
              Disponibles Immédiatement
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Véhicules déjà <span className="text-primary">immatriculés</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Repartez immédiatement avec votre nouveau véhicule. Ces véhicules sont déjà
            immatriculés et prêts à prendre la route dès aujourd'hui.
          </p>
        </div>

        {/* Grid de véhicules */}
        {registeredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {registeredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} {...vehicle} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg mb-4">Aucun véhicule immatriculé pour le moment</p>
            <p className="text-sm">Ajoutez des véhicules depuis le dashboard administrateur</p>
          </div>
        )}

        {/* CTA */}
        <div className="text-center">
          <Button asChild variant="default" size="xl" className="group">
            <Link to="/vehicules">
              Voir tous les véhicules immatriculés
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RegisteredVehiclesSection;
