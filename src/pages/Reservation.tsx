
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  User, 
  Mail, 
  Phone,
  ArrowLeft,
  Check,
  MapPin,
  Star
} from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Reservation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [partySize, setPartySize] = useState("");

  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: ""
  });

  // Mock restaurant data
  const restaurant = {
    name: "Bella Vista",
    address: "Maximilianstraße 12, 80539 München",
    phone: "+49 89 987 654 321",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=200&fit=crop"
  };

  // Available time slots
  const timeSlots = [
    "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", 
    "20:00", "20:30", "21:00", "21:30", "22:00"
  ];

  const partySizes = Array.from({ length: 10 }, (_, i) => (i + 1).toString());

  const handleSubmitReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !partySize) {
      toast({
        title: "Unvollständige Angaben",
        description: "Bitte füllen Sie alle Pflichtfelder aus",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Reservierung erfolgreich!",
        description: `Ihr Tisch für ${partySize} Person${partySize !== "1" ? "en" : ""} wurde reserviert.`,
      });
      navigate('/reservation-confirmation');
    }, 2000);
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate(`/restaurant/${id}`)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück
          </Button>
          <h1 className="text-3xl font-bold text-gray-800">Tisch reservieren</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reservation Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmitReservation} className="space-y-6">
              {/* Date & Time Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>1.</span>
                    Datum und Uhrzeit wählen
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Date Picker */}
                    <div className="space-y-2">
                      <Label>Datum</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? (
                              format(selectedDate, "PPP", { locale: de })
                            ) : (
                              <span>Datum auswählen</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={isDateDisabled}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Party Size */}
                    <div className="space-y-2">
                      <Label>Personenanzahl</Label>
                      <Select value={partySize} onValueChange={setPartySize}>
                        <SelectTrigger>
                          <SelectValue placeholder="Personen auswählen" />
                        </SelectTrigger>
                        <SelectContent>
                          {partySizes.map((size) => (
                            <SelectItem key={size} value={size}>
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                {size} Person{size !== "1" ? "en" : ""}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Time Slots */}
                  {selectedDate && (
                    <div className="space-y-2">
                      <Label>Uhrzeit</Label>
                      <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                        {timeSlots.map((time) => (
                          <Button
                            key={time}
                            type="button"
                            variant={selectedTime === time ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedTime(time)}
                            className={selectedTime === time ? "bg-orange-500 hover:bg-orange-600" : ""}
                          >
                            <Clock className="w-3 h-3 mr-1" />
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
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
                      <Label htmlFor="firstName">Vorname *</Label>
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
                      <Label htmlFor="lastName">Nachname *</Label>
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
                      <Label htmlFor="email">E-Mail *</Label>
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
                      <Label htmlFor="phone">Telefon *</Label>
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

                  <div className="space-y-2">
                    <Label htmlFor="notes">Besondere Wünsche (optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Allergien, Geburtstag, Fensterplatz..."
                      value={customerInfo.notes}
                      onChange={(e) => setCustomerInfo({...customerInfo, notes: e.target.value})}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Card>
                <CardContent className="pt-6">
                  <Button 
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 py-3 text-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Reservierung wird geprüft...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Check className="w-5 h-5" />
                        Jetzt reservieren
                      </div>
                    )}
                  </Button>
                  <p className="text-xs text-gray-500 text-center mt-3">
                    Durch die Reservierung akzeptieren Sie unsere AGB
                  </p>
                </CardContent>
              </Card>
            </form>
          </div>

          {/* Restaurant Info Sidebar */}
          <div className="space-y-4">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Restaurant Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Restaurant Image */}
                <img 
                  src={restaurant.image} 
                  alt={restaurant.name}
                  className="w-full h-32 object-cover rounded-lg"
                />

                {/* Restaurant Info */}
                <div>
                  <h3 className="font-bold text-lg">{restaurant.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{restaurant.rating}</span>
                    <span className="text-sm text-gray-500">Italienisch</span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-0.5" />
                      <span>{restaurant.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{restaurant.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Reservation Summary */}
                {(selectedDate || selectedTime || partySize) && (
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-bold mb-2">Ihre Reservierung</h4>
                    <div className="space-y-1 text-sm">
                      {selectedDate && (
                        <div>📅 {format(selectedDate, "PPP", { locale: de })}</div>
                      )}
                      {selectedTime && (
                        <div>🕐 {selectedTime} Uhr</div>
                      )}
                      {partySize && (
                        <div>👥 {partySize} Person{partySize !== "1" ? "en" : ""}</div>
                      )}
                    </div>
                  </div>
                )}

                {/* Restaurant Policies */}
                <div className="text-xs text-gray-500 space-y-1">
                  <p>• Reservierungen sind kostenlos stornierbar bis 2 Stunden vor dem Termin</p>
                  <p>• Bei Verspätung über 15 Minuten kann der Tisch anderweitig vergeben werden</p>
                  <p>• Große Gruppen (ab 8 Personen) bitte telefonisch reservieren</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Reservation;
