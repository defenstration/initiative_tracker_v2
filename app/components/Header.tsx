'use client';

import { RPGSystem } from '../types/RPGSystem';
import SystemSelector from './SystemSelector';

interface HeaderProps {
  onSystemChange: (system: RPGSystem) => void;
}

export default function Header({ onSystemChange }: HeaderProps) {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Initiative Tracker</h1>
          <SystemSelector onSystemChange={onSystemChange} />
        </div>
      </div>
    </header>
  );
}