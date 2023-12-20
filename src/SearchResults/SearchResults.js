import React, {useState} from 'react';
import styles from './searchResults.module.css';
import Track from '../Track/Track';

function SearchResults(props) {

    return (
        <div className={styles.results}>
            <ul>
            {
                props.results.map((result) => {
                    return (
                        <Track
                            song={result}
                            addSong={props.addSong}
                            results={props.results}
                            setResults={props.setResults}
                        /> 

                    );
                })
            }
            </ul>
        </div>
    );
}

export default SearchResults;