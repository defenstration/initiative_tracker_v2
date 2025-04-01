'use client';

import { Character } from '../types/Character';
import { useState } from 'react';

interface InitiativeModalProps {
    isOpen: boolean;
    onClose: () => void;
    players: Character[];
    enemies: Character[];
    onSubmit: (entries: { character: Character; initiative: number }[]) => void;
}

export default function InitiativeModal({ isOpen, onClose, players, enemies, onSubmit }: InitiativeModalProps) {
    const [groupSimilarEnemies, setGroupSimilarEnemies] = useState(false);
    const [initiatives, setInitiatives] = useState<Record<string, number>>({});
    const [playerInitiatives, setPlayerInitiatives] = useState<Record<string, number>>({});

    if (!isOpen) return null;

    const handleRollInitiative = (character: Character) => {
        const roll = Math.floor(Math.random() * 20) + 1;
        if (character.type === 'player') {
            setPlayerInitiatives(prev => ({ ...prev, [character.id]: roll }));
        } else {
            setInitiatives(prev => ({ ...prev, [character.id]: roll }));
        }
    };

    const handlePlayerInitiativeChange = (characterId: string, value: string) => {
        const initiative = parseInt(value);
        if (!isNaN(initiative)) {
            setPlayerInitiatives(prev => ({ ...prev, [characterId]: initiative }));
        }
    };

    const handleRollAll = () => {
        // Roll for players without initiative
        players.forEach(player => {
            if (!playerInitiatives[player.id]) {
                handleRollInitiative(player);
            }
        });

        // Roll for enemies without initiative
        enemies.forEach(enemy => {
            if (!initiatives[enemy.id]) {
                handleRollInitiative(enemy);
            }
        });
    };

    const calculateTotalInitiative = (character: Character, roll: number) => {
        return roll + character.initiativeModifier;
    };

    const handleSubmit = () => {
        // Group similar enemies if checkbox is checked
        if (groupSimilarEnemies) {
            const groupedEnemies = enemies.reduce((acc, enemy) => {
                if (!acc[enemy.name]) {
                    acc[enemy.name] = [];
                }
                acc[enemy.name].push(enemy);
                return acc;
            }, {} as Record<string, Character[]>);

            // Set same initiative for grouped enemies
            Object.values(groupedEnemies).forEach(group => {
                if (group.length > 1) {
                    const initiative = initiatives[group[0].id] || 0;
                    group.forEach(enemy => {
                        setInitiatives(prev => ({ ...prev, [enemy.id]: initiative }));
                    });
                }
            });
        }

        // Combine all initiatives with their modifiers
        const allEntries = [
            ...players.map(player => ({
                character: player,
                initiative: calculateTotalInitiative(player, playerInitiatives[player.id] || 0)
            })),
            ...enemies.map(enemy => ({
                character: enemy,
                initiative: calculateTotalInitiative(enemy, initiatives[enemy.id] || 0)
            }))
        ].filter(entry => entry.initiative > 0);

        onSubmit(allEntries);
        onClose();
    };

    const ColumnHeader = ({ label }: { label: string }) => (
        <div className="text-sm font-medium text-gray-500 text-center min-w-[4rem]">
            {label}
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Roll Initiative</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="mb-6 flex items-center justify-between">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={groupSimilarEnemies}
                                onChange={(e) => setGroupSimilarEnemies(e.target.checked)}
                                className="rounded"
                            />
                            Group similar enemies
                        </label>
                        <button
                            onClick={handleRollAll}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            Roll All Unrolled
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* Players Section */}
                        <div>
                            <h3 className="text-lg font-semibold mb-3">Players</h3>
                            <div className="mb-2 flex items-center gap-4">
                                <div className="w-48">Name</div>
                                <div className="flex items-center gap-4">
                                    <ColumnHeader label="Stat" />
                                    <ColumnHeader label="Mod" />
                                    <ColumnHeader label="Roll" />
                                    <ColumnHeader label="Total" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                {players.map(player => {
                                    const roll = playerInitiatives[player.id] || 0;
                                    const total = calculateTotalInitiative(player, roll);
                                    return (
                                        <div key={player.id} className="flex items-center gap-4">
                                            <div className="w-48 font-medium">{player.name}</div>
                                            <div className="flex items-center gap-4">
                                                <div className="px-3 py-1 bg-gray-100 rounded w-16 text-center">
                                                    {player.initiative}
                                                </div>
                                                <div className="px-3 py-1 bg-gray-100 rounded w-16 text-center">
                                                    {player.initiativeModifier}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="number"
                                                        value={roll || ''}
                                                        onChange={(e) => handlePlayerInitiativeChange(player.id, e.target.value)}
                                                        placeholder="Roll"
                                                        className="px-3 py-1 border rounded w-16 text-center"
                                                    />
                                                    <button
                                                        onClick={() => handleRollInitiative(player)}
                                                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                                    >
                                                        Roll
                                                    </button>
                                                </div>
                                                <div className="px-3 py-1 bg-blue-100 rounded w-16 text-center font-bold">
                                                    {total || '-'}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Enemies Section */}
                        <div>
                            <h3 className="text-lg font-semibold mb-3">Enemies</h3>
                            <div className="mb-2 flex items-center gap-4">
                                <div className="w-48">Name</div>
                                <div className="flex items-center gap-4">
                                    <ColumnHeader label="Stat" />
                                    <ColumnHeader label="Mod" />
                                    <ColumnHeader label="Roll" />
                                    <ColumnHeader label="Total" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                {enemies.map(enemy => {
                                    const roll = initiatives[enemy.id] || 0;
                                    const total = calculateTotalInitiative(enemy, roll);
                                    return (
                                        <div key={enemy.id} className="flex items-center gap-4">
                                            <div className="w-48 font-medium">{enemy.name}</div>
                                            <div className="flex items-center gap-4">
                                                <div className="px-3 py-1 bg-gray-100 rounded w-16 text-center">
                                                    {enemy.initiative}
                                                </div>
                                                <div className="px-3 py-1 bg-gray-100 rounded w-16 text-center">
                                                    {enemy.initiativeModifier}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="px-3 py-1 bg-gray-100 rounded w-16 text-center">
                                                        {roll || 'Not rolled'}
                                                    </div>
                                                    <button
                                                        onClick={() => handleRollInitiative(enemy)}
                                                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                                    >
                                                        Roll
                                                    </button>
                                                </div>
                                                <div className="px-3 py-1 bg-blue-100 rounded w-16 text-center font-bold">
                                                    {total || '-'}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-4">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 border rounded hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Start Combat
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
} 