'use client';

import { RPGSystem, SYSTEM_RULES } from '../types/RPGSystem';
import { useState, useEffect } from 'react';

interface SystemSelectorProps {
  onSystemChange: (system: RPGSystem) => void;
}

export default function SystemSelector({ onSystemChange }: SystemSelectorProps) {
  const [selectedSystem, setSelectedSystem] = useState<RPGSystem>('pathfinder');

  useEffect(() => {
    // Load saved system preference from localStorage
    const savedSystem = localStorage.getItem('rpgSystem') as RPGSystem;
    if (savedSystem && SYSTEM_RULES[savedSystem]) {
      setSelectedSystem(savedSystem);
      onSystemChange(savedSystem);
    }
  }, [onSystemChange]);

  const handleSystemChange = (system: RPGSystem) => {
    setSelectedSystem(system);
    localStorage.setItem('rpgSystem', system);
    onSystemChange(system);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-700">System:</span>
      <select
        value={selectedSystem}
        onChange={(e) => handleSystemChange(e.target.value as RPGSystem)}
        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
      >
        {Object.entries(SYSTEM_RULES).map(([key, rules]) => (
          <option key={key} value={key}>
            {rules.name}
          </option>
        ))}
      </select>
    </div>
  );
} 