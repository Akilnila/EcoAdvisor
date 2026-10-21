import { useState } from 'react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setError('Please enter a valid full name (min 2 characters)');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      const res = await API.post('/auth/register', formData);
      login(res.data.user, res.data.token);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <span style={styles.icon}>🌿</span>
          <h2 style={styles.title}>EcoAdvisor</h2>
          <p style={styles.subtitle}>Create your account and start your eco journey</p>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              style={styles.input}
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              style={styles.input}
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Min 6 characters"
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account 🌱'}
          </button>
        </form>

        <p style={styles.footer}>
          Already have an account?{' '}
          <span style={styles.link} onClick={() => navigate('/login')}>
            Login here
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
  input: { padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #d4edda', fontSize: '14px', backgroundColor: '#fafff9', outline: 'none', color: '#333', transition: 'border 0.2s' },
  button: { padding: '14px', backgroundColor: '#2c5f2d', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', marginTop: '4px', letterSpacing: '0.02em' },
  error: { backgroundColor: '#fff0f0', border: '1px solid #ffcccc', color: '#cc0000', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '16px', textAlign: 'center' },
  footer: { textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#6b8f71' },
  link: { color: '#2c5f2d', fontWeight: '600', cursor: 'pointer', textDecoration: 'underline' },
};

export default Register;