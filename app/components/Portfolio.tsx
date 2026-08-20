"use client";

import { useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  Code2,
  Download,
  ExternalLink,
  Mail,
  Menu,
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
            <small>Computer science · Earth observation</small>
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
            Portfolio assistant
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
              Portfolio assistant <ArrowDownRight size={17} aria-hidden="true" />
            </button>
          </nav>
        )}
      </header>

      <main id="main-content">
        <section className="hero section-shell" id="top">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-line" /> Computer science · Earth observation · Scientific software
            </div>
            <h1>
              Scientific software for
              <span> Earth observation.</span>
            </h1>
            <p className="hero-intro">{profile.introduction}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                Explore selected work <ArrowRight size={18} aria-hidden="true" />
              </a>
              <button className="button button-secondary" onClick={printResume}>
                <Download size={17} aria-hidden="true" /> Save résumé
              </button>
            </div>
            <div className="hero-meta">
              <span>{profile.location}</span>
              <span>{profile.status}</span>
            </div>
          </div>

          <aside className="hero-note" aria-label="Current research focus">
            <span>Current focus</span>
            <p>Thermal remote sensing and scientific tools for wildfire research.</p>
            <dl>
              <div>
                <dt>Sensors</dt>
                <dd>ECOSTRESS · VIIRS</dd>
              </div>
              <div>
                <dt>Methods</dt>
                <dd>Radiance · QA/QC · Geospatial pipelines</dd>
              </div>
              <div>
                <dt>Direction</dt>
                <dd>Research workflows that become usable products</dd>
              </div>
            </dl>
          </aside>
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
            title="Selected research and software."
            description="Thermal fire research is the central thread, supported by cross-sensor data engineering and researcher-facing scientific tools."
          />

          <div className="work-grid">
            {featuredWork.map((project) => (
              <article className={`work-card ${project.featured ? "featured" : ""}`} key={project.id}>
                <div className="work-card-topline">
                  <span>{project.type}</span>
                  <strong>{project.number}</strong>
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
              title="Research, engineering, and scientific delivery."
              description="My work spans research questions, data pipelines, validation, interface design, and delivery."
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
            title="Computer science grounded in applied research."
            description="My background combines computer science, graduate data science, NASA Earth-observation research, and reusable scientific software."
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
                <h3>Education</h3>
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
                <h3>Selected presentations</h3>
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
              <span className="contact-kicker">Contact</span>
              <h2>Open to research and product collaborations.</h2>
              <p>
                I’m especially interested in thermal remote sensing, wildfire applications, environmental intelligence,
                scientific software, and research collaborations with a real path to use.
              </p>
            </div>
            <div className="contact-actions">
              <a className="button button-light" href={`mailto:${profile.email}`}>
                <Mail size={18} aria-hidden="true" /> Email me
              </a>
              <a className="button button-outline-light" href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn <ExternalLink size={16} aria-hidden="true" />
              </a>
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
            <p>Computer science · Remote sensing · Scientific software</p>
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

      <button className="floating-ai" onClick={() => setChatOpen(true)} aria-label="Open portfolio assistant">
        <span>Portfolio assistant</span>
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
