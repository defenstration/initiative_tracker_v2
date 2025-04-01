'use client';

import { useState } from "react";
import { RPGSystem } from "../types/RPGSystem";
import Header from "./Header";
import Footer from "./Footer";
import React from "react";
import { GameProvider } from "../context/GameContext";

interface ClientLayoutProps {
  children: React.ReactNode;
}

interface ChildProps {
  system: RPGSystem;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [currentSystem, setCurrentSystem] = useState<RPGSystem>('pathfinder');

  // Clone the children and pass the system prop
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement<ChildProps>(child)) {
      return React.cloneElement(child, { system: currentSystem });
    }
    return child;
  });

  return (
    <GameProvider>
      <Header onSystemChange={setCurrentSystem} />
      <main className="flex-1 container mx-auto px-4 py-8">
        {childrenWithProps}
      </main>
      <Footer />
    </GameProvider>
  );
} 