import { useRef,useState,useEffect } from "react";
import ImageUploader from "../../Componenet/Image/image";
import '../AddCompany/company.css'
import Navigate from "../../Componenet/ComNav/CommonNavigate";
function AddAdv({CompanyName}){
const Name=useRef();
const Description=useRef();
const [Image,setImage]=useState('')
const [Valid,setValid]=useState('True')
const [email,setEmail]=useState('')
const [Dec,setDec]=useState('')

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
let st=`${Description.current.value}`
let re=st.replaceAll("'"," is ");
setDec(re)
console.log(Dec)
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
                Description:JSON.parse(JSON.stringify(Dec)),
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
    <>
    <Navigate/>
    <div className="AdCompanyContainer">
        <h1 className="AdCompany" >Create Advertise</h1>
        <div>
            <input type="text" maxLength={30} ref={Name} placeholder="Enter Advertise Name" className="AdCompanyText" required></input>
        </div>
        <ImageUploader setvalid={setValid} setimage={setImage} classN='AdCompanyImage' />
        
        <div>
            <textarea type="text" maxLength={1000} ref={Description} placeholder="Enter Compnay Description" className="AdCompanyText" style={{textWrap:"wrap",height:'50px',background:'#2b2b2b',color:'white',borderRadius:'1rem',paddingLeft:'1.5rem'}} ></textarea>
        </div>
        <div className="ButtonContAd">
        <button  className="AdCompanySave" onClick={Add}>Save</button>
        </div>
        {Valid !== 'True' ? <p className="ErrorMessageAD">{Valid}</p> : null}
    </div>
    </>
)


}
export default AddAdv;