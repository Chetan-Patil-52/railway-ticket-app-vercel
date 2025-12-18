import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Check if redirected from signup
    if (location.state?.signupSuccess) {
      setShowSuccess(true);
      setEmail(location.state.email || '');
      setTimeout(() => setShowSuccess(false), 3000);
    }
  }, [location.state]);

  function handleSubmit(event) {
    event.preventDefault();
    // Mock authentication: simply navigate to dashboard
    navigate('/dashboard');
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="app-title">RailConnect</h1>
        <p className="app-subtitle">Simple railway ticket search (mock, IRCTC-inspired)</p>

        {showSuccess && (
          <div className="alert alert-success">
            <strong>✓ Account created!</strong> Please login to continue.
          </div>
        )}

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </form>

        <p className="auth-switch">
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
}


