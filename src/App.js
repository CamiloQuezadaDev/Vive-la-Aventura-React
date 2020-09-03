import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import IndexPage from './components/pages/IndexPage'
import SignIn from './components/sessions/SignIn'
import SignUp from './components/sessions/SignUp'

import ManageIndex from './components/manage/ManageIndex';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/dashboard'>
          <ManageIndex />
        </Route>
        <Route path='/signUp'>
          <SignUp />
        </Route>
        <Route path='/signIn'>
          <SignIn />
        </Route>
        <Route  exact path='/'>
          <IndexPage />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
