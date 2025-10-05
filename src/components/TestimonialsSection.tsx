import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sophie Laurent",
    location: "Bruxelles",
    rating: 5,
    text: "Service impeccable ! L'inspection était vraiment détaillée et la livraison s'est faite exactement comme promis. Je recommande vivement BRU-AUTO.",
    date: "Il y a 2 semaines",
  },
  {
    name: "Marc Dubois",
    location: "Liège",
    rating: 5,
    text: "Transparence totale du début à la fin. J'ai pu suivre toutes les étapes en temps réel. Ma BMW est arrivée en parfait état avec tous les documents. Merci !",
    date: "Il y a 1 mois",
  },
  {
    name: "Julie Martin",
    location: "Gand",
    rating: 5,
    text: "Excellente expérience ! Le financement a été simple à mettre en place et l'équipe était très professionnelle. Je suis ravie de ma nouvelle voiture.",
    date: "Il y a 3 semaines",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ils nous font <span className="text-primary">confiance</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Découvrez les témoignages de nos clients satisfaits qui ont trouvé leur voiture
            idéale avec BRU-AUTO.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-8 shadow-card hover:shadow-elegant transition-smooth border border-border/50 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Rating */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                ))}
              </div>

              {/* Text */}
              <p className="text-muted-foreground leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="border-t border-border pt-6">
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                <p className="text-xs text-muted-foreground mt-2">{testimonial.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent/10 border border-accent/30">
            <Star className="w-5 h-5 fill-secondary text-secondary" />
            <span className="font-semibold text-foreground">
              Note moyenne : 4.9/5 basée sur 200+ avis
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
