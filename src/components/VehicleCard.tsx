import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Fuel, Gauge, Calendar, ArrowRight } from "lucide-react";

interface VehicleCardProps {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  image: string;
  fuel: string;
  mileage: number;
  deliveryDays: number;
}

const VehicleCard = ({
  id,
  brand,
  model,
  year,
  price,
  image,
  fuel,
  mileage,
  deliveryDays,
}: VehicleCardProps) => {
  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elegant transition-smooth border border-border/50">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={image}
          alt={`${brand} ${model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-700"
        />
        {/* Delivery Badge */}
        <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium shadow-lg">
          Livraison sous {deliveryDays} jours
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-2xl font-bold text-foreground mb-2">
          {brand} {model}
        </h3>
        <p className="text-muted-foreground mb-6">{year}</p>

        {/* Specs */}
        <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-border">
          <div className="flex flex-col items-center text-center">
            <Fuel className="w-5 h-5 text-primary mb-2" />
            <span className="text-xs text-muted-foreground">{fuel}</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Gauge className="w-5 h-5 text-primary mb-2" />
            <span className="text-xs text-muted-foreground">{mileage.toLocaleString()} km</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Calendar className="w-5 h-5 text-primary mb-2" />
            <span className="text-xs text-muted-foreground">{year}</span>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">À partir de</p>
            <p className="text-3xl font-bold text-primary">{price.toLocaleString()}€</p>
          </div>
          <Button variant="hero" size="lg" className="group" asChild>
            <Link to={`/vehicule/${id}`}>
              Voir détails
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
