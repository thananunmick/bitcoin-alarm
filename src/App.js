import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import useSound from 'use-sound';
import alarm from './alarm.mp3';

function App() {

  const [btcState, setBtcState] = useState({
    loading: false,
    data: null,
  });

  const [currentDate, setCurrentDate] = useState(new Date());
  const [play] = useSound(alarm);

  useEffect(() => {
    setBtcState({loading: true})
    const apiUrl = "https://api.coindesk.com/v1/bpi/currentprice.json";
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        setBtcState({
          loading: false,
          data: data,
        })
      });
    setTimeout(() => setCurrentDate(new Date()), 60000);

    if (btcState.data != null && btcState.data.bpi.USD.rate_float < 22800) {
      play();
    }

  }, [currentDate]);

  return (
    <div className="App">
      <div className="Block">
        <h1>Bitcoin Price</h1>
        {btcState.data != null &&
          <p>${btcState.data.bpi.USD.rate}</p>
        }
        {/* <button onClick={stop}>Click To Stop!</button> */}
      </div>
    </div>
  );
}

export default App;
