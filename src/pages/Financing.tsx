import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Shield, Calculator, Clock, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const Financing = () => {
  const [vehiclePrice, setVehiclePrice] = useState<string>("30000");
  const [downPayment, setDownPayment] = useState<string>("5000");
  const [loanDuration, setLoanDuration] = useState<string>("48");
  
  const calculateMonthly = () => {
    const price = parseFloat(vehiclePrice) || 0;
    const down = parseFloat(downPayment) || 0;
    const months = parseInt(loanDuration) || 1;
    const rate = 0.04; // 4% annual rate
    
    const principal = price - down;
    const monthlyRate = rate / 12;
    const monthly = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    
    return isNaN(monthly) ? 0 : monthly;
  };

  const monthlyPayment = calculateMonthly();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Financement & <span className="text-primary">Garanties</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Des solutions de financement flexibles et des garanties complètes pour votre
              tranquillité d'esprit.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            {/* Loan Calculator */}
            <div className="bg-card rounded-2xl p-8 shadow-card border border-border/50">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  Simulateur de financement
                </h2>
              </div>

              <div className="space-y-6">
                {/* Vehicle Price */}
                <div>
                  <Label htmlFor="vehicle-price">Prix du véhicule (€)</Label>
                  <Input
                    id="vehicle-price"
                    type="number"
                    value={vehiclePrice}
                    onChange={(e) => setVehiclePrice(e.target.value)}
                    className="mt-2"
                  />
                </div>

                {/* Down Payment */}
                <div>
                  <Label htmlFor="down-payment">Apport personnel (€)</Label>
                  <Input
                    id="down-payment"
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(e.target.value)}
                    className="mt-2"
                  />
                </div>

                {/* Loan Duration */}
                <div>
                  <Label htmlFor="loan-duration">Durée du prêt</Label>
                  <Select value={loanDuration} onValueChange={setLoanDuration}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24">24 mois</SelectItem>
                      <SelectItem value="36">36 mois</SelectItem>
                      <SelectItem value="48">48 mois</SelectItem>
                      <SelectItem value="60">60 mois</SelectItem>
                      <SelectItem value="72">72 mois</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Result */}
                <div className="mt-8 p-6 rounded-xl gradient-hero">
                  <p className="text-primary-foreground/80 text-sm mb-2">
                    Mensualité estimée
                  </p>
                  <p className="text-4xl font-bold text-secondary">
                    {monthlyPayment.toLocaleString("fr-BE", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    €
                  </p>
                  <p className="text-primary-foreground/60 text-xs mt-2">
                    Taux annuel indicatif : 4%
                  </p>
                </div>

                <Button variant="hero" size="lg" className="w-full">
                  Obtenir mon devis personnalisé
                </Button>
              </div>
            </div>

            {/* Financing Benefits */}
            <div>
              <div className="bg-card rounded-2xl p-8 shadow-card border border-border/50 mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  Avantages de notre financement
                </h3>
                <div className="space-y-4">
                  {[
                    "Taux compétitifs avec nos partenaires bancaires",
                    "Réponse de principe en 24h",
                    "Mensualités adaptées à votre budget",
                    "Possibilité de remboursement anticipé",
                    "Assurance emprunteur optionnelle",
                    "Accompagnement personnalisé",
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card rounded-xl p-6 shadow-card border border-border/50">
                  <Clock className="w-8 h-8 text-primary mb-3" />
                  <p className="text-2xl font-bold text-foreground mb-1">24h</p>
                  <p className="text-sm text-muted-foreground">Réponse rapide</p>
                </div>
                <div className="bg-card rounded-xl p-6 shadow-card border border-border/50">
                  <Shield className="w-8 h-8 text-primary mb-3" />
                  <p className="text-2xl font-bold text-foreground mb-1">100%</p>
                  <p className="text-sm text-muted-foreground">Sécurisé</p>
                </div>
              </div>
            </div>
          </div>

          {/* Warranty Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Nos <span className="text-primary">garanties</span>
              </h2>
              <p className="text-muted-foreground">
                Roulez l'esprit tranquille avec nos garanties complètes
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  title: "Garantie Moteur & Boîte",
                  duration: "12 mois",
                  description: "Pièces et main d'œuvre incluses",
                },
                {
                  title: "Assistance 24/7",
                  duration: "Incluse",
                  description: "Dépannage et remorquage",
                },
                {
                  title: "Véhicule de remplacement",
                  duration: "En cas de panne",
                  description: "Mobilité garantie",
                },
              ].map((warranty, index) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl p-8 shadow-card border border-border/50 text-center"
                >
                  <div className="w-16 h-16 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {warranty.title}
                  </h3>
                  <p className="text-2xl font-bold text-primary mb-2">{warranty.duration}</p>
                  <p className="text-muted-foreground text-sm">{warranty.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Questions <span className="text-primary">fréquentes</span>
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem
                value="item-1"
                className="bg-card rounded-xl border border-border/50 px-6"
              >
                <AccordionTrigger className="text-left font-semibold">
                  Quels documents sont nécessaires pour une demande de financement ?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Vous aurez besoin d'une pièce d'identité, de vos 3 derniers bulletins de
                  salaire, et d'un justificatif de domicile de moins de 3 mois.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="bg-card rounded-xl border border-border/50 px-6"
              >
                <AccordionTrigger className="text-left font-semibold">
                  Puis-je rembourser mon prêt par anticipation ?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Oui, vous pouvez rembourser votre prêt par anticipation à tout moment, sans
                  pénalités. Des frais administratifs minimes peuvent s'appliquer.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-3"
                className="bg-card rounded-xl border border-border/50 px-6"
              >
                <AccordionTrigger className="text-left font-semibold">
                  Que couvre exactement la garantie moteur et boîte ?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Notre garantie couvre tous les composants internes du moteur et de la boîte de
                  vitesses, incluant les pièces et la main d'œuvre. Les consommables et l'usure
                  normale sont exclus.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-4"
                className="bg-card rounded-xl border border-border/50 px-6"
              >
                <AccordionTrigger className="text-left font-semibold">
                  Quel est le montant minimum d'apport personnel requis ?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Nous recommandons un apport de 15 à 20% du prix du véhicule, mais cela peut
                  être ajusté selon votre situation financière. Contactez-nous pour une étude
                  personnalisée.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Financing;
