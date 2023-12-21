
import { useState, useRef } from "react"
import "./SignUp.css"
import { useNavigate } from "react-router-dom"
function SignUp() {
    const [valid, setValid] = useState('True')
    const [isPlayer, setIsPlayer] = useState(false)
    const [isCreator, setIsCreator] = useState(false)
    const [ImageBase, setImage] = useState('')

    const Email = useRef();
    const Password = useRef();
    const Fname = useRef();
    const Lname = useRef();
    const Bdate = useRef();
    const Description = useRef();
    const Image = useRef();
    const navigate = useNavigate()
    function CreatorHan() {
        setIsCreator(true)
        setIsPlayer(false)

    }
    function PlayerHan() {
        setIsPlayer(true)
        setIsCreator(false)
    }

    ////////////////////////////
    const convertToBase64 = () => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(Image.current.files[0]);
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };
      const handleFileUpload = async () => {
       
        const base64 = await convertToBase64();
        setImage(base64);
      };
    
    ////////////////////////////////
    function EmailValid() {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValid = emailPattern.test(Email.current.value);
        setValid('Must enter a valid email');
        return isValid;
    }
    /////////////////////////////////////////
    function validation() {
        if (EmailValid() === true) {
            if (Fname.current.value.length === 0)
                setValid('Must enter  your First name');
            else if (Lname.current.value.length === 0)
                setValid('Must enter  your Last name');
            else if (Password.current.value.length === 0)
                setValid('Must enter  your password');
            else {
                setValid("True")
                return true;

            }
        }
        return false;
    }
    const playerSignUp = async () => {
        if (validation()) {
            if (Bdate.current.value === "") {
                setValid('Must enter  your Birth date');
                return;
            }
            handleFileUpload();
       console.log(ImageBase)
           

            try {
                const player = await fetch('http://localhost:3000/player/SignUp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Fname: Fname.current.value,
                        Lname: Lname.current.value,
                        Email: Email.current.value,
                        Password: Password.current.value,
                        Bdate: Bdate.current.value,
                        Image:  ImageBase,
                    })
                })
                if (!player.ok) {
                    throw new Error(`HTTP error! Status: ${player.status}`);
                }
                const p = await player.json();
                if (p['iscreated'] !== 'Created')
                    setValid(p['iscreated']);
                else {
                    navigate('/Login')
                }
            }
            catch (error) {
                console.log(error)
            }

        }

    }
    //////////////////////////////////////////////////
    const CreatorSignUp = async () => {
        if (validation()) {

            handleFileUpload();
       console.log(ImageBase)

            try {
                const creator = await fetch('http://localhost:3000/creator/SignUp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Fname: Fname.current.value,
                        Lname: Lname.current.value,
                        Email: Email.current.value,
                        Password: Password.current.value,
                        Description: Description.current.value,
                        Image: ImageBase,

                    })
                })
                if (!creator.ok) {
                    throw new Error(`HTTP error! Status: ${creator.status}`);
                }
                const p = await creator.json();
                console.log(p["iscreated"])
                if (p['iscreated'] !== 'Created')
                    setValid(p['iscreated']);
                else {

                    navigate('/Login')
                }
            }
            catch (error) {
                console.log(error)
            }

        }

    }
    ////////////////////////////////////////////////
    const AdminSignUp = async () => {
        if (validation()) {


            try {
                const creator = await fetch('http://localhost:3000/admin/SignUp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Fname: Fname.current.value,
                        Lname: Lname.current.value,
                        Email: Email.current.value,
                        Password: Password.current.value,

                    })
                })
                if (!creator.ok) {
                    throw new Error(`HTTP error! Status: ${creator.status}`);
                }
                const p = await creator.json();
                console.log(p["iscreated"])
                if (p['iscreated'] !== 'Created')
                    setValid(p['iscreated']);
                else {

                    navigate('/Login')
                }
            }
            catch (error) {
                console.log(error)
            }

        }

    }
    //////////////////////////////

    return (
        <div className="LoginSignPage">
            <div>
                <img src="./media/logo.png" className="Loginlogo" />
            </div>
            <h1 className="LoginHeader">SIGNUP</h1>
            <div >
                <div className="EnterText">
                    <input type="text" placeholder="Enter First Name" ref={Fname} className="LoginSignupText" maxLength={20} pattern="[a-zA-Z]+" oninvalid="setCustomValidity('Please enter on alphabets only. ')" required />
                </div>
                <div className="EnterText">
                    <input type="text" placeholder="Enter Last Name" ref={Lname} className="LoginSignupText" maxLength={20} required />
                </div>
                <div className="EnterText">
                    <input type="email" maxLength={50} className="LoginSignupText" ref={Email} placeholder="Enter Email" required />
                </div>
                <div className="EnterText">
                    <input type="password" maxLength={20} className="LoginSignupText" ref={Password} placeholder="Enter Password" required />
                </div>
                {localStorage.getItem('Role') === 'Admin' ? <button className="SaveButton" onClick={AdminSignUp} >Save</button>
                    :
                    <div>
                        <div className="EnterText">
                            <input type="file" className="LoginSignupText" ref={Image}  required />
                        </div>

                        {isPlayer ?
                            <div>
                                <div className="EnterText">
                                    <input type="date" className="LoginSignupText" ref={Bdate} required />
                                </div>
                                <button className="SaveButton" onClick={playerSignUp}>Save</button>

                            </div> : null}
                        {isCreator ?
                            <div>
                                <div className="EnterText">
                                    <input type="text" className="LoginSignupText" ref={Description} placeholder="Enter description" maxLength={200} />
                                </div>
                                <button className="SaveButton" onClick={CreatorSignUp} >Save</button>
                            </div>
                            : null}


                        <h1 className="AsRole">AS</h1>
                        <div className="LoginSignAs">
                            <button className="LoginSignAsRole" onClick={CreatorHan} >Creator</button>
                            <button className="LoginSignAsRole" onClick={PlayerHan}>Player</button>
                        </div>
                        {valid !== 'True' ? <p className="ErrorMessage">{valid}</p> : null}
                    </div>
                }
            </div>
        </div>
    )
}
export default SignUp