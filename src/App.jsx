import { useState } from 'react'
import { insertJoinRequest } from './lib/supabase.js'
import './App.css'

const navigation = [
  ['Home', '#home'],
  ['About', '#about'],
  ['Events', '#events'],
  ['Announcements', '#announcements'],
  ['Contact', '#contact'],
]

const events = [
  {
    date: { month: 'NOV', day: '21', dateTime: '2026-11-21' },
    startTime: '2026-11-21T17:30',
    type: 'WORKSHOP',
    title: 'Build your first API',
    detail: 'A practical, beginner-friendly session with our backend team.',
    time: '5:30 PM · Engineering Lab',
  },
  {
    date: { month: 'NOV', day: '26', dateTime: '2026-11-26' },
    startTime: '2026-11-26T18:00',
    type: 'COMMUNITY',
    title: 'Projects & pizza night',
    detail: 'Bring a project, find a teammate, or just come hang out.',
    time: '6:00 PM · Student Commons',
  },
  {
    date: { month: 'DEC', day: '03', dateTime: '2026-12-03' },
    startTime: '2026-12-03T16:00',
    type: 'CAREERS',
    title: 'Inside the industry',
    detail: 'A candid Q&A with CS grads working in tech.',
    time: '4:00 PM · Room C204',
  },
]

const announcements = [
  {
    label: 'CLUB NEWS',
    date: 'NOVEMBER 18, 2026',
    dateTime: '2026-11-18',
    title: 'Project team applications are open',
    detail: 'Pitch an idea or join a small team building something useful. Applications close November 27.',
  },
  {
    label: 'OPPORTUNITY',
    date: 'NOVEMBER 16, 2026',
    dateTime: '2026-11-16',
    title: 'Peer mentor sign-ups close Friday',
    detail: 'Help a newer student find their footing, make connections, and share what you wish you knew.',
  },
]

function EventCard({ event }) {
  return (
    <article className="event-card">
      <time className="event-date" dateTime={event.date.dateTime}>
        <span>{event.date.month}</span>
        <strong>{event.date.day}</strong>
      </time>
      <div className="event-details">
        <p className="card-label">{event.type}</p>
        <h3>{event.title}</h3>
        <p>{event.detail}</p>
      </div>
      <p className="event-time">
        <time dateTime={event.startTime}>{event.time}</time>
      </p>
      <a className="event-arrow" href="#contact" aria-label={`Ask about ${event.title}`}>↗</a>
    </article>
  )
}

function AnnouncementCard({ announcement }) {
  return (
    <article className="announcement-card">
      <div className="announcement-meta">
        <span>{announcement.label}</span>
        <time dateTime={announcement.dateTime}>{announcement.date}</time>
      </div>
      <div>
        <h3>{announcement.title}</h3>
        <p>{announcement.detail}</p>
      </div>
      <span className="announcement-arrow" aria-hidden="true">↗</span>
    </article>
  )
}

function JoinForm() {
  const [status, setStatus] = useState(null)
  const isLoading = status?.type === 'loading'

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    setStatus({ type: 'loading', message: 'Sending your request...' })

    try {
      await insertJoinRequest({
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        department: formData.get('department'),
      })
      setStatus({
        type: 'success',
        message: 'Your request was sent successfully. Thanks for joining the CS Community!',
      })
      form.reset()
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error
          ? error.message
          : 'We could not send your request. Please try again.',
      })
    }
  }

  return (
    <form
      className="join-form"
      onSubmit={handleSubmit}
      onChange={() => {
        if (!isLoading) setStatus(null)
      }}
      aria-busy={isLoading}
    >
      <div className="form-field">
        <label htmlFor="full-name">Full name</label>
        <input
          id="full-name"
          name="fullName"
          type="text"
          autoComplete="name"
          required
          disabled={isLoading}
        />
      </div>
      <div className="form-field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          disabled={isLoading}
        />
      </div>
      <div className="form-field form-field-wide">
        <label htmlFor="department">Department</label>
        <input
          id="department"
          name="department"
          type="text"
          required
          disabled={isLoading}
        />
      </div>
      <button className="button button-dark" type="submit" disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Join the community'}
        {!isLoading && <span aria-hidden="true">↗</span>}
      </button>
      {status && (
        <p
          className={`form-feedback form-${status.type}`}
          role={status.type === 'error' ? 'alert' : 'status'}
        >
          {status.message}
        </p>
      )}
    </form>
  )
}

