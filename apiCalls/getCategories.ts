import axios from "axios";

export default function getCategories(count: number = 1, offset: number = 0) {
  return axios({
    method: 'get',
    url: process.env.NEXT_PUBLIC_TRIVIA_API + '/categories',
    params: {
      count,
      offset
    }
  }).then((call) => {
    return {
      data: call.data,
      error: true
    }
  }).catch((err) => {
    return {
      data: null,
      error: true
    }
  })
}