import axios from "axios";

export default function getClues(category: string = "nonfiction") {
  return axios({
    method: 'get',
    url: process.env.NEXT_PUBLIC_TRIVIA_API + '/clues',
    params: {
      category
    }
  }).then((call) => {
    return {
      data: call.data,
      error: false
    }
  }).catch((err) => {
    return {
      data: null,
      error: true
    }
  })
}