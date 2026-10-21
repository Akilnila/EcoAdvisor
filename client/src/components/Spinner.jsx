const Spinner = ({ text = 'Loading...' }) => {
  return (
    <div style={styles.container}>
      <div style={styles.spinner}></div>
      <p style={styles.text}>{text}</p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    gap: '16px',
  },
  spinner: {
    width: '48px',
    height: '48px',
    border: '5px solid #d4edda',
    borderTop: '5px solid #2c5f2d',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  text: {
    color: '#2c5f2d',
    fontSize: '15px',
    fontWeight: '500',
    margin: 0,
  },
};

export default Spinner;