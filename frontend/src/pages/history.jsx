import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import RestoreRoundedIcon from '@mui/icons-material/RestoreRounded';
import { Brand } from './consultationLayout';
import './consultation.css';

export default function History() {
  const { getHistoryOfUser } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    getHistoryOfUser().then(history => { if (active) setMeetings(Array.isArray(history) ? history : []); }).catch(() => { if (active) setMeetings([]); });
    return () => { active = false; };
  }, [getHistoryOfUser]);

  const formatDate = value => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'Date unavailable';
    return new Intl.DateTimeFormat(undefined, { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
  };

  return (
    <div className="consultation-page appShellCs">
      <header className="cs-header">
        <div className="consultation-width cs-header-inner">
          <Brand />
          <nav className="cs-nav" aria-label="Main navigation">
            <Link to="/home">Meetings</Link>
            <Link className="is-active" to="/history">History</Link>
          </nav>
          <button className="cs-pill-button cs-pill-button--button" type="button" onClick={() => navigate('/home')}>
            <ArrowBackRoundedIcon /> Back to meetings
          </button>
        </div>
      </header>

      <main className="consultation-width cs-app-main">
        <section className="cs-app-history-page" aria-labelledby="history-title">
          <p className="consultation-kicker">Your activity</p>
          <h1 id="history-title">Meeting <em>history</em></h1>
          <p className="consultation-description">Pick up where your last conversation left off.</p>

          {meetings.length ? (
            <ul className="cs-history-list">
              {meetings.map((meeting, index) => (
                <li className="cs-history-item" key={`${meeting.meetingCode}-${meeting.date}-${index}`}>
                  <span className="cs-room-icon"><RestoreRoundedIcon /></span>
                  <span className="cs-history-code">{meeting.meetingCode || 'Meeting'}</span>
                  <span className="cs-history-date">{formatDate(meeting.date)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="cs-history-empty">Your past meetings will appear here when you join one.</div>
          )}
        </section>
      </main>

      <footer className="cs-footer">
        <div className="consultation-width cs-footer-inner">
          <Brand />
          <p>Video meetings for teams, students and doctors, right in your browser.</p>
          <Link to="/home">Back to meetings</Link>
        </div>
      </footer>
    </div>
  );
}
