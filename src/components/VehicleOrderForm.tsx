import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  // Step 1: Informations personnelles
  fullName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  phone: z.string().min(8, "Numéro de téléphone invalide"),
  email: z.string().email("Email invalide").optional().or(z.literal("")),
  
  // Step 2: Caractéristiques du véhicule
  brand: z.string().min(1, "La marque est obligatoire"),
  customBrand: z.string().optional(),
  fuelType: z.string().min(1, "Le type de carburant est obligatoire"),
  budget: z.string().min(1, "Le budget est obligatoire"),
  year: z.string().optional(),
  transmission: z.string().optional(),
  
  // Step 3: Options supplémentaires
  color: z.string().optional(),
  additionalFeatures: z.string().optional(),
  comments: z.string().optional(),
}).refine((data) => {
  if (data.brand === "autre") {
    return data.customBrand && data.customBrand.length > 0;
  }
  return true;
}, {
  message: "Veuillez spécifier la marque",
  path: ["customBrand"],
});

type FormData = z.infer<typeof formSchema>;

const VehicleOrderForm = ({ onClose }: { onClose: () => void }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const selectedBrand = watch("brand");
  const totalSteps = 3;

  const onSubmit = (data: FormData) => {
    console.log("Commande de véhicule:", data);
    toast({
      title: "Commande envoyée !",
      description: "Nous vous contactons sous 24h pour confirmer votre demande.",
    });
    onClose();
  };

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const brands = [
    "Toyota", "Mercedes", "BMW", "Audi", "Volkswagen", "Ford", 
    "Honda", "Nissan", "Hyundai", "Kia", "Peugeot", "Renault", "autre"
  ];

  const fuelTypes = ["Essence", "Diesel", "Hybride", "Électrique", "GPL"];

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-smooth ${
                    currentStep >= step
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {currentStep > step ? <Check className="w-5 h-5" /> : step}
                </div>
                <p className="text-xs mt-2 text-center">
                  {step === 1 && "Informations"}
                  {step === 2 && "Véhicule"}
                  {step === 3 && "Options"}
                </p>
              </div>
              {step < 3 && (
                <div
                  className={`h-0.5 flex-1 mx-2 transition-smooth ${
                    currentStep > step ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Step 1: Informations personnelles */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-in fade-in-50 duration-300">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Vos informations
            </h3>

            <div>
              <Label htmlFor="fullName">
                Nom complet <span className="text-destructive">*</span>
              </Label>
              <Input
                id="fullName"
                {...register("fullName")}
                placeholder="Votre nom et prénom"
                className="mt-1.5"
              />
              {errors.fullName && (
                <p className="text-sm text-destructive mt-1">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phone">
                Téléphone <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                {...register("phone")}
                placeholder="+229 XX XX XX XX"
                className="mt-1.5"
              />
              {errors.phone && (
                <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email (optionnel)</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="votre@email.com"
                className="mt-1.5"
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Caractéristiques du véhicule */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-in fade-in-50 duration-300">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Caractéristiques du véhicule
            </h3>

            <div>
              <Label htmlFor="brand">
                Marque <span className="text-destructive">*</span>
              </Label>
              <Select onValueChange={(value) => setValue("brand", value)}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Sélectionnez une marque" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand} value={brand.toLowerCase()}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.brand && (
                <p className="text-sm text-destructive mt-1">{errors.brand.message}</p>
              )}
            </div>

            {selectedBrand === "autre" && (
              <div>
                <Label htmlFor="customBrand">
                  Précisez la marque <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="customBrand"
                  {...register("customBrand")}
                  placeholder="Nom de la marque"
                  className="mt-1.5"
                />
                {errors.customBrand && (
                  <p className="text-sm text-destructive mt-1">{errors.customBrand.message}</p>
                )}
              </div>
            )}

            <div>
              <Label htmlFor="fuelType">
                Type de carburant <span className="text-destructive">*</span>
              </Label>
              <Select onValueChange={(value) => setValue("fuelType", value)}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Sélectionnez le carburant" />
                </SelectTrigger>
                <SelectContent>
                  {fuelTypes.map((fuel) => (
                    <SelectItem key={fuel} value={fuel.toLowerCase()}>
                      {fuel}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.fuelType && (
                <p className="text-sm text-destructive mt-1">{errors.fuelType.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="budget">
                Budget (FCFA) <span className="text-destructive">*</span>
              </Label>
              <Input
                id="budget"
                {...register("budget")}
                placeholder="Ex: 5,000,000 FCFA"
                className="mt-1.5"
              />
              {errors.budget && (
                <p className="text-sm text-destructive mt-1">{errors.budget.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="year">Année (optionnel)</Label>
                <Input
                  id="year"
                  {...register("year")}
                  placeholder="2024"
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="transmission">Transmission</Label>
                <Select onValueChange={(value) => setValue("transmission", value)}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="automatique">Automatique</SelectItem>
                    <SelectItem value="manuelle">Manuelle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Options supplémentaires */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-in fade-in-50 duration-300">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Options supplémentaires
            </h3>

            <div>
              <Label htmlFor="color">Couleur préférée</Label>
              <Input
                id="color"
                {...register("color")}
                placeholder="Ex: Noir, Blanc, Gris métallisé..."
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="additionalFeatures">Options souhaitées</Label>
              <Textarea
                id="additionalFeatures"
                {...register("additionalFeatures")}
                placeholder="Ex: Toit ouvrant, GPS, Caméra de recul, Sièges chauffants..."
                className="mt-1.5 min-h-[100px]"
              />
            </div>

            <div>
              <Label htmlFor="comments">Commentaires additionnels</Label>
              <Textarea
                id="comments"
                {...register("comments")}
                placeholder="Ajoutez toute information complémentaire..."
                className="mt-1.5 min-h-[100px]"
              />
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between pt-6 border-t">
          {currentStep > 1 ? (
            <Button type="button" variant="outline" onClick={prevStep}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Précédent
            </Button>
          ) : (
            <div />
          )}

          {currentStep < totalSteps ? (
            <Button type="button" onClick={nextStep}>
              Suivant
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button type="submit" className="bg-accent hover:bg-accent/90">
              <Check className="w-4 h-4 mr-2" />
              Envoyer la commande
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default VehicleOrderForm;
