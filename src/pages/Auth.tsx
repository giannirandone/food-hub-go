
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ChefHat, User, Mail, Lock, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<"customer" | "restaurant">("customer");
  const navigate = useNavigate();
  const { toast } = useToast();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });

  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    restaurantName: "",
    restaurantAddress: "",
    cuisine: "",
    agreeToTerms: false
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Anmeldung erfolgreich",
        description: `Willkommen zurück! Sie werden weitergeleitet...`,
      });
      
      // Redirect based on user type
      if (userType === "restaurant") {
        navigate('/restaurant-dashboard');
      } else {
        navigate('/');
      }
    }, 1500);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerForm.password !== registerForm.confirmPassword) {
      toast({
        title: "Fehler",
        description: "Passwörter stimmen nicht überein",
        variant: "destructive"
      });
      return;
    }

    if (!registerForm.agreeToTerms) {
      toast({
        title: "Fehler",
        description: "Bitte akzeptieren Sie die AGB",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Registrierung erfolgreich",
        description: `Ihr ${userType === "restaurant" ? "Restaurant-" : ""}Konto wurde erstellt!`,
      });
      
      // Redirect based on user type
      if (userType === "restaurant") {
        navigate('/restaurant-dashboard');
      } else {
        navigate('/');
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 text-3xl font-bold text-orange-600 mb-2">
            <ChefHat className="w-10 h-10" />
            <span>FoodHub</span>
          </div>
          <p className="text-gray-600">Willkommen bei Münchens Food-Plattform</p>
        </div>

        <Card className="shadow-xl border-0">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Anmelden</TabsTrigger>
              <TabsTrigger value="register">Registrieren</TabsTrigger>
            </TabsList>
            
            {/* Login Tab */}
            <TabsContent value="login">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Anmelden</CardTitle>
                <CardDescription className="text-center">
                  Melden Sie sich bei Ihrem Konto an
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  {/* User Type Selection */}
                  <div className="space-y-2">
                    <Label>Ich bin...</Label>
                    <Select value={userType} onValueChange={(value: "customer" | "restaurant") => setUserType(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="customer">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>Kunde</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="restaurant">
                          <div className="flex items-center gap-2">
                            <ChefHat className="w-4 h-4" />
                            <span>Restaurant-Betreiber</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-email">E-Mail</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="ihre@email.de"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Passwort</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={isLoading}>
                    {isLoading ? "Anmelden..." : "Anmelden"}
                  </Button>

                  <div className="text-center">
                    <Button variant="link" className="text-orange-600 hover:text-orange-700">
                      Passwort vergessen?
                    </Button>
                  </div>
                </form>
              </CardContent>
            </TabsContent>

            {/* Register Tab */}
            <TabsContent value="register">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Registrieren</CardTitle>
                <CardDescription className="text-center">
                  Erstellen Sie Ihr kostenloses Konto
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  {/* User Type Selection */}
                  <div className="space-y-2">
                    <Label>Ich möchte mich registrieren als...</Label>
                    <Select value={userType} onValueChange={(value: "customer" | "restaurant") => setUserType(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="customer">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>Kunde</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="restaurant">
                          <div className="flex items-center gap-2">
                            <ChefHat className="w-4 h-4" />
                            <span>Restaurant-Betreiber</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {userType === "customer" ? (
                    // Customer Registration Fields
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Vorname</Label>
                          <Input
                            id="firstName"
                            placeholder="Max"
                            value={registerForm.firstName}
                            onChange={(e) => setRegisterForm({...registerForm, firstName: e.target.value})}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Nachname</Label>
                          <Input
                            id="lastName"
                            placeholder="Mustermann"
                            value={registerForm.lastName}
                            onChange={(e) => setRegisterForm({...registerForm, lastName: e.target.value})}
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
                            placeholder="+49 170 123 456 789"
                            value={registerForm.phone}
                            onChange={(e) => setRegisterForm({...registerForm, phone: e.target.value})}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Adresse</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="address"
                            placeholder="Musterstraße 123, 80331 München"
                            value={registerForm.address}
                            onChange={(e) => setRegisterForm({...registerForm, address: e.target.value})}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    // Restaurant Registration Fields
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="restaurantName">Restaurant Name</Label>
                        <Input
                          id="restaurantName"
                          placeholder="Bella Vista"
                          value={registerForm.restaurantName}
                          onChange={(e) => setRegisterForm({...registerForm, restaurantName: e.target.value})}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cuisine">Küche</Label>
                        <Select value={registerForm.cuisine} onValueChange={(value) => setRegisterForm({...registerForm, cuisine: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Küche auswählen" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="italian">Italienisch</SelectItem>
                            <SelectItem value="japanese">Japanisch</SelectItem>
                            <SelectItem value="american">Amerikanisch</SelectItem>
                            <SelectItem value="indian">Indisch</SelectItem>
                            <SelectItem value="german">Deutsch</SelectItem>
                            <SelectItem value="french">Französisch</SelectItem>
                            <SelectItem value="other">Sonstige</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="restaurantAddress">Restaurant Adresse</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="restaurantAddress"
                            placeholder="Musterstraße 123, 80331 München"
                            value={registerForm.restaurantAddress}
                            onChange={(e) => setRegisterForm({...registerForm, restaurantAddress: e.target.value})}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email">E-Mail</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="ihre@email.de"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Passwort</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Passwort bestätigen</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={registerForm.confirmPassword}
                        onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="terms" 
                      checked={registerForm.agreeToTerms}
                      onCheckedChange={(checked) => setRegisterForm({...registerForm, agreeToTerms: checked as boolean})}
                    />
                    <Label htmlFor="terms" className="text-sm">
                      Ich akzeptiere die <Button variant="link" className="p-0 h-auto text-orange-600">AGB</Button> und <Button variant="link" className="p-0 h-auto text-orange-600">Datenschutzerklärung</Button>
                    </Label>
                  </div>

                  <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={isLoading}>
                    {isLoading ? "Registrieren..." : "Konto erstellen"}
                  </Button>
                </form>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>

        <div className="text-center mt-6">
          <Button variant="link" onClick={() => navigate('/')} className="text-gray-600 hover:text-orange-600">
            ← Zurück zur Startseite
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
