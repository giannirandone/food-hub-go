import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, MapPin, ChefHat, Users, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNavigation from "@/components/BottomNavigation";

// Mock data for restaurants
const mockRestaurants = [
  {
    id: 1,
    name: "Bella Vista",
    cuisine: "Italienisch",
    rating: 4.8,
    deliveryTime: "25-35 min",
    location: "München Zentrum",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&h=300&fit=crop",
    priceRange: "€€€",
    specialties: ["Pizza", "Pasta", "Risotto"]
  },
  {
    id: 2,
    name: "Sakura Sushi",
    cuisine: "Japanisch",
    rating: 4.9,
    deliveryTime: "30-40 min",
    location: "München Schwabing",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=300&fit=crop",
    priceRange: "€€€€",
    specialties: ["Sushi", "Ramen", "Tempura"]
  },
  {
    id: 3,
    name: "Burger Palace",
    cuisine: "Amerikanisch",
    rating: 4.6,
    deliveryTime: "20-30 min",
    location: "München Maxvorstadt",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500&h=300&fit=crop",
    priceRange: "€€",
    specialties: ["Burger", "Pommes", "Milkshakes"]
  },
  {
    id: 4,
    name: "Spice Garden",
    cuisine: "Indisch",
    rating: 4.7,
    deliveryTime: "35-45 min",
    location: "München Glockenbachviertel",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&h=300&fit=crop",
    priceRange: "€€",
    specialties: ["Curry", "Tandoori", "Naan"]
  }
];

const Index = () => {
  const [selectedCuisine, setSelectedCuisine] = useState<string>("Alle");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const cuisines = ["Alle", "Italienisch", "Japanisch", "Amerikanisch", "Indisch", "Deutsch", "Französisch"];

  const filteredRestaurants = mockRestaurants.filter(restaurant => {
    const matchesCuisine = selectedCuisine === "Alle" || restaurant.cuisine === selectedCuisine;
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCuisine && matchesSearch;
  });

  const handleRestaurantClick = (restaurantId: number) => {
    navigate(`/restaurant/${restaurantId}`);
  };

  const handleQuickOrder = (restaurantName: string) => {
    toast({
      title: "Schnellbestellung",
      description: `Bestellung bei ${restaurantName} wird vorbereitet...`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-7xl font-bold mb-6 animate-fade-in">
            Hunger? Wir liefern!
          </h1>
          <p className="text-lg md:text-2xl mb-8 opacity-90">
            Die besten Restaurants in München - jetzt bestellen oder reservieren
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto bg-white rounded-full p-2 shadow-lg">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Restaurant oder Küche suchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-2 text-gray-800 bg-transparent outline-none"
              />
              <Button 
                className="rounded-full bg-orange-500 hover:bg-orange-600 px-6"
                onClick={() => navigate('/search')}
              >
                <Search className="w-4 h-4 md:hidden" />
                <span className="hidden md:inline">Suchen</span>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-bounce hidden md:block">
          <ChefHat className="w-12 h-12 text-white opacity-20" />
        </div>
        <div className="absolute bottom-20 right-10 animate-pulse hidden md:block">
          <Users className="w-16 h-16 text-white opacity-20" />
        </div>
      </section>

      {/* Cuisine Filter */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Küche wählen</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {cuisines.map((cuisine) => (
              <Button
                key={cuisine}
                variant={selectedCuisine === cuisine ? "default" : "outline"}
                onClick={() => setSelectedCuisine(cuisine)}
                className={`px-4 md:px-6 py-2 rounded-full transition-all duration-300 text-sm md:text-base ${
                  selectedCuisine === cuisine 
                    ? "bg-orange-500 hover:bg-orange-600 text-white" 
                    : "hover:bg-orange-50 border-orange-200"
                }`}
              >
                {cuisine}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurants Grid */}
      <section className="py-12 px-4 pb-20 md:pb-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Beliebte Restaurants
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredRestaurants.map((restaurant) => (
              <Card 
                key={restaurant.id} 
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border-0 shadow-lg overflow-hidden"
                onClick={() => handleRestaurantClick(restaurant.id)}
              >
                <div className="relative">
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white text-gray-800 font-bold">
                      {restaurant.priceRange}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg md:text-xl text-gray-800 group-hover:text-orange-600 transition-colors">
                      {restaurant.name}
                    </CardTitle>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-sm">{restaurant.rating}</span>
                    </div>
                  </div>
                  <CardDescription className="text-orange-600 font-medium">
                    {restaurant.cuisine}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{restaurant.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {restaurant.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 bg-orange-500 hover:bg-orange-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuickOrder(restaurant.name);
                      }}
                    >
                      Bestellen
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 border-orange-500 text-orange-600 hover:bg-orange-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/restaurant/${restaurant.id}/reservation`);
                      }}
                    >
                      Reservieren
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredRestaurants.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Keine Restaurants gefunden.</p>
              <p className="text-gray-500 mt-2">Versuchen Sie eine andere Suche oder Küche.</p>
            </div>
          )}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-gradient-to-r from-orange-100 to-red-100">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Restaurant-Betreiber?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Registrieren Sie Ihr Restaurant und erreichen Sie neue Kunden
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-orange-600 hover:bg-orange-700 px-8 py-3"
              onClick={() => navigate('/register-restaurant')}
            >
              Restaurant registrieren
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-orange-600 text-orange-600 hover:bg-orange-50 px-8 py-3"
              onClick={() => navigate('/restaurant-login')}
            >
              Restaurant Login
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <BottomNavigation cartItemCount={3} />
    </div>
  );
};

export default Index;
