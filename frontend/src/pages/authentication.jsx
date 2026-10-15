import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Button, Snackbar, TextField } from '@mui/material';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';

export default function Authentication() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [formState, setFormState] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { handleRegister, handleLogin } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const selectMode = mode => { setFormState(mode); setError(''); };
  const handleAuth = async event => {
    event.preventDefault();
    setError('');
    if (!username.trim() || !password || (formState === 1 && !name.trim())) {
      setError('Please complete all required fields.');
      return;
    }
    setLoading(true);
    try {
      if (formState === 0) {
        await handleLogin(username.trim(), password);
      } else {
        const result = await handleRegister(name.trim(), username.trim(), password);
        setMessage(result || 'Your account is ready. Please sign in.');
        setOpen(true);
        setFormState(0);
        setPassword('');
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'We couldn’t complete that request. Please try again.');
    } finally { setLoading(false); }
  };

  return <main className="authPage">
    <section className="authShowcase">
      <div className="brand"><span className="brandMark"><VideocamRoundedIcon /></span><span>Spark<span style={{color:'#aeb1ff'}}>Meet</span></span></div>
      <div className="authPitch"><h1>Good things happen when we meet.</h1><p>Bring your team into the same room, wherever life and work take you.</p></div>
      <div className="authQuote">Clear conversations. Closer teams. Better work.</div>
    </section>
    <section className="authFormSide"><div className="authCard">
      <h2>{formState === 0 ? 'Welcome back' : 'Create your account'}</h2>
      <p className="authSub">{formState === 0 ? 'Sign in to get back to your conversations.' : 'A few details and you’re ready to meet.'}</p>
      <div className="authTabs"><button className={formState === 0 ? 'active' : ''} onClick={() => selectMode(0)}>Sign in</button><button className={formState === 1 ? 'active' : ''} onClick={() => selectMode(1)}>Create account</button></div>
      <form onSubmit={handleAuth}>
        {formState === 1 && <TextField margin="normal" required fullWidth label="Full name" autoComplete="name" value={name} onChange={e => setName(e.target.value)} />}
        <TextField margin="normal" required fullWidth label="Username" autoComplete="username" value={username} onChange={e => setUsername(e.target.value)} />
        <TextField margin="normal" required fullWidth label="Password" type="password" autoComplete={formState === 0 ? 'current-password' : 'new-password'} value={password} onChange={e => setPassword(e.target.value)} />
        {error && <p className="authError" role="alert">{error}</p>}
        <Button type="submit" fullWidth variant="contained" disabled={loading}>{loading ? 'Please wait…' : formState === 0 ? 'Sign in' : 'Create account'}</Button>
        <p className="homeFootnote" style={{textAlign:'center', marginTop:18}}>By continuing, you agree to use SparkMeet respectfully.</p>
      </form>
      <button className="backHome" style={{marginTop:18}} onClick={() => navigate('/')}>← Back to home</button>
    </div></section>
    <Snackbar open={open} autoHideDuration={4000} message={message} onClose={() => setOpen(false)} />
  </main>;
}
