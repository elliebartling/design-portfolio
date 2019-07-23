import axios from 'axios'

export async function handler() {
  const { data } = await axios.get('http://api.icndb.com/jokes/random')
  console.log(data)

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
}
