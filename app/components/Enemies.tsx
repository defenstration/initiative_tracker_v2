'use client'

import { Character } from '../types/Character';
import { RPGSystem } from '../types/RPGSystem';
import DraggableCharacterCard from './DraggableCharacterCard';
import InputModal from './InputModal';
import { useGame } from '../context/GameContext';
import { useState } from 'react';
import { DragEndEvent } from '@dnd-kit/core';

interface EnemiesProps {
    system: RPGSystem;
}

export default function Enemies({ system }: EnemiesProps) {
    const { enemies, removeCharacter, editCharacter, toggleActive, addCharacter, moveToGraveyard } = useGame();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEnemy, setEditingEnemy] = useState<Character | null>(null);

    const handleAddEnemy = () => {
        setEditingEnemy(null);
        setIsModalOpen(true);
    };

    const handleEditEnemy = (enemy: Character) => {
        setEditingEnemy(enemy);
        setIsModalOpen(true);
    };

    const handleDeleteEnemy = (id: string) => {
        const enemy = enemies.find(e => e.id === id);
        if (enemy) {
            removeCharacter(id, enemy);
        }
    };

    const handleToggleActive = (id: string) => {
        const enemy = enemies.find(e => e.id === id);
        if (enemy) {
            toggleActive(id, enemy);
        }
    };

    const handleSubmit = (character: Character) => {
        if (editingEnemy) {
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
        setEditingEnemy(null);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Enemies</h2>
                <button
                    onClick={handleAddEnemy}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                    Add Enemy
                </button>
            </div>

            <div className="space-y-4">
                {enemies.map(enemy => (
                    <DraggableCharacterCard
                        key={enemy.id}
                        character={enemy}
                        onEdit={handleEditEnemy}
                        onDelete={handleDeleteEnemy}
                        onToggleActive={handleToggleActive}
                    />
                ))}
            </div>

            <InputModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingEnemy(null);
                }}
                type="enemy"
                entity={editingEnemy || {
                    id: '',
                    name: '',
                    level: 1,
                    initiative: 0,
                    hp: 0,
                    maxHp: 0,
                    isActive: true,
                    type: 'enemy'
                }}
                onSubmit={handleSubmit}
            />
        </div>
    );
}