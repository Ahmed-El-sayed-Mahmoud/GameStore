import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Header from "../home/components/header"
import "../ShowAllCompany/ShowCompany.css"
function ShowAdv() {

    const [Adv, setAdv] = useState(null)

    useEffect(() => {
        const getAdv = async () => {
            try {
                const result = await fetch('http://localhost:3000/ad/Get', {
                    method: 'GET',
                }

                )
                if (!result.ok) {
                    console.log(result.status)
                    
                    return
                }
                const Advertise = await result.json()
                setAdv(await Advertise)

            }
            catch (err) {
                console.log(err)
            }

        }

        getAdv()
    }, [Adv])
    return (
        <div className="ComapnysOrAd">
            <Header />
            <div className="CompanyContainer">
                {Adv?.map((Adv) => {
                    return (
                        <div className="CompanyOrAdv" key={Adv?.Name}>

                            <img src={Adv.Image} className="CompanyLogoorAdv"/>
                            <h1 className="CompanyNameOrAdv">{Adv.Name}</h1>
                            <div className="CompanyLinks">

                            <Link to={{pathname:"/Ad",search:`${Adv?.Name}`}} className="CompanyLink" style={{marginTop:'1rem'}}>Watch Ad</Link>
                      </div>
                        </div>
                    )

                })}
            </div>
        </div>
    )
}
export default ShowAdv