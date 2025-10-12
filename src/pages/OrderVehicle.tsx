import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const formSchema = z.object({
  fullName: z.string().min(2, "Le nom complet est requis"),
  phone: z.string().min(8, "Le numéro de téléphone est requis"),
  email: z.string().email("Email invalide").optional().or(z.literal("")),
  brand: z.string().min(1, "La marque est requise"),
  customBrand: z.string().optional(),
  fuelType: z.string().min(1, "Le type de carburant est requis"),
  budget: z.string().min(1, "Le budget est requis"),
  year: z.string().optional(),
  transmission: z.string().optional(),
  color: z.string().optional(),
  additionalFeatures: z.string().optional(),
  comments: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const OrderVehicle = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      brand: "",
      customBrand: "",
      fuelType: "",
      budget: "",
      year: "",
      transmission: "",
      color: "",
      additionalFeatures: "",
      comments: "",
    },
  });

  const watchBrand = form.watch("brand");

  const onSubmit = (data: FormData) => {
    // Sauvegarder dans localStorage
    const order = {
      id: Date.now().toString(),
      ...data,
      date: new Date().toISOString(),
    };

    const existingOrders = localStorage.getItem("vehicle-orders");
    const orders = existingOrders ? JSON.parse(existingOrders) : [];
    orders.push(order);
    localStorage.setItem("vehicle-orders", JSON.stringify(orders));

    console.log("Form data:", data);
    toast.success("Votre commande a été envoyée avec succès!");
    form.reset();
    setCurrentStep(1);
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];
    
    if (currentStep === 1) {
      fieldsToValidate = ["fullName", "phone", "email"];
    } else if (currentStep === 2) {
      fieldsToValidate = ["brand", "fuelType", "budget"];
      if (watchBrand === "autre") {
        fieldsToValidate.push("customBrand");
      }
    }

    const isValid = await form.trigger(fieldsToValidate);
    
    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Commander un Véhicule</h1>
            <p className="text-muted-foreground">
              Remplissez ce formulaire pour commander votre véhicule sur mesure
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`flex items-center ${
                    step < 3 ? "flex-1" : ""
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      currentStep >= step
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {currentStep > step ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      step
                    )}
                  </div>
                  {step < 3 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        currentStep > step ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm">
              <span>Informations</span>
              <span>Caractéristiques</span>
              <span>Options</span>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h2 className="text-2xl font-semibold mb-4">
                    Informations Personnelles
                  </h2>
                  
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom Complet *</FormLabel>
                        <FormControl>
                          <Input placeholder="Votre nom complet" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Téléphone *</FormLabel>
                        <FormControl>
                          <Input placeholder="+237 6XX XXX XXX" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email (optionnel)</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="votre@email.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 2: Vehicle Characteristics */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h2 className="text-2xl font-semibold mb-4">
                    Caractéristiques du Véhicule
                  </h2>

                  <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Marque *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez une marque" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="toyota">Toyota</SelectItem>
                            <SelectItem value="mercedes">Mercedes</SelectItem>
                            <SelectItem value="bmw">BMW</SelectItem>
                            <SelectItem value="honda">Honda</SelectItem>
                            <SelectItem value="nissan">Nissan</SelectItem>
                            <SelectItem value="autre">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {watchBrand === "autre" && (
                    <FormField
                      control={form.control}
                      name="customBrand"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Précisez la marque *</FormLabel>
                          <FormControl>
                            <Input placeholder="Nom de la marque" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="fuelType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type de Carburant *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez le carburant" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="essence">Essence</SelectItem>
                            <SelectItem value="diesel">Diesel</SelectItem>
                            <SelectItem value="hybride">Hybride</SelectItem>
                            <SelectItem value="electrique">Électrique</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Budget *</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: 10 000 000 FCFA" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Année (optionnel)</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: 2024" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="transmission"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Transmission (optionnel)</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez la transmission" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="manuelle">Manuelle</SelectItem>
                            <SelectItem value="automatique">Automatique</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 3: Additional Options */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h2 className="text-2xl font-semibold mb-4">
                    Options Supplémentaires
                  </h2>

                  <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Couleur Souhaitée (optionnel)</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Noir, Blanc, Gris..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="additionalFeatures"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Équipements Souhaités (optionnel)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Ex: Climatisation, Toit ouvrant, Système de navigation..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="comments"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Commentaires (optionnel)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Informations supplémentaires..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Précédent
                  </Button>
                )}
                
                {currentStep < 3 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="ml-auto gap-2"
                  >
                    Suivant
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button type="submit" className="ml-auto">
                    Envoyer la Commande
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderVehicle;
