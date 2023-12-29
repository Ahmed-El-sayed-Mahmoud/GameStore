import Header from "../home/components/header"
import "../ShowGames/ShowGame.css"
import { useEffect,useState } from "react"
import  {Link}  from "react-router-dom"
function ShowGame(){
const [Games,setGames]=useState(null)
useEffect(()=>{
   const getGames=async ()=>{
     try{
         const result=await fetch('http://localhost:3000/game/allgame')
         if(!result.ok)
         {
            console.log(result.status)
            return; 
         }
         setGames(await result.json())
     }
     catch(err)
     {
        console.log(err)
     }
   }
console.log(Games)

getGames()
},[])
return(
<>
<Header/>
<div className="GamesContainer">
{
    Games?.map((game=>{
        return(
            <div key={game.Name} className='GameShow'>
                <div className="FirstSec">
                <img src={game.image} className="GameImage"/>
                <div className="GameInfo">
                <Link to={`/gameProfile/${game.Name}`} style={{textDecoration: 'none'}}><h1 >{game.Name}</h1></Link>
                <Link to={{pathname:'/',search:`${game.email}`}}style={{textDecoration: 'none'}}> <p className="CreatorName">Created By : {game.fname} {game.lname}</p></Link>
                <p >Date : {game.rdate.substring(0,10)} </p>
                <p >Price : {game.price}$ </p>
                <p >Rating : {game.AVGRating} </p>
                <p >Total Numbers Sales : {game.totalNumberSales} </p>
</div>
                </div>

                <div className="GameButton">
                    {
                        localStorage.getItem('Role')==='Admin'?
                      <Link to={{pathname:'/Event',search:`${game.Name}`}}  ><button  className="Buttons">Create Event</button></Link>:null
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
export default ShowGame