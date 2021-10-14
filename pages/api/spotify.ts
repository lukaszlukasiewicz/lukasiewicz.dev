import type { NextApiRequest, NextApiResponse } from 'next'
import * as fs from 'fs';

var SpotifyWebApi = require('spotify-web-api-node');

type Data = {
  updated?: number,
  data: string,
  error?: boolean,
}

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
    if (err) throw err
  })
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const data = fs.readFileSync(file, 'utf8')
    const parsedData = JSON.parse(data)
    res.status(200).json(parsedData)
    if (Date.now() - (parsedData.updated || 100000) > 60 * 1000) updateSpotify()
  } catch (err: unknown) {
    res.status(200).json({
      error: true,
      data: JSON.stringify(err)
    })
  }
}
