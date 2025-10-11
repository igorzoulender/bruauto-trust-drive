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
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Comment ça <span className="text-primary">marche</span> ?
          </h2>
          <p className="text-lg text-muted-foreground">
            Un processus simple et transparent en 4 étapes pour vous garantir une expérience
            d'achat sereine et sécurisée.
          </p>
        </div>

        {/* Steps Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent" style={{ width: 'calc(100% - 8rem)', left: '4rem' }} />

          {steps.map((step, index) => (
            <div
              key={index}
              className="relative animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="bg-card rounded-2xl p-8 shadow-card hover:shadow-elegant transition-smooth h-full border border-border/50">

              <div className="flex flex-row items-center mb-6 justify-between">
                {/* Step Number */}
                <div className="w-16 h-16 rounded-xl gradient-primary flex items-center justify-center mb-6 relative z-10">
                  <span className="text-2xl font-bold text-primary-foreground">{step.number}</span>
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center mb-6">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
              </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
