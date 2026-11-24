import React from 'react';
import { Link } from 'react-router-dom';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import MicNoneRoundedIcon from '@mui/icons-material/MicNoneRounded';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import CallEndRoundedIcon from '@mui/icons-material/CallEndRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import './consultation.css';

export function Brand() {
  return (
    <Link className="cs-brand" to="/" aria-label="Arogyasetu home">
      Arogyasetu<span>.</span>
    </Link>
  );
}

export function ConsultationLayout({ children, accountPage = false }) {
  const base = accountPage ? '/' : '';
  return (
    <div id="top" className="consultation-page">
      <header className="cs-header">
        <div className="consultation-width cs-header-inner">
          <Brand />
          <nav className="cs-nav" aria-label="Main navigation">
            <a className={accountPage ? undefined : 'is-active'} href={base + '#top'}>Home</a>
            <a href={base + '#services'}>Services</a>
            <a href={base + '#how-it-works'}>How it works</a>
            <a href={base + '#for-doctors'}>For doctors</a>
          </nav>
          <Link className="cs-pill-button" to={accountPage ? '/' : '/auth'}>
            {accountPage ? 'Join consultation' : 'Sign in'}
          </Link>
        </div>
      </header>

      <main>{children}</main>

      <footer className="cs-footer">
        <div className="consultation-width cs-footer-inner">
          <Brand />
          <p>Video consultations with your doctor, right in your browser.</p>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}

/* Decorative composition used in the hero of the landing and sign-in pages. */
export function ConsultationVisual() {
  return (
    <div className="cs-visual-wrap">
    <div className="cs-visual" role="img" aria-label="A doctor on a video consultation with a patient">
      <span className="cs-dot cs-dot--orange" style={{ top: '6%', right: '4%' }} />
      <span className="cs-dot cs-dot--green" style={{ bottom: '2%', right: '22%' }} />

      <div className="cs-visual-main">
        <img src={process.env.PUBLIC_URL + '/doctor-video-consultation.jpg'} alt="" />
      </div>

      <div className="cs-visual-tile" aria-hidden="true">
        <div className="cs-tile-screen">
          <span className="cs-tile-live"><i /> Live</span>
          <span className="cs-tile-avatar">You</span>
          <span className="cs-tile-name">Patient view</span>
        </div>
        <div className="cs-tile-controls">
          <span><MicNoneRoundedIcon /></span>
          <span><VideocamOutlinedIcon /></span>
          <span className="is-end"><CallEndRoundedIcon /></span>
        </div>
      </div>

      <div className="cs-float cs-float--bars cs-float--top" aria-hidden="true">
        <i style={{ width: '82%', background: '#c35cf2' }} />
        <i style={{ width: '64%', background: '#1f5fe0' }} />
        <i style={{ width: '38%', background: '#f26a3d' }} />
      </div>

      <div className="cs-float cs-float--bars cs-float--bottom" aria-hidden="true">
        <i style={{ width: '90%', background: '#3fd3e0' }} />
        <i style={{ width: '70%', background: '#1f5fe0' }} />
        <i style={{ width: '42%', background: '#f26a3d' }} />
      </div>

      <div className="cs-float cs-float--connect" aria-hidden="true">
        <span>Doctor joined</span>
        <b><VideocamRoundedIcon /></b>
      </div>

      <div className="cs-float cs-float--badge" aria-hidden="true">
        <b><CheckRoundedIcon /></b> No app needed
      </div>
    </div>
    </div>
  );
}

/* Dashed curve ending in a paper plane, as a decorative flourish. */
export function DashedFlight({ className = '' }) {
  return (
    <svg className={'cs-flight ' + className} viewBox="0 0 260 90" fill="none" aria-hidden="true">
      <path d="M4 60 C 70 96, 160 92, 222 34" stroke="#f5a3a0" strokeWidth="2" strokeDasharray="2 6" strokeLinecap="round" />
      <path d="M214 22 L252 12 L232 48 L226 32 Z M226 32 L252 12" stroke="#ee6f6a" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
