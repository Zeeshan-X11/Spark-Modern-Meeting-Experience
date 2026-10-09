import React, { useContext, useState } from 'react';
import withAuth from '../utils/withAuth';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { Button, TextField } from '@mui/material';
import RestoreRoundedIcon from '@mui/icons-material/RestoreRounded';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { AuthContext } from '../contexts/AuthContext';

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

  return <main className="appShell">
    <header className="navBar">
      <div className="brand"><span className="brandMark"><VideocamRoundedIcon /></span><span>Spark<span style={{color:'#6269f5'}}>Meet</span></span></div>
      <div className="appNavActions">
        <Button startIcon={<RestoreRoundedIcon />} onClick={() => navigate('/history')}>Meeting history</Button>
        <Button variant="contained" onClick={() => { localStorage.removeItem('token'); navigate('/auth'); }}>Log out</Button>
      </div>
    </header>
    <section className="meetContainer">
      <div className="leftPanel"><div>
        <div className="homeEyebrow">A better way to meet</div>
        <h1>Make room for great conversations.</h1>
        <p className="intro">Start a new conversation or join your team with a meeting code. Your next great idea is one call away.</p>
        <form className="joinCard" onSubmit={handleJoinVideoCall}>
          <p>Join a meeting</p>
          <div className="joinForm">
            <TextField value={meetingCode} onChange={e => setMeetingCode(e.target.value)} label="Meeting code" placeholder="Enter your code" size="small" fullWidth error={Boolean(error)} />
            <Button type="submit" variant="contained" endIcon={<ArrowForwardRoundedIcon />}>Join</Button>
          </div>
          {error ? <div className="authError">{error}</div> : <div className="homeFootnote">No code? Create a personal room by choosing a name for your meeting.</div>}
        </form>
      </div></div>
      <div className="homeVisual"><img src="/mobile.png" alt="Students connecting in a video meeting" /></div>
    </section>
  </main>;
}

export default withAuth(HomeComponent);
