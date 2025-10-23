import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl gradient-hero p-8 sm:p-12 lg:p-20 shadow-elegant animate-fade-in">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-secondary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-accent/10 rounded-full blur-3xl" />

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-4 sm:mb-6 animate-scale-in">
              Prêt à trouver votre véhicule idéal ?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-primary-foreground/90 mb-8 sm:mb-12 leading-relaxed px-4 animate-fade-in">
              Obtenez une consultation gratuite avec nos experts. Nous vous aidons à trouver
              la voiture parfaite selon vos besoins et votre budget.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 animate-scale-in">
              <Button asChild variant="secondary" size="xl" className="group w-full sm:w-auto hover:scale-105 transition-smooth">
                <Link to="/contact">
                  <span className="hidden sm:inline">Nous Contacter</span>
                  <span className="sm:hidden">Contacter</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="xl"
                className="bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary w-full sm:w-auto hover:scale-105 transition-smooth"
              >
                <a href="tel:+228 71 46 41 11">
                  <Phone className="w-5 h-5" />
                  <span className="text-sm sm:text-base">+228 71 46 41 11 / +228 70 33 47 23</span>
                </a>
              </Button>
            </div>

            {/* Trust Indicators */}
            {/* <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-8 mt-8 sm:mt-12 text-primary-foreground/80 animate-fade-in px-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-sm">Réponse sous 2h</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-sm">Consultation gratuite</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-sm">Sans engagement</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
