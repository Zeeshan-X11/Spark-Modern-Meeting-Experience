import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import ScreenShareRoundedIcon from '@mui/icons-material/ScreenShareRounded';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import MedicalServicesRoundedIcon from '@mui/icons-material/MedicalServicesRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import { ConsultationLayout, ConsultationVisual, DashedFlight } from './consultationLayout';

const features = [
  { icon: <VideocamRoundedIcon />, label: 'HD video' },
  { icon: <ScreenShareRoundedIcon />, label: 'Screen sharing' },
  { icon: <ChatBubbleRoundedIcon />, label: 'In-call chat' },
  { icon: <LanguageRoundedIcon />, label: 'No downloads' }
];

const services = [
  {
    icon: <MedicalServicesRoundedIcon />, tone: 'rose',
    title: 'Face-to-face consultations',
    copy: 'See and talk to your doctor on a clear video call, from home, work or anywhere with a connection.'
  },
  {
    icon: <DescriptionRoundedIcon />, tone: 'violet',
    title: 'Share reports on screen',
    copy: 'Share your screen to walk your doctor through test results, prescriptions or scans during the call.'
  },
  {
    icon: <ForumRoundedIcon />, tone: 'amber',
    title: 'Chat during the call',
    copy: 'Send notes, links or spellings through the in-call chat so nothing gets lost in conversation.'
  }
];

const steps = [
  { title: 'Get your code', copy: 'Your doctor shares a consultation code with you before the appointment.' },
  { title: 'Check your device', copy: 'Find a quiet, well-lit spot and allow your camera and microphone.' },
  { title: 'Join the room', copy: 'Enter the code above and your consultation opens right in the browser.' }
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
      {/* Hero */}
      <section className="cs-hero" aria-labelledby="consultation-title">
        <span className="cs-dot cs-dot--blue" style={{ top: '22%', left: '3%' }} />
        <div className="consultation-width consultation-hero">
          <div className="consultation-intro">
            <p className="consultation-kicker">Online doctor consultations</p>
            <h1 id="consultation-title">Your Doctor Is Just <em>One Video Call</em> Away</h1>
            <p className="consultation-description">
              Meet your doctor from wherever you are. Enter the consultation code they shared with you and join straight from your browser.
            </p>

            <form className="consultation-form" onSubmit={joinConsultation} id="join">
              <label htmlFor="consultation-code" className="cs-sr-only">Consultation code</label>
              <div className="consultation-form-controls">
                <input
                  id="consultation-code"
                  type="text"
                  value={code}
                  placeholder="Enter consultation code"
                  autoComplete="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  aria-invalid={Boolean(error)}
                  aria-describedby="consultation-code-help"
                  onChange={event => { setCode(event.target.value); setError(''); }}
                />
                <button type="submit">Join now</button>
              </div>
              <p id="consultation-code-help" className={error ? 'consultation-error' : undefined} aria-live="polite">
                {error || 'Use the code shared by your doctor.'}
              </p>
            </form>

            <div className="cs-hero-actions">
              <a className="cs-play" href="#how-it-works">
                <span><PlayArrowRoundedIcon /></span>
                See how it works
              </a>
              <DashedFlight className="cs-flight--hero" />
            </div>

            <ul className="cs-feature-row" aria-label="Included in every call">
              {features.map(f => <li key={f.label}>{f.icon}{f.label}</li>)}
            </ul>
          </div>

          <ConsultationVisual />
        </div>
      </section>

      {/* Services */}
      <section id="services" className="cs-section cs-section--tint" aria-labelledby="services-title">
        <span className="cs-dotgrid" style={{ left: 0, top: '22%' }} aria-hidden="true" />
        <div className="consultation-width">
          <div className="cs-heading">
            <p className="cs-eyebrow">Services</p>
            <div className="cs-heading-row">
              <h2 id="services-title">What You Can Do</h2>
              <span className="cs-heading-line" aria-hidden="true" />
              <span className="cs-dot cs-dot--blue cs-dot--inline" />
            </div>
          </div>

          <ul className="cs-services">
            {services.map(s => (
              <li key={s.title}>
                <span className={'cs-service-icon cs-tone-' + s.tone}>{s.icon}</span>
                <h3>{s.title}</h3>
                <p>{s.copy}</p>
                <a href="#how-it-works">Read more</a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Split: patients */}
      <section className="cs-section" aria-labelledby="care-title">
        <span className="cs-dotgrid" style={{ right: 0, top: '6%' }} aria-hidden="true" />
        <div className="consultation-width cs-split">
          <figure className="cs-split-photo">
            <img src={process.env.PUBLIC_URL + '/doctor-video-consultation.jpg'} alt="A doctor explaining something to a patient over a video call" />
          </figure>
          <div className="cs-split-copy">
            <h2 id="care-title">Care That Fits Around Your Day</h2>
            <p>Skip the waiting room and the commute. Your consultation happens over video, with everything you need built in.</p>
            <ul className="cs-checks">
              <li><CheckCircleRoundedIcon /> Works in any modern browser</li>
              <li><CheckCircleRoundedIcon /> Share your screen to show reports</li>
              <li><CheckCircleRoundedIcon /> Chat alongside the video</li>
            </ul>
            <a className="cs-button" href="#join">Join a consultation</a>
            <DashedFlight className="cs-flight--split" />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="cs-section cs-section--tint" aria-labelledby="steps-title">
        <div className="consultation-width">
          <div className="cs-heading cs-heading--center">
            <p className="cs-eyebrow">How it works</p>
            <h2 id="steps-title">Three Steps To Your Consultation</h2>
          </div>
          <ol className="cs-steps">
            {steps.map((step, i) => (
              <li key={step.title}>
                <span className="cs-step-num">0{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Split: doctors */}
      <section id="for-doctors" className="cs-section" aria-labelledby="doctors-title">
        <div className="consultation-width cs-split cs-split--reverse">
          <div className="cs-split-copy">
            <p className="cs-eyebrow">For doctors</p>
            <h2 id="doctors-title">Running A Clinic? Open A Room In Seconds</h2>
            <p>Sign in, pick a code for your consultation room and share it with your patient. Your past rooms are kept in your history so you can find them again.</p>
            <Link className="cs-button" to="/auth">Sign in to start</Link>
          </div>

          <div className="cs-room-card" aria-hidden="true">
            <span className="cs-dot cs-dot--orange" style={{ top: '-14px', left: '18%' }} />
            <span className="cs-dot cs-dot--green" style={{ bottom: '-10px', right: '10%' }} />
            <div className="cs-room-head">
              <span className="cs-room-icon"><VideocamRoundedIcon /></span>
              <div><strong>Consultation room</strong><small>Ready to share</small></div>
            </div>
            <div className="cs-room-code">
              <span>clinic-follow-up</span>
              <b><ContentCopyRoundedIcon /> Copy</b>
            </div>
            <div className="cs-room-history">
              <p><HistoryRoundedIcon /> Recent rooms</p>
              <div><span>morning-checkup</span><small>Today</small></div>
              <div><span>review-results</span><small>Yesterday</small></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="consultation-width cs-cta" aria-labelledby="cta-title">
        <div>
          <h2 id="cta-title">Ready For Your Consultation?</h2>
          <p>Have your code ready and join in a few seconds.</p>
        </div>
        <div className="cs-cta-actions">
          <a className="cs-button cs-button--light" href="#join">Join with code</a>
          <Link className="cs-button cs-button--ghost" to="/auth">Sign in</Link>
        </div>
      </section>
    </ConsultationLayout>
  );
}
