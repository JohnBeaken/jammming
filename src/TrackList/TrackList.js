import React from 'react';
import Track from '../Track/Track.js';
import styles from './trackList.module.css';

function TrackList(props) {
    return (
        <div className={styles.wholeList}>
            {
                props.playlist.map(track => {
                    return (
                        <Track
                            song={track}
                            removeSong={props.removeSong}
                            playlist={props.playlist}
                        />
                    )
                })
            }
        </div>
    )
};

export default TrackList;