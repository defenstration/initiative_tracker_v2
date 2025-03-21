

import {createContext, useState, useContext, ReactNode} from 'react'

interface Character {
    id: string,
    name: string,
    level: number,
    type: 'player' | 'enemy'
}

interface GameContextType {
    players: Character[];
    enemies: Character[];
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({children}:{children: ReactNode}) {
    const[players, setPlayers] = useState<Character[]>([])
    const[enemies, setEnemies] = useState<Character[]>([])

    function addCharacter(character: Character){
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

    return (
        <GameContext.Provider value={{players, enemies, addCharacter, removeCharacter}}>
            {children}
        </GameContext.Provider>
    )
}

export function useGame(){
    const context = useContext(GameContext)
    if(!context) throw new Error ('useGame must be used within a GameProvider')
    return context
}
