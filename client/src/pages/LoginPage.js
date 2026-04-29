import React, { useState } from 'react';
import './LoginPage.css';

function LoginPage({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [isAdmin, setIsAdmin]   = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!password) { setError('Please enter a password'); return; }

    const adminPass = 'admin123';
    const userPass  = 'user123';

    if (isAdmin && password !== adminPass) {
      setError('Invalid admin password'); return;
    }
    if (!isAdmin && password !== userPass && password !== adminPass) {
      setError('Invalid password'); return;
    }

    onLogin(password, isAdmin);
  };

  return (
    <div className="login-container">
      {/* ── Left branding pane ── */}
      <div className="login-left">
        <div className="login-brand">AFC<span>.</span></div>
        <p className="login-tagline">
          The premier live football auction platform.
          Real-time bidding, instant team updates.
        </p>
        <div className="login-feature-list">
          {[
            'Real-time WebSocket updates',
            'Full admin auction control',
            'Live team budget tracking',
            'Complete player roster view',
          ].map((f) => (
            <div className="login-feature" key={f}>
              <span className="login-feature-dot" />
              {f}
            </div>
          ))}
        </div>
      </div>

      {/* ── Right form pane ── */}
      <div className="login-right">
        <div className="login-form-header">
          <h2>Sign in</h2>
          <p>Choose your role and enter your password.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {/* Role selector */}
          <div className="account-type-selector">
            <button
              type="button"
              className={`type-btn ${!isAdmin ? 'active' : ''}`}
              onClick={() => setIsAdmin(false)}
            >
              User
            </button>
            <button
              type="button"
              className={`type-btn ${isAdmin ? 'active' : ''}`}
              onClick={() => setIsAdmin(true)}
            >
              Admin
            </button>
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isAdmin ? 'Enter admin password' : 'Enter password'}
              autoFocus
            />
          </div>

          {error && <div className="error-msg">⚠ {error}</div>}

          <button type="submit" className="login-btn">
            {isAdmin ? 'Sign in as Admin' : 'Sign in'}
          </button>

          <div className="credentials-info">
            <p><strong>Demo credentials</strong></p>
            <p>User &rarr; <code>user123</code></p>
            <p>Admin &rarr; <code>admin123</code></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
