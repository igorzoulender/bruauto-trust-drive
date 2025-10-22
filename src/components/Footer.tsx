import { Link } from "react-router-dom";
import { Car, Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                <Car className="w-6 h-6 text-secondary-foreground" />
              </div>
              <div>
                <span className="text-xl font-bold">ASR</span>
                <span className="text-xl font-bold text-secondary">-AUTO</span>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Votre partenaire de confiance pour l'achat de voitures en toute transparence.
              Inspection rigoureuse, garantie écrite, livraison suivie.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-primary-foreground/80 hover:text-secondary transition-smooth text-sm">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/vehicules" className="text-primary-foreground/80 hover:text-secondary transition-smooth text-sm">
                  Véhicules
                </Link>
              </li>
               <li>
                <Link to="/commander" className="text-primary-foreground/80 hover:text-secondary transition-smooth text-sm">
                  Commander
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/80 hover:text-secondary transition-smooth text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3 text-sm">
              <li className="text-primary-foreground/80">Inspection 150 Points</li>
              <li className="text-primary-foreground/80">Garantie Moteur & Boîte</li>
              <li className="text-primary-foreground/80">Livraison à Domicile</li>
              <li className="text-primary-foreground/80">Financement Personnalisé</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0 text-secondary" />
                <div>
                  <a href="tel:+22871464111" className="text-primary-foreground/80 hover:text-secondary transition-smooth text-sm">
                    +228 71 46 41 11
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0 text-secondary" />
                <div>
                  <a href="mailto:contact@bru-auto.be" className="text-primary-foreground/80 hover:text-secondary transition-smooth text-sm break-all">
                    contact@bru-auto.be
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-secondary" />
                <div className="text-primary-foreground/80 text-sm">
                  Lomé, Togo
                </div>
              </li>
            </ul>

            {/* Social Media */}
            {/* <div className="flex items-center gap-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-primary-foreground/10 hover:bg-secondary flex items-center justify-center transition-smooth group"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-primary-foreground group-hover:text-secondary-foreground" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-primary-foreground/10 hover:bg-secondary flex items-center justify-center transition-smooth group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-primary-foreground group-hover:text-secondary-foreground" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-primary-foreground/10 hover:bg-secondary flex items-center justify-center transition-smooth group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-primary-foreground group-hover:text-secondary-foreground" />
              </a>
            </div> */}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
          <p className="text-primary-foreground/70 text-sm">
            © {new Date().getFullYear()} ASR-AUTO. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
