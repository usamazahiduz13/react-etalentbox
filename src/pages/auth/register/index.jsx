import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterImg from '../../../assets/imgs/auth/register.png';
import { fetchApi } from '../../../utils/axios';
import GoogleIcon from '../../../assets/imgs/auth/google.png';
import MicrosoftIcon from '../../../assets/imgs/auth/microsoft.png';
import { register } from '../../../services/auth';
import { toast } from 'sonner';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isAgree, setIsAgree] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      const response = await register(formData);
      console.log('Registration successful:', response);
      toast.success('Registration successful! Please login to continue.');
      navigate('/auth/login');
    } catch (err) {
      setError(err.message || 'Registration failed');
      toast.error(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left side - Form */}
      
      
      {/* Right side - Image */}
      <div className="hidden md:block md:w-1/2 ">
        <div className="h-full flex items-center justify-center p-8">
          <img src={RegisterImg} alt="Register" className="max-w-full max-h-full object-contain" />
        </div>
      </div>

      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full bg-white rounded-[16px] py-6 px-8 shadow-2xl" >
          <div className='text-3xl font-medium text-center mb-2 text-[#14589C]'>e talent</div>
          <div className="text-2xl font-bold mb-2 ext-center">Create Account</div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleRegister}>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-[#D8D8D8] rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email" 
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Create a password" 
                value={formData.password} 
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Confirm your password" 
                value={formData.confirmPassword} 
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                required
              />
            </div>
            
            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 text-[#14589C] focus:ring-blue-500 border-gray-300 rounded"
                checked={isAgree}
                onChange={() => setIsAgree(!isAgree)}
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
              </label>
            </div>
            
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white primary-button focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
          <p className='text-center text-sm text-gray-600 mt-4'>or sign up with</p>
          <div className='mt-2 flex gap-2 flex-col justify-center items-center w-full'>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded flex items-center justify-center gap-2 font-medium w-full">
              <img src={MicrosoftIcon} width={25} alt="Microsoft logo" />
              Sign in with Microsoft
            </button>

            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded flex items-center justify-center gap-2 font-medium w-full" >
              <img src={GoogleIcon} width={25} alt="Google logo" />
              Sign in with Google
            </button>
          </div>

          <div className="flex items-center space-x-1 mt-4 text-center text-sm ">
            <p className="text-gray-600">Already have an account?</p>
            <Link to="/auth/login" className="text-blue-600 hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; 