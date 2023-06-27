import React, { useState, useEffect } from 'react';
// import { ServiceWorkerUpdateListener } from './ServiceWorkerUpdateListener.js'
import {ServiceWorkerUpdateListener} from './ServiceWorkerUpdateLIstener';
import logo from './logo.svg';
import './App.css';
import { fetchToken } from './api/loginToken.js';
import { getVersion } from './api/getVersion.js';
import { getDashBoard } from './api/getDashboard.js';


function App() {
  const [version, setVersion] = useState("");
  const [updateWaiting, setUpdateWaiting] = useState(false);
  const [registration, setRegistration] = useState(null);
  const [swListener, setSwListener] = useState({});
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [flag, setFlag] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);


  useEffect( () => {
    const fetchData = async () => {
      const res = await getVersion();
   
      if (res) {
        setVersion(res.app_version);

      }
    }
    fetchData();
    if (process.env.NODE_ENV !== "development") {
      let listener = new ServiceWorkerUpdateListener();
      setSwListener(listener);
      listener.onupdateinstalling = (installingEvent) => {
        console.log("SW installed", installingEvent);
      };
      listener.onupdatewaiting = (waitingEvent) => {
        console.log("new update waiting", waitingEvent);
        setUpdateWaiting(true);
      };
      listener.onupdateready = (event) => {
        console.log("updateready event");
        window.location.reload();
      };
      navigator.serviceWorker.getRegistration().then((reg) => {
        listener.addRegistration(reg);
        setRegistration(reg);
      });

      return () => listener.removeEventListener();
    } else {
      //do nothing because no sw in development
    }
  }, []);


  const handleUpdate = () => {
    swListener.skipWaiting(registration.waiting);
  }

  const handleOnChange = (e) => {
    const { id, value } = e.target;

    switch (id) {
      case "userName":
        setUserName(value);
        break;

      case "password":
        setPassword(value);
        break;

      default:
        break;
    }
  };

  const callDashboard = () => {
    const LSToken = JSON.parse(`${localStorage.getItem('token')}`);
    if (LSToken) {
      console.log("called")
      const currentTime = new Date();
      const mobTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const payload2 = {
        "procurement_consultant_id": null,
        "referid": "",
        "track_id": LSToken.trackId,
        "mobtime": mobTime,
        "simno": "111111111",
        "ip": "127.0.0.0"
      };

      getDashBoard(payload2)
        .then((response) => {
          console.log("response", response.data)
          setDashboardData(response.data);
        })
        .catch((error) => {
          // Handle error if the request fails
          console.error("Error fetching dashboard data:", error);
        });
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission logic here
    if (!userName || !password) {
      setMessage("Fill up all the form!");
    }

    const payload = {
      "user_name": userName,
      "password": password,
      "device_token": "uuuu:APA91bEd7wgbk6Y5KUJjpDgJeY9-p6Fwdf7PuST8mHbkw2nwrILKLSpQiGIZgtp0DLLTYorJ9m25gJ9d-T41Wjxov4AZNtqUob28Ur6Nh4HR9xS2aQWxT2Af6jdinYkfHCrFDsD0PSMc",
      "device_type": "ios"
    }
    const res = fetchToken(payload);

    res.then((data) => {
      console.log("data", data);
      const tokenArr = {
        "token": data.access_token,
        "name": data.name,
        "userId": data.user_id,
        "userName": data.username,
        "userType": data.user_type,
        "email": data.email,
        "emNo": data.emp_no,
        "trackId": data.track_id,
      }
      localStorage.setItem('token', JSON.stringify(tokenArr));

      setFlag(true);
     // callDashboard();
    })

    // Reset the form

  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userName">Username:</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handleOnChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      <div>Version:{version}</div>
      <br />
      <br />
      {dashboardData && dashboardData.procurement_dashboard?.items?.map((item, index) =>
        <div>{item.count}</div>
      )
      }
      <br />
      <UpdateWaiting updateWaiting={updateWaiting} handleUpdate={handleUpdate} />
    </div>
  );
}

export default App;

const UpdateWaiting = ({ updateWaiting, handleUpdate }) => {
  if (!updateWaiting) return <></>
  return (
    <div>
      Update waiting! <button onClick={handleUpdate}>Update</button>
    </div>
  )
}