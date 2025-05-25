
import { Home, Search, ShoppingCart, User, Calendar } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BottomNavigationProps {
  cartItemCount?: number;
}

const BottomNavigation = ({ cartItemCount = 0 }: BottomNavigationProps) => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Start", path: "/" },
    { icon: Search, label: "Suchen", path: "/search" },
    { icon: Calendar, label: "Reservierung", path: "/reservations" },
    { icon: ShoppingCart, label: "Warenkorb", path: "/cart" },
    { icon: User, label: "Profil", path: "/auth" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50 md:hidden">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link key={item.path} to={item.path}>
              <Button
                variant="ghost"
                size="sm"
                className={`flex flex-col items-center p-2 h-auto ${
                  isActive ? "text-orange-600" : "text-gray-600"
                }`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 ${isActive ? "text-orange-600" : "text-gray-600"}`} />
                  {item.path === "/cart" && cartItemCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 min-w-[1.25rem] h-5 flex items-center justify-center text-xs">
                      {cartItemCount}
                    </Badge>
                  )}
                </div>
                <span className={`text-xs mt-1 ${isActive ? "text-orange-600" : "text-gray-600"}`}>
                  {item.label}
                </span>
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
