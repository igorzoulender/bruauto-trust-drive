import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    vehicle: "",
    budget: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Sauvegarder dans localStorage
    const contactRequest = {
      id: Date.now().toString(),
      ...formData,
      date: new Date().toISOString(),
    };

    const existingContacts = localStorage.getItem("contact-requests");
    const contacts = existingContacts ? JSON.parse(existingContacts) : [];
    contacts.push(contactRequest);
    localStorage.setItem("contact-requests", JSON.stringify(contacts));

    toast({
      title: "Message envoyé !",
      description: "Nous vous recontacterons dans les plus brefs délais.",
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      vehicle: "",
      budget: "",
      message: "",
    });
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Bonjour, je suis intéressé par vos services ASR-AUTO."
    );
    window.open(`https://wa.me/22871464111?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Contactez-<span className="text-primary">nous</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Notre équipe est à votre disposition pour répondre à toutes vos questions et vous
              accompagner dans votre projet d'achat.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Cards */}
              <div className="bg-card rounded-2xl p-8 shadow-card border border-border/50">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Informations de contact
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">Téléphone</p>
                      <a
                        href="tel:+22871464111"
                        className="text-muted-foreground hover:text-primary transition-smooth"
                      >
                        +228 71 46 41 11
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        Lun - Ven : 9h - 18h
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">Email</p>
                      <a
                        href="mailto:contact@bru-auto.be"
                        className="text-muted-foreground hover:text-primary transition-smooth"
                      >
                        contact@bru-auto.be
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        Réponse sous 24h
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">Adresse</p>
                      <p className="text-muted-foreground">
                        Lomé, Togo
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Rendez-vous sur demande
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="bg-accent rounded-2xl p-8 shadow-card">
                <div className="flex items-center gap-3 mb-4">
                  <MessageCircle className="w-8 h-8 text-accent-foreground" />
                  <h3 className="text-xl font-bold text-accent-foreground">
                    Besoin d'une réponse rapide ?
                  </h3>
                </div>
                <p className="text-accent-foreground/90 mb-6">
                  Contactez-nous directement sur WhatsApp pour une réponse immédiate.
                </p>
                <Button
                  onClick={handleWhatsApp}
                  variant="secondary"
                  size="lg"
                  className="w-full"
                >
                  <MessageCircle className="w-5 h-5" />
                  Ouvrir WhatsApp
                </Button>
              </div>

              {/* Opening Hours */}
              <div className="bg-card rounded-2xl p-8 shadow-card border border-border/50">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-bold text-foreground">Horaires d'ouverture</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Lundi - Vendredi</span>
                    <span className="font-medium text-foreground">9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Samedi</span>
                    <span className="font-medium text-foreground">10:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dimanche</span>
                    <span className="font-medium text-foreground">Fermé</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-card rounded-2xl p-8 lg:p-12 shadow-card border border-border/50">
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  Demande de contact
                </h2>
                <p className="text-muted-foreground mb-8">
                  Remplissez ce formulaire et nous vous recontacterons rapidement.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <Label htmlFor="name">Nom complet *</Label>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-2"
                      placeholder="Jean Dupont"
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-2"
                        placeholder="jean.dupont@email.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Téléphone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-2"
                        placeholder="+228 00 00 00 00"
                      />
                    </div>
                  </div>

                  {/* Vehicle Interest & Budget */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="vehicle">Véhicule d'intérêt</Label>
                      <Select
                        value={formData.vehicle}
                        onValueChange={(value) => setFormData({ ...formData, vehicle: value })}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Sélectionnez un véhicule" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bmw-3">BMW Série 3</SelectItem>
                          <SelectItem value="toyota-rav4">Toyota RAV4</SelectItem>
                          <SelectItem value="mercedes-c">Mercedes Classe C</SelectItem>
                          <SelectItem value="other">Autre véhicule</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="budget">Budget estimé</Label>
                      <Select
                        value={formData.budget}
                        onValueChange={(value) => setFormData({ ...formData, budget: value })}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Sélectionnez votre budget" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="20-30k">20 000€ - 30 000€</SelectItem>
                          <SelectItem value="30-40k">30 000€ - 40 000€</SelectItem>
                          <SelectItem value="40-50k">40 000€ - 50 000€</SelectItem>
                          <SelectItem value="50k+">Plus de 50 000€</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="mt-2 min-h-32"
                      placeholder="Décrivez-nous votre projet..."
                    />
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" variant="hero" size="xl" className="w-full">
                    Envoyer ma demande
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    En soumettant ce formulaire, vous acceptez d'être contacté par notre équipe.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
