// import './App.css';
// import Axios from 'axios';


// function App() {

//   const postTasks = async () => {
//     const res = await Axios.post('http://localhost:4000/api/tasks', {
//       "id": 123,
//       "info": "Some task"
//     })
//     console.log(res)
//   }
//   return (
//     <div className="App">
//       <button onClick={postTasks}>POST</button>
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from 'react';
import { Flex, ChakraProvider, Image } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Login } from './routes/login';
import { PrivateRoute } from './routes/privateRoute';
import { Dashboard } from './routes/dashboard';
import { CreateLead } from './routes/createLead';
import { UserProfile } from './routes/userProfile';
import { ChangePassword } from './routes/changePassword';
import { NewLead } from './routes/newLead';

function App() {
  const [theme, setTheme] = useState({})
 
  const fetchTheme = async () => {
    try {
      const module = await import(`./theme/${process.env.REACT_APP_THEME}/index`);
      setTheme(module.default);
    } catch (err) {
      console.log("Failed to load moment", err);
    }
  }

  useEffect(() => {
    fetchTheme();
  }, []);

  if (Object.keys(theme).length === 0) {
    return (
      <Flex alignItems={'center'} justifyContent="center" w="100%" h="100%" position="fixed" left="0" top="0">
        <Image
          src={`/images/${process.env.REACT_APP_THEME}/${process.env.REACT_APP_LOGO_FILE}`}
          alt={`${process.env.REACT_APP_NAME}`}
          w="300px"
          h='250px'
          objectFit="contain"
          objectPosition="center center"
        />
      </Flex>
    )
  }

  return (
    <ChakraProvider resetCSS theme={theme}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>} />
            <Route element={<PrivateRoute />}>
             <Route element={<Dashboard />} path='/dashboard'></Route>
             <Route element={<Navigate to="/dashboard" replace />}  path='/'></Route> 
             <Route element={<CreateLead />} path='/createLead'></Route>   
             <Route element={<UserProfile />} path='/userProfile'></Route>   
             <Route element={<ChangePassword />} path='/changePassword'></Route>
             <Route element={<NewLead/>} path='/newLeads'></Route>   

          </Route>
        </Routes>
      </Router>
    </ChakraProvider>
  );
}
export default App;

