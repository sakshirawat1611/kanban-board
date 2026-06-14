import { useState } from 'react'
import { Layout, Sun, Moon } from 'lucide-react'
import Board from './components/Board'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: darkMode ? '#0f172a' : '#f1f5f9',
      transition: 'all 0.3s ease'
    }}>

      {/* NAVBAR */}
      <div style={{
        backgroundColor: '#03044a',
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>

        {/* LEFT — LOGO */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: 'white'
        }}>
          <Layout size={24} />
          <span style={{
            fontSize: '18px',
            fontWeight: '700',
            letterSpacing: '0.5px'
          }}>
            Kanban Board
          </span>
        </div>

        {/* RIGHT — ICON ONLY BUTTON */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          style={{
            backgroundColor: 'rgba(255,255,255,0.1)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '8px',
            padding: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            width: '38px',
            height: '38px'
          }}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

      </div>

      {/* BOARD */}
      <Board darkMode={darkMode} />

    </div>
  )
}

export default App