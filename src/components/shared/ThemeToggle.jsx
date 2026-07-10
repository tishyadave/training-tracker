import { useTheme } from '../../contexts/ThemeContext';

// Sun icon for light mode
function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

// Moon icon for dark mode
function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      id="theme-toggle-btn"
      onClick={toggleTheme}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 9999,
        width: '38px',
        height: '38px',
        borderRadius: '50%',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.25s, color 0.25s, box-shadow 0.25s, transform 0.15s',
        background: theme === 'dark'
          ? 'rgba(255,255,255,0.12)'
          : 'rgba(27,32,41,0.08)',
        color: theme === 'dark' ? '#FAF9F5' : '#1B2029',
        boxShadow: theme === 'dark'
          ? '0 2px 12px rgba(0,0,0,0.45)'
          : '0 2px 8px rgba(27,32,41,0.18)',
        backdropFilter: 'blur(6px)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.12)';
        e.currentTarget.style.background = theme === 'dark'
          ? 'rgba(255,255,255,0.22)'
          : 'rgba(27,32,41,0.15)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.background = theme === 'dark'
          ? 'rgba(255,255,255,0.12)'
          : 'rgba(27,32,41,0.08)';
      }}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
