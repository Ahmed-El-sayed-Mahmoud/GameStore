import { useRef,useState,useEffect } from "react";
import ImageUploader from "../../Componenet/Image/image";
import '../AddCompany/company.css'
import Navigate from "../../Componenet/ComNav/CommonNavigate";
import { Descriptions } from "antd";
function AddCompany(){
const Name=useRef();
const CLink=useRef();
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
    if(Valid!=='True')
    return false;
if(Name.current.value==='')
{
    setValid('Must Enter Company Name');
    return false; 
}
if(CLink.current.value==='')
{
    setValid('Must Enter Company Link');
    return false
}
if(Image==='')
{
    setValid('Must Enter Company Logo');
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
 console.log(Description.current.value)
 if(valid===true){
    try{
         const result=await fetch('http://localhost:3000/company/Add',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Name:Name.current.value,
                Logo:Image,
                Link:CLink.current.value,
                Description:JSON.parse(JSON.stringify(Dec)),
                AdminE:email

            })
         })
         if(!result.ok)
         {
            console.log('there is an error')
            setValid('Image is large')
            return
         }
         const Compnay=await result.json();
         if(Compnay['iscreated']!=='created')
          {
            setValid(Compnay['iscreated'])
            return;
          }
          setValid('Saved successfully ')
          Name.current.value=''
          Description.current.value=''
          CLink.current.value=''
          
          
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
        <h1 className="AdCompany" >Create Company</h1>
        <div>
            <input type="text" maxLength={30} ref={Name} placeholder="Enter Compnay Name" className="AdCompanyText" required></input>
        </div>
        <ImageUploader setvalid={setValid} setimage={setImage} classN='AdCompanyImage' />
        <div>
            <input type="text" maxLength={200} ref={CLink}  placeholder="Enter Compnay Link" className="AdCompanyText" required></input>
        </div>
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
export default AddCompany;