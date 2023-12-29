import Header from "../home/components/header"
import "../ShowGames/ShowGame.css"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
function EventShow() {
    const [Events, setEvents] = useState(null)
    const [date, setdate] = useState('')
    useEffect(() => {
        setdate((new Date).toISOString().substring(0, 10))
        const getEvents = async () => {
            try {
                const result = await fetch('http://localhost:3000/Event/Get')
                if (!result.ok) {
                    console.log(result.status)
                    return;
                }
                setEvents(await result.json())
            }
            catch (err) {
                console.log(err)
            }
        }
        console.log(Events)

        getEvents()
console.log(date)
    }, [Events])
    return (
        <>
            <Header />
            <div className="GamesContainer">
                {
                    Events?.map((Event => {
                        return (
                            <div key={Event.EvName} className='GameShow'>
                                <div className="FirstSec">
                                    <img src={Event.Image} className="GameImage" />
                                    <div className="GameInfo">
                                        <h1 >{Event.EvName}</h1>
                                        <p >Related to : {Event.GameName} </p>
                                        <p >Finishing Date : {Event.EndDate.substring(0, 10)} </p>

                                        <p >Total Numbers Participate : {Event.Number} </p>
                                    </div>
                                </div>

                                <div className="GameButton">
                                    {
                                        localStorage.getItem('Role') === 'Player' && date <Event.EndDate?
                                            <button className="Buttons">Participate</button> : null
                                    }
                                    {
                                        date ===Event.EndDate?
                                            <button className="Buttons">Show Winner</button> : null
                                    }
                                </div>
                            </div>
                        )
                    }))
                }
            </div>
        </>

    )



}
export default EventShow