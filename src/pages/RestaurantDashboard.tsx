
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  Calendar, 
  ShoppingBag, 
  Users, 
  Plus, 
  Edit,
  Trash2,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RestaurantDashboard = () => {
  const { toast } = useToast();

  // Mock data
  const [orders] = useState([
    {
      id: "#12345",
      customer: "Max Mustermann",
      items: ["2x Pizza Margherita", "1x Spaghetti Carbonara"],
      total: 38.90,
      status: "preparing",
      time: "12:30",
      type: "delivery"
    },
    {
      id: "#12346",
      customer: "Anna Schmidt",
      items: ["1x Pizza Prosciutto", "1x Tiramisu"],
      total: 22.40,
      status: "ready",
      time: "12:15",
      type: "pickup"
    },
    {
      id: "#12347",
      customer: "Peter Weber",
      items: ["3x Bruschetta", "2x Penne Arrabbiata"],
      total: 48.30,
      status: "delivered",
      time: "11:45",
      type: "delivery"
    }
  ]);

  const [reservations] = useState([
    {
      id: "R001",
      customer: "Familie Müller",
      guests: 4,
      date: "Heute",
      time: "19:00",
      status: "confirmed",
      notes: "Geburtstag, Fensterplatz gewünscht"
    },
    {
      id: "R002",
      customer: "Lisa König",
      guests: 2,
      date: "Heute",
      time: "20:30",
      status: "confirmed",
      notes: "Glutenfrei"
    },
    {
      id: "R003",
      customer: "Herr Schulz",
      guests: 6,
      date: "Morgen",
      time: "18:00",
      status: "pending",
      notes: "Geschäftsessen"
    }
  ]);

  const [menuItems] = useState([
    {
      id: 1,
      name: "Pizza Margherita",
      category: "Pizza",
      price: 12.50,
      status: "active",
      orders: 45
    },
    {
      id: 2,
      name: "Spaghetti Carbonara",
      category: "Pasta",
      price: 13.90,
      status: "active",
      orders: 38
    },
    {
      id: 3,
      name: "Tiramisu",
      category: "Dessert",
      price: 6.50,
      status: "active",
      orders: 22
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "preparing": return "bg-yellow-100 text-yellow-800";
      case "ready": return "bg-blue-100 text-blue-800";
      case "delivered": return "bg-green-100 text-green-800";
      case "confirmed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "preparing": return <Clock className="w-4 h-4" />;
      case "ready": return <AlertCircle className="w-4 h-4" />;
      case "delivered": return <CheckCircle className="w-4 h-4" />;
      case "confirmed": return <CheckCircle className="w-4 h-4" />;
      case "pending": return <Clock className="w-4 h-4" />;
      default: return null;
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    toast({
      title: "Status aktualisiert",
      description: `Bestellung ${orderId} wurde auf "${newStatus}" gesetzt`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Restaurant Dashboard</h1>
              <p className="mt-1 text-gray-600">Bella Vista - Italienisches Restaurant</p>
            </div>
            <div className="mt-4 sm:mt-0 flex gap-3">
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Restaurant ansehen
              </Button>
              <Button className="bg-orange-500 hover:bg-orange-600">
                <Plus className="w-4 h-4 mr-2" />
                Neues Gericht
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Heutige Bestellungen</p>
                  <p className="text-3xl font-bold text-gray-900">24</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +12% seit gestern
                  </p>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <ShoppingBag className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Umsatz heute</p>
                  <p className="text-3xl font-bold text-gray-900">€642</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +8% seit gestern
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Reservierungen</p>
                  <p className="text-3xl font-bold text-gray-900">8</p>
                  <p className="text-sm text-gray-600 mt-1">Heute Abend</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Bewertung</p>
                  <p className="text-3xl font-bold text-gray-900">4.8</p>
                  <p className="text-sm text-gray-600 flex items-center mt-1">
                    <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                    245 Bewertungen
                  </p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Users className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="orders">Bestellungen</TabsTrigger>
            <TabsTrigger value="reservations">Reservierungen</TabsTrigger>
            <TabsTrigger value="menu">Speisekarte</TabsTrigger>
            <TabsTrigger value="analytics">Statistiken</TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Aktuelle Bestellungen</CardTitle>
                <CardDescription>Verwalten Sie eingehende Bestellungen</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-bold">{order.id}</span>
                          <Badge className={getStatusColor(order.status)}>
                            {getStatusIcon(order.status)}
                            <span className="ml-1 capitalize">{order.status}</span>
                          </Badge>
                          <Badge variant="outline">
                            {order.type === "delivery" ? "Lieferung" : "Abholung"}
                          </Badge>
                        </div>
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-sm text-gray-600">{order.items.join(", ")}</p>
                        <p className="text-sm text-gray-500">Bestellt um {order.time}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">€{order.total}</p>
                        <div className="flex gap-2 mt-2">
                          {order.status === "preparing" && (
                            <Button size="sm" onClick={() => updateOrderStatus(order.id, "ready")}>
                              Fertig
                            </Button>
                          )}
                          {order.status === "ready" && order.type === "delivery" && (
                            <Button size="sm" onClick={() => updateOrderStatus(order.id, "delivered")}>
                              Geliefert
                            </Button>
                          )}
                          {order.status === "ready" && order.type === "pickup" && (
                            <Button size="sm" onClick={() => updateOrderStatus(order.id, "completed")}>
                              Abgeholt
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reservations Tab */}
          <TabsContent value="reservations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Reservierungen</CardTitle>
                <CardDescription>Verwalten Sie Tischreservierungen</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reservations.map((reservation) => (
                    <div key={reservation.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-bold">{reservation.id}</span>
                          <Badge className={getStatusColor(reservation.status)}>
                            {getStatusIcon(reservation.status)}
                            <span className="ml-1 capitalize">{reservation.status}</span>
                          </Badge>
                        </div>
                        <p className="font-medium">{reservation.customer}</p>
                        <p className="text-sm text-gray-600">
                          {reservation.guests} Gäste • {reservation.date} um {reservation.time}
                        </p>
                        {reservation.notes && (
                          <p className="text-sm text-orange-600 italic">Notiz: {reservation.notes}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        {reservation.status === "pending" && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Bestätigen
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Menu Tab */}
          <TabsContent value="menu" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Speisekarte verwalten</CardTitle>
                    <CardDescription>Gerichte hinzufügen, bearbeiten oder entfernen</CardDescription>
                  </div>
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Neues Gericht
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {menuItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-medium">{item.name}</span>
                          <Badge variant="outline">{item.category}</Badge>
                          <Badge className="bg-green-100 text-green-800">Aktiv</Badge>
                        </div>
                        <p className="text-sm text-gray-600">{item.orders}x heute bestellt</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-lg">€{item.price}</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Beliebteste Gerichte</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {menuItems.map((item, index) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </span>
                          <span>{item.name}</span>
                        </div>
                        <span className="font-medium">{item.orders} Bestellungen</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Wöchentliche Übersicht</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Bestellungen diese Woche</span>
                        <span>156</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-600 h-2 rounded-full" style={{ width: "78%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Umsatz diese Woche</span>
                        <span>€3,247</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "65%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Reservierungen diese Woche</span>
                        <span>42</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "84%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RestaurantDashboard;
