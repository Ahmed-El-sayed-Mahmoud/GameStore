import { useState ,useEffect } from "react";
import '../banplayer/Banplayer.css';


const Banplayer = () => {

  const [users, setUsers] = useState([])

  const [bannedUsers, setBannedUsers] = useState([]);


  useEffect (() => {

    const getActiveUsers = async () => {
      const activeUsers = await fetchActUsers();
      setUsers(activeUsers);
    };

    const getBannedUsers = async () => {
      const bannedUsers = await fetchbanned();
      setBannedUsers(bannedUsers);
    };

    getActiveUsers();
    getBannedUsers();
  },[]);

  const fetchActUsers = async () => {
    const res = await fetch("http://localhost:3000/player/Active")
    const data = await res.json()
    return data
  }
  const fetchbanned = async () => {
    const res = await fetch("http://localhost:3000/player/Banned")
    const data = await res.json()
    return data
  }


  const handleBanUser = async (userEmail) => {


    const userToBan = users.find((user) => user.email === userEmail);
    const email = userToBan.email;


    const res = await fetch("http://localhost:3000/player/AdmBanPlayer",{
      method: 'POST',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email : email,
        AEmail : localStorage.getItem("Email"),
      }),
    })

    setUsers(users.filter((user) => user.email !== userEmail));
    setBannedUsers([...bannedUsers,userToBan]);
  }

  const handleUnbanUser = async (userEmail) => {


    const userToUnban = bannedUsers.find((user) => user.email === userEmail);

    const res = await fetch("http://localhost:3000/player/Unban",{
      method: 'POST',
      headers: {
        "Content-type":"application/json",
      },
      body: JSON.stringify(userToUnban),
    })

    setBannedUsers(bannedUsers.filter((user) => user.email !== userEmail));
    setUsers([...users, userToUnban]);
  }
 

  return (
    <>
      {localStorage.getItem("Role") === "Admin" ? (
        <div className="table-container">
        <div className="active-users-table">
          <h2>Active Users</h2>
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
              {users.map((user) => (
                <tr key={user.email}>
                  <td>{user.fname}</td>
                  <td>{user.Lname}</td>
                  <td>{user.email}</td>
                  <td>{user.PASSWORD}</td>
                  <td>
                    <button onClick={() => handleBanUser(user.email)}>Ban</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        <div className="banned-users-table">
          <h2>Banned Users</h2>
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
              {bannedUsers.map((user) => (
                <tr key={user.email}>
                  <td>{user.fname}</td>
                  <td>{user.Lname}</td>
                  <td>{user.email}</td>
                  <td>{user.PASSWORD}</td>
                  <td>
                    <button onClick={() => handleUnbanUser(user.email)}>
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
        <p>You dont have permission to ban users</p>
       )}
    </>
  );
}

export default Banplayer;