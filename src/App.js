import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ManageLayout from './components/layouts/ManageLayout'; 
import IndexPage from './components/pages/IndexPage'

import SignIn from './components/sessions/SignIn'
import SignUp from './components/sessions/SignUp'


import { SessionContext } from './contexts/SessionContext'; 

import ManageIndex from './components/manage/ManageIndex';

function App() {

  const { data } = useContext(SessionContext); 
  const loggedIn = data.me !== null; 

  return (
    <Router>
      <Routes>
        { loggedIn ? (
            <Route path='/dashboard'>
              <ManageLayout>
                <ManageIndex />
              </ManageLayout>
            </Route>
        ) : (
          <>
            <Route path='/signup'>
              <SignUp />
            </Route>
            <Route path='/signin'>
              <SignIn />
            </Route>
          </>
        )}
        <Route  exact path='/'>
          <IndexPage />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
