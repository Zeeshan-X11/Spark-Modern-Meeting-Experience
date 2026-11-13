import React from 'react';
import { Link } from 'react-router-dom';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import './consultation.css';

export function ConsultationLayout({ children, accountPage = false }) {
  return (
    <div id="top" className="consultation-page">
      <header className="consultation-header">
        <div className="consultation-width consultation-header-inner">
          <Link className="consultation-brand" to="/" aria-label="SparkMeet home">
            <span className="consultation-brand-icon"><AddRoundedIcon /></span>
            <span>SparkMeet <small>CONSULTATIONS</small></span>
          </Link>
          <nav aria-label="Main navigation">
            <a className="consultation-help" href={accountPage ? '/#how-it-works' : '#how-it-works'}>How it works</a>
            <Link className="consultation-sign-in" to={accountPage ? '/' : '/auth'}>
              {accountPage ? 'Join consultation' : 'Sign in'} <ArrowForwardRoundedIcon />
            </Link>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="consultation-width consultation-footer">
        <Link className="consultation-brand" to="/">
          <span className="consultation-brand-icon"><AddRoundedIcon /></span>
          SparkMeet
        </Link>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>
  );
}

export function ConsultationVisual() {
  return (
    <figure className="consultation-visual">
      <img src={process.env.PUBLIC_URL + '/doctor-video-consultation.jpg'} alt="A doctor speaking with a patient over a laptop video call" />
      <figcaption>
        <span className="consultation-video-icon"><VideocamOutlinedIcon /></span>
        <span><strong>Video consultation</strong><small>Join from your browser</small></span>
      </figcaption>
    </figure>
  );
}
