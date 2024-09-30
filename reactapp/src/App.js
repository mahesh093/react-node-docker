import logo from './logo.svg';
import { useState } from "react";
import React from 'react';
import './App.css';

function App() {

  // cheak server configuration
  const [data, setData] = React.useState(null);
  const url="http://localhost:3000";
  React.useEffect(() => {
    fetch(`${url}/api`)
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);


  // input box configuration
  // const [search, setSearch] = useState("");
  const [userName, setUserName] = useState("");
  const [mobile, setMobile] = useState("");
  const [userdetails, setDetails] = useState("");
  // const [searchData, setSearchdata] = useState("");
  const [searchalldata, setsearchalldata] = useState("");


  const handleChange = (event) => {
    // if (event.target.name === "search") {
    //   setSearch(event.target.value);
    // }
    if (event.target.name === "userName") {
      setUserName(event.target.value);
    } else if (event.target.name === "mobile") {
      setMobile(event.target.value);
    } else {
      setDetails(event.target.value);
    }
  };


  //  not necessary
  // const handleClickforSearch = (event) => {
  //   event.preventDefault();
  //   performSearch();
  //   setSearch("");
  // };
  // // search item on database
  // const performSearch = () => {
  //   fetch(`/user/${search}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setSearchdata(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error retrieving search results:", error);
  //     });
  // };

  // search item on database
  
  
  const alldata = () => {
    fetch(`${url}/user`)
      .then((response) => response.json())
      .then((data) => {
        setsearchalldata(data);
      })
      .catch((error) => {
        console.error("Error retrieving search results:", error);
      });
  };

  const handleClickforAddUser = (event) => {
    event.preventDefault();
    const userData = {
      name: userName,
      mobile: mobile,
      details: userdetails,
    };
    sendDataToDatabase(userData);
    setUserName("");
    setMobile("");
    setDetails("");
  };

  const sendDataToDatabase = (userData) => {
    fetch(`${url}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data successfully sent to the database:", data);
      })
      .catch((error) => {
        console.error("Error sending data to the database:", error);
      });
  };

  return (
    <div className="container">
      <div className="first-part ">
        <p>{!data ? "Loading..." : data}</p>
        {/* this not necessary */}
        {/* <input
          type="text"
          id="message"
          name="search"
          className="text-box"
          onChange={handleChange}
          value={search}
          placeholder="please enter name or phone number"
        />
        <button className="btn" onClick={handleClickforSearch}>
          Cheak Data
        </button> */}
        <button className="btn" onClick={alldata}>
          show data
        </button>
        <h2>Message:</h2>
        <p>{JSON.stringify(searchalldata)}</p>
      </div>
      {/* second box for add user information  */}
      <div className="second-part">
        <h2>User Information Add</h2>
        <br />
        <>Name: </>
        <input
          type="text"
          id="userName"
          name="userName"
          className="text-box"
          placeholder="Name"
          onChange={handleChange}
          value={userName}
        />
        <br />
        <>Phone: </>
        <input
          type="text"
          id="mobile"
          name="mobile"
          className="text-box"
          placeholder="123-133-12"
          onChange={handleChange}
          value={mobile}
        />
        <br />
        <>Description : </>
        <input
          type="text"
          id="details"
          name="details"
          className="text-box"
          placeholder="details information about user"
          onChange={handleChange}
          value={userdetails}
        />
        <br />
        <button className="btn" onClick={handleClickforAddUser}>
          Add data
        </button>
        {/* <p>{updated}</p> */}
      </div>
      <br />
    </div>
  );
}

export default App;
