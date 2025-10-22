import { Shield, FileText, Truck, Handshake } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Inspection 150 Points",
    description: "Chaque véhicule subit un contrôle rigoureux de 150 points par nos experts certifiés avant la livraison.",
    gradient: "from-accent/20 to-accent/5",
  },
  {
    icon: FileText,
    title: "Garantie Écrite",
    description: "Garantie moteur et boîte de vitesses de 12 mois incluse. Vous roulez l'esprit tranquille.",
    gradient: "from-primary/20 to-primary/5",
  },
  {
    icon: Truck,
    title: "Suivi en Temps Réel",
    description: "Suivez votre commande à chaque étape : de l'inspection jusqu'à la livraison à votre domicile.",
    gradient: "from-secondary/20 to-secondary/5",
  },
  {
    icon: Handshake,
    title: "Financement Adapté",
    description: "Options de financement flexibles avec nos partenaires bancaires. Des mensualités adaptées à votre budget.",
    gradient: "from-accent/20 to-accent/5",
  },
];

const TrustSection = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            Nos garanties de <span className="text-primary">confiance</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground px-4">
            Chez BRU-AUTO, nous mettons la transparence et la sécurité au cœur de notre service.
            Voici ce qui nous différencie.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 p-6 sm:p-8 shadow-card hover:shadow-elegant transition-smooth animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-smooth`} />

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl gradient-primary flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-smooth">
                  <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary-foreground" />
                </div>

                {/* Content */}
                <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-3 sm:mb-4">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Banner */}
        <div className="mt-12 sm:mt-16 rounded-2xl gradient-hero p-6 sm:p-8 lg:p-12 shadow-elegant animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div className="animate-scale-in" style={{ animationDelay: "100ms" }}>
              <p className="text-4xl sm:text-5xl font-bold text-secondary mb-2">500+</p>
              <p className="text-sm sm:text-base text-primary-foreground/80">Véhicules livrés</p>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: "200ms" }}>
              <p className="text-4xl sm:text-5xl font-bold text-secondary mb-2">98%</p>
              <p className="text-sm sm:text-base text-primary-foreground/80">Clients satisfaits</p>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: "300ms" }}>
              <p className="text-4xl sm:text-5xl font-bold text-secondary mb-2">12</p>
              <p className="text-sm sm:text-base text-primary-foreground/80">Mois de garantie</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
