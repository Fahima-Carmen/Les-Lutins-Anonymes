// Page d'acceuil de l'application. 

import Link from "next/link";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label"

export default function HomePage() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      fontFamily: 'sans-serif',
      gap: '20px'
    }}>
      <h1>🎄 Les Lutins Anonymes 🎄</h1>
      <p>Bienvenue ! Notre infrastructure de design manuelle est en place.</p>
      
      {/* Notre premier composant Shadcn importé ! */}
      <Link href="./testDoc">
      <Button className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-lg shadow-md">
        Créer un événement Secret Santa
      </Button>
      </Link>
      <Label className="text-black-300">
        Some label
      </Label>
    </div>
  );
}