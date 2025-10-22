import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import TrustSection from "@/components/TrustSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import ServicesSection from "@/components/ServicesSection";
import RegisteredVehiclesSection from "@/components/RegisteredVehiclesSection";
import VehicleCard from "@/components/VehicleCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";


const Index = () => {
  const [popularVehicles, setPopularVehicles] = useState<any[]>([]);

  useEffect(() => {
    const savedVehicles = localStorage.getItem("admin-vehicles");
    if (savedVehicles) {
      const vehicles = JSON.parse(savedVehicles);
      setPopularVehicles(vehicles.slice(0, 8));
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        <HeroSection />
        <HowItWorks />
        <ServicesSection />
        
        {/* Popular Vehicles Section */}
        <section className="py-16 sm:py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 animate-fade-in">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
                Véhicules <span className="text-primary">populaires</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground px-4">
                Découvrez notre sélection de véhicules les plus demandés, tous inspectés et
                garantis pour votre tranquillité d'esprit.
              </p>
            </div>

            {popularVehicles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 mb-12 animate-fade-in">
                {popularVehicles.map((vehicle, index) => (
                  <div key={vehicle.id} className="animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <VehicleCard {...vehicle} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground animate-fade-in px-4">
                <p className="text-base sm:text-lg mb-4">Aucun véhicule disponible pour le moment</p>
                <p className="text-sm">Ajoutez des véhicules depuis le dashboard administrateur</p>
              </div>
            )}

            <div className="text-center animate-fade-in">
              <Button asChild variant="hero" size="xl" className="group">
                <Link to="/vehicules">
                  <span className="hidden sm:inline">Voir tous les véhicules</span>
                  <span className="sm:hidden">Tous les véhicules</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <RegisteredVehiclesSection />
        <TrustSection />
        <TestimonialsSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
