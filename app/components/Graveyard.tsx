'use client'

import { Character } from '../types/Character';
import { useGame } from '../context/GameContext';
import { useDroppable } from '@dnd-kit/core';

export default function Graveyard() {
    const { graveyard } = useGame();
    const { setNodeRef, isOver } = useDroppable({
        id: 'graveyard',
        data: {
            type: 'graveyard'
        }
    });

    return (
        <div 
            ref={setNodeRef}
            className={`min-h-[200px] p-4 rounded-lg border-2 border-dashed transition-colors ${
                isOver 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-300 hover:border-red-300'
            }`}
        >
            {graveyard.length === 0 ? (
                <div className="h-full flex items-center justify-center text-gray-500">
                    <p>Drop enemies here to "kill" them</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {graveyard.map(character => (
                        <div
                            key={character.id}
                            className="bg-gray-100 p-4 rounded-lg"
                        >
                            <h3 className="font-bold">{character.name}</h3>
                            <p className="text-sm text-gray-600">Level {character.level}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
} 