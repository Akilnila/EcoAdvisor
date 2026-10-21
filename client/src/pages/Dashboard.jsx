import { useState, useEffect } from 'react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [habits, setHabits] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [rating, setRating] = useState('');
  const [motivation, setMotivation] = useState('');
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
const [aiError, setAiError] = useState('');

  useEffect(() => {
    fetchHabits();
  }, []);


  const fetchHabits = async () => {
  try {
    const res = await API.get('/habits');
    setHabits(res.data);
    if (res.data.length > 0) {
      await fetchSuggestions(res.data[0]);
    }
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  const fetchSuggestions = async (habit) => {
  setAiLoading(true);
setAiError('');
try {
    const res = await API.post('/ai/suggestions', {
      transport: habit.transport,
      electricityUsage: habit.electricityUsage,
      foodChoice: habit.foodChoice,
      shoppingFrequency: habit.shoppingFrequency,
      wasteDisposal: habit.wasteDisposal,
    });
    setSuggestions(res.data.suggestions);
    setRating(res.data.rating);
    setMotivation(res.data.motivation);
 } catch (err) {
    console.error('AI error:', err);
    setSuggestions([]);
    setRating('');
    setMotivation('');
    setAiError('Failed to load AI suggestions. Try refreshing.');
  } finally {
    setAiLoading(false);
  }
};

  const handleLogout = () => {
    logout();
    navigate('/landing');
  };

  const getScoreColor = (score) => {
    if (score <= 20) return '#2c5f2d';
    if (score <= 40) return '#4a7c59';
    if (score <= 60) return '#d97706';
    return '#dc2626';
  };

  if (loading) return (
  <div style={styles.center}>
    <Spinner text="Loading your eco dashboard..." />
  </div>
);

  const latestHabit = habits[0];

  return (
    <div style={styles.container}>

      {/* Navbar */}
      <div style={styles.navbar}>
        <h2 style={styles.logo}>🌿 EcoAdvisor</h2>
        <div style={styles.navRight}>
          <span style={styles.welcome}>Hi, {user?.name} 👋</span>
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        </div>
      </div>

      <div style={styles.content}>

        {/* Carbon Score Card */}
        {latestHabit && (
          <div style={styles.scoreCard}>
            <h3 style={styles.scoreTitle}>Your Carbon Footprint Score</h3>
            <div style={{
              ...styles.scoreBadge,
              backgroundColor: getScoreColor(latestHabit.carbonScore)
            }}>
              {latestHabit.carbonScore}
            </div>
            <p style={styles.scoreLabel}>{latestHabit.scoreLabel}</p>
            <p style={styles.scoreNote}>Lower score = better for the environment (0-100)</p>
          </div>
        )}

        {/* Latest Habits Summary */}
        {latestHabit && (
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>📋 Your Latest Habits</h3>
            <div style={styles.habitGrid}>
              <div style={styles.habitItem}>
                <span style={styles.habitLabel}>🚗 Transport</span>
                <span style={styles.habitValue}>{latestHabit.transport}</span>
              </div>
              <div style={styles.habitItem}>
                <span style={styles.habitLabel}>⚡ Electricity</span>
                <span style={styles.habitValue}>{latestHabit.electricityUsage} units</span>
              </div>
              <div style={styles.habitItem}>
                <span style={styles.habitLabel}>🥗 Food</span>
                <span style={styles.habitValue}>{latestHabit.foodChoice}</span>
              </div>
              <div style={styles.habitItem}>
                <span style={styles.habitLabel}>🛍️ Shopping</span>
                <span style={styles.habitValue}>{latestHabit.shoppingFrequency}</span>
              </div>
              <div style={styles.habitItem}>
                <span style={styles.habitLabel}>🗑️ Waste</span>
                <span style={styles.habitValue}>{latestHabit.wasteDisposal}</span>
              </div>
            </div>
          </div>
        )}

        {/* AI Suggestions */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>🤖 AI Eco Suggestions</h3>
          {aiLoading ? (
  <Spinner text="Getting personalized AI suggestions..." />
          ) : (
            <>
              {rating && (
                <div style={styles.ratingBadge}>
                  Lifestyle Rating: <strong>{rating}</strong>
                </div>
              )}
              {suggestions.length > 0 ? (
                <ul style={styles.suggestionList}>
                  {suggestions.map((s, i) => (
                    <li key={i} style={styles.suggestionItem}>
                      <span style={styles.suggestionNumber}>{i + 1}</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              ) : (<p style={styles.noData}>
  {aiError ? aiError : 'Log your habits to get suggestions!'}
</p>
                
              )}
              {motivation && (
                <p style={styles.motivation}>💬 {motivation}</p>
              )}
            </>
          )}
        </div>
{/* Carbon Score Chart */}
{habits.length > 1 && (
  <div style={styles.card}>
    <h3 style={styles.cardTitle}>📈 Carbon Score Progress</h3>
    <p style={{ fontSize: '13px', color: '#6b8f71', margin: '0 0 16px' }}>
      Your score over time — lower is better 🌱
    </p>
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={[...habits].reverse().map((h, i) => ({
        entry: `Entry ${i + 1}`,
        score: h.carbonScore,
        date: new Date(h.createdAt).toLocaleDateString(),
      }))}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e8f5e8" />
        <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#6b8f71' }} />
        <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#6b8f71' }} />
        <Tooltip
          contentStyle={{ backgroundColor: '#fff', border: '1px solid #d4edda', borderRadius: '8px', fontSize: '13px' }}
          formatter={(value) => [value, 'Carbon Score']}
        />
        <Line
          type="monotone"
          dataKey="score"
          stroke="#2c5f2d"
          strokeWidth={2.5}
          dot={{ fill: '#2c5f2d', r: 4 }}
          activeDot={{ r: 6, fill: '#7cb87d' }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
)}
        {/* Habit History */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>📊 Habit History</h3>
          {habits.length === 0 ? (
            <p style={styles.noData}>No habits logged yet.</p>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Transport</th>
                  <th style={styles.th}>Food</th>
                  <th style={styles.th}>Score</th>
                  <th style={styles.th}>Label</th>
                </tr>
              </thead>
              <tbody>
                {habits.map((h) => (
                  <tr key={h._id}>
                    <td style={styles.td}>{new Date(h.createdAt).toLocaleDateString()}</td>
                    <td style={styles.td}>{h.transport}</td>
                    <td style={styles.td}>{h.foodChoice}</td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.scorePill,
                        backgroundColor: getScoreColor(h.carbonScore)
                      }}>
                        {h.carbonScore}
                      </span>
                    </td>
                    <td style={styles.td}>{h.scoreLabel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <button
            onClick={() => navigate('/home')}
            style={styles.logHabitBtn}>
            + Log New Habits
          </button>
        </div>

      </div>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#f0f7f0', fontFamily: 'sans-serif' },
  navbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#2c5f2d', padding: '14px 28px' },
  logo: { color: '#fff', margin: 0, fontSize: '20px' },
  navRight: { display: 'flex', alignItems: 'center', gap: '16px' },
  welcome: { color: '#a8d5a2', fontSize: '14px' },
  logoutBtn: { padding: '6px 14px', backgroundColor: 'transparent', border: '1px solid #a8d5a2', color: '#a8d5a2', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' },
  content: { maxWidth: '800px', margin: '0 auto', padding: '28px 16px', display: 'flex', flexDirection: 'column', gap: '20px' },
  scoreCard: { backgroundColor: '#fff', borderRadius: '16px', padding: '28px', textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' },
  scoreTitle: { color: '#2c5f2d', margin: '0 0 16px' },
  scoreBadge: { width: '100px', height: '100px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', fontWeight: 'bold', color: '#fff', margin: '0 auto 12px' },
  scoreLabel: { fontSize: '20px', fontWeight: '600', color: '#2c5f2d', margin: '0 0 8px' },
  scoreNote: { fontSize: '13px', color: '#6b8f71', margin: 0 },
  card: { backgroundColor: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' },
  cardTitle: { color: '#2c5f2d', margin: '0 0 16px', fontSize: '18px' },
  habitGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' },
  habitItem: { display: 'flex', flexDirection: 'column', gap: '4px', backgroundColor: '#f0f7f0', padding: '12px', borderRadius: '10px' },
  habitLabel: { fontSize: '12px', color: '#6b8f71', fontWeight: '600' },
  habitValue: { fontSize: '14px', color: '#2c5f2d', fontWeight: '600' },
  ratingBadge: { backgroundColor: '#f0f7f0', padding: '10px 16px', borderRadius: '8px', color: '#2c5f2d', fontSize: '14px', marginBottom: '16px' },
  suggestionList: { listStyle: 'none', padding: 0, margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: '12px' },
  suggestionItem: { display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '12px', backgroundColor: '#f9fdf9', borderRadius: '10px', fontSize: '14px', color: '#333', lineHeight: '1.6' },
  suggestionNumber: { backgroundColor: '#2c5f2d', color: '#fff', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold', flexShrink: 0 },
  motivation: { fontStyle: 'italic', color: '#4a7c59', fontSize: '14px', borderTop: '1px solid #e8f5e8', paddingTop: '12px', margin: 0 },
  noData: { color: '#6b8f71', fontSize: '14px' },
  loadingText: { color: '#6b8f71', fontSize: '14px' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '14px' },
  th: { textAlign: 'left', padding: '10px 12px', backgroundColor: '#f0f7f0', color: '#2c5f2d', fontWeight: '600', borderBottom: '1px solid #d4edda' },
  td: { padding: '10px 12px', borderBottom: '1px solid #f0f7f0', color: '#333' },
  scorePill: { padding: '3px 10px', borderRadius: '12px', color: '#fff', fontSize: '12px', fontWeight: 'bold' },
  logHabitBtn: { marginTop: '16px', padding: '10px 20px', backgroundColor: '#2c5f2d', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' },
  center: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '18px', color: '#2c5f2d' },
};

export default Dashboard;