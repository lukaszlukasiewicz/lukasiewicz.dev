import * as fs from 'fs';
import getJsonData from './getJsonData';

const file = 'data/pocket.json'

const updatePocketPosts = async () => {

  const pocketData = await fetch("https://getpocket.com/v3/get", {
    method: 'POST',
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "consumer_key": process.env.POCKET_CONSUMER_KEY,
      "access_token": process.env.POCKET_ACCESS_TOKEN,
      "tag": "reading",
      "sort": "newest",
      "count": 4
    })
  })
  const pocketJson = await pocketData.json()
  const data = {
    updated: Date.now(),
    posts: Object.values(pocketJson.list)
  }
  fs.writeFile(file, JSON.stringify(data), err => {
    if (err) console.log("error writing file", file, err)
  })
}

const getPocketPosts = () => getJsonData(file, updatePocketPosts)

export default getPocketPosts