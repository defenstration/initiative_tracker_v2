'use client'

import { RPGSystem } from './types/RPGSystem';
import Players from "./components/Players"
import Enemies from "./components/Enemies"
import Graveyard from "./components/Graveyard"
import InitiativeBar from "./components/InitiativeBar"
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useGame } from './context/GameContext';

interface HomeProps {
  system: RPGSystem;
}

export default function Home({ system }: HomeProps) {
  const { moveToGraveyard } = useGame();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over?.id === 'graveyard' && active.data.current?.type === 'character') {
      const character = active.data.current.character;
      if (character.type === 'enemy') {
        moveToGraveyard(character);
      }
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-9 space-y-6">
          {/* Initiative Bar - Full Width */}
          <section className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-bold mb-4">Initiative Order</h2>
            <InitiativeBar />
          </section>

          {/* Players and Enemies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Players Section */}
            <section className="bg-white rounded-lg shadow p-4">
              <Players system={system} />
            </section>

            {/* Enemies Section */}
            <section className="bg-white rounded-lg shadow p-4">
              <Enemies system={system} />
            </section>
          </div>
        </div>

        {/* Graveyard Section - Right Side */}
        <section className="lg:col-span-3 bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Graveyard</h2>
            <button className="lg:hidden p-2 hover:bg-gray-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
          <div className="hidden lg:block">
            <Graveyard />
          </div>
        </section>
      </div>
    </DndContext>
  );
}
    