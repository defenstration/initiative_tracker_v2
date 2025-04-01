'use client';

import { Character } from '../types/Character';
import { RPGSystem } from '../types/RPGSystem';
import CharacterCard from './CharacterCard';
import InputModal from './InputModal';
import { useGame } from '../context/GameContext';
import { useState } from 'react';

interface PlayersProps {
    system: RPGSystem;
}

export default function Players({ system }: PlayersProps) {
    const { players, removeCharacter, editCharacter, toggleActive, addCharacter } = useGame();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPlayer, setEditingPlayer] = useState<Character | null>(null);

    const handleAddPlayer = () => {
        setEditingPlayer(null);
        setIsModalOpen(true);
    };

    const handleEditPlayer = (player: Character) => {
        setEditingPlayer(player);
        setIsModalOpen(true);
    };

    const handleDeletePlayer = (id: string) => {
        const player = players.find(p => p.id === id);
        if (player) {
            removeCharacter(id, player);
        }
    };

    const handleToggleActive = (id: string) => {
        const player = players.find(p => p.id === id);
        if (player) {
            toggleActive(id, player);
        }
    };

    const handleSubmit = (character: Character) => {
        if (editingPlayer) {
            editCharacter(character);
        } else {
            const newCharacter = {
                ...character,
                id: crypto.randomUUID(),
                hp: character.maxHp
            };
            addCharacter(newCharacter);
        }
        setIsModalOpen(false);
        setEditingPlayer(null);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Players</h2>
                <button
                    onClick={handleAddPlayer}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                    Add Player
                </button>
            </div>

            <div className="space-y-4">
                {players.map(player => (
                    <CharacterCard
                        key={player.id}
                        character={player}
                        onEdit={handleEditPlayer}
                        onDelete={handleDeletePlayer}
                        onToggleActive={handleToggleActive}
                    />
                ))}
            </div>

            <InputModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingPlayer(null);
                }}
                type="player"
                entity={editingPlayer || {
                    id: '',
                    name: '',
                    level: 1,
                    initiative: 0,
                    hp: 0,
                    maxHp: 0,
                    isActive: true,
                    type: 'player'
                }}
                onSubmit={handleSubmit}
            />
        </div>
    );
}