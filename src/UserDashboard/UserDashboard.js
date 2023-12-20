import React, {useState, useEffect} from 'react';
import Spotify from '../utilities/Spotify.js';
import styles from './userDashboard.module.css';

function UserDashboard(props) {
    const [userName, setUserName] = useState(null);
    const [profPic, setProfPic] = useState(null);
    const [showProfile, setShowProfile] = useState(false);

    useEffect(() => {
        async function getData() {
            const data = await Spotify.getUserData(props.token);
            setProfPic(data.images[0].url);
            setUserName(data.display_name);
            props.setUserData(data);
            setShowProfile(true);
        }
        getData();
    }, [props.token])

    return (
        <div className={styles.wrapper}>
            <h1>Spotify Playlist Builder</h1>
            <div className={styles.profile}>
                <h3>Welcome, {userName}</h3>
                <img src={profPic}></img>
            </div>
        </div>
    );
}

export default UserDashboard;