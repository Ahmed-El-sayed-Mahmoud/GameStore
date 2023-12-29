import { useState ,useEffect } from "react";
import '../bancreator/Bancreator.css';

const Bancreator = () => {

    const [creators, setCreators] = useState([])

    const [bannedCreators, setBannedCreators] = useState([]);
  
  
    useEffect (() => {
  
      const getActiveCreators = async () => {
        const activeCreators = await fetchActCreators();
        setCreators(activeCreators);
      };
  
      const getBannedCreators = async () => {
        const bannedCreators = await fetchbanned();
        setBannedCreators(bannedCreators);
      };
  
      getActiveCreators();
      getBannedCreators();
    },[]);
  
    const fetchActCreators = async () => {
      const res = await fetch("http://localhost:3000/creator/Active")
      const data = await res.json()
      return data
    }
    const fetchbanned = async () => {
      const res = await fetch("http://localhost:3000/creator/Banned")
      const data = await res.json()
      return data
    }
  
    const handleBanCreator = async (creatorEmail) => {
  
  
      const creatorToBan = creators.find((creator) => creator.email === creatorEmail);
      const email = creatorToBan.email
  
  
      const res = await fetch("http://localhost:3000/creator/AdmBanCreator",{
        method: 'POST',
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email : email,
          AEmail : localStorage.getItem("Email"),
        }),
      })

      setCreators(creators.filter((creator) => creator.email !== creatorEmail));
      setBannedCreators([...bannedCreators,creatorToBan]);
    }
  
    const handleUnbanCreator = async (creatorEmail) => {
  
  
      const creatorToUnban = bannedCreators.find((creator) => creator.email === creatorEmail);
  
      const res = await fetch("http://localhost:3000/creator/Unban",{
        method: 'POST',
        headers: {
          "Content-type":"application/json",
        },
        body: JSON.stringify(creatorToUnban),
      })

      setBannedCreators(bannedCreators.filter((creator) => creator.email !== creatorEmail));
      setCreators([...creators, creatorToUnban]);
    }


  return (
    <>
      {localStorage.getItem("Role") === "Admin" ? (
        <div className="table-container">
        <div className="active-users-table">
          <h2>Active Creators</h2>
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Password</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {creators.map((creator) => (
                <tr key={creator.email}>
                  <td>{creator.FNAME}</td>
                  <td>{creator.LNAME}</td>
                  <td>{creator.email}</td>
                  <td>{creator.PASSWORD}</td>
                  <td>
                    <button onClick={() => handleBanCreator(creator.email)}>Ban</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        <div className="banned-users-table">
          <h2>Banned Creators</h2>
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bannedCreators.map((creator) => (
                <tr key={creator.email}>
                  <td>{creator.FNAME}</td>
                  <td>{creator.LNAME}</td>
                  <td>{creator.email}</td>
                  <td>{creator.PASSWORD}</td>
                  <td>
                    <button onClick={() => handleUnbanCreator(creator.email)}>
                      Unban
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      ) : (
        <p>You dont have permission to ban creators</p>
       )}
    </>
  )
}

export default Bancreator