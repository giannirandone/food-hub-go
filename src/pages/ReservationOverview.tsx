
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, MapPin, Phone, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import BottomNavigation from "@/components/BottomNavigation";

const mockReservations = [
  {
    id: 1,
    restaurantName: "Bella Vista",
    restaurantImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&h=200&fit=crop",
    date: "2024-01-15",
    time: "19:30",
    guests: 4,
    status: "confirmed",
    address: "Maximilianstraße 12, 80539 München",
    phone: "+49 89 987 654 321",
    rating: 4.8,
    reservationNumber: "BV-2024-001"
  },
  {
    id: 2,
    restaurantName: "Sakura Sushi",
    restaurantImage: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300&h=200&fit=crop",
    date: "2024-01-20",
    time: "20:00",
    guests: 2,
    status: "pending",
    address: "Leopoldstraße 45, 80802 München",
    phone: "+49 89 123 456 789",
    rating: 4.9,
    reservationNumber: "SS-2024-002"
  }
];

const ReservationOverview = () => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed": return "Bestätigt";
      case "pending": return "Ausstehend";
      case "cancelled": return "Storniert";
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-6 pb-20 md:pb-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Meine Reservierungen</h1>
          
          {/* Tab Navigation */}
          <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
            <Button
              variant={activeTab === "upcoming" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("upcoming")}
              className="rounded-md"
            >
              Kommende
            </Button>
            <Button
              variant={activeTab === "past" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("past")}
              className="rounded-md"
            >
              Vergangene
            </Button>
          </div>
        </div>

        {/* Reservations List */}
        <div className="space-y-4">
          {mockReservations.map(reservation => (
            <Card key={reservation.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  {/* Restaurant Image */}
                  <div className="w-full md:w-48 h-32 md:h-auto">
                    <img 
                      src={reservation.restaurantImage} 
                      alt={reservation.restaurantName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Reservation Details */}
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{reservation.restaurantName}</h3>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{reservation.rating}</span>
                        </div>
                      </div>
                      <Badge className={getStatusColor(reservation.status)}>
                        {getStatusText(reservation.status)}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(reservation.date)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{reservation.time} Uhr</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>{reservation.guests} Person{reservation.guests !== 1 ? 'en' : ''}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-start gap-2 text-gray-600">
                          <MapPin className="w-4 h-4 mt-0.5" />
                          <span className="text-sm">{reservation.address}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span className="text-sm">{reservation.phone}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 justify-between items-start sm:items-center">
                      <span className="text-sm text-gray-500">
                        Reservierung: {reservation.reservationNumber}
                      </span>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/restaurant/${reservation.id}`)}
                        >
                          Restaurant ansehen
                        </Button>
                        {reservation.status === "confirmed" && (
                          <Button 
                            size="sm"
                            onClick={() => navigate(`/restaurant/${reservation.id}/reservation`)}
                          >
                            Ändern
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {mockReservations.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Keine Reservierungen gefunden
              </h3>
              <p className="text-gray-600 mb-6">
                Sie haben noch keine Reservierungen. Entdecken Sie unsere Restaurants!
              </p>
              <Button onClick={() => navigate("/")}>
                Restaurants entdecken
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ReservationOverview;
