import React, { useState } from 'react';
import { X, Sparkles, Disc3, LogIn, UserPlus } from 'lucide-react';
import { useAuth, DEMO_USERS } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function LoginModal() {
  const { isAuthModalOpen, closeAuthModal, login, signup } = useAuth();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    login(email.trim(), password);
    addToast(`Welcome back, ${email.split('@')[0]}!`, 'success');
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !name.trim()) return;

    signup(name.trim(), email.trim(), password);
    addToast(`Welcome to Spotify, ${name.trim()}!`, 'success');
  };

  const handleQuickDemoLogin = (demoUser) => {
    login(demoUser.email, 'password', demoUser);
    addToast(`Logged in as ${demoUser.name} (${demoUser.plan})`, 'success');
  };

  return (
    <div className="spotify-modal-backdrop" onClick={closeAuthModal}>
      <div 
        className="spotify-modal-content login-modal animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="login-modal-logo">
            <Disc3 size={32} className="logo-disc" />
            <span className="login-logo-text">Spotify</span>
          </div>
          <button className="modal-close-btn" onClick={closeAuthModal}>
            <X size={20} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="auth-tab-pills">
          <button 
            className={`auth-tab-pill ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            <LogIn size={15} /> Log In
          </button>
          <button 
            className={`auth-tab-pill ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => setActiveTab('signup')}
          >
            <UserPlus size={15} /> Sign Up
          </button>
        </div>

        {/* One Click Demo Accounts Section */}
        <div className="quick-demo-section">
          <div className="quick-demo-title">
            <Sparkles size={13} className="text-spotify-green" /> One-Click Quick Login
          </div>
          <div className="quick-demo-grid">
            {DEMO_USERS.map((demo) => (
              <button
                key={demo.id}
                type="button"
                className="quick-demo-card"
                onClick={() => handleQuickDemoLogin(demo)}
              >
                <img src={demo.avatar} alt={demo.name} className="quick-demo-avatar" />
                <div className="quick-demo-info">
                  <span className="quick-demo-name">{demo.name}</span>
                  <span className="quick-demo-plan">{demo.plan}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="login-divider">
          <span>OR CONTINUE WITH EMAIL</span>
        </div>

        {/* Login Form */}
        {activeTab === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="login-form">
            <div className="form-group">
              <label className="form-label">Email address</label>
              <input
                type="email"
                placeholder="name@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="modal-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="modal-input"
                required
              />
            </div>

            <button type="submit" className="login-submit-btn">
              Log In
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignupSubmit} className="login-form">
            <div className="form-group">
              <label className="form-label">What should we call you?</label>
              <input
                type="text"
                placeholder="Enter your profile name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="modal-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">What's your email?</label>
              <input
                type="email"
                placeholder="name@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="modal-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Create a password</label>
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="modal-input"
                required
              />
            </div>

            <button type="submit" className="login-submit-btn">
              Sign Up Free
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
