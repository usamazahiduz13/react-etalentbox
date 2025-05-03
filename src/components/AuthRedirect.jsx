import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// This component handles redirects after login based on authentication state
const AuthRedirect = () => {
  const { isLogin, userInfo } = useSelector(state => state.auth)
  const navigate = useNavigate()


  // This is just a loading component while redirect happens
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
      <p className="text-gray-600">Redirecting...</p>
    </div>
  )
}

export default AuthRedirect 