import React from 'react';
import styles from './track.module.css';

function Track(props) {

    return (
        <div style={{
            backgroundImage: `url(${props.song.album.images[0].url})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }}
        className={styles.trackWrapper}>
            <div 
                className={props.addSong? styles.btnTrack : styles.track}
            >
                <p className={styles.song}>{props.song.name}</p>
                {props.addSong && <button
                    className={styles.addSongBtn}
                    onClick={
                        () => {
                            props.addSong(props.song);
                            props.setResults(props.results.filter(track => track.uri !== props.song.uri));
                        }
                    }
                >+</button>}
                {props.removeSong && <button
                    className={styles.removeSongBtn}
                    onClick={
                        () => props.removeSong(props.playlist.find(query => query.id === props.song.id))
                    }
                >-</button>}
                <p className={styles.artist}>{props.song.artists[0].name}</p>
                <p className={styles.dash}>-</p>
                {!props.addSong &&<p className={styles.album}>{props.song.album.name}</p>}
            </div>
        </div>
    );
};

export default Track;