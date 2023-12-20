import React from 'react';
import TrackList from '../TrackList/TrackList.js';
import styles from './playlist.module.css';
import barStyles from '../SearchBar/searchBar.module.css';
import Spotify from '../utilities/Spotify.js';

function Playlist(props) {

    const handleClick = async () => {
        let success = await Spotify.addToSpotify(props.playlist, props.userData, props.name, props.token);
        console.log(success);
        if (success === 0) {
            props.clearPlaylist();
        }
    }

    return (
        <div className={styles.playlist}>
            <form className={barStyles.form}>
                <input
                    onChange={props.setName}
                    className={barStyles.bar}
                    type="text"
                    placeholder='Playlist Name'
                    aria-placeholder='Playlist Name'
                ></input>
            </form>
            <TrackList 
                playlist={props.playlist}
                className={styles.playlist}
                removeSong={props.removeSong}
            />
            <div className={styles.buttonWrapper}>
            <button
                    onClick={handleClick}
                    className={styles.add}
                >Save to Spotify</button>
            </div>
        </div>
    );
};

export default Playlist;