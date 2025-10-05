import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import TrustSection from "@/components/TrustSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import VehicleCard from "@/components/VehicleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import carBmw from "@/assets/car-bmw.jpg";
import carToyota from "@/assets/car-toyota.jpg";
import carMercedes from "@/assets/car-mercedes.jpg";

const popularVehicles = [
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
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        <HeroSection />
        <HowItWorks />
        
        {/* Popular Vehicles Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Véhicules <span className="text-primary">populaires</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Découvrez notre sélection de véhicules les plus demandés, tous inspectés et
                garantis pour votre tranquillité d'esprit.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {popularVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} {...vehicle} />
              ))}
            </div>

            <div className="text-center">
              <Button asChild variant="hero" size="xl" className="group">
                <Link to="/vehicules">
                  Voir tous les véhicules
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <TrustSection />
        <TestimonialsSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
