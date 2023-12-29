import Header from '../home/components/header'
import CreatorProfile from './CreatorProfile';
import GameForm from './GameForm';
import GameList from './GameList';
import  { useEffect, useState } from 'react';
const CreatorPage = () => {
  const email=JSON.parse(localStorage.getItem("Email"));
  console.log(email);
    const [gamesData, setGamesData] = useState([]
    );
    const [creatorData,setCreatorData]=useState(null);
    const getCreated= async()=>
    {
    const response = await fetch("http://localhost:3000/creator/Created",{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          Email:email,
        }),
      })
    const games= await response.json(); 
    setGamesData(games);
    }
    const getDeleted= async()=>
    {
    const response = await fetch("http://localhost:3000/creator/Deleted",{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          Email:email,
        }),
      })
    const games= await response.json(); 
    setDeletedGames(games);
    }
    useEffect(()=>{
    getCreated();
    getDeleted();
    },[])
    useEffect(()=>
    {
        const getCreatorData=async()=>
        {
            const response = await fetch("http://localhost:3000/creator/CreatorInfo",{
                method:'POST',
                headers:{
                  'Content-Type':'application/json'
                },
                body:JSON.stringify({
                  Email:email,
                }),
              })
              const info= await response.json();
              setCreatorData(info[0]);
              console.log(info[0]);
              return info;
        }
        getCreatorData();
    },[])
    
    const addGame = async(formData) => {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
      console.log(Date())
      const response = await fetch("http://localhost:3000/game/AddGame",{
                method:'POST',
                headers:{
                  'Content-Type':'application/json'
                },
                body:JSON.stringify({
                 name:formData.name,
                 price:formData.price,
                 min_age:formData.minAge,
                 decription:formData.decription,
                 c_email:email,
                 rdate: `${year}/${month}/${date}`,
                 image:formData.image,
                }),
              })
              const mes=await response.json();
              console.log(mes['status']);
              getCreated();
      return({
        text:mes['added'],
        status:mes['status'],
      });
    }
    const [deletedGames, setDeletedGames] = useState([]);
  
    const handleDelete = async(gameName) => {
      const response = await fetch("http://localhost:3000/creator/Delete",{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          Email:email,
          gName:gameName
        }),
      })
      getCreated();
      getDeleted();
    };
  
    const handleAddBack = async(gameName) => {
      const response = await fetch("http://localhost:3000/creator/AddBack",{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          Email:email,
          gName:gameName
        }),
      })
      getCreated();
      getDeleted();
    };
  return (
    <div>
      <Header/>
       <CreatorProfile {...creatorData}/>
      <GameList title="Created Games" games={gamesData} onDelete={handleDelete} onAddBack={handleAddBack} deleted={false} />
      <GameList title="Deleted Games" games={deletedGames} onDelete={handleDelete} onAddBack={handleAddBack} deleted={true} />
    <GameForm  onSubmit={addGame}/>
    </div>
  )
}

export default CreatorPage
