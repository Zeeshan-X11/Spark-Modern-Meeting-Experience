import React, { useContext, useState } from 'react';
import withAuth from '../utils/withAuth';
import { useNavigate, Link } from 'react-router-dom';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import ScreenShareRoundedIcon from '@mui/icons-material/ScreenShareRounded';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import { AuthContext } from '../contexts/AuthContext';
import { Brand } from './consultationLayout';
import './consultation.css';

function HomeComponent() {
  const navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState('');
  const [error, setError] = useState('');
  const { addToUserHistory } = useContext(AuthContext);

  const handleJoinVideoCall = async (event) => {
    event.preventDefault();
    const code = meetingCode.trim();
    if (!code) { setError('Enter a meeting code to continue.'); return; }
    setError('');
    await addToUserHistory(code);
    navigate(`/${encodeURIComponent(code)}`);
  };

  return (
    <div className="consultation-page appShellCs">
      <header className="cs-header">
        <div className="consultation-width cs-header-inner">
          <Brand />
          <nav className="cs-nav" aria-label="Main navigation">
            <Link to="/history">Meeting history</Link>
          </nav>
          <button className="cs-pill-button cs-pill-button--button" type="button" onClick={() => { localStorage.removeItem('token'); navigate('/auth'); }}>
            <LogoutRoundedIcon /> Log out
          </button>
        </div>
      </header>

      <main className="consultation-width cs-app-main">
        <section className="cs-app-hero" aria-labelledby="home-title">
          <div className="cs-app-copy">
            <p className="consultation-kicker">A better way to meet</p>
            <h1 id="home-title">Make Room For <em>Great Conversations</em></h1>
            <p className="consultation-description">
              Start a new conversation or join your team with a meeting code. Your next great idea is one call away.
            </p>

            <form className="consultation-form" onSubmit={handleJoinVideoCall}>
              <label htmlFor="meeting-code" className="cs-sr-only">Meeting code</label>
              <div className="consultation-form-controls">
                <input
                  id="meeting-code"
                  type="text"
                  value={meetingCode}
                  placeholder="Enter meeting code"
                  autoComplete="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? 'meeting-code-error' : undefined}
                  onChange={e => { setMeetingCode(e.target.value); setError(''); }}
                />
                <button type="submit">Join <ArrowForwardRoundedIcon /></button>
              </div>
              {error && <p id="meeting-code-error" className="consultation-error" role="alert">{error}</p>}
            </form>

            <ul className="cs-feature-row" aria-label="Included in every meeting">
              <li><VideocamRoundedIcon /> HD video</li>
              <li><ScreenShareRoundedIcon /> Screen sharing</li>
              <li><ChatBubbleRoundedIcon /> In-call chat</li>
            </ul>
          </div>

          <div className="cs-app-visual" aria-hidden="true">
            <div className="cs-app-card">
              <div className="cs-app-card-head">
                <span className="cs-room-icon"><VideocamRoundedIcon /></span>
                <div><strong>New meeting</strong><small>Create a personal room</small></div>
              </div>
              <p>No code? Choose a name for your meeting and share it with your team.</p>
              <button type="button" className="cs-button" onClick={() => setMeetingCode(`room-${Date.now().toString(36).slice(-6)}`)}>
                Create a room
              </button>
            </div>
            <span className="cs-dot cs-dot--orange" style={{ top: '4%', right: '8%' }} />
            <span className="cs-dot cs-dot--green" style={{ bottom: '6%', left: '6%' }} />
          </div>
        </section>

        <section className="cs-app-history">
          <button type="button" className="cs-history-link" onClick={() => navigate('/history')}>
            <HistoryRoundedIcon /> View your meeting history <ArrowForwardRoundedIcon />
          </button>
        </section>
      </main>

      <footer className="cs-footer">
        <div className="consultation-width cs-footer-inner">
          <Brand />
          <p>Video meetings for teams, students and doctors, right in your browser.</p>
          <a href="#top" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}

export default withAuth(HomeComponent);