function App() {
  return (
    <>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="CS Community home">
          <span className="brand-mark" aria-hidden="true">&lt;/&gt;</span>
          <span>CS<span className="brand-light">Community</span></span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          {navigation.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <a className="header-cta" href="#contact">Join the community <span aria-hidden="true">↗</span></a>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> YOUR PEOPLE. YOUR NEXT BIG IDEA.</p>
            <h1>Computer science<br />is better <span>together.</span></h1>
            <p className="hero-intro">
              A student-led community for curious minds, unfinished side projects,
              and the people who make figuring it out fun.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#about">Find your community <span aria-hidden="true">→</span></a>
              <a className="text-link" href="#events">See what&apos;s happening</a>
            </div>
            <div className="hero-note">
              <div className="avatar-stack" aria-hidden="true">
                <span>J</span><span>M</span><span>A</span><span>+</span>
              </div>
              <p><strong>Good people, great questions.</strong><br />There&apos;s a seat for you here.</p>
            </div>
          </div>
          <div className="hero-art" aria-label="A playful illustration of code in a terminal">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="code-card">
              <div className="code-top"><span /><span /><span /><small>community.js</small></div>
              <pre><span className="code-muted">01</span> <span className="code-purple">const</span> community = {'{'}{'\n'}
                <span className="code-muted">02</span>   people: <span className="code-yellow">&quot;all kinds&quot;</span>,{'\n'}
                <span className="code-muted">03</span>   ideas: <span className="code-yellow">&quot;in progress&quot;</span>,{'\n'}
                <span className="code-muted">04</span>   together: <span className="code-green">true</span>{'\n'}
                <span className="code-muted">05</span> {'}'}</pre>
              <div className="code-footer"><span className="pulse-dot" /> compiling good things <span className="code-check">✓</span></div>
            </div>
            <div className="floating-note note-top"><span className="note-icon">✳</span> learn by making</div>
            <div className="floating-note note-bottom"><span className="note-icon note-icon-pink">↗</span> meet your people</div>
            <div className="sparkle sparkle-one">✳</div>
            <div className="sparkle sparkle-two">✦</div>
          </div>
          <a className="scroll-cue" href="#about"><span /> SCROLL TO EXPLORE</a>
        </section>

        <section className="about section-wrap section-pad" id="about">
          <div className="section-heading">
            <p className="eyebrow">01 / A LITTLE ABOUT US</p>
            <h2>More than code.<br /><span>A place to belong.</span></h2>
          </div>
          <div className="about-content">
            <p className="large-copy">
              We&apos;re a student-run community that makes computer science feel
              more human. Come to learn something new, share what you&apos;re
              working on, or meet a friend who just gets it.
            </p>
            <div className="values-grid">
              <article className="value-card">
                <span className="value-number">01</span>
                <h3>Curiosity first</h3>
                <p>No gatekeeping, no silly questions. Just room to explore.</p>
              </article>
              <article className="value-card">
                <span className="value-number">02</span>
                <h3>Make things</h3>
                <p>Learn in the doing, and make something better together.</p>
              </article>
              <article className="value-card">
                <span className="value-number">03</span>
                <h3>Find your people</h3>
                <p>Build friendships with folks who are figuring it out, too.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="events section-pad" id="events">
          <div className="section-wrap">
            <div className="section-topline">
              <div>
                <p className="eyebrow">02 / GET INVOLVED</p>
                <h2>Good things are <span>happening.</span></h2>
              </div>
              <a className="text-link" href="#contact">Have an idea? Tell us <span aria-hidden="true">↗</span></a>
            </div>
            <div className="event-list">
              {events.map((event) => (
                <EventCard key={event.title} event={event} />
              ))}
            </div>
          </div>
        </section>

        <section className="announcements section-wrap section-pad" id="announcements">
          <div className="section-topline">
            <div>
              <p className="eyebrow">03 / THE LATEST</p>
              <h2>From around <span>the community.</span></h2>
            </div>
            <span className="updates-note"><span className="status-dot" /> FRESH OFF THE KEYBOARD</span>
          </div>
          <div className="announcement-list">
            {announcements.map((announcement) => (
              <AnnouncementCard key={announcement.title} announcement={announcement} />
            ))}
          </div>
        </section>

        <section className="contact section-wrap" id="contact">
          <div className="contact-decoration" aria-hidden="true">✳</div>
          <p className="eyebrow">04 / COME SAY HI</p>
          <h2>Join the<br /><span>community.</span></h2>
          <p>Tell us a little about yourself. No experience required, just curiosity.</p>
          <JoinForm />
          <span className="contact-small">All are welcome. Good vibes encouraged.</span>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-mark" aria-hidden="true">&lt;/&gt;</span>
          <span>CS<span className="brand-light">Community</span></span>
        </a>
        <p>Made with curiosity (and probably too much coffee).</p>
        <a href="#home" className="back-top">BACK TO TOP ↑</a>
        <span className="copyright">© 2026 CS COMMUNITY</span>
      </footer>
    </>
  )
}

export default App
