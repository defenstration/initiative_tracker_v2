'use client';

import { Character } from '../types/Character';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import CharacterCard from './CharacterCard';

interface DraggableCharacterCardProps {
    character: Character;
    onEdit: (character: Character) => void;
    onDelete: (id: string) => void;
    onToggleActive: (id: string) => void;
}

export default function DraggableCharacterCard({ 
    character, 
    onEdit, 
    onDelete, 
    onToggleActive 
}: DraggableCharacterCardProps) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: character.id,
        data: {
            type: 'character',
            character
        }
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        opacity: isDragging ? 0.5 : 1,
        cursor: 'grab'
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
        >
            <CharacterCard
                character={character}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleActive={onToggleActive}
            />
        </div>
    );
} 