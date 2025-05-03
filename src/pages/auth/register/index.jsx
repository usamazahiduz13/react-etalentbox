import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import GoogleIcon from '../../../assets/imgs/auth/google.png';
import MicrosoftIcon from '../../../assets/imgs/auth/microsoft.png';
import { register } from '../../../services/auth';
import { toast } from 'sonner';
import logo from '../../../assets/logo.svg'
import registerAnimation from '../../../assets/animation/signup.json'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isAgree, setIsAgree] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const navigate = useNavigate();

  const checkPasswordStrength = (password) => {
    let strength = 0;
    const errors = [];

    // Check for minimum length
    if (password.length < 8) {
      errors.push("Password should be at least 8 characters");
    } else {
      strength += 1;
    }

    // Check for uppercase letters
    if (/[A-Z]/.test(password)) {
      strength += 1;
    } else {
      errors.push("Include at least one uppercase letter");
    }

    // Check for lowercase letters
    if (/[a-z]/.test(password)) {
      strength += 1;
    } else {
      errors.push("Include at least one lowercase letter");
    }

    // Check for numbers
    if (/[0-9]/.test(password)) {
      strength += 1;
    } else {
      errors.push("Include at least one number");
    }

    // Check for special characters
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      strength += 1;
    } else {
      errors.push("Include at least one special character");
    }

    setPasswordStrength(strength);
    setPasswordErrors(errors);
  };

  useEffect(() => {
    if (formData.password) {
      checkPasswordStrength(formData.password);
    }
  }, [formData.password]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    
    // Validate password
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }
    
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      toast.error("Password must be at least 8 characters");
      return;
    }
    
    if (!/[a-zA-Z]/.test(formData.password) || !/[0-9]/.test(formData.password)) {
      setError("Password must contain both letters and numbers");
      toast.error("Password must contain both letters and numbers");
      return;
    }
    
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
        <div className="h-full w-full ma-w-[500px] flex items-center justify-center p-8">
         <Lottie animationData={registerAnimation} loop={true}  />
        </div>
      </div>

      <div className="w-full md:w-1/2 md:p-8 sm:p-4 p-2 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full bg-white rounded-[16px] py-6 md:px-8 sm:px-4 px-2 shadow-2xl" >
          <div className='text-3xl font-medium text-center mb-2 text-[#14589C] flex items-center justify-center gap-2'>
            <img src={logo} alt="eTalentBox Logo" className="h-8 md:h-10" />
            <span className="text-2xl font-bold">e talent</span>
          </div>
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
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Create a password" 
                  value={formData.password} 
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
                <button 
                  type="button" 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center outline-none" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              
              {/* Password strength bar */}
              {formData.password && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        passwordStrength === 0 ? 'bg-red-500 w-0' :
                        passwordStrength === 1 ? 'bg-red-500 w-1/5' :
                        passwordStrength === 2 ? 'bg-orange-500 w-2/5' :
                        passwordStrength === 3 ? 'bg-yellow-500 w-3/5' :
                        passwordStrength === 4 ? 'bg-blue-500 w-4/5' :
                        'bg-green-500 w-full'
                      }`}
                    ></div>
                  </div>
                  <p className="text-xs mt-1 text-gray-500">
                    {passwordStrength === 0 && "Very weak"}
                    {passwordStrength === 1 && "Weak"}
                    {passwordStrength === 2 && "Fair"}
                    {passwordStrength === 3 && "Good"}
                    {passwordStrength === 4 && "Strong"}
                    {passwordStrength === 5 && "Very strong"}
                  </p>
                  
                  {passwordErrors.length > 0 && (
                    <ul className="mt-1 text-xs text-red-500 list-disc list-inside">
                      {passwordErrors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Confirm your password" 
                  value={formData.confirmPassword} 
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  required
                />
                <button 
                  type="button" 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center outline-none" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-xs mt-1 text-red-500">Passwords do not match</p>
              )}
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
          <div className='mt-2 flex gap-2 justify-center items-center w-full'>
          <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full">
              <img src={MicrosoftIcon} width={25} alt="Microsoft logo" />
            </button>

            <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full">
              <img src={GoogleIcon} width={25} alt="Google logo" />
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