
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  MapPin, 
  Clock, 
  User, 
  Phone, 
  Mail,
  ArrowLeft,
  Check,
  Truck,
  Store
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [orderType, setOrderType] = useState<"delivery" | "pickup">("delivery");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    zipCode: "",
    city: "",
    notes: ""
  });

  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: ""
  });

  // Mock order data
  const orderItems = [
    { name: "Pizza Margherita", quantity: 2, price: 12.50 },
    { name: "Spaghetti Carbonara", quantity: 1, price: 13.90 },
    { name: "Tiramisu", quantity: 1, price: 6.50 }
  ];

  const subtotal = 38.90;
  const deliveryFee = orderType === "delivery" ? 3.90 : 0;
  const discount = 3.89; // 10% discount
  const total = subtotal + deliveryFee - discount;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Bestellung erfolgreich!",
        description: `Ihre Bestellung wurde aufgegeben. Sie erhalten eine Bestätigungs-E-Mail.`,
      });
      navigate('/order-confirmation');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/cart')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zum Warenkorb
          </Button>
          <h1 className="text-3xl font-bold text-gray-800">Kasse</h1>
        </div>

        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Type Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>1.</span>
                    Lieferung oder Abholung?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup 
                    value={orderType} 
                    onValueChange={(value: "delivery" | "pickup") => setOrderType(value)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value="delivery" id="delivery" />
                      <Label htmlFor="delivery" className="flex items-center gap-2 cursor-pointer flex-1">
                        <Truck className="w-5 h-5 text-orange-600" />
                        <div>
                          <div className="font-medium">Lieferung</div>
                          <div className="text-sm text-gray-500">25-35 Minuten • €3.90</div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value="pickup" id="pickup" />
                      <Label htmlFor="pickup" className="flex items-center gap-2 cursor-pointer flex-1">
                        <Store className="w-5 h-5 text-orange-600" />
                        <div>
                          <div className="font-medium">Abholung</div>
                          <div className="text-sm text-gray-500">15-20 Minuten • Kostenlos</div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>2.</span>
                    Ihre Kontaktdaten
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Vorname</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="firstName"
                          placeholder="Max"
                          value={customerInfo.firstName}
                          onChange={(e) => setCustomerInfo({...customerInfo, firstName: e.target.value})}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nachname</Label>
                      <Input
                        id="lastName"
                        placeholder="Mustermann"
                        value={customerInfo.lastName}
                        onChange={(e) => setCustomerInfo({...customerInfo, lastName: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">E-Mail</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="max@example.com"
                          value={customerInfo.email}
                          onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+49 170 123 456"
                          value={customerInfo.phone}
                          onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {orderType === "delivery" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="address">Lieferadresse</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="address"
                            placeholder="Musterstraße 123"
                            value={customerInfo.address}
                            onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">PLZ</Label>
                          <Input
                            id="zipCode"
                            placeholder="80331"
                            value={customerInfo.zipCode}
                            onChange={(e) => setCustomerInfo({...customerInfo, zipCode: e.target.value})}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="city">Stadt</Label>
                          <Input
                            id="city"
                            placeholder="München"
                            value={customerInfo.city}
                            onChange={(e) => setCustomerInfo({...customerInfo, city: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="notes">Anmerkungen (optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Besondere Wünsche oder Anmerkungen..."
                      value={customerInfo.notes}
                      onChange={(e) => setCustomerInfo({...customerInfo, notes: e.target.value})}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>3.</span>
                    Bezahlmethode
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="card">Kreditkarte</TabsTrigger>
                      <TabsTrigger value="paypal">PayPal</TabsTrigger>
                      <TabsTrigger value="cash">Barzahlung</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="card" className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Kartennummer</Label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={cardInfo.cardNumber}
                            onChange={(e) => setCardInfo({...cardInfo, cardNumber: e.target.value})}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate">Ablaufdatum</Label>
                          <Input
                            id="expiryDate"
                            placeholder="MM/JJ"
                            value={cardInfo.expiryDate}
                            onChange={(e) => setCardInfo({...cardInfo, expiryDate: e.target.value})}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={cardInfo.cvv}
                            onChange={(e) => setCardInfo({...cardInfo, cvv: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cardholderName">Karteninhaber</Label>
                        <Input
                          id="cardholderName"
                          placeholder="Max Mustermann"
                          value={cardInfo.cardholderName}
                          onChange={(e) => setCardInfo({...cardInfo, cardholderName: e.target.value})}
                          required
                        />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="paypal" className="mt-4">
                      <div className="text-center py-8">
                        <div className="text-6xl mb-4">💳</div>
                        <p className="text-gray-600">Sie werden zu PayPal weitergeleitet, um die Zahlung abzuschließen.</p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="cash" className="mt-4">
                      <div className="text-center py-8 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="text-6xl mb-4">💰</div>
                        <p className="text-gray-700 font-medium">Barzahlung</p>
                        <p className="text-gray-600">
                          {orderType === "delivery" 
                            ? "Sie zahlen bei der Lieferung in bar." 
                            : "Sie zahlen bei der Abholung in bar."
                          }
                        </p>
                        <p className="text-sm text-gray-500 mt-2">Bitte halten Sie passend €{total.toFixed(2)} bereit.</p>
                      </div>
                    </TabsContent>
                  </Tabs>
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
                  {/* Restaurant Info */}
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                    <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                      B
                    </div>
                    <div>
                      <h3 className="font-bold">Bella Vista</h3>
                      <p className="text-sm text-gray-600">Italienisch • München Zentrum</p>
                    </div>
                  </div>

                  {/* Order Type & Time */}
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 font-medium mb-1">
                      {orderType === "delivery" ? (
                        <>
                          <Truck className="w-4 h-4" />
                          <span>Lieferung</span>
                        </>
                      ) : (
                        <>
                          <Store className="w-4 h-4" />
                          <span>Abholung</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{orderType === "delivery" ? "25-35 Minuten" : "15-20 Minuten"}</span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-2">
                    {orderItems.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.quantity}x {item.name}</span>
                        <span>€{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Price Breakdown */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Zwischensumme</span>
                      <span>€{subtotal.toFixed(2)}</span>
                    </div>
                    {orderType === "delivery" && (
                      <div className="flex justify-between">
                        <span>Lieferkosten</span>
                        <span>€{deliveryFee.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-green-600">
                      <span>Rabatt (WELCOME10)</span>
                      <span>-€{discount.toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Gesamt</span>
                    <span>€{total.toFixed(2)}</span>
                  </div>

                  <Button 
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 py-3 text-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Bestellung wird verarbeitet...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Check className="w-5 h-5" />
                        Jetzt bestellen (€{total.toFixed(2)})
                      </div>
                    )}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    Durch die Bestellung akzeptieren Sie unsere AGB und Datenschutzerklärung
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
