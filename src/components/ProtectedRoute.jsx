import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';
import { toast } from 'sonner';

const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector(state => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please login to access this page');
      navigate('/auth/login');
    }
  }, [isAuthenticated, navigate]);

  // If authenticated, render the child components
  // Otherwise, the useEffect will redirect to login
  return isAuthenticated ? <Outlet /> : null;
};

export default ProtectedRoute; 