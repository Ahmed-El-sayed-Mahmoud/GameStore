import Header from "../home/components/header"
import "../ShowGames/ShowGame.css"
import "../EventShow/EventShow.css"
import CoolPopup from "../home/components/CoolPopup"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
function EventShow() {
    const [Events, setEvents] = useState(null)
    const [date, setdate] = useState('')
    const [msg,setmsg]=useState('')
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
        

        getEvents()
    }, [Events])

const participate=async(e)=>{
try{
const result=await fetch('http://localhost:3000/Event/Part',{
    method:"POST",
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({
        Name:e,
        Email:JSON.parse(localStorage.getItem('Email'))
    })
})
if(!result.ok)
{
    console.log(!result)
    return;
}
const parti=await result.json()
console.log(parti)

setmsg(parti)
console.log(msg)

}
catch(err){
    console.log(err)
}
}


    return (
        <>
            <Header />
            <div className="GamesContainer">
                {
                    Events?.map((Event => {
                        return (
                            <div className="supper">
                            <div key={Event.EvName} className='GameShow' style={{borderBottom:'none'}}>
                                <div className="FirstSec">
                                    <img src={Event.Image} className="GameImage" />
                                    <div className="GameInfo" >
                                        <h1 >{Event.EvName}</h1>
                                        <p >Related to : {Event.GameName} </p>
                                        <p >Finishing Date : {Event.EndDate.substring(0, 10)} </p>

                                        <p >Total Numbers Participate : {Event.Number} </p>
                                    </div>
                                </div>


                                <div className="GameButton">
                                    {
                                        localStorage.getItem('Role') === 'Player' && date <Event.EndDate.substring(0,10)?
                                            <button className="Buttons" onClick={()=>participate(Event.EvName)}>Participate</button> : null
                                    }
                                    {
                                        date ===Event.EndDate.substring(0,10)?
                                            <button className="Buttons" >Show Winner</button> : null
                                    }
                                </div>
                            </div>
                            <p className="EventDescription">{Event.Description}</p>
                           </div>
                        )
                    }))
                }
            </div>
        </>

    )



}
export default EventShow