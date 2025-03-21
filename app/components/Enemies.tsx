'use client'

import {useGame} from '../context/GameContext'

export default function Enemies() {
    const {enemies} =  useGame()

    console.log( 'stuff')

    return (
        <section className = 'enemy-wrapper'>Enemies</section>
    )
}