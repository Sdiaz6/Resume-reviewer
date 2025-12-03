import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      // Handle Firebase configuration errors gracefully
      const errorCode = err.code || '';
      const errorMessage = err.message || '';
      
      console.error('Login error:', { code: errorCode, message: errorMessage, error: err });
      
      if (errorCode === 'auth/operation-not-allowed' || errorMessage.includes('operation-not-allowed')) {
        setError('Email/Password authentication is not enabled. Please enable it in Firebase Console > Authentication > Sign-in method > Email/Password.');
      } else if (errorCode === 'auth/user-not-found' || errorMessage.includes('user-not-found')) {
        setError('No account found with this email. Please sign up first.');
      } else if (errorCode === 'auth/wrong-password' || errorMessage.includes('wrong-password')) {
        setError('Incorrect password. Please try again.');
      } else if (errorCode === 'auth/invalid-email' || errorMessage.includes('invalid-email')) {
        setError('Please enter a valid email address.');
      } else if (errorCode === 'auth/too-many-requests' || errorMessage.includes('too-many-requests')) {
        setError('Too many failed attempts. Please try again later.');
      } else if (errorCode?.includes('api-key-not-valid') || errorMessage?.includes('api-key')) {
        setError('Firebase is not configured. Please check the setup guide.');
      } else {
        setError(errorMessage || `Failed to sign in. Error: ${errorCode || 'Unknown error'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      await loginWithGoogle();
      navigate('/');
    } catch (err) {
      // Handle Firebase configuration errors gracefully
      const errorCode = err.code || '';
      const errorMessage = err.message || '';
      
      console.error('Google Login error:', { code: errorCode, message: errorMessage, error: err });
      
      if (errorCode === 'auth/operation-not-allowed' || errorCode === 'auth/configuration-not-found' || 
          errorMessage.includes('configuration-not-found') || errorMessage.includes('operation-not-allowed')) {
        setError('Google Sign-in is not enabled. Go to Firebase Console > Authentication > Sign-in method > Google > Enable.');
      } else if (errorCode === 'auth/popup-closed' || errorMessage.includes('popup-closed')) {
        setError('Sign-in popup was closed. Please try again.');
      } else if (errorCode === 'auth/popup-blocked' || errorMessage.includes('popup-blocked')) {
        setError('Popup was blocked. Please allow popups for localhost:5173 in your browser settings.');
      } else if (errorCode === 'auth/cancelled-popup-request' || errorMessage.includes('cancelled-popup')) {
        setError('Sign-in was cancelled. Please try again.');
      } else {
        setError(errorMessage || `Failed to sign in with Google. Error: ${errorCode || 'Unknown error'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '20px',
        padding: '40px',
        width: '100%',
        maxWidth: '450px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#1a1a1a',
          marginBottom: '10px',
          textAlign: 'center'
        }}>
          Welcome Back
        </h1>
        <p style={{
          color: '#64748b',
          textAlign: 'center',
          marginBottom: '30px'
        }}>
          Sign in to access your resumes
        </p>

        {error && (
          <div style={{
            background: error.includes('not configured') ? '#fef3c7' : '#fee2e2',
            color: error.includes('not configured') ? '#92400e' : '#dc2626',
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '14px',
            border: `1px solid ${error.includes('not configured') ? '#fbbf24' : '#fca5a5'}`,
            lineHeight: '1.5'
          }}>
            <div style={{ fontWeight: '600', marginBottom: '4px' }}>
              {error.includes('not configured') ? '⚠️ Setup Required' : '❌ Error'}
            </div>
            {error}
            {error.includes('not configured') && (
              <div style={{ marginTop: '8px', fontSize: '12px', opacity: 0.8 }}>
                See <code style={{ background: 'rgba(0,0,0,0.1)', padding: '2px 4px', borderRadius: '4px' }}>FEATURES_SETUP.md</code> for setup instructions.
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#1a1a1a',
              fontWeight: '600',
              fontSize: '14px'
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#1a1a1a',
              fontWeight: '600',
              fontSize: '14px'
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: loading ? '#9ca3af' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginBottom: '20px',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 10px 20px rgba(102, 126, 234, 0.3)';
              }
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{
          textAlign: 'center',
          marginBottom: '20px',
          color: '#64748b',
          fontSize: '14px'
        }}>
          OR
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          style={{
            width: '100%',
            padding: '14px',
            background: '#ffffff',
            color: '#1a1a1a',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            if (!loading) {
              e.target.style.borderColor = '#667eea';
              e.target.style.background = '#f9fafb';
            }
          }}
          onMouseOut={(e) => {
            e.target.style.borderColor = '#e5e7eb';
            e.target.style.background = '#ffffff';
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Sign in with Google
        </button>

        <div style={{
          textAlign: 'center',
          marginTop: '20px',
          fontSize: '14px',
          color: '#64748b'
        }}>
          Don't have an account?{' '}
          <Link
            to="/signup"
            style={{
              color: '#667eea',
              textDecoration: 'none',
              fontWeight: '600'
            }}
          >
            Sign up
          </Link>
        </div>

        <div style={{
          textAlign: 'center',
          marginTop: '10px',
          fontSize: '14px'
        }}>
          <Link
            to="/forgot-password"
            style={{
              color: '#667eea',
              textDecoration: 'none'
            }}
          >
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

