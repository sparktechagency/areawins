"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { CheckCircle2, Copy, ExternalLink, QrCode, Smartphone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ─── 1. CARD FORM (STRIPE / VISA) ───────────────────────────────────────────────
export const CardPaymentForm = ({ onSubmit, isLoading }: { onSubmit: () => void, isLoading: boolean }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-muted-foreground text-xs uppercase font-bold tracking-wider">Full name</Label>
          <Input placeholder="Md Rakib Ali" className="bg-background/50 border-white/10 h-11" />
        </div>
        
        <div className="space-y-2">
          <Label className="text-muted-foreground text-xs uppercase font-bold tracking-wider">Country or region</Label>
          <Select defaultValue="venezuela">
            <SelectTrigger className="bg-background/50 border-white/10 h-11">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="venezuela">Venezuela</SelectItem>
              <SelectItem value="usa">United States</SelectItem>
              <SelectItem value="spain">Spain</SelectItem>
              <SelectItem value="bangladesh">Bangladesh</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-muted-foreground text-xs uppercase font-bold tracking-wider">Card number</Label>
          <div className="relative">
            <Input placeholder="1234 1234 1234 1234" className="bg-background/50 border-white/10 h-11 pr-32" />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1 items-center grayscale opacity-70">
               <span className="text-[10px] font-bold border rounded px-1">VISA</span>
               <span className="text-[10px] font-bold border rounded px-1">MC</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-muted-foreground text-xs uppercase font-bold tracking-wider">Expiration date</Label>
            <Input placeholder="MM / YY" className="bg-background/50 border-white/10 h-11" />
          </div>
          <div className="space-y-2">
            <Label className="text-muted-foreground text-xs uppercase font-bold tracking-wider">Security code</Label>
            <Input placeholder="CVC" className="bg-background/50 border-white/10 h-11" />
          </div>
        </div>

        <div className="flex items-start gap-3 pt-2">
           <Checkbox id="terms" className="mt-1" />
           <Label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
              I agree to the terms and authorize the charge for this deposit.
           </Label>
        </div>
      </div>

      <Button onClick={onSubmit} className="w-full h-12 text-lg font-bold" disabled={isLoading}>
        {isLoading ? "Processing..." : "Subscribe & Deposit"}
      </Button>
    </div>
  );
};

// ─── 2. CRYPTO VIEW (BY NOWPAYMENTS/MANUAL) ──────────────────────────────────────
export const CryptoPaymentView = ({ data }: { data: any }) => {
  const [copied, setCopied] = useState(false);
  const address = data?.address || "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    toast.success("Address copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-300">
      <div className="text-center space-y-2">
         <div className="bg-primary/20 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-primary/30">
            <QrCode className="w-16 h-16 text-primary" />
         </div>
         <h3 className="text-xl font-bold">Pay with Crypto</h3>
         <p className="text-muted-foreground text-sm">Send the exact amount to the address below</p>
      </div>

      <div className="space-y-4">
         <div className="p-4 bg-background border border-white/10 rounded-xl relative group">
            <p className="text-[10px] text-muted-foreground uppercase font-bold mb-2">USDT (ERC20) Address</p>
            <p className="text-sm font-mono break-all pr-12">{address}</p>
            <Button 
               variant="ghost" 
               size="icon" 
               className="absolute right-2 bottom-2 hover:bg-primary/20"
               onClick={handleCopy}
            >
               {copied ? <CheckCircle2 className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
            </Button>
         </div>

         <div className="flex items-center justify-between p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
            <div className="flex items-center gap-3">
               <div className="p-2 rounded-full bg-amber-500/20">
                  <Clock className="w-4 h-4 text-amber-500" />
               </div>
               <p className="text-xs font-bold text-amber-500">Awaiting confirmation...</p>
            </div>
            <p className="text-[10px] text-muted-foreground">Est. 5-15 mins</p>
         </div>
      </div>

      <Button variant="outline" className="w-full gap-2" onClick={() => window.open(data?.invoiceUrl, '_blank')}>
         Open in Wallet App <ExternalLink className="w-4 h-4" />
      </Button>
    </div>
  );
};

// ─── 3. LOCAL PAYMENT VIEW (PAGO MOVIL / BANK) ──────────────────────────────
export const LocalPaymentView = ({ data, method, onFileSelect, file, onExternalRefChange, externalRef, onSubmit, isLoading }: any) => {
  const isPagoMovil = method === "pago_movil";

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
      <div className="bg-primary/10 border border-primary/20 p-6 rounded-2xl space-y-4">
         <div className="flex items-center gap-4 border-b border-white/5 pb-4">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
               {isPagoMovil ? <Smartphone className="w-6 h-6" /> : <Building className="w-6 h-6" />}
            </div>
            <div>
               <h4 className="font-bold text-lg">{isPagoMovil ? "Pago Móvil (Venezuela)" : "Transferencia Bancaria"}</h4>
               <p className="text-xs text-muted-foreground tracking-wide font-medium">DATOS DEL BENEFICIARIO</p>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {[
               { label: "Banco", value: data.bankName },
               { label: isPagoMovil ? "Teléfono" : "Cuenta", value: isPagoMovil ? data.phone : data.accountNumber },
               { label: isPagoMovil ? "R.I.F / C.I" : "Titular", value: isPagoMovil ? data.idNumber : data.accountName },
               { label: "Referencia Interna", value: data.reference, highlights: true },
            ].map(item => (
               <div key={item.label} className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">{item.label}</p>
                  <p className={cn("text-base font-bold", item.highlights && "text-primary")}>{item.value}</p>
               </div>
            ))}
         </div>
      </div>

      <div className="space-y-4">
         <div className="space-y-2">
            <Label className="font-bold">Referencia de la operación</Label>
            <Input 
               placeholder="Ingrese los últimos 4-6 dígitos del código de confirmación" 
               value={externalRef}
               onChange={(e) => onExternalRefChange(e.target.value)}
               className="h-11 bg-background/50 border-white/10"
            />
         </div>

         <div className="space-y-2 text-center">
            <Label className="font-bold block text-left">Comprobante de Pago</Label>
            <div className={cn(
               "border-2 border-dashed rounded-2xl p-6 transition-all relative",
               file ? "border-primary/50 bg-primary/10" : "border-white/10 hover:border-primary/30"
            )}>
               <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={onFileSelect} />
               <div className="flex flex-col items-center gap-1">
                  <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                  <p className="text-xs font-bold">{file ? file.name : "Subir Captura de Pantalla"}</p>
                  <p className="text-[10px] text-muted-foreground">Formatos: JPG, PNG (Max 5MB)</p>
               </div>
            </div>
         </div>

         <Button className="w-full h-12 font-bold text-lg" disabled={!file || isLoading} onClick={onSubmit}>
            {isLoading ? "Validando..." : "Confirmar Depósito"}
         </Button>
      </div>
    </div>
  );
};

import { Building, Clock, Upload } from "lucide-react";
