'use client';

import {createContext, useState, useContext, ReactNode} from 'react'
import { Character, GraveyardEntry } from '../types/Character'

interface GameContextType {
    players: Character[];
    enemies: Character[];
    graveyard: GraveyardEntry[];
    addCharacter: (character: Character) => void;
    removeCharacter: (id: string, character: Character) => void;
    moveToGraveyard: (character: Character) => void;
    editCharacter: (character: Character) => void;
    toggleActive: (id: string, character: Character) => void;
    updateCharacter: (character: Character) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined)

// Initial placeholder characters
const initialPlayers: Character[] = [
    {
        id: '1',
        name: 'Aragorn',
        level: 5,
        initiative: 18,
        hp: 45,
        maxHp: 45,
        isActive: true,
        type: 'player'
    },
    {
        id: '2',
        name: 'Gandalf',
        level: 8,
        initiative: 15,
        hp: 60,
        maxHp: 60,
        isActive: true,
        type: 'player'
    },
    {
        id: '3',
        name: 'Legolas',
        level: 6,
        initiative: 20,
        hp: 40,
        maxHp: 40,
        isActive: true,
        type: 'player'
    }
];

const initialEnemies: Character[] = [
    {
        id: '4',
        name: 'Goblin Scout',
        level: 2,
        initiative: 14,
        hp: 15,
        maxHp: 15,
        isActive: true,
        type: 'enemy'
    },
    {
        id: '5',
        name: 'Goblin Scout',
        level: 2,
        initiative: 14,
        hp: 15,
        maxHp: 15,
        isActive: true,
        type: 'enemy'
    },
    {
        id: '6',
        name: 'Orc Warrior',
        level: 3,
        initiative: 12,
        hp: 25,
        maxHp: 25,
        isActive: true,
        type: 'enemy'
    }
];

export function GameProvider({children}:{children: ReactNode}) {
    const[players, setPlayers] = useState<Character[]>(initialPlayers)
    const[enemies, setEnemies] = useState<Character[]>(initialEnemies)
    const[graveyard, setGraveyard] = useState<GraveyardEntry[]>([])

    function addCharacter(character: Character){
        console.log('Adding character:', character);
        if (character.type === 'player') {
            setPlayers(prev => [...prev, character])
        } else if (character.type === 'enemy') {
            setEnemies(prev => [...prev, character])
        }
    }

    function removeCharacter(id: string, character: Character){
        if (character.type === 'player'){
            setPlayers(prev => prev.filter(player => player.id !== id))
        } else if (character.type === 'enemy'){
            setEnemies(prev => prev.filter(enemy => enemy.id !== id))
        }
    }

    function moveToGraveyard(character: Character) {
        if (character.type === 'enemy') {
            setEnemies(prev => prev.filter(enemy => enemy.id !== character.id))
            
            setGraveyard(prev => {
                const existingEntry = prev.find(entry => 
                    entry.name === character.name && entry.level === character.level
                )
                
                if (existingEntry) {
                    return prev.map(entry => 
                        entry.id === existingEntry.id 
                            ? { ...entry, count: entry.count + 1 }
                            : entry
                    )
                }
                
                return [...prev, {
                    id: crypto.randomUUID(),
                    name: character.name,
                    level: character.level,
                    count: 1,
                    type: 'enemy'
                }]
            })
        }
    }

    function editCharacter(character: Character) {
        if (character.type === 'player') {
            setPlayers(prev => prev.map(player => 
                player.id === character.id ? character : player
            ))
        } else if (character.type === 'enemy') {
            setEnemies(prev => prev.map(enemy => 
                enemy.id === character.id ? character : enemy
            ))
        }
    }

    function toggleActive(id: string, character: Character) {
        if (character.type === 'player') {
            setPlayers(prev => prev.map(player => 
                player.id === id ? { ...player, isActive: !player.isActive } : player
            ))
        } else if (character.type === 'enemy') {
            setEnemies(prev => prev.map(enemy => 
                enemy.id === id ? { ...enemy, isActive: !enemy.isActive } : enemy
            ))
        }
    }

    function updateCharacter(character: Character) {
        if (character.type === 'player') {
            setPlayers(prev => prev.map(player => 
                player.id === character.id ? character : player
            ))
        } else if (character.type === 'enemy') {
            setEnemies(prev => prev.map(enemy => 
                enemy.id === character.id ? character : enemy
            ))
        }
    }

    const value = {
        players,
        enemies,
        graveyard,
        addCharacter,
        removeCharacter,
        moveToGraveyard,
        editCharacter,
        toggleActive,
        updateCharacter
    };

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    )
}

export function useGame() {
    const context = useContext(GameContext)
    if (context === undefined) {
        throw new Error('useGame must be used within a GameProvider')
    }
    return context
}
