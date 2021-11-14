import React, {useState, useEffect} from 'react';
import SiteBar from './home/Navbar';
import Auth from './auth/Auth';
import WorkoutIndex from './workouts/WorkoutIndex';
import './App.css';

function App() {
  const [sessionToken, setSessionToken] = useState(''); 

  useEffect(() => { 
  if (localStorage.getItem('token')){
    setSessionToken(localStorage.getItem('token'));
  }
}, [])

const updateToken = (newToken) => { 
  localStorage.setItem('token', newToken);
  setSessionToken(newToken);
  console.log("This is the sessionToken:", sessionToken);
}

const clearToken = () => {
  localStorage.clear();
  setSessionToken('')
  console.log("This is the clearedToken:", sessionToken);;
}

const protectedViews = () => {
  return (sessionToken === localStorage.getItem('token') ? <WorkoutIndex token={sessionToken}/> : <Auth updateToken={updateToken} />)
        
}
//render method is down here  

  return (
    <div>
      <SiteBar clickLogout={clearToken} />
      {protectedViews()}
    </div>
  );
}

export default App;
