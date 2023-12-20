import {Buffer} from 'buffer';

const clientID = "2b3f218137e947c097c3c48568c9c238";
const clientSecret = "9df8d0ff9409447fa3cb43414ca46a14";
const redirectUri = "http://localhost:3000/";
const buffer = Buffer.from(clientID + ":" + clientSecret).toString('base64');

const spotify = {

    getLogin: function() {
        const accessUrl = `https://accounts.spotify.com/authorize/?client_id=${clientID}&response_type=code&redirect_uri=${redirectUri}&scope=playlist-modify-private playlist-modify-public`;
        window.location = accessUrl;
    },

    parseToken: async function(codeToken) {
        const response = await fetch(`https://accounts.spotify.com/api/token?grant_type=authorization_code&code=${codeToken}&redirect_uri=${redirectUri}&client_id=${clientID}&client_secret=${clientSecret}`, {
            method: "POST",
            headers: {
            //'Authorization': 'Basic ' + buffer,
            'content-type': "application/x-www-form-urlencoded"
            }
        });
        const data = await response.json();
        console.log(data);
        return data;
    },

    getUserData: async function(userToken) {
        const response = await fetch("https://api.spotify.com/v1/me", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });
        const data = await response.json();
        console.log(data);
        return data;
    },

    getSearch: async function(userToken, query, playlist) {
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=track:${query}`, {
            headers: {
                Authorization: "Bearer " + userToken
            },
            method: "GET"
        });
        let data = await response.json();
        let exceptions = playlist.filter(track => track.external_ids.isrc);
        console.log(exceptions);
        console.log(data);
        data = data.tracks.items.filter(track => {
            for (let i = 0; i < exceptions.length; i++ ) {
                if (track.external_ids.isrc === exceptions[i].external_ids.isrc)
                    return false;
            }
            return true;
        })
        console.log(data);
        return data;
    },

    addToSpotify: async function(playlist, user, name = 'jammming playlist', userToken) {
        if (user === null)
            return 2;
        const response = await fetch(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
            body: JSON.stringify({
                name: name
            }),
            method: "POST",
            headers: {
                Authorization: "Bearer " + userToken,
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        console.log(data);
        const uris = playlist.map(track => track.uri);
        const playlistID = data.id;
        const response2 = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
            body: JSON.stringify({
                "uris": uris,
            }),
            method: "POST",
            headers: {
                Authorization: "Bearer " + userToken,
                "Content-Type": "application/json"
            }
        });
        console.log(response2.json());
        return 0;
    },

    refreshToken: async function(token, refreshToken) {

    }
}

export default spotify;