import axios from '../api/axios'
import useAuth from './useAuth'

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth()

  // console.log(auth?.accessToken)

  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      Authorization: `${auth.accessToken}`,
    },
    withCredentails: true,
  }

  const refresh = async () => {
    const response = await axios.get('/api/auth/refresh', axiosConfig)
    setAuth((prev) => {
      console.log(JSON.stringify(prev))
      console.log(response.data.accessToken)
      return { ...prev, accessToken: response.data.accessToken }
    })

    return response.data.accessToken
  }

  return refresh
}

export default useRefreshToken
