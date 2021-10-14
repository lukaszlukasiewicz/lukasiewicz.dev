import type { NextApiRequest, NextApiResponse } from 'next'
import * as fs from 'fs';

type Data = {
  updated?: number,
  data: string,
  error?: boolean,
}

const file = 'data/pocket.json'

const updatePocketPosts = async (posts: string[]) => {

  const pocketData = await fetch("https://getpocket.com/v3/get", {
    method: 'POST',
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
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
  console.log(pocketJson)
  const data = {
    updated: Date.now(),
    posts: Object.values(pocketJson.list)
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
    if (Date.now() - parsedData.updated > 60 * 1000) updatePocketPosts(parsedData.posts)
  } catch (err: unknown) {
    res.status(200).json({
      error: true,
      data: JSON.stringify(err)
    })
  }
}
