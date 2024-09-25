import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LogIn from './logIn.jsx';
import Header from './Header.jsx';
import Dashboard from './dashboard.jsx';
import Financial_messages from './Financial_messages.jsx';
import Answers from './Answers.jsx';
import Account_statements from './Account_statements.jsx';
import Free_massages from './Free_messages.jsx';

function App() {

  return(
    <>
      <LogIn />     
    </>
  );
}




function Main() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<App />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/financial_messages" element={<Financial_messages />}/>
              <Route path="/answers" element={<Answers />} />
              <Route path="/account_statements" element={<Account_statements />} />
              <Route path="/free_massages" element={<Free_massages />} />
          </Routes>
      </Router>
  );
}

export default Main;