import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import {
  Fuel,
  Gauge,
  Calendar,
  ArrowRight,
  Users,
  DoorOpen,
  Thermometer,
  Cog,
} from "lucide-react";

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
  type: string;
  climateControl: boolean;
  transmission: string;
  doors: number;
  seats: number;
  color: string;
  power: string;
  consumption: string;
}

const nfCurrency = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});
const nfNumber = new Intl.NumberFormat("fr-FR");

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
  type,
  climateControl,
  transmission,
  doors,
  seats,
  color,
  power,
  consumption,
}: VehicleCardProps) => {
  const carName = `${brand} ${model}`.trim();
  const deliveryLabel = `Livraison sous ${deliveryDays} ${
    deliveryDays > 1 ? "jours" : "jour"
  }`;

  // Icône pour la transmission
  const getTransmissionIcon = (trans: string) => {
    return trans === "Automatique" ? "A" : "M";
  };

  return (
    <div
      className="group rounded-2xl overflow-hidden border border-border/50 bg-card shadow-card transition-smooth
                 hover:shadow-elegant focus-within:shadow-elegant"
    >
      {/* Image */}
      <Link
        to={`/vehicule/${id}`}
        aria-label={`Voir la fiche ${carName}`}
        className="relative block overflow-hidden aspect-[4/3] bg-gradient-to-b from-black/5 to-transparent"
      >
        <img
          src={image}
          alt={carName}
          className="w-full h-full object-contain md:object-cover group-hover:scale-[1.03] transition-transform duration-700"
          loading="lazy"
          decoding="async"
          sizes="(min-width:1024px) 420px, (min-width:640px) 50vw, 100vw"
          srcSet={`${image} 1x`}
        />

        {/* Badges superposés */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
          {/* Delivery Badge */}
          <div className="px-3 py-2 rounded-full bg-accent text-accent-foreground text-xs font-medium shadow-lg">
            {deliveryLabel}
          </div>

          {/* Type Badge */}
          <div className="px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium shadow-lg">
            {type}
          </div>
        </div>

        {/* Transmission Badge en bas à gauche */}
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-background/90 backdrop-blur-sm text-foreground text-sm font-semibold shadow-lg">
            <Cog className="w-4 h-4" />
            {transmission}
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-6">
        {/* Title et informations principales */}
        <Link
          to={`/vehicule/${id}`}
          className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-md"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
            {carName}
          </h3>
        </Link>

        <div className="flex items-center gap-3 mt-1 mb-4">
          <p className="text-muted-foreground">{year}</p>
          <span className="text-muted-foreground">•</span>
          <p className="text-muted-foreground">{color}</p>
          <span className="text-muted-foreground">•</span>
          <div className="flex items-center gap-1">
            <Thermometer className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground text-sm">
              {climateControl ? "Clim" : "Sans clim"}
            </span>
          </div>
        </div>

        {/* Specs détaillées */}
        <div className="grid grid-cols-4 gap-3 mb-6 pb-6 border-b border-border">
          {/* Carburant */}
          <div className="flex flex-col items-center text-center">
            <Fuel className="w-5 h-5 text-primary mb-2" aria-hidden />
            <span className="text-xs text-muted-foreground capitalize">
              {fuel.toLowerCase()}
            </span>
          </div>

          {/* Kilométrage */}
          <div className="flex flex-col items-center text-center">
            <Gauge className="w-5 h-5 text-primary mb-2" aria-hidden />
            <span className="text-xs text-muted-foreground">
              {nfNumber.format(mileage)} km
            </span>
          </div>

          {/* Portes */}
          <div className="flex flex-col items-center text-center">
            <DoorOpen className="w-5 h-5 text-primary mb-2" aria-hidden />
            <span className="text-xs text-muted-foreground">
              {doors} portes
            </span>
          </div>

          {/* Places */}
          <div className="flex flex-col items-center text-center">
            <Users className="w-5 h-5 text-primary mb-2" aria-hidden />
            <span className="text-xs text-muted-foreground">
              {seats} places
            </span>
          </div>
        </div>

        {/* Informations techniques */}
        <div className="flex justify-between items-center mb-4 px-1">
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Puissance</p>
            <p className="text-sm font-semibold text-foreground">{power}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Consommation</p>
            <p className="text-sm font-semibold text-foreground">
              {consumption}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Transmission</p>
            <p className="text-sm font-semibold text-foreground">
              {getTransmissionIcon(transmission)}
            </p>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between gap-4 pt-2">
          <div>
            <p className="text-sm text-muted-foreground mb-1">À partir de</p>
            <p className="text-xl font-extrabold text-primary leading-none">
              {nfCurrency.format(price)}
            </p>
          </div>

          <Link to={`/vehicule/${id}`} className="shrink-0">
            <Button variant="hero" size="sm" className="group">
              Voir détails
              <ArrowRight
                className="w-2 h-2 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
