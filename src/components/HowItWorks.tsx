import { Search, CreditCard, ClipboardCheck, Truck } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Choisissez votre véhicule",
    description: "Parcourez notre catalogue en ligne et trouvez la voiture qui correspond à vos besoins et votre budget.",
  },
  {
    number: "02",
    icon: CreditCard,
    title: "Réservez avec acompte",
    description: "Sécurisez votre choix avec un acompte symbolique. Votre véhicule est maintenant réservé pour vous.",
  },
  {
    number: "03",
    icon: ClipboardCheck,
    title: "Inspection rigoureuse",
    description: "Notre équipe effectue une inspection complète de 150 points pour garantir la qualité du véhicule.",
  },
  {
    number: "04",
    icon: Truck,
    title: "Livraison & Garantie",
    description: "Recevez votre voiture avec tous les documents, la garantie écrite et un suivi complet.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            Comment ça <span className="text-primary">marche</span> ?
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground px-4">
            Un processus simple et transparent en 4 étapes pour vous garantir une expérience
            d'achat sereine et sécurisée.
          </p>
        </div>

        {/* Steps Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent" style={{ width: 'calc(100% - 8rem)', left: '4rem' }} />

          {steps.map((step, index) => (
            <div
              key={index}
              className="relative animate-scale-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-card hover:shadow-elegant transition-smooth h-full border border-border/50 hover:scale-105">

              <div className="flex flex-row items-center mb-4 sm:mb-6 justify-between">
                {/* Step Number */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl gradient-primary flex items-center justify-center relative z-10 animate-fade-in">
                  <span className="text-xl sm:text-2xl font-bold text-primary-foreground">{step.number}</span>
                </div>

                {/* Icon */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-muted flex items-center justify-center">
                  <step.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                </div>
              </div>

                {/* Content */}
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">{step.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
