import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Star, 
  Clock, 
  MapPin, 
  Phone, 
  Plus, 
  Minus,
  ShoppingCart,
  Calendar,
  Info,
  Heart,
  Share2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNavigation from "@/components/BottomNavigation";
import PaymentModal from "@/components/PaymentModal";

// Mock restaurant data
const mockRestaurant = {
  id: 1,
  name: "Bella Vista",
  cuisine: "Italienisch",
  rating: 4.8,
  reviewCount: 245,
  deliveryTime: "25-35 min",
  location: "München Zentrum",
  address: "Maximilianstraße 12, 80539 München",
  phone: "+49 89 987 654 321",
  image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=400&fit=crop",
  priceRange: "€€€",
  openingHours: "11:00 - 23:00",
  description: "Authentische italienische Küche im Herzen Münchens. Genießen Sie hausgemachte Pasta, knusprige Pizzen und erlesene Weine in gemütlicher Atmosphäre.",
  menu: [
    {
      category: "Vorspeisen",
      items: [
        {
          id: 1,
          name: "Bruschetta Klassik",
          description: "Geröstetes Brot mit Tomaten, Basilikum und Knoblauch",
          price: 8.50,
          image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=300&h=200&fit=crop"
        },
        {
          id: 2,
          name: "Antipasti Misti",
          description: "Auswahl italienischer Vorspeisen für 2 Personen",
          price: 16.90,
          image: "https://images.unsplash.com/photo-1544124499-58912cbddaad?w=300&h=200&fit=crop"
        }
      ]
    },
    {
      category: "Pizza",
      items: [
        {
          id: 3,
          name: "Pizza Margherita",
          description: "Tomatensauce, Mozzarella, frisches Basilikum",
          price: 12.50,
          image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop"
        },
        {
          id: 4,
          name: "Pizza Prosciutto",
          description: "Tomatensauce, Mozzarella, Prosciutto, Rucola",
          price: 15.90,
          image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=200&fit=crop"
        },
        {
          id: 5,
          name: "Pizza Quattro Stagioni",
          description: "Tomatensauce, Mozzarella, Champignons, Oliven, Artischocken, Schinken",
          price: 17.50,
          image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&h=200&fit=crop"
        }
      ]
    },
    {
      category: "Pasta",
      items: [
        {
          id: 6,
          name: "Spaghetti Carbonara",
          description: "Spaghetti mit Speck, Ei und Parmesan",
          price: 13.90,
          image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300&h=200&fit=crop"
        },
        {
          id: 7,
          name: "Penne Arrabbiata",
          description: "Penne mit scharfer Tomatensauce und Chili",
          price: 11.50,
          image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=300&h=200&fit=crop"
        }
      ]
    }
  ]
};

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const addToCart = (item: any) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });

    toast({
      title: "Zum Warenkorb hinzugefügt",
      description: `${item.name} wurde hinzugefügt`,
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart(prevCart => {
      return prevCart.reduce((acc, cartItem) => {
        if (cartItem.id === itemId) {
          if (cartItem.quantity > 1) {
            acc.push({ ...cartItem, quantity: cartItem.quantity - 1 });
          }
        } else {
          acc.push(cartItem);
        }
        return acc;
      }, [] as CartItem[]);
    });
  };

  const getItemQuantity = (itemId: number) => {
    const item = cart.find(cartItem => cartItem.id === itemId);
    return item ? item.quantity : 0;
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleReservation = () => {
    navigate(`/restaurant/${id}/reservation`);
  };

  const handleShare = () => {
    navigator.share({
      title: mockRestaurant.name,
      text: mockRestaurant.description,
      url: window.location.href,
    }).catch(() => {
      toast({
        title: "Link kopiert",
        description: "Restaurant-Link wurde in die Zwischenablage kopiert",
      });
    });
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Warenkorb leer",
        description: "Fügen Sie Artikel hinzu, bevor Sie zur Kasse gehen.",
        variant: "destructive"
      });
      return;
    }
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    setCart([]);
    toast({
      title: "Bestellung erfolgreich",
      description: "Ihre Bestellung wurde aufgegeben und wird bald zubereitet.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Restaurant Header */}
      <div className="relative">
        <img 
          src={mockRestaurant.image} 
          alt={mockRestaurant.name}
          className="w-full h-64 md:h-80 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        
        <div className="absolute bottom-0 left-0 right-0 text-white p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="text-3xl md:text-5xl font-bold mb-2">{mockRestaurant.name}</h1>
                <p className="text-lg md:text-xl mb-2">{mockRestaurant.cuisine}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{mockRestaurant.rating} ({mockRestaurant.reviewCount} Bewertungen)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{mockRestaurant.deliveryTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{mockRestaurant.location}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4 md:mt-0">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white bg-opacity-20 backdrop-blur-sm border-white text-white hover:bg-white hover:text-gray-900"
                  onClick={() => setIsFavorited(!isFavorited)}
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white bg-opacity-20 backdrop-blur-sm border-white text-white hover:bg-white hover:text-gray-900"
                  onClick={handleShare}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 pb-20 md:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="menu" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="menu">Speisekarte</TabsTrigger>
                <TabsTrigger value="info">Info</TabsTrigger>
                <TabsTrigger value="reviews">Bewertungen</TabsTrigger>
              </TabsList>
              
              <TabsContent value="menu" className="space-y-6">
                {mockRestaurant.menu.map((category) => (
                  <div key={category.category}>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">{category.category}</h3>
                    <div className="grid gap-4">
                      {category.items.map((item) => (
                        <Card key={item.id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="w-20 h-20 rounded-lg object-cover"
                              />
                              <div className="flex-1">
                                <h4 className="font-bold text-lg mb-1">{item.name}</h4>
                                <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                                <div className="flex items-center justify-between">
                                  <span className="text-lg font-bold text-orange-600">€{item.price.toFixed(2)}</span>
                                  <div className="flex items-center gap-2">
                                    {getItemQuantity(item.id) > 0 && (
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => removeFromCart(item.id)}
                                        className="w-8 h-8 p-0"
                                      >
                                        <Minus className="w-4 h-4" />
                                      </Button>
                                    )}
                                    {getItemQuantity(item.id) > 0 && (
                                      <span className="w-8 text-center font-bold">
                                        {getItemQuantity(item.id)}
                                      </span>
                                    )}
                                    <Button
                                      size="sm"
                                      onClick={() => addToCart(item)}
                                      className="w-8 h-8 p-0 bg-orange-500 hover:bg-orange-600"
                                    >
                                      <Plus className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="info" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Info className="w-5 h-5" />
                      Restaurant Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">{mockRestaurant.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-bold mb-2">Kontakt</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span>{mockRestaurant.address}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span>{mockRestaurant.phone}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-bold mb-2">Öffnungszeiten</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Montag - Sonntag:</span>
                            <span>{mockRestaurant.openingHours}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <CardTitle>Bewertungen</CardTitle>
                    <CardDescription>Was unsere Gäste sagen</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((review) => (
                        <div key={review} className="border-b pb-4 last:border-b-0">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <span className="font-bold">Max M.</span>
                            <span className="text-sm text-gray-500">vor 2 Tagen</span>
                          </div>
                          <p className="text-gray-700">Fantastisches Essen und sehr freundlicher Service. Die Pizza war perfekt und der Wein ausgezeichnet. Komme gerne wieder!</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Schnellaktionen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full bg-orange-500 hover:bg-orange-600"
                  onClick={handleReservation}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Tisch reservieren
                </Button>
                <Button variant="outline" className="w-full">
                  <Phone className="w-4 h-4 mr-2" />
                  Anrufen
                </Button>
              </CardContent>
            </Card>

            {/* Cart */}
            {cart.length > 0 && (
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Warenkorb ({getTotalItems()})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-sm">
                        <span>{item.quantity}x {item.name}</span>
                        <span>€{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center font-bold mb-3">
                      <span>Gesamt:</span>
                      <span>€{getTotalPrice().toFixed(2)}</span>
                    </div>
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={handleCheckout}
                    >
                      Zur Kasse
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <PaymentModal
        open={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        total={getTotalPrice()}
        onPaymentSuccess={handlePaymentSuccess}
      />

      <Footer />
      <BottomNavigation cartItemCount={getTotalItems()} />
    </div>
  );
};

export default RestaurantDetail;
