
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Smartphone, DollarSign, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  total: number;
  onPaymentSuccess: () => void;
}

const PaymentModal = ({ open, onClose, total, onPaymentSuccess }: PaymentModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const paymentMethods = [
    {
      id: "stripe",
      name: "Kreditkarte",
      icon: CreditCard,
      description: "Visa, Mastercard, American Express"
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: DollarSign,
      description: "Bezahlen Sie sicher mit PayPal"
    },
    {
      id: "apple_pay",
      name: "Apple Pay",
      icon: Smartphone,
      description: "Schnell und sicher mit Touch ID"
    }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Zahlung erfolgreich",
      description: `€${total.toFixed(2)} wurden erfolgreich bezahlt.`,
    });
    
    setIsProcessing(false);
    onPaymentSuccess();
    onClose();
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + (v.length > 2 ? "/" + v.substring(2, 4) : "");
    }
    return v;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-green-600" />
            Sichere Zahlung
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Payment Method Selection */}
          <div>
            <Label className="text-base font-medium mb-3 block">Zahlungsmethode wählen</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <div key={method.id} className="flex items-center space-x-3">
                    <RadioGroupItem value={method.id} id={method.id} />
                    <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                      <Card className="p-3 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-gray-600" />
                          <div>
                            <div className="font-medium">{method.name}</div>
                            <div className="text-sm text-gray-500">{method.description}</div>
                          </div>
                        </div>
                      </Card>
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>

          {/* Credit Card Form */}
          {paymentMethod === "stripe" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="cardholderName">Karteninhaber Name</Label>
                <Input
                  id="cardholderName"
                  placeholder="Max Mustermann"
                  value={cardData.cardholderName}
                  onChange={(e) => setCardData(prev => ({ ...prev, cardholderName: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="cardNumber">Kartennummer</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardData.cardNumber}
                  onChange={(e) => setCardData(prev => ({ ...prev, cardNumber: formatCardNumber(e.target.value) }))}
                  maxLength={19}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate">Ablaufdatum</Label>
                  <Input
                    id="expiryDate"
                    placeholder="MM/YY"
                    value={cardData.expiryDate}
                    onChange={(e) => setCardData(prev => ({ ...prev, expiryDate: formatExpiryDate(e.target.value) }))}
                    maxLength={5}
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={cardData.cvv}
                    onChange={(e) => setCardData(prev => ({ ...prev, cvv: e.target.value.replace(/[^0-9]/g, "") }))}
                    maxLength={4}
                  />
                </div>
              </div>
            </div>
          )}

          {/* PayPal Info */}
          {paymentMethod === "paypal" && (
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="text-center">
                <DollarSign className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-700">
                  Sie werden zu PayPal weitergeleitet, um die Zahlung abzuschließen.
                </p>
              </div>
            </Card>
          )}

          {/* Apple Pay Info */}
          {paymentMethod === "apple_pay" && (
            <Card className="p-4 bg-gray-50 border-gray-200">
              <div className="text-center">
                <Smartphone className="w-12 h-12 text-gray-600 mx-auto mb-2" />
                <p className="text-sm text-gray-700">
                  Verwenden Sie Touch ID oder Face ID für eine schnelle und sichere Zahlung.
                </p>
              </div>
            </Card>
          )}

          {/* Total and Pay Button */}
          <div className="space-y-4">
            <div className="flex justify-between items-center text-lg font-bold border-t pt-4">
              <span>Gesamtbetrag:</span>
              <span>€{total.toFixed(2)}</span>
            </div>
            
            <Button 
              className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg"
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? "Zahlung wird verarbeitet..." : `€${total.toFixed(2)} bezahlen`}
            </Button>
            
            <p className="text-xs text-gray-500 text-center">
              Ihre Zahlung wird sicher verschlüsselt übertragen. 
              Mit dem Klick auf "Bezahlen" akzeptieren Sie unsere AGB.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
