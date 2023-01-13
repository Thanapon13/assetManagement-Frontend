import axios from '../api/axios'
import useAuth from './useAuth'

const useLogout = () => {
  const { setAuth } = useAuth()

  const logout = async () => {
    setAuth()
    // localStorage.setItem('persist', false)
    try {
      const response = await axios.post(
        '/api/auth/logout',
        {},
        {
          withCredentials: true,
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  return logout
}

export default useLogout
