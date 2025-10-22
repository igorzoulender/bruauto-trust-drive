import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Car, Menu, X } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Accueil", path: "/" },
    { name: "Véhicules", path: "/vehicules" },
    { name: "Commander", path: "/commander" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f7f7f7] backdrop-blur-md border-b border-border shadow-card animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
            <img
              src="/img/asr.jpeg"
              alt="ASR Auto"
              className="h-14 sm:h-16 md:h-14 lg:h-20 w-auto max-h-full shrink-0 object-contain transition-smooth group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 animate-fade-in">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-smooth relative group animate-fade-in ${
                  isActive(link.path)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                    isActive(link.path) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4 animate-scale-in">
            <Button asChild variant="hero" size="lg" className="hover:scale-105 transition-smooth">
              <Link to="/contact">Nous Contacter</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-primary hover:bg-muted rounded-lg transition-smooth hover:scale-110"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6 transition-transform rotate-90" />
            ) : (
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 sm:py-6 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2 sm:gap-4">
              {navLinks.map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-smooth animate-fade-in ${
                    isActive(link.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {link.name}
                </Link>
              ))}
              <Button 
                asChild 
                variant="hero" 
                size="lg" 
                className="mt-2 sm:mt-4 w-full animate-fade-in" 
                style={{ animationDelay: "200ms" }}
              >
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                  Nous Contacter
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
