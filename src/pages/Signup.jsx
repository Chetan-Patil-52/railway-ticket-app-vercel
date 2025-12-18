import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    // Mock signup: show success message then redirect to login
    setShowSuccess(true);
    setTimeout(() => {
      navigate('/', { state: { signupSuccess: true, email } });
    }, 1500);
  }

  if (showSuccess) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2>Account Created Successfully!</h2>
            <p>Redirecting to login...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="app-title">RailConnect</h1>
        <p className="app-subtitle">Create a mock account to search trains</p>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary" type="submit">
            Sign up
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}


