import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', newPassword: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.email) {
      setError('Please enter your email');
      return;
    }
    if (formData.newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await API.post('/auth/reset-password', {
        email: formData.email,
        newPassword: formData.newPassword,
      });
      setSuccess('Password reset successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Reset failed. Check your email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <span style={styles.icon}>🌿</span>
          <h2 style={styles.title}>Reset Password</h2>
          <p style={styles.subtitle}>Enter your email and set a new password</p>
        </div>

        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              style={styles.input}
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Min 6 characters"
              style={styles.input}
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Repeat new password"
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        <p style={styles.footer}>
          <span style={styles.link} onClick={() => navigate('/login')}>
            ← Back to Login
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: { minHeight: '100vh', backgroundColor: '#f0f7f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' },
  container: { width: '100%', maxWidth: '420px', backgroundColor: '#fff', borderRadius: '20px', padding: '40px 36px', boxShadow: '0 8px 32px rgba(44,95,45,0.12)' },
  header: { textAlign: 'center', marginBottom: '28px' },
  icon: { fontSize: '36px' },
  title: { fontSize: '26px', color: '#2c5f2d', margin: '8px 0 4px', fontWeight: '700' },
  subtitle: { fontSize: '14px', color: '#6b8f71', margin: 0 },
  form: { display: 'flex', flexDirection: 'column', gap: '18px' },
  field: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '13px', fontWeight: '600', color: '#2c5f2d', textTransform: 'uppercase', letterSpacing: '0.05em' },
  input: { padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #d4edda', fontSize: '14px', backgroundColor: '#fafff9', outline: 'none', color: '#333' },
  button: { padding: '14px', backgroundColor: '#2c5f2d', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '700', cursor: 'pointer' },
  error: { backgroundColor: '#fff0f0', border: '1px solid #ffcccc', color: '#cc0000', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', textAlign: 'center', marginBottom: '8px' },
  success: { backgroundColor: '#f0fff0', border: '1px solid #b2d8b2', color: '#2c5f2d', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', textAlign: 'center', marginBottom: '8px' },
  footer: { textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#6b8f71' },
  link: { color: '#2c5f2d', fontWeight: '600', cursor: 'pointer', textDecoration: 'underline' },
};

export default ForgotPassword;