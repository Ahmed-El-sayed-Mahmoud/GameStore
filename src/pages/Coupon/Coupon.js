import { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ImageUploader from "../../Componenet/Image/image";
import '../AddCompany/company.css'
import Navigate from "../../Componenet/ComNav/CommonNavigate";
import { Descriptions } from "antd";
function Coupon() {
    const Name = useRef();
    const Max = useRef();
    const End = useRef();
    const Description = useRef();
    const [Image, setImage] = useState('')
    const [Valid, setValid] = useState('True')
    const [email, setEmail] = useState('')
    const [Dec, setDec] = useState('')
const location=useLocation()
    useEffect(() => {
        setEmail((JSON.parse(localStorage.getItem('Email'))))
        console.log(email)
    }, [])


    function validation() {
        setValid('True')
        if (Name.current.value === '') {
            setValid('Must Enter Event Name');
            return false;
        }
        if (Max.current.value === '') {
            setValid('Must Enter Max Number Of This Event');
            return false
        }
        if (Image === '') {
            setValid('Must Enter Event Image');
            return false
        }
        if (End.current.value === '') {
            setValid('Must Enter End Date  Of This Event');
            return false
        }
        let st = `${Description.current.value}`
        let re = st.replaceAll("'", " is ");
        setDec(re)
        console.log(Dec)
        return true
    }


    const Add = async () => {
        const valid = validation();
        console.log(email)
        console.log(location.search.substring(1,location.search.length))

        if (valid === true) {
            try {
                const result = await fetch('http://localhost:3000/Event/Add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Name: Name.current.value,
                        Image: Image,
                        End: End.current.value,
                        Description: JSON.parse(JSON.stringify(Dec)),
                        AdminE: email,
                        GName:location.search.substring(1,location.search.length).replaceAll('%20',' '),
                        Max:Max.current.value
                    })
                })
                if (!result.ok) {
                    console.log('there is an error')
                    return
                }
                const event = await result.json();
                setValid(event['event'])
                console.log(event['event'])
                Name.current.value = ''
                Description.current.value = ''
                End.current.value=''
Max.current.value='';

console.log(location.search.substring(1,location.search.length))
            }
            catch (err) {
                console.log(err)
            }
        }
    }
    return (
        <>
            <Navigate />
            <div className="AdCompanyContainer">
                <h1 className="AdCompany" >Create Event</h1>
              <div>
                    <input type="number" maxLength={50} ref={Max} placeholder="Enter Event Max Partition" className="AdCompanyText" required></input>
                </div>
               
            </div>
        </>
    )


}
export default Coupon;