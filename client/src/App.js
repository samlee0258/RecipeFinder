// import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import backgroundImage from '../src/pages/serge-le-strat-rS4OSc9yhSo-unsplash.jpg'

function App() {
  // console.log(window.location);
  // const [serverData, setServerData] = useState("");

  // useEffect(() => {
  //   async function getServerData() {
  //     const resp = await fetch('/api/hello');
  //     const data = await resp.json();

  //     console.log('Data from server:', data);

  //     setServerData(data.message);
  //   }

  //   getServerData();
  // }, [serverData]);

  return (
    <div className="App"
         style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          width: '100%',
          height: '100vh'
      }}
    >
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
