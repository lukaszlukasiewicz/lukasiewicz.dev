import * as fs from 'fs';
import getJsonData from './getJsonData';

var SpotifyWebApi = require('spotify-web-api-node');

const file = 'data/spotify.json'

const updateSpotify = async () => {

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SERVER,
  });

  const credentials = await spotifyApi.clientCredentialsGrant()
  spotifyApi.setAccessToken(credentials.body['access_token']);
  const playlistData = await spotifyApi.getPlaylist('1EH2HcV2BF8SjiHshYEAF5?si=6361a2f742eb4deb')
  const tracks = playlistData.body.tracks.items.reverse().slice(0, 4).map(({ track }: any) => {
    return {
      album: track.album.name,
      covers: track.album.images[0],
      artist: track.artists.map((artist: any) => artist.name).join(', '),
      title: track.name,
      url: track.external_urls.spotify
    }
  })
  const data = {
    updated: Date.now(),
    tracks: tracks
  }
  fs.writeFile(file, JSON.stringify(data), err => {
    if (err) console.log("error writing file", file, err)
  })
}

const getSpotifyTracks = () => getJsonData(file, updateSpotify)

export default getSpotifyTracks