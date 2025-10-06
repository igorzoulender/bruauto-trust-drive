import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { ArrowLeft, Calendar, Gauge, Fuel, CheckCircle2, Shield, Clock, Phone } from "lucide-react";
import VehicleCard from "@/components/VehicleCard";
import carBmw from "@/assets/car-bmw.jpg";
import carBmwRear from "@/assets/car-bmw-rear.jpg";
import carBmwInterior from "@/assets/car-bmw-interior.jpg";
import carBmwSide from "@/assets/car-bmw-side.jpg";
import carToyota from "@/assets/car-toyota.jpg";
import carToyotaRear from "@/assets/car-toyota-rear.jpg";
import carToyotaInterior from "@/assets/car-toyota-interior.jpg";
import carToyotaSide from "@/assets/car-toyota-side.jpg";
import carMercedes from "@/assets/car-mercedes.jpg";
import carMercedesRear from "@/assets/car-mercedes-rear.jpg";
import carMercedesInterior from "@/assets/car-mercedes-interior.jpg";
import carMercedesSide from "@/assets/car-mercedes-side.jpg";

const allVehicles = [
  {
    id: "1",
    brand: "BMW",
    model: "Série 3",
    year: 2022,
    price: 35000,
    image: carBmw,
    images: [carBmw, carBmwRear, carBmwInterior, carBmwSide],
    fuel: "Diesel",
    mileage: 45000,
    deliveryDays: 7,
    type: "Berline",
    description: "BMW Série 3 en excellent état. Véhicule soigneusement entretenu avec historique complet. Intérieur cuir, navigation GPS, sièges chauffants et système audio premium.",
    features: [
      "Système de navigation GPS",
      "Sièges en cuir chauffants",
      "Caméra de recul",
      "Régulateur de vitesse adaptatif",
      "Système audio premium",
      "Jantes alliage 18 pouces"
    ],
    inspection: "Inspection complète 150 points validée",
    warranty: "Garantie moteur et boîte 12 mois incluse",
    vin: "WBA3B5C50DF123456"
  },
  {
    id: "2",
    brand: "Toyota",
    model: "RAV4",
    year: 2023,
    price: 32000,
    image: carToyota,
    images: [carToyota, carToyotaRear, carToyotaInterior, carToyotaSide],
    fuel: "Hybride",
    mileage: 25000,
    deliveryDays: 5,
    type: "SUV",
    description: "Toyota RAV4 Hybride récent, économique et fiable. Consommation réduite grâce à la technologie hybride. Parfait pour la famille avec un grand coffre et confort optimal.",
    features: [
      "Technologie hybride Toyota",
      "Caméra 360°",
      "Apple CarPlay & Android Auto",
      "Sièges arrière chauffants",
      "Toit panoramique",
      "Hayon électrique"
    ],
    inspection: "Inspection complète 150 points validée",
    warranty: "Garantie moteur et boîte 12 mois incluse",
    vin: "2T3P1RFV8PC123456"
  },
  {
    id: "3",
    brand: "Mercedes",
    model: "Classe C",
    year: 2021,
    price: 38000,
    image: carMercedes,
    images: [carMercedes, carMercedesRear, carMercedesInterior, carMercedesSide],
    fuel: "Essence",
    mileage: 55000,
    deliveryDays: 10,
    type: "Berline",
    description: "Mercedes Classe C élégante et performante. Finition haut de gamme avec équipements premium. Conduite raffinée et confort exceptionnel pour tous vos trajets.",
    features: [
      "Système MBUX multimédia",
      "Sellerie cuir Artico",
      "Climatisation automatique bi-zone",
      "Phares LED Multibeam",
      "Assistance parking active",
      "Pack AMG Line"
    ],
    inspection: "Inspection complète 150 points validée",
    warranty: "Garantie moteur et boîte 12 mois incluse",
    vin: "WDD2050061F123456"
  },
];

const VehicleDetails = () => {
  const { id } = useParams();
  const vehicle = allVehicles.find((v) => v.id === id);
  const [selectedImage, setSelectedImage] = useState(0);

  // Véhicules similaires (même type, excluant le véhicule actuel)
  const similarVehicles = allVehicles.filter(
    (v) => v.type === vehicle?.type && v.id !== id
  ).slice(0, 2);

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-foreground mb-6">Véhicule non trouvé</h1>
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
            {/* Image Gallery Section */}
            <div>
              {/* Main Carousel Image */}
              <div className="mb-6">
                <Carousel className="w-full" opts={{ loop: true }}>
                  <CarouselContent>
                    {vehicle.images.map((img, index) => (
                      <CarouselItem key={index}>
                        <div className="rounded-2xl overflow-hidden shadow-elegant">
                          <img
                            src={img}
                            alt={`${vehicle.brand} ${vehicle.model} - Vue ${index + 1}`}
                            className="w-full h-[500px] object-cover cursor-pointer"
                            onClick={() => setSelectedImage(index)}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-4" />
                  <CarouselNext className="right-4" />
                </Carousel>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-3 mb-6">
                {vehicle.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`rounded-lg overflow-hidden transition-all border-2 ${
                      selectedImage === index
                        ? "border-primary shadow-lg scale-105"
                        : "border-transparent hover:border-primary/50"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Vue ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
              
              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="border-accent/20">
                  <CardContent className="p-4 flex items-center gap-3">
                    <Shield className="w-8 h-8 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Inspection</p>
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

            {/* Details Section */}
            <div>
              <div className="mb-6">
                <Badge variant="secondary" className="mb-4">
                  {vehicle.type}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  {vehicle.brand} <span className="text-primary">{vehicle.model}</span>
                </h1>
                <p className="text-3xl font-bold text-primary mb-6">
                  {vehicle.price.toLocaleString()}€
                </p>
              </div>

              {/* Key Specs */}
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
                      <p className="text-sm text-muted-foreground">Kilométrage</p>
                      <p className="font-semibold">{vehicle.mileage.toLocaleString()} km</p>
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
                      <p className="font-semibold">{vehicle.deliveryDays} jours</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Description</h2>
                <p className="text-muted-foreground leading-relaxed">{vehicle.description}</p>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Équipements</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {vehicle.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inspection & Warranty */}
              <Card className="bg-accent/5 border-accent/20 mb-8">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5" />
                      <div>
                        <p className="font-semibold text-foreground">{vehicle.inspection}</p>
                        <p className="text-sm text-muted-foreground">Rapport détaillé disponible sur demande</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5" />
                      <div>
                        <p className="font-semibold text-foreground">{vehicle.warranty}</p>
                        <p className="text-sm text-muted-foreground">Extensions de garantie disponibles</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5" />
                      <div>
                        <p className="font-semibold text-foreground">Numéro VIN : {vehicle.vin}</p>
                        <p className="text-sm text-muted-foreground">Traçabilité complète du véhicule</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CTA Buttons */}
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

          {/* Similar Vehicles Section */}
          {similarVehicles.length > 0 && (
            <div className="mt-20">
              <h2 className="text-3xl font-bold text-foreground mb-8">
                Véhicules similaires
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {similarVehicles.map((v) => (
                  <VehicleCard
                    key={v.id}
                    id={v.id}
                    brand={v.brand}
                    model={v.model}
                    year={v.year}
                    price={v.price}
                    image={v.image}
                    fuel={v.fuel}
                    mileage={v.mileage}
                    deliveryDays={v.deliveryDays}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VehicleDetails;
