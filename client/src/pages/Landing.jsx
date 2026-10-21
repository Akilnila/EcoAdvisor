import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Landing = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div style={styles.page}>

      {/* Navbar */}
      <nav style={styles.nav}>
        <div style={styles.navLogo}>🌿 EcoAdvisor</div>
        <div style={styles.navLinks}>
          <button onClick={() => navigate('/login')} style={styles.navLogin}>Login</button>
          <button onClick={() => navigate('/register')} style={styles.navRegister}>Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{ ...styles.hero, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease' }}>
        <div style={styles.heroBadge}>🌍 AI-Powered Sustainability</div>
        <h1 style={styles.heroTitle}>
          Live Greener,<br />
          <span style={styles.heroHighlight}>One Habit at a Time</span>
        </h1>
        <p style={styles.heroSubtitle}>
          EcoAdvisor analyzes your daily habits and gives you personalized AI suggestions
          to reduce your carbon footprint — starting today.
        </p>
        <div style={styles.heroButtons}>
          <button onClick={() => navigate('/register')} style={styles.ctaPrimary}>
            Start for Free 🌱
          </button>
          <button onClick={() => navigate('/login')} style={styles.ctaSecondary}>
            I have an account
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div style={styles.statsRow}>
        {[
          { value: '5', label: 'Habit Domains Tracked' },
          { value: 'AI', label: 'Powered Suggestions' },
          { value: '0-100', label: 'Carbon Score Range' },
          { value: '100%', label: 'Free to Use' },
        ].map((stat, i) => (
          <div key={i} style={styles.statCard}>
            <div style={styles.statValue}>{stat.value}</div>
            <div style={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div style={styles.featuresSection}>
        <h2 style={styles.featuresTitle}>Everything you need to go green</h2>
        <div style={styles.featuresGrid}>
          {[
            { icon: '🤖', title: 'AI Suggestions', desc: 'Get 5 personalized eco-friendly tips based on your specific habits every time you log.' },
            { icon: '📊', title: 'Carbon Score', desc: 'See your environmental impact as a simple 0-100 score. Lower is better — track your progress.' },
            { icon: '🗑️', title: 'Local Waste Options', desc: 'Tamil Nadu-specific waste disposal options including corporation collection, composting and biogas.' },
            { icon: '🔒', title: 'Secure & Private', desc: 'Your data is protected with JWT authentication and encrypted passwords.' },
            { icon: '📈', title: 'Track Progress', desc: 'View your full habit history and see how your carbon score improves over time.' },
            { icon: '⚡', title: 'Instant Results', desc: 'Submit your habits and get AI analysis in seconds — no waiting, no complicated setup.' },
          ].map((f, i) => (
            <div key={i} style={styles.featureCard}>
              <div style={styles.featureIcon}>{f.icon}</div>
              <h3 style={styles.featureTitle}>{f.title}</h3>
              <p style={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div style={styles.ctaBanner}>
        <h2 style={styles.ctaBannerTitle}>Ready to reduce your carbon footprint?</h2>
        <p style={styles.ctaBannerSub}>Join EcoAdvisor and start making a difference today.</p>
        <button onClick={() => navigate('/register')} style={styles.ctaBannerBtn}>
          Create Free Account 🌿
        </button>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <span>🌿 EcoAdvisor — Built with MERN Stack + AI</span>
        <span>Sri Shakthi Institute of Engineering and Technology</span>
      </footer>

    </div>
  );
};

const styles = {
  page: { minHeight: '100vh', backgroundColor: '#f0f7f0', fontFamily: "'Segoe UI', sans-serif", overflowX: 'hidden' },

  // Navbar
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 48px', background: 'linear-gradient(135deg, #1a3a2a 0%, #2c5f2d 100%)', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 20px rgba(0,0,0,0.15)' },
  navLogo: { fontSize: '22px', fontWeight: '700', color: '#fff', letterSpacing: '-0.5px' },
  navLinks: { display: 'flex', gap: '12px', alignItems: 'center' },
  navLogin: { padding: '8px 20px', backgroundColor: 'transparent', border: '1.5px solid rgba(255,255,255,0.4)', color: '#fff', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' },
  navRegister: { padding: '8px 20px', backgroundColor: '#7cb87d', border: 'none', color: '#fff', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '700' },

  // Hero
  hero: { textAlign: 'center', padding: '80px 24px 60px', maxWidth: '800px', margin: '0 auto' },
  heroBadge: { display: 'inline-block', backgroundColor: '#d4edda', color: '#2c5f2d', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: '600', marginBottom: '24px' },
  heroTitle: { fontSize: '56px', fontWeight: '800', color: '#1a3a2a', margin: '0 0 20px', lineHeight: '1.15', letterSpacing: '-1px' },
  heroHighlight: { background: 'linear-gradient(135deg, #2c5f2d, #7cb87d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  heroSubtitle: { fontSize: '18px', color: '#4a7c59', lineHeight: '1.7', margin: '0 0 36px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' },
  heroButtons: { display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' },
  ctaPrimary: { padding: '16px 36px', background: 'linear-gradient(135deg, #2c5f2d, #4a7c59)', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 20px rgba(44,95,45,0.4)', transition: 'transform 0.2s' },
  ctaSecondary: { padding: '16px 36px', backgroundColor: '#fff', color: '#2c5f2d', border: '2px solid #2c5f2d', borderRadius: '12px', fontSize: '16px', fontWeight: '700', cursor: 'pointer' },

  // Stats
  statsRow: { display: 'flex', justifyContent: 'center', gap: '20px', padding: '0 24px 60px', flexWrap: 'wrap', maxWidth: '900px', margin: '0 auto' },
  statCard: { backgroundColor: '#fff', borderRadius: '16px', padding: '24px 32px', textAlign: 'center', boxShadow: '0 4px 20px rgba(44,95,45,0.08)', minWidth: '160px', border: '1px solid #d4edda' },
  statValue: { fontSize: '32px', fontWeight: '800', color: '#2c5f2d', marginBottom: '4px' },
  statLabel: { fontSize: '13px', color: '#6b8f71', fontWeight: '500' },

  // Features
  featuresSection: { padding: '60px 24px', backgroundColor: '#fff', textAlign: 'center' },
  featuresTitle: { fontSize: '32px', fontWeight: '800', color: '#1a3a2a', marginBottom: '48px' },
  featuresGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', maxWidth: '900px', margin: '0 auto' },
  featureCard: { backgroundColor: '#f9fdf9', borderRadius: '16px', padding: '28px 24px', textAlign: 'left', border: '1px solid #e8f5e8', transition: 'transform 0.2s' },
  featureIcon: { fontSize: '28px', marginBottom: '12px' },
  featureTitle: { fontSize: '16px', fontWeight: '700', color: '#1a3a2a', margin: '0 0 8px' },
  featureDesc: { fontSize: '14px', color: '#6b8f71', lineHeight: '1.6', margin: 0 },

  // CTA Banner
  ctaBanner: { background: 'linear-gradient(135deg, #1a3a2a 0%, #2c5f2d 100%)', padding: '60px 24px', textAlign: 'center' },
  ctaBannerTitle: { fontSize: '32px', fontWeight: '800', color: '#fff', margin: '0 0 12px' },
  ctaBannerSub: { fontSize: '16px', color: '#a8d5a2', margin: '0 0 28px' },
  ctaBannerBtn: { padding: '16px 40px', backgroundColor: '#7cb87d', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' },

  // Footer
  footer: { display: 'flex', justifyContent: 'space-between', padding: '24px 48px', backgroundColor: '#1a3a2a', color: '#6b8f71', fontSize: '13px', flexWrap: 'wrap', gap: '8px' },
};

export default Landing;