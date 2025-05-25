
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus, Trash2, ShoppingCart, ArrowLeft, Truck, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  restaurant: string;
}

const Cart = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock cart data
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Pizza Margherita",
      price: 12.50,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop",
      restaurant: "Bella Vista"
    },
    {
      id: 2,
      name: "Spaghetti Carbonara",
      price: 13.90,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300&h=200&fit=crop",
      restaurant: "Bella Vista"
    },
    {
      id: 3,
      name: "Tiramisu",
      price: 6.50,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&h=200&fit=crop",
      restaurant: "Bella Vista"
    }
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
    toast({
      title: "Artikel entfernt",
      description: "Der Artikel wurde aus dem Warenkorb entfernt",
    });
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "welcome10") {
      setAppliedPromo("WELCOME10");
      toast({
        title: "Gutschein angewendet",
        description: "10% Rabatt auf Ihre Bestellung!",
      });
    } else {
      toast({
        title: "Ungültiger Gutschein",
        description: "Bitte überprüfen Sie Ihren Gutscheincode",
        variant: "destructive"
      });
    }
    setPromoCode("");
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 3.90;
  const discount = appliedPromo === "WELCOME10" ? subtotal * 0.1 : 0;
  const total = subtotal + deliveryFee - discount;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Warenkorb leer",
        description: "Fügen Sie Artikel hinzu, um fortzufahren",
        variant: "destructive"
      });
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück
          </Button>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <ShoppingCart className="w-8 h-8 text-orange-600" />
            Warenkorb
          </h1>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <Card className="text-center py-12">
            <CardContent>
              <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-600 mb-2">Ihr Warenkorb ist leer</h2>
              <p className="text-gray-500 mb-6">Entdecken Sie unsere Restaurants und fügen Sie köstliche Gerichte hinzu!</p>
              <Button 
                onClick={() => navigate('/')}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Restaurants entdecken
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Ihre Bestellung ({cartItems.length} Artikel)</span>
                    <Badge variant="outline" className="text-orange-600 border-orange-600">
                      {cartItems[0]?.restaurant}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div key={item.id}>
                      <div className="flex gap-4 items-center">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold text-lg">{item.name}</h3>
                          <p className="text-orange-600 font-bold">€{item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center font-bold">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => removeItem(item.id)}
                            className="w-8 h-8 p-0 ml-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      {index < cartItems.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Promo Code */}
              <Card>
                <CardHeader>
                  <CardTitle>Gutscheincode</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Gutscheincode eingeben"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      onClick={applyPromoCode}
                      variant="outline"
                      disabled={!promoCode.trim()}
                    >
                      Anwenden
                    </Button>
                  </div>
                  {appliedPromo && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-700 font-medium">
                        ✓ Gutschein "{appliedPromo}" angewendet - 10% Rabatt
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-4">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Bestellübersicht</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Delivery Info */}
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center gap-2 text-orange-700 font-medium mb-1">
                      <Truck className="w-4 h-4" />
                      <span>Lieferung</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-orange-600">
                      <Clock className="w-4 h-4" />
                      <span>25-35 Minuten</span>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Zwischensumme</span>
                      <span>€{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lieferkosten</span>
                      <span>€{deliveryFee.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Rabatt (WELCOME10)</span>
                        <span>-€{discount.toFixed(2)}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Gesamt</span>
                      <span>€{total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button 
                    onClick={handleCheckout}
                    className="w-full bg-orange-500 hover:bg-orange-600 py-3 text-lg"
                  >
                    Zur Kasse (€{total.toFixed(2)})
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    Durch die Bestellung akzeptieren Sie unsere AGB
                  </p>
                </CardContent>
              </Card>

              {/* Quick Add */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Beliebte Extras</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-between text-sm">
                    <span>Coca Cola 0,33l</span>
                    <span>€2.50</span>
                  </Button>
                  <Button variant="outline" className="w-full justify-between text-sm">
                    <span>Garlic Bread</span>
                    <span>€4.90</span>
                  </Button>
                  <Button variant="outline" className="w-full justify-between text-sm">
                    <span>Tiramisu</span>
                    <span>€6.50</span>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
