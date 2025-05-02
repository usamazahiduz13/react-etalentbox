import React from "react";
import LoginImg from "../../../assets/imgs/auth/sign-img.png";
import MicrosoftImg from "../../../assets/imgs/auth/microsoft.png";
import GoogleImg from "../../../assets/imgs/auth/google.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { RxEyeOpen, RxEyeClosed } from "react-icons/rx";
import { resetPasswordEmail } from "../../../services/auth";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../Redux/auth-slice";
import logo from '../../../assets/logo.svg'

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isAgree, setIsAgree] = useState(false);
  const [isSendLink, setIsSendLink] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, isNewUser } = useSelector(state => state.auth);

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      if (isNewUser) {
        navigate('/dashboard/add-details');
      } else {
        navigate('/dashboard');
      }
    }
  }, [isAuthenticated, isNewUser, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      await dispatch(login(formData)).unwrap();
      // Navigation will be handled by the useEffect above
    } catch (err) {
      // Error handling is done in the auth slice
      console.error('Login error:', err);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsSendLink(true);

    try {
      const response = await resetPasswordEmail(forgotPasswordEmail);
      toast.success(response.message);
      setShowForgotPasswordModal(false);
      setForgotPasswordEmail("");
    } catch (err) {
      toast.error(err.message || "Failed to send reset link");
    } finally {
      setIsSendLink(false);
    }
  };

  return (
    <div className="container mx-auto my-16 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="hidden md:flex justify-center items-center">
          <img
            src={LoginImg}
            className="max-w-[500px] w-full"
            alt="Login illustration"
          />
        </div>
        <div className="max-w-md mx-auto w-full bg-white rounded-[16px] py-8 md:px-8  sm:px-4  px-2 shadow-2xl">
          <div className="flex flex-col space-y-8 w-full">
            <div className="text-3xl font-medium text-center mb-4 text-[#14589C] flex items-center justify-center gap-2">
              <img src={logo} alt="eTalentBox Logo" className="h-8 md:h-10" />
              <span className="text-2xl font-bold">e talent</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-semibold">Sign in</h1>
              <p className="text-gray-600 text-sm">
                Welcome Back to Talent Hub!
              </p>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <form className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData?.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-[#D8D8D8] rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="w-full px-4 py-3 border border-[#D8D8D8] rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between gap-4">
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      placeholder="Password"
                      value={formData?.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="border-none outline-none bg-transparent flex-1"
                    />
                    <div
                      className="outline-none cursor-pointer text-gray-600"
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    >
                      {isPasswordVisible ? <RxEyeOpen /> : <RxEyeClosed />}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center">
                  <input
                    id="terms"
                    type="checkbox"
                    className="h-4 w-4 text-[#14589C] focus:ring-blue-500 border-gray-300 rounded"
                    checked={isAgree}
                    onChange={() => setIsAgree(!isAgree)}
                    required
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 block text-sm text-gray-700"
                  >
                   Remember me
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => setShowForgotPasswordModal(true)}
                  className="text-sm font-medium text-[#14589C] hover:underline whitespace-nowrap"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                onClick={handleLogin}
                className="primary-button w-full py-3 rounded-[8px]"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-600">Or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="flex gap-3 w-full items-center justify-center">
              <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full">
                <img src={MicrosoftImg} width={25} alt="Microsoft logo" />
              </button>

              <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full">
                <img src={GoogleImg} width={25} alt="Google logo" />
              </button>
            </div>

            <p className="text-center text-sm">
              Don't have an account?{" "}
              <Link to={"/auth/register"} className="text-blue-600 hover:underline">
                Create Now
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 bg-[#00000061] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
            <p className="text-gray-600 mb-4">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            <form onSubmit={handleForgotPassword}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D8D8D8] rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowForgotPasswordModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="primary-button px-4 py-2 rounded-lg"
                  disabled={isSendLink}
                >
                  {isSendLink ? "Sending..." : "Send Reset Link"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
