import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import MicNoneRoundedIcon from '@mui/icons-material/MicNoneRounded';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import { ConsultationLayout, ConsultationVisual } from './consultationLayout';

const steps = [
  { icon: <LinkRoundedIcon />, title: 'Get your code', copy: 'Have the consultation code shared by your doctor handy.' },
  { icon: <MicNoneRoundedIcon />, title: 'Set up your device', copy: 'Use a quiet space and check your camera and microphone.' },
  { icon: <VideocamOutlinedIcon />, title: 'Join the video room', copy: 'Enter the code to open the room in your browser.' }
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  function joinConsultation(event) {
    event.preventDefault();
    const room = code.trim();

    if (!room || /^(auth|home|history|\.{1,2})$/i.test(room)) {
      setError('Enter the consultation code shared by your doctor.');
      return;
    }

    navigate('/' + encodeURIComponent(room));
  }

  return (
    <ConsultationLayout>
      <section className="consultation-width consultation-hero" aria-labelledby="consultation-title">
        <div className="consultation-intro">
          <p className="consultation-kicker"><span /> Online doctor consultations</p>
          <h1 id="consultation-title">Your doctor.<br /><em>One video call away.</em></h1>
          <p className="consultation-description">Meet with your doctor from wherever you are. Have your consultation code ready and join from your browser.</p>

          <form className="consultation-form" onSubmit={joinConsultation}>
            <label htmlFor="consultation-code">Consultation code</label>
            <div className="consultation-form-controls">
              <input
                id="consultation-code"
                type="text"
                value={code}
                placeholder="Enter your code"
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
                aria-invalid={Boolean(error)}
                aria-describedby="consultation-code-help"
                onChange={event => { setCode(event.target.value); setError(''); }}
              />
              <button type="submit">Join consultation <ArrowForwardRoundedIcon /></button>
            </div>
            <p id="consultation-code-help" className={error ? 'consultation-error' : undefined} aria-live="polite">
              {error || 'Use the code shared by your doctor.'}
            </p>
          </form>
        </div>

        <ConsultationVisual />
      </section>

      <section id="how-it-works" className="consultation-guide" aria-labelledby="consultation-guide-title">
        <div className="consultation-width consultation-guide-inner">
          <h2 id="consultation-guide-title">How to join your consultation</h2>
          <ol className="consultation-steps">
            {steps.map(step => (
              <li key={step.title}>
                <span className="consultation-step-icon">{step.icon}</span>
                <div><h3>{step.title}</h3><p>{step.copy}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </ConsultationLayout>
  );
}
