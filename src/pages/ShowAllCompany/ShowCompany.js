import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Header from "../Home/components/header"
import "./ShowCompany.css"
function ShowCompany() {

    const [companys, setCompanys] = useState(null)

    useEffect(() => {
        const getCompany = async () => {
            try {
                const result = await fetch('http://localhost:3000/company/Get', {
                    method: 'GET',
                }

                )
                if (!result.ok) {
                    console.log(result.status)
                    return
                }
                const company = await result.json()
                setCompanys(await company)

            }
            catch (err) {
                console.log(err)
            }

        }

        getCompany()
    }, [companys])
    return (
        <div className="Comapnys">
            <Header />
            <Link to='/createcompany' style={{ textDecoration: 'none' }}><div className="AddComapnyContainer">Add Company</div></Link>
            <div className="CompanyContainer">
                {companys?.map((company) => {
                    return (
                        <div className="Company">
                            <img src={company.Logo} className="CompanyLogo"/>

                            <h1 className="CompanyName">{company.Name}</h1>
                            
                            <a href={company.Link} target="_blank" className="CompanyLink">Visit The company page</a>
                        </div>
                    )

                })}
            </div>
        </div>
    )
}
export default ShowCompany