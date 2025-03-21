
import {useGame} from '../context/GameContext'

export default function InitiativeBar() {
    const {players, enemies} = useGame()

    console.log(players, enemies, 'stuff')

    return (
        <section>
            <p>stuff</p>
        </section>
    )
}