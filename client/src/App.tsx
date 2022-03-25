import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { Login } from './Login/Login';
import { Dashboard } from './Dashboard/Dashboard';

const code = new URLSearchParams(window.location.search).get('code');

//if ther is code return dashboard otherwise Login
const isCode = ():JSX.Element =>{
  return code  ? <Dashboard code={code} /> : <Login />
}

function App() {
  return (
    <div className="App">
      {isCode()}

    </div>
  );
}

export default App;
