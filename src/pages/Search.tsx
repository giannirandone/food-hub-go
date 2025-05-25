
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Star, Clock, MapPin, Filter, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import BottomNavigation from "@/components/BottomNavigation";

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
    deliveryFee: 2.99,
    minOrder: 15.00
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
    deliveryFee: 3.99,
    minOrder: 20.00
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
    deliveryFee: 1.99,
    minOrder: 12.00
  },
];

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([1, 4]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("rating");
  const navigate = useNavigate();

  const cuisines = ["Italienisch", "Japanisch", "Amerikanisch", "Indisch", "Deutsch", "Französisch"];

  const toggleCuisine = (cuisine: string) => {
    setSelectedCuisines(prev => 
      prev.includes(cuisine) 
        ? prev.filter(c => c !== cuisine)
        : [...prev, cuisine]
    );
  };

  const filteredRestaurants = mockRestaurants
    .filter(restaurant => {
      const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCuisine = selectedCuisines.length === 0 || selectedCuisines.includes(restaurant.cuisine);
      const priceLevel = restaurant.priceRange.length;
      const matchesPrice = priceLevel >= priceRange[0] && priceLevel <= priceRange[1];
      
      return matchesSearch && matchesCuisine && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "deliveryTime") return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
      if (sortBy === "deliveryFee") return a.deliveryFee - b.deliveryFee;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-6 pb-20 md:pb-6">
        {/* Search Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Restaurants suchen</h1>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <Input
              type="text"
              placeholder="Restaurant oder Küche suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-4 pr-12 h-12 text-lg"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-5 h-5" />
            </Button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <Card className="mb-4">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Filter</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Cuisine Filter */}
                <div>
                  <h3 className="font-medium mb-3">Küche</h3>
                  <div className="flex flex-wrap gap-2">
                    {cuisines.map(cuisine => (
                      <Button
                        key={cuisine}
                        variant={selectedCuisines.includes(cuisine) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleCuisine(cuisine)}
                        className="text-sm"
                      >
                        {cuisine}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-medium mb-3">Preisbereich</h3>
                  <div className="px-3">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={4}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                      <span>€</span>
                      <span>€€€€</span>
                    </div>
                  </div>
                </div>

                {/* Sort Options */}
                <div>
                  <h3 className="font-medium mb-3">Sortieren nach</h3>
                  <div className="flex gap-2">
                    {[
                      { key: "rating", label: "Bewertung" },
                      { key: "deliveryTime", label: "Lieferzeit" },
                      { key: "deliveryFee", label: "Lieferkosten" }
                    ].map(option => (
                      <Button
                        key={option.key}
                        variant={sortBy === option.key ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSortBy(option.key)}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">
              {filteredRestaurants.length} Restaurant{filteredRestaurants.length !== 1 ? 's' : ''} gefunden
            </h2>
            {(selectedCuisines.length > 0 || searchTerm) && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setSelectedCuisines([]);
                  setSearchTerm("");
                  setPriceRange([1, 4]);
                }}
              >
                Filter zurücksetzen
              </Button>
            )}
          </div>

          {filteredRestaurants.map(restaurant => (
            <Card 
              key={restaurant.id}
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(`/restaurant/${restaurant.id}`)}
            >
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">{restaurant.name}</h3>
                      <Badge>{restaurant.priceRange}</Badge>
                    </div>
                    <p className="text-orange-600 font-medium mb-2">{restaurant.cuisine}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{restaurant.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{restaurant.deliveryTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{restaurant.location}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-2 text-sm">
                      <span className="text-gray-600">
                        Mindestbestellung: €{restaurant.minOrder.toFixed(2)}
                      </span>
                      <span className="text-green-600 font-medium">
                        Lieferung: €{restaurant.deliveryFee.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Search;
