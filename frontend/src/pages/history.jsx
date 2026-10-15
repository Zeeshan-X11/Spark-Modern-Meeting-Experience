import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import RestoreRoundedIcon from '@mui/icons-material/RestoreRounded';

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

  return <main className="historyPage appShell">
    <header className="navBar">
      <div className="brand"><span className="brandMark"><VideocamRoundedIcon /></span><span>Spark<span style={{color:'#6269f5'}}>Meet</span></span></div>
      <div className="appNavActions"><Button startIcon={<ArrowBackRoundedIcon />} onClick={() => navigate('/home')}>Back to meetings</Button></div>
    </header>
    <section className="historyContent">
      <div className="historyHeading"><div><h1>Your meeting history</h1><p>Pick up where your last conversation left off.</p></div></div>
      {meetings.length ? <div className="historyList">{meetings.map((meeting, index) => <article className="historyItem" key={`${meeting.meetingCode}-${meeting.date}-${index}`}>
        <div className="historyCode"><span className="historyIcon"><RestoreRoundedIcon /></span><span>{meeting.meetingCode || 'Meeting'}</span></div>
        <span className="historyDate">{formatDate(meeting.date)}</span>
      </article>)}</div> : <div className="emptyHistory">Your past meetings will appear here when you join one.</div>}
    </section>
  </main>;
}
