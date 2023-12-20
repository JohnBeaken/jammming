import React, { useState } from 'react';
import searchStyles from './searchBar.module.css';
import SearchResults from '../SearchResults/SearchResults.js';
import Spotify from '..//utilities/Spotify.js';

function SearchBar(props) {

    async function handleChange(e) {
        let query = e.target.value;
        console.log(query);
        if (query !== '') {
            let temp = await Spotify.getSearch(props.token, query, props.playlist)
            props.setResults(temp);
            console.log(temp);
        }
        else {
            props.setResults([]);
        }
    };

    return (
        <div className={searchStyles.all}>
            <form className={searchStyles.form}>
                <input
                    onChange={handleChange}
                    className={searchStyles.bar}
                    type="search"
                    placeholder='Search Spotify'
                />
            </form>
            <SearchResults
                results={props.results}
                playlist={props.playlist}
                addSong={props.addSong}
                setResults={props.setResults}
            />
        </div>
    );

}

export default SearchBar;