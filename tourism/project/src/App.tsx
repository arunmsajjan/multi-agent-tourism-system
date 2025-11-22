import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { DashboardPage } from './pages/DashboardPage';

function AppContent() {
  const [authPage, setAuthPage] = useState<'login' | 'signup'>('login');
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (user) {
      setAuthPage('login');
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="animate-pulse">
          <div className="text-center">
            <div className="h-12 w-48 bg-gray-200 rounded-lg mb-4 mx-auto"></div>
            <div className="h-4 w-64 bg-gray-200 rounded mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    if (authPage === 'login') {
      return <LoginPage onSwitchToSignUp={() => setAuthPage('signup')} />;
    } else {
      return <SignUpPage onSwitchToLogin={() => setAuthPage('login')} />;
    }
  }

  return <DashboardPage />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
