import { useRef,useState,useEffect } from "react";
import ImageUploader from "../../Componenet/Image/image";
import '../AddCompany/company.css'
function AddAdv({CompanyName}){
const Name=useRef();
const Description=useRef();
const [Image,setImage]=useState('')
const [Valid,setValid]=useState('True')
const [email,setEmail]=useState('')

useEffect(()=>{
setEmail((JSON.parse(localStorage.getItem('Email'))))
console.log(email)
},[])


function validation(){
if(Name.current.value==='')
{
    setValid('Must Enter Advertise Name');
    return false; 
}

if(Image==='')
{
    setValid('Must Enter Advertise Image');
    return false 
}
return true
}


const Add=async()=>{
 const valid=validation();
 console.log(email)
 if(valid===true){
    try{
         const result=await fetch('http://localhost:3000/ad/Add',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Name:Name.current.value,
                Image:Image,
                Description:Description.current.value,
               CompanyName:CompanyName ,
                AdminE:email

            })
         })
         if(!result.ok)
         {
            console.log('there is an error')
            return
         }
         const ad=await result.json();
         if(ad['iscreated']!=='created')
          {
            setValid(ad['iscreated'])
            return;
          }
          setValid('Saved successfully ')
    }
    catch(err){
        console.log(err)
    }
 }
}
return(
    <div className="AdCompanyContainer">
        <h1 className="AdCompany" >Create Advertise</h1>
        <div>
            <input type="text" maxLength={30} ref={Name} placeholder="Enter Advertise Name" className="AdCompanyText" required></input>
        </div>
        <ImageUploader setvalid={setValid} setimage={setImage} classN='AdCompanyImage' />
        
        <div>
            <input type="text" maxLength={1000} ref={Description} placeholder="Enter Advertise Description" className="AdCompanyText" required ></input>
        </div>
        <div className="ButtonContAd">
        <button  className="AdCompanySave" onClick={Add}>Save</button>
        </div>
        {Valid !== 'True' ? <p className="ErrorMessageAD">{Valid}</p> : null}
    </div>
)


}
export default AddAdv;