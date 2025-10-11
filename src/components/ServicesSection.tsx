import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { ShoppingCart, FileCheck, CreditCard, CheckCircle2 } from "lucide-react";
import VehicleOrderForm from "./VehicleOrderForm";

const ServicesSection = () => {
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Nos <span className="text-primary">Services</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Découvrez toutes nos solutions pour faciliter votre acquisition
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Vente et achat sur commande */}
          <Card className="border-2 hover:border-primary transition-smooth hover:shadow-card">
            <CardHeader>
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <ShoppingCart className="w-7 h-7 text-primary" />
              </div>
              <CardTitle className="text-2xl">Vente & Achat sur Commande</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Trouvez le véhicule de vos rêves même s'il n'est pas en stock. Nous importons
                le véhicule exact que vous souhaitez avec toutes les options désirées.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">
                    Sélection personnalisée selon vos critères
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">
                    Import direct du véhicule souhaité
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">
                    Suivi transparent de A à Z
                  </span>
                </li>
              </ul>
              <Button 
                onClick={() => setIsOrderFormOpen(true)}
                className="w-full mt-6 bg-primary hover:bg-primary/90"
              >
                Commander maintenant
              </Button>
            </CardContent>
          </Card>

          {/* Achat de véhicules */}
          <Card className="border-2 hover:border-primary transition-smooth hover:shadow-card">
            <CardHeader>
              <div className="w-14 h-14 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                <FileCheck className="w-7 h-7 text-secondary" />
              </div>
              <CardTitle className="text-2xl">Rachat de Véhicules</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Nous achetons votre véhicule au meilleur prix, qu'il soit immatriculé ou non.
                Estimation gratuite et paiement rapide.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">
                    Rachat véhicules immatriculés
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">
                    Rachat véhicules non immatriculés
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">
                    Évaluation gratuite et sans engagement
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">
                    Paiement immédiat et sécurisé
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Paiement en 3 tranches */}
          <Card className="border-2 hover:border-primary transition-smooth hover:shadow-card md:col-span-2 lg:col-span-1">
            <CardHeader>
              <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <CreditCard className="w-7 h-7 text-accent" />
              </div>
              <CardTitle className="text-2xl">Paiement Flexible</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Facilitez votre achat avec notre solution de paiement en 3 tranches.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 font-semibold text-sm">
                    1
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">1ère tranche : 60%</p>
                    <p className="text-sm text-muted-foreground">À la signature du contrat</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 font-semibold text-sm">
                    2
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">2ème tranche : À négocier</p>
                    <p className="text-sm text-muted-foreground">Selon votre situation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 font-semibold text-sm">
                    3
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">3ème tranche : À négocier</p>
                    <p className="text-sm text-muted-foreground">Modalités personnalisées</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dialog pour le formulaire de commande */}
        <Dialog open={isOrderFormOpen} onOpenChange={setIsOrderFormOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">Commander votre véhicule</DialogTitle>
            </DialogHeader>
            <VehicleOrderForm onClose={() => setIsOrderFormOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ServicesSection;

