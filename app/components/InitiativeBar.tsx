'use client';

import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Character } from '../types/Character';
import InitiativeModal from './InitiativeModal';

interface InitiativeEntry {
    character: Character;
    initiative: number;
}

export default function InitiativeBar() {
    const { players, enemies, updateCharacter } = useGame();
    const [isCombatStarted, setIsCombatStarted] = useState(false);
    const [initiativeEntries, setInitiativeEntries] = useState<InitiativeEntry[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleStartCombat = () => {
        setIsModalOpen(true);
    };

    const handleModalSubmit = (entries: InitiativeEntry[]) => {
        // Update character initiatives
        entries.forEach(entry => {
            updateCharacter({
                ...entry.character,
                initiative: entry.initiative
            });
        });

        // Set initiative entries
        setInitiativeEntries(entries);
        setIsCombatStarted(true);
    };

    const sortedEntries = [...initiativeEntries].sort((a, b) => b.initiative - a.initiative);

    return (
        <div className="space-y-4">
            {!isCombatStarted ? (
                <button
                    onClick={handleStartCombat}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                    Start Combat
                </button>
            ) : (
                <div className="flex items-center gap-2 overflow-x-auto p-4 bg-gray-50 rounded-lg">
                    {sortedEntries.map(entry => (
                        <div
                            key={entry.character.id}
                            className="flex flex-col items-center min-w-[100px] p-2 bg-white rounded shadow"
                        >
                            <div className="font-bold">{entry.character.name}</div>
                            <div className="text-sm text-gray-600">Initiative: {entry.initiative}</div>
                        </div>
                    ))}
                </div>
            )}

            <InitiativeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                players={players}
                enemies={enemies}
                onSubmit={handleModalSubmit}
            />
        </div>
    );
}