import * as fs from 'fs';

const getJsonData = (file: string, updateCb = () => { }) => {
  const data = fs.readFileSync(file, 'utf8')
  const parsedData = JSON.parse(data)
  if (!parsedData.updated || Date.now() - parsedData.updated > 24 * 60 * 60 * 1000) updateCb()
  return parsedData
}

export default getJsonData