import React from 'react';
import { useNavigate } from 'react-router-dom';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import ScreenShareRoundedIcon from '@mui/icons-material/ScreenShareRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';

const benefits = [
  { icon: <GroupsRoundedIcon />, title: 'Study together', copy: 'Meet classmates for group projects, revision, and focused study sessions.' },
  { icon: <ScreenShareRoundedIcon />, title: 'Work through ideas', copy: 'Share your screen to explain a problem, walk through notes, or present a project.' },
  { icon: <HistoryRoundedIcon />, title: 'Pick up where you left off', copy: 'Find your recent meeting codes again when it is time to continue.' }
];

export default function LandingPage() {
  const navigate = useNavigate();
  return <main className="landingPageContainer">
    <header className="landingHeader">
      <button className="brand brandButton" onClick={() => navigate('/')} aria-label="SparkMeet home">
        <span className="brandMark"><VideocamRoundedIcon /></span><span>SparkMeet</span>
      </button>
      <nav className="landingNav" aria-label="Main navigation">
        <button className="textNavButton" onClick={() => navigate('/aljk23')}>Join a meeting</button>
        <button className="textNavButton" onClick={() => navigate('/auth')}>Sign in</button>
        <button className="navCta" onClick={() => navigate('/auth')}>Create account <ArrowForwardRoundedIcon /></button>
      </nav>
    </header>

    <section className="landingHero">
      <div className="heroCopy">
        <div className="heroEyebrow">Video meetings for student life</div>
        <h1>Better together,<br /><span>wherever you study.</span></h1>
        <p>Get your classmates in one room for study sessions, group projects, and everything you learn together.</p>
        <div className="heroActions">
          <button className="heroPrimary" onClick={() => navigate('/auth')}>Start a meeting <ArrowForwardRoundedIcon /></button>
          <button className="heroSecondary" onClick={() => navigate('/aljk23')}>Join as a guest</button>
        </div>
        <div className="heroTrust"><span className="trustDot" /> Easy to join <span className="trustDivider">·</span> Built for your next group session</div>
      </div>
      <div className="heroVisual">
        <div className="visualGlow" />
        <div className="visualImageFrame"><img src="/mobile.png" alt="Two students meeting by video call" /></div>
        <div className="visualCaption"><span className="captionIcon"><GroupsRoundedIcon /></span><span><strong>Make time to learn together</strong><small>Connect with your study group</small></span></div>
      </div>
    </section>

    <section className="benefitsSection" aria-label="Ways to use SparkMeet">
      <div className="benefitsIntro"><span>Made for how students work</span><h2>Make group work feel simpler.</h2></div>
      <div className="benefitGrid">{benefits.map(item => <article className="benefitCard" key={item.title}>
        <span className="benefitIcon">{item.icon}</span><h3>{item.title}</h3><p>{item.copy}</p>
      </article>)}</div>
    </section>
    <footer className="landingFooter"><div className="brand"><span className="brandMark"><VideocamRoundedIcon /></span><span>SparkMeet</span></div><span>Make learning a little more connected.</span></footer>
  </main>;
}
