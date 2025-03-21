'use client'

// import Image from "next/image";
import InitiativeBar from "./components/InitiativeBar"
import { GameProvider } from "./context/GameContext"
import Enemies from "./components/Enemies"


export default function Home() {
  return (
    <GameProvider>
      <main>
        <InitiativeBar />
        <Enemies />
        
      </main>
    </GameProvider>

  )
}
    