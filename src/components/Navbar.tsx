
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  ShoppingCart, 
  Menu, 
  X, 
  ChefHat, 
  Phone,
  MapPin,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems] = useState(3); // Mock cart items
  const [isLoggedIn] = useState(false); // Mock login state
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLoginClick = () => {
    navigate('/auth');
  };

  const handleCartClick = () => {
    navigate('/cart');
    toast({
      title: "Warenkorb",
      description: "Warenkorb wird geladen...",
    });
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-blue-100">
      {/* Top Bar - Hidden on mobile */}
      <div className="bg-blue-600 text-white py-2 px-4 hidden md:block">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>+49 89 123 456 789</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>München & Umgebung</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>Täglich 11:00 - 23:00</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-xl md:text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
            <ChefHat className="w-6 h-6 md:w-8 md:h-8" />
            <span>FoodHub</span>
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden lg:flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Restaurants
            </Link>
            <Link to="/search" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Suchen
            </Link>
            <Link to="/reservations" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Reservierungen
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Über uns
            </Link>
          </div>

          {/* Desktop User Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Cart */}
            <Button
              variant="ghost"
              size="sm"
              className="relative hover:bg-blue-50"
              onClick={handleCartClick}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItems > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 min-w-[1.25rem] h-5 flex items-center justify-center text-xs">
                  {cartItems}
                </Badge>
              )}
            </Button>

            {/* User Account */}
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="hover:bg-blue-50">
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline ml-1">Mein Konto</span>
                </Button>
              </div>
            ) : (
              <Button 
                size="sm" 
                className="bg-blue-500 hover:bg-blue-600"
                onClick={handleLoginClick}
              >
                <User className="w-4 h-4 mr-1" />
                Anmelden
              </Button>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile Cart */}
            <Button
              variant="ghost"
              size="sm"
              className="relative"
              onClick={handleCartClick}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItems > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 min-w-[1.25rem] h-5 flex items-center justify-center text-xs">
                  {cartItems}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="py-4 px-4 space-y-3">
            <Link 
              to="/" 
              className="block text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Restaurants
            </Link>
            <Link 
              to="/search" 
              className="block text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Suchen
            </Link>
            <Link 
              to="/reservations" 
              className="block text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Reservierungen
            </Link>
            <Link 
              to="/about" 
              className="block text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Über uns
            </Link>
            <hr className="my-3" />
            {!isLoggedIn && (
              <Button 
                size="sm" 
                className="bg-blue-500 hover:bg-blue-600 justify-start w-full"
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLoginClick();
                }}
              >
                <User className="w-4 h-4 mr-2" />
                Anmelden
              </Button>
            )}
            <Button 
              size="sm" 
              variant="outline"
              className="justify-start w-full"
              onClick={() => {
                setIsMenuOpen(false);
                navigate('/register-restaurant');
              }}
            >
              Restaurant registrieren
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
