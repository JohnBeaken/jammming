import React, {useState} from 'react';
import styles from './App.module.css';
import SearchBar from './SearchBar/SearchBar.js';
import Playlist from './Playlist/Playlist.js';
import Login from './Login/Login.js';
import UserDashboard from './UserDashboard/UserDashboard.js';
import Spotify from './utilities/Spotify.js';

function App() {

  const [playlist, setPlaylist] = useState([]);
  const [name, setName] = useState("");
  const [token, setToken] = useState(null);
  const [login, setLogin] = useState(null);
  const [results, setResults] = useState([]);
  const [userData, setUserData] = useState(null);

  const updateName = (e) => {
    setName(e.target.value);
  };

  const addSong = (song) => {
    setPlaylist(prev => [...prev, song]);
  };

  const removeSong = (song) => {
    setPlaylist(playlist.filter(test => test.id !== song.id));
  };

  const clearPlaylist = () => {
    setPlaylist([]);
  }

  async function handleLogin() {
    const codeTokenMatch = window.location.href.match(/code=([^&]*)/);
    if (codeTokenMatch) {
      console.log("here!");
      const data = await Spotify.parseToken(codeTokenMatch[1]);
      setToken(data);
      setLogin(true);
    }
    else {
      setLogin(false);
      Spotify.getLogin();
    }   
  };

  if (login) {
    return (
      <div className={styles.app}>
        <div className={styles.header}>
          <UserDashboard 
            token={token.access_token}
            setUserData={setUserData}
          />
        </div>
        <div className={styles.body}>
          <>
            <section
              className={styles.search}
            >
              <SearchBar
                playlist={playlist}
                addSong={addSong}
                token={token.access_token}
                setToken={setToken}
                results={results}
                setResults={setResults}
              />
            </section>
            <section
              className={styles.playlist}
            >
              <Playlist
                playlist={playlist}
                name={name}
                setName={updateName}
                removeSong={removeSong}
                clearPlaylist={clearPlaylist}
                userData={userData}
                token={token.access_token}
              />
            </section>
          </>
        </div>
      </div>
    );
  }
  else {
    return (
      <div className={styles.app}>
        <div className={styles.header}>
          <h1>Spotify Playlist Builder</h1>
          </div>
        <div className={styles.body}>
          <Login login={handleLogin}/>
        </div>
      </div>
    );
  }
}

export default App;
