"use client";

import { useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  Code2,
  Download,
  ExternalLink,
  Flame,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  Satellite,
  Sparkles,
  X,
} from "lucide-react";
import {
  education,
  experience,
  featuredWork,
  metrics,
  otherWork,
  presentations,
  profile,
  skills,
} from "../content/profile";
import { AiChat } from "./AiChat";

const navItems = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Portfolio() {
  const [chatOpen, setChatOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  function printResume() {
    window.print();
  }

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Fares Alhezaimi home">
          <span className="brand-mark" aria-hidden="true">
            FA<span>.</span>
          </span>
          <span className="brand-copy">
            <strong>Fares Alhezaimi</strong>
            <small>Earth intelligence systems</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button className="header-ai" onClick={() => setChatOpen(true)}>
            <Sparkles size={15} aria-hidden="true" /> Ask my AI
          </button>
          <button
            className="mobile-menu-button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>
                {item.label} <ArrowDownRight size={18} aria-hidden="true" />
              </a>
            ))}
            <button
              onClick={() => {
                setMenuOpen(false);
                setChatOpen(true);
              }}
            >
              Ask my AI <Sparkles size={17} aria-hidden="true" />
            </button>
          </nav>
        )}
      </header>

      <main id="main-content">
        <section className="hero section-shell" id="top">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-line" /> Scientific software · Remote sensing · AI
            </div>
            <h1>
              I build tools for a
              <span> changing planet.</span>
            </h1>
            <p className="hero-intro">{profile.introduction}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                Explore selected work <ArrowRight size={18} aria-hidden="true" />
              </a>
              <button className="button button-secondary" onClick={() => setChatOpen(true)}>
                <Bot size={18} aria-hidden="true" /> Ask my AI
              </button>
            </div>
            <div className="hero-meta">
              <span>
                <MapPin size={15} aria-hidden="true" /> {profile.location}
              </span>
              <span>
                <span className="status-dot" /> {profile.status}
              </span>
            </div>
          </div>

          <div className="hero-signal" aria-label="Thermal Earth-observation visual">
            <div className="signal-grid" />
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="earth-core">
              <span className="core-coordinate">34.2°N</span>
              <Flame size={34} strokeWidth={1.35} aria-hidden="true" />
              <span className="core-label">THERMAL SIGNAL</span>
            </div>
            <div className="signal-node node-one" />
            <div className="signal-node node-two" />
            <div className="signal-node node-three" />
            <div className="signal-caption top-caption">
              <Satellite size={16} aria-hidden="true" /> ECOSTRESS / VIIRS
            </div>
            <div className="signal-caption bottom-caption">
              <span>01</span> Radiance → evidence → product
            </div>
          </div>
        </section>

        <section className="metrics section-shell" aria-label="Research scale">
          {metrics.map((metric) => (
            <article className="metric" key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
              <small>{metric.detail}</small>
            </article>
          ))}
        </section>

        <section className="section-shell work-section" id="work">
          <SectionHeading
            index="01"
            eyebrow="Selected work"
            title="Research engineered into usable systems."
            description="The main story is high-resolution thermal fire research. The surrounding work shows the data infrastructure and products required to make that research useful."
          />

          <div className="work-grid">
            {featuredWork.map((project) => (
              <article className={`work-card ${project.featured ? "featured" : ""}`} key={project.id}>
                <div className="work-card-topline">
                  <span>{project.type}</span>
                  <strong>{project.number}</strong>
                </div>
                <div className="work-icon" aria-hidden="true">
                  {project.id === "fire-detection" ? (
                    <Flame size={24} />
                  ) : project.id === "matchup-dataset" ? (
                    <Satellite size={24} />
                  ) : (
                    <Code2 size={24} />
                  )}
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="work-impact">{project.impact}</div>
                <ul className="tag-list" aria-label={`${project.title} technologies`}>
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="other-work-grid">
            {otherWork.map((project) => (
              <article className="mini-card" key={project.title}>
                <span>{project.label}</span>
                <div>
                  <h3>{project.title}</h3>
                  {"href" in project && project.href && (
                    <a href={project.href} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}>
                      <ExternalLink size={17} />
                    </a>
                  )}
                </div>
                <p>{project.description}</p>
                <small>{project.stack}</small>
              </article>
            ))}
          </div>
        </section>

        <section className="experience-section" id="experience">
          <div className="section-shell">
            <SectionHeading
              index="02"
              eyebrow="Experience"
              title="A computer scientist working inside real science."
              description="I move between research questions, data pipelines, validation, interface design, and delivery—because the strongest scientific products need all five."
            />

            <div className="timeline">
              {experience.map((item, index) => (
                <article className="timeline-item" key={`${item.role}-${item.organization}`}>
                  <div className="timeline-date">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {item.dates}
                  </div>
                  <div className="timeline-role">
                    <h3>{item.role}</h3>
                    <p>{item.organization}</p>
                  </div>
                  <div className="timeline-body">
                    <p>{item.description}</p>
                    <ul>
                      {item.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell about-section" id="about">
          <SectionHeading
            index="03"
            eyebrow="Background"
            title="Research depth. Product instinct."
            description="My path combines formal computer science, graduate data science, NASA Earth-observation research, and the habit of turning one-off analysis into reusable tools."
          />

          <div className="about-grid">
            <div className="about-main">
              <div className="about-statement">
                <span className="statement-mark">FA.</span>
                <p>
                  I care about scientific work that survives beyond a notebook: transparent assumptions, reproducible data,
                  careful validation, and interfaces that help another person make sense of the result.
                </p>
              </div>

              <div className="education-list">
                <h3>
                  <GraduationCap size={20} aria-hidden="true" /> Education
                </h3>
                {education.map((item) => (
                  <article key={item.degree}>
                    <div>
                      <strong>{item.degree}</strong>
                      <span>{item.school}</span>
                    </div>
                    <small>{item.dates}</small>
                  </article>
                ))}
              </div>

              <div className="presentation-list">
                <h3>
                  <BriefcaseBusiness size={20} aria-hidden="true" /> Selected presentations
                </h3>
                {presentations.map((item) => (
                  <article key={item.venue}>
                    <span>{item.year}</span>
                    <div>
                      <strong>{item.venue}</strong>
                      <small>{item.note}</small>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <aside className="skills-panel">
              <div className="skills-heading">
                <span>Technical range</span>
                <Code2 size={21} aria-hidden="true" />
              </div>
              {skills.map((group) => (
                <div className="skill-group" key={group.category}>
                  <h3>{group.category}</h3>
                  <div>
                    {group.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </aside>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="section-shell contact-inner">
            <div>
              <span className="contact-kicker">Build something meaningful</span>
              <h2>Let’s turn complex data into a clear scientific product.</h2>
              <p>
                I’m especially interested in thermal remote sensing, wildfire applications, environmental intelligence,
                scientific software, and research collaborations with a real path to use.
              </p>
            </div>
            <div className="contact-actions">
              <a className="button button-light" href={`mailto:${profile.email}`}>
                <Mail size={18} aria-hidden="true" /> Email me
              </a>
              <button className="button button-outline-light" onClick={() => setChatOpen(true)}>
                <Bot size={18} aria-hidden="true" /> Ask my AI first
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-shell footer-inner">
          <div>
            <span className="brand-mark footer-mark" aria-hidden="true">
              FA<span>.</span>
            </span>
            <p>Scientific software for Earth intelligence.</p>
          </div>
          <div className="footer-links">
            <a href={profile.github} target="_blank" rel="noreferrer">
              <Code2 size={18} aria-hidden="true" /> GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              <ExternalLink size={18} aria-hidden="true" /> LinkedIn
            </a>
            <a href={`mailto:${profile.email}`}>
              <Mail size={18} aria-hidden="true" /> Email
            </a>
            <button onClick={printResume}>
              <Download size={18} aria-hidden="true" /> Save PDF
            </button>
          </div>
          <small>© 2026 Fares Alhezaimi · Updated {profile.updated}</small>
        </div>
      </footer>

      <button className="floating-ai" onClick={() => setChatOpen(true)} aria-label="Open AI CV assistant">
        <Sparkles size={18} aria-hidden="true" />
        <span>Ask AI</span>
      </button>

      <AiChat open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: string;
  description: string;
};

function SectionHeading({ index, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <div className="section-index">/{index}</div>
      <div className="section-title-block">
        <span>{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      <p>{description}</p>
    </div>
  );
}
