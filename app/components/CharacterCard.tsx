'use client'

import { Character } from '../types/Character';
import { useGame } from '../context/GameContext';

interface CharacterCardProps {
  character: Character;
  onEdit: (character: Character) => void;
  onDelete: (id: string) => void;
  onToggleActive: (id: string) => void;
}

export default function CharacterCard({ character, onEdit, onDelete, onToggleActive }: CharacterCardProps) {
  const { moveToGraveyard } = useGame();
  const hpPercentage = (character.hp / character.maxHp) * 100;
  const hpColor = hpPercentage > 50 ? 'bg-green-500' : hpPercentage > 25 ? 'bg-yellow-500' : 'bg-red-500';

  const handleKill = () => {
    if (character.type === 'enemy') {
      moveToGraveyard(character);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold text-lg">{character.name}</h3>
          <div className="flex gap-2">
            <button
              onClick={() => onToggleActive(character.id)}
              className={`text-sm px-2 py-1 rounded ${
                character.isActive
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {character.isActive ? 'Active' : 'Inactive'}
            </button>
            {character.type === 'enemy' && (
              <button
                onClick={handleKill}
                className="text-sm px-2 py-1 rounded bg-red-100 text-red-800 hover:bg-red-200"
              >
                Kill
              </button>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(character)}
            className="text-gray-600 hover:text-gray-900"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(character.id)}
            className="text-gray-600 hover:text-gray-900"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Level: {character.level}</span>
          <span>Initiative: {character.initiative}</span>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>HP: {character.hp}/{character.maxHp}</span>
            <span>{Math.round(hpPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`${hpColor} h-2 rounded-full transition-all duration-300`}
              style={{ width: `${hpPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 