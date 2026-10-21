import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

const HabitForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
  transport: '',
  electricityUsage: '',
  foodChoice: '',
  shoppingFrequency: '',
  wasteDisposal: [],
});
const handleWasteChange = (value) => {
  setFormData((prev) => {
    const already = prev.wasteDisposal.includes(value);
    return {
      ...prev,
      wasteDisposal: already
        ? prev.wasteDisposal.filter((v) => v !== value)
        : [...prev.wasteDisposal, value],
    };
  });
};
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await API.post('/habits', {
  ...formData,
  wasteDisposal: formData.wasteDisposal.join(', '),
});
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to save habits. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🌿 Log Your Daily Habits</h2>
      <p style={styles.subtitle}>Help us understand your lifestyle so we can suggest eco-friendly alternatives.</p>

      {error && <p style={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>

        <div style={styles.field}>
          <label style={styles.label}>🚗 Transport</label>
          <select name="transport" value={formData.transport} onChange={handleChange} style={styles.input} required>
            <option value="">Select transport type</option>
            <option value="Car">Car</option>
            <option value="Bike">Bike</option>
            <option value="Public Transport">Public Transport</option>
            <option value="Walking">Walking</option>
            <option value="Electric Vehicle">Electric Vehicle</option>
          </select>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>⚡ Electricity Usage (units/month)</label>
          <input
            type="number"
            name="electricityUsage"
            value={formData.electricityUsage}
            onChange={handleChange}
            placeholder="e.g. 150"
            style={styles.input}
            required
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>🥗 Food Choice</label>
          <select name="foodChoice" value={formData.foodChoice} onChange={handleChange} style={styles.input} required>
            <option value="">Select diet type</option>
            <option value="Vegan">Vegan</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Meat-based">Meat-based</option>
            <option value="Mixed">Mixed</option>
          </select>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>🛍️ Shopping Frequency</label>
          <select name="shoppingFrequency" value={formData.shoppingFrequency} onChange={handleChange} style={styles.input} required>
            <option value="">Select frequency</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Rarely">Rarely</option>
          </select>
        </div>

        <div style={styles.field}>
  <label style={styles.label}>🗑️ Waste Disposal <span style={{fontSize:'12px', color:'#6b8f71'}}>(select all that apply)</span></label>
  <div style={styles.checkboxGroup}>
    {[
      { value: 'Corporation collection', label: '🚛 Corporation collection (dumped at yard)' },
      { value: 'Burned openly', label: '🔥 Burned openly' },
      { value: 'Dumped in open land', label: '🌾 Dumped in open land / roadside' },
      { value: 'Home composting', label: '♻️ Home composting' },
      { value: 'Dry wet segregation', label: '🗂️ Dry & wet segregation before collection' },
      { value: 'Biogas unit', label: '⚡ Biogas unit at home' },
    ].map((option) => (
      <div
        key={option.value}
        onClick={() => handleWasteChange(option.value)}
        style={{
          ...styles.checkboxItem,
          backgroundColor: formData.wasteDisposal.includes(option.value) ? '#d4edda' : '#fff',
          border: formData.wasteDisposal.includes(option.value) ? '1.5px solid #2c5f2d' : '1.5px solid #d4edda',
        }}
      >
        <span style={styles.checkmark}>
          {formData.wasteDisposal.includes(option.value) ? '✅' : '⬜'}
        </span>
        <span style={styles.checkLabel}>{option.label}</span>
      </div>
    ))}
  </div>
</div>

        <button
  type="submit"
  style={{
    ...styles.button,
    opacity: loading ? 0.8 : 1,
    cursor: loading ? 'not-allowed' : 'pointer',
  }}
  disabled={loading}>
  {loading ? <Spinner text="Saving your habits..." /> : 'Get My Eco Suggestions →'}
</button>

      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '560px',
    margin: '40px auto',
    padding: '32px',
    backgroundColor: '#f0f7f0',
    borderRadius: '16px',
    fontFamily: 'sans-serif',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  },
  title: {
    fontSize: '24px',
    color: '#2c5f2d',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#6b8f71',
    marginBottom: '24px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#2c5f2d',
  },
  input: {
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #b2d8b2',
    fontSize: '14px',
    backgroundColor: '#fff',
    outline: 'none',
    color: '#333',
  },
  button: {
    padding: '12px',
    backgroundColor: '#2c5f2d',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '8px',
  },
  error: {
    color: 'red',
    fontSize: '13px',
    marginBottom: '12px',
  },
  checkboxGroup: {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
},
checkboxItem: {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '10px 14px',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'all 0.2s',
},
checkmark: {
  fontSize: '16px',
  flexShrink: 0,
},
checkLabel: {
  fontSize: '14px',
  color: '#2c5f2d',
},
};

export default HabitForm;