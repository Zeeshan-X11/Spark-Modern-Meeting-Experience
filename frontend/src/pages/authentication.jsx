import React, { useContext, useState } from 'react';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { AuthContext } from '../contexts/AuthContext';
import { ConsultationLayout, ConsultationVisual } from './consultationLayout';

export default function Authentication() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const { handleRegister, handleLogin } = useContext(AuthContext);

  function selectMode(register) {
    setIsRegistering(register);
    setError('');
    setMessage('');
  }

  async function handleAuth(event) {
    event.preventDefault();
    setError('');
    setMessage('');
    if (!username.trim() || !password || (isRegistering && !name.trim())) {
      setError('Please complete all required fields.');
      return;
    }

    setLoading(true);
    try {
      if (isRegistering) {
        const result = await handleRegister(name.trim(), username.trim(), password);
        setMessage(result || 'Your account is ready. Please sign in.');
        setIsRegistering(false);
        setPassword('');
      } else {
        await handleLogin(username.trim(), password);
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'We couldn’t complete that request. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <ConsultationLayout accountPage>
      <section className="consultation-width consultation-hero" aria-labelledby="consultation-account-title">
        <div className="consultation-intro">
          <p className="consultation-kicker"><span /> Online doctor consultations</p>
          <h1 id="consultation-account-title">
            {isRegistering ? <>Create an <em>account.</em></> : <>Welcome <em>back.</em></>}
          </h1>
          <p className="consultation-description">
            {isRegistering
              ? 'Create your SparkMeet account to start a video room and keep track of your calls.'
              : 'Sign in to start a video room or find a previous call in your history.'}
          </p>

          <form className="consultation-form consultation-auth-form" onSubmit={handleAuth} aria-busy={loading}>
            <div className="consultation-auth-modes" role="group" aria-label="Account action">
              <button type="button" aria-pressed={!isRegistering} disabled={loading} onClick={() => selectMode(false)}>Sign in</button>
              <button type="button" aria-pressed={isRegistering} disabled={loading} onClick={() => selectMode(true)}>Create account</button>
            </div>

            {isRegistering && (
              <div>
                <label htmlFor="consultation-name">Full name</label>
                <input id="consultation-name" name="name" autoComplete="name" required value={name} onChange={event => setName(event.target.value)} />
              </div>
            )}
            <div>
              <label htmlFor="consultation-username">Username</label>
              <input id="consultation-username" name="username" autoComplete="username" autoCapitalize="none" spellCheck={false} required value={username} onChange={event => setUsername(event.target.value)} />
            </div>
            <div>
              <label htmlFor="consultation-password">Password</label>
              <input id="consultation-password" name="password" type="password" autoComplete={isRegistering ? 'new-password' : 'current-password'} required value={password} onChange={event => setPassword(event.target.value)} />
            </div>

            {message && <p className="consultation-auth-feedback" role="status">{message}</p>}
            {error && <p className="consultation-error consultation-auth-feedback" role="alert">{error}</p>}
            <button type="submit" disabled={loading}>
              {loading ? 'Please wait…' : isRegistering ? 'Create account' : 'Sign in'}
              <ArrowForwardRoundedIcon />
            </button>
          </form>
        </div>

        <ConsultationVisual />
      </section>
    </ConsultationLayout>
  );
}
