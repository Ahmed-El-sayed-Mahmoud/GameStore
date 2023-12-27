import { useEffect ,useState} from "react";
import { useLocation } from "react-router-dom";
import './Ad.css'
import Header from "../home/components/header";
import CoolPopup from"../home/components/CoolPopup"
function Ad(){
const location=useLocation()
const [AdName,setAdName]=useState('')
const [Adv,SetAd]=useState(null)
const [msg,setMsg]=useState('')
const [description,setDescription]=useState(false)
const [Cdescription,setCDescription]=useState(false)

useEffect(()=>{
    setAdName(location.search.substring(1,location.search.length))
    console.log(AdName)
    },[])

useEffect(()=>{
 const getAd=async()=>{
  try{
      const advertise=await fetch('http://localhost:3000/ad/GetAd',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(
           { Name:AdName}
        )
       

      })
      if(!advertise.ok)
      {
        console.log(advertise.status)
        return;
      }

      const resut =await advertise.json()

      SetAd(resut[0])
  }
  catch(err)
  {
    console.log(err)
    return;
  }
 }

 getAd();
},[Adv])

///////////////////////////////////////////////////////////////////

const watch=async()=>{
  try{
  const ad=await fetch('http://localhost:3000/ad/watch',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(
           { Name:AdName,
           Email:JSON.parse(localStorage.getItem('Email'))}
        )
       

      })
      if(!ad.ok)
      {
        console.log(ad.status)
        return;
      }

      const {hascoupon} =await ad.json()
      setMsg(hascoupon)
      console.log(msg)

    
  }
  catch(err)
  {
    console.log(err)
  }
}
function showDes()
{
  setDescription(!description)
  console.log(Adv.Description)
}

function showCDes()
{
  setCDescription(!Cdescription)
}
return(
  <>
  <Header/>
<div className="AdCon">
 
    <h1>{Adv?.Name}</h1>
    <img src ={Adv?.Image} className="AdvImage"/>
 
    <button onClick={showDes} className="MarkButton"> Ad Info</button>
    {description===true?<p className="addescription">{Adv?.Description}</p>:null}
    <button onClick={showCDes} className="MarkButton"> Company Info</button>
    {Cdescription===true?
    <>
    <div className="CompanyInfo">
      <img src={Adv?.Logo} className="AdCompanyLogo"/>
      <h1>{Adv?.CompanyName}</h1>
      </div>
    <p className="addescription">{Adv?.CDescription}</p>
   </>
    :null}
    {localStorage.getItem('Role')==='Player'?
      <>
    <button onClick={watch} className="MarkButton"> Mark as watch</button>
  {msg!==''? <CoolPopup  message={msg}/>:null}</>:null}
</div>
</>
)

}
export default Ad;
