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
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Nos garanties de <span className="text-primary">confiance</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Chez BRU-AUTO, nous mettons la transparence et la sécurité au cœur de notre service.
            Voici ce qui nous différencie.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 p-8 shadow-card hover:shadow-elegant transition-smooth animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-smooth`} />

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-16 h-16 rounded-xl gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-smooth">
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Banner */}
        <div className="mt-16 rounded-2xl gradient-hero p-8 lg:p-12 shadow-elegant">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold text-secondary mb-2">500+</p>
              <p className="text-primary-foreground/80">Véhicules livrés</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-secondary mb-2">98%</p>
              <p className="text-primary-foreground/80">Clients satisfaits</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-secondary mb-2">12</p>
              <p className="text-primary-foreground/80">Mois de garantie</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
