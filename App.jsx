import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useState } from "react";
import "./App.css";

function ServiceCard({ number, icon, title, description }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(y, [-100, 100], [8, -8]),
    { stiffness: 200, damping: 20 }
  );

  const rotateY = useSpring(
    useTransform(x, [-100, 100], [-8, 8]),
    { stiffness: 200, damping: 20 }
  );

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="service-card"
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="service-top">
        <span className="service-number">{number}</span>
        <span className="process-icon">{icon}</span>
      </div>

      <h3>{title}</h3>

      <p>{description}</p>

      <div className="card-arrow">↗</div>
    </motion.div>
  );
}

function ProjectCard({ label, title, type, visualClass }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const moveX = useSpring(
    useTransform(x, [-100, 100], [-10, 10]),
    { stiffness: 150, damping: 20 }
  );

  const moveY = useSpring(
    useTransform(y, [-100, 100], [-10, 10]),
    { stiffness: 150, damping: 20 }
  );

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article
      className="project"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`project-visual ${visualClass}`}>
        <motion.div
          className="project-window"
          style={{
            x: moveX,
            y: moveY,
          }}
        >
          <div className="window-top">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="window-body">
            <div className="window-line line-one"></div>
            <div className="window-line line-two"></div>
            <div className="window-line line-three"></div>

            <div className="abstract-shape"></div>
          </div>
        </motion.div>
      </div>

      <div className="project-info">
        <div>
          <span className="project-label">{label}</span>
          <h3>{title}</h3>
        </div>

        <span className="project-type">{type}</span>
      </div>
    </motion.article>
  );
}

function App() {
  /* LIGHT MODE IS DEFAULT */
  const [darkMode, setDarkMode] = useState(false);

  /* HERO PARALLAX */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const phoneX = useSpring(
    useTransform(mouseX, [-500, 500], [-18, 18]),
    { stiffness: 80, damping: 20 }
  );

  const phoneY = useSpring(
    useTransform(mouseY, [-500, 500], [-18, 18]),
    { stiffness: 80, damping: 20 }
  );

  const orbitX = useSpring(
    useTransform(mouseX, [-500, 500], [-8, 8]),
    { stiffness: 80, damping: 20 }
  );

  const orbitY = useSpring(
    useTransform(mouseY, [-500, 500], [-8, 8]),
    { stiffness: 80, damping: 20 }
  );

  const cardX = useSpring(
    useTransform(mouseX, [-500, 500], [-25, 25]),
    { stiffness: 80, damping: 20 }
  );

  const cardY = useSpring(
    useTransform(mouseY, [-500, 500], [-20, 20]),
    { stiffness: 80, damping: 20 }
  );

  const handleMouseMove = (event) => {
    mouseX.set(event.clientX - window.innerWidth / 2);
    mouseY.set(event.clientY - window.innerHeight / 2);
  };

  const processSteps = [
    {
      number: "01",
      title: "Discover",
      description:
        "We understand your idea, audience, goals and the problem we're solving.",
    },
    {
      number: "02",
      title: "Design",
      description:
        "We turn ideas into intuitive interfaces and experiences people enjoy using.",
    },
    {
      number: "03",
      title: "Build",
      description:
        "Our developers transform the approved experience into a powerful digital product.",
    },
    {
      number: "04",
      title: "Launch",
      description:
        "We test, refine and launch your product with everything ready for growth.",
    },
  ];

  return (
    <div
      className={`site ${darkMode ? "dark-mode" : "light-mode"}`}
      onMouseMove={handleMouseMove}
    >
      {/* =========================================
          NAVBAR
      ========================================= */}

      <header className="navbar">
        <a href="#home" className="brand">
          <img src="/kayma-logo.png" alt="KaymaTech" />
        </a>

        <nav className="nav-links">
          <a href="#home" className="nav-link">
            Home
          </a>

          <a href="#about" className="nav-link">
            About
          </a>

          <a href="#services" className="nav-link">
            Services
          </a>

          <a href="#work" className="nav-link">
            Work
          </a>

          <a href="#contact" className="nav-link">
            Contact
          </a>
        </nav>

        <div className="nav-right">
          {/* THEME TOGGLE */}
          <div
            className={`theme-toggle ${darkMode ? "night" : "day"}`}
            onClick={() => setDarkMode(!darkMode)}
            role="button"
            tabIndex="0"
            aria-label="Toggle dark and light mode"
          >
            <div className="theme-sky">
              <span className="star star-1">✦</span>
              <span className="star star-2">✧</span>
              <span className="star star-3">·</span>
              <span className="star star-4">✦</span>
              <span className="star star-5">·</span>

              <div className="theme-moon">
                <div className="moon-shadow"></div>
              </div>

              <div className="theme-sun">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="sun-horizon"></div>
            </div>

            <div className="theme-knob">
              <span className="knob-icon">
                {darkMode ? "☾" : "☀"}
              </span>
            </div>
          </div>

          <a href="#contact" className="nav-cta">
            Let's talk ↗
          </a>
        </div>
      </header>

      {/* =========================================
          HERO
      ========================================= */}

      <main>
        <section className="hero" id="home">
          <div className="grid-background"></div>

          <div className="hero-glow glow-left"></div>
          <div className="hero-glow glow-right"></div>

          <div className="hero-content">
            <motion.div
              className="eyebrow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="dot"></span>
              DIGITAL PRODUCT STUDIO
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              We build digital
              <br />
              experiences that{" "}
              <span>matter.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              We design and develop digital products that combine
              strategy, creativity and technology to create meaningful
              experiences.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
            >
              <a href="#contact" className="primary-button">
                Start a project ↗
              </a>

              <a href="#work" className="text-button">
                Explore our work
                <span>→</span>
              </a>
            </motion.div>
          </div>

          {/* HERO VISUAL */}

          <div className="hero-visual">
            <motion.div
              className="orbit orbit-1"
              style={{
                x: orbitX,
                y: orbitY,
              }}
            />

            <motion.div
              className="orbit orbit-2"
              style={{
                x: orbitX,
                y: orbitY,
              }}
            />

            <motion.div
              className="phone"
              style={{
                x: phoneX,
                y: phoneY,
              }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="phone-top">
                <span></span>
              </div>

              <div className="phone-content">
                <div className="phone-card">
                  <div className="mini-circle"></div>

                  <div className="phone-bars">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>

                <div className="phone-card">
                  <div className="mini-circle"></div>

                  <div className="phone-bars">
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>

              <div className="phone-bottom"></div>
            </motion.div>

            <motion.div
              className="floating-ui ui-one"
              style={{
                x: cardX,
                y: cardY,
              }}
            >
              <span className="ui-icon">✦</span>
              <div>
                <small>Design</small>
                <strong>Creative</strong>
              </div>
            </motion.div>

            <motion.div
              className="floating-ui ui-two"
              style={{
                x: cardX,
                y: cardY,
              }}
            >
              <span className="ui-icon">↗</span>
              <div>
                <small>Growth</small>
                <strong>+128%</strong>
              </div>
            </motion.div>

            <motion.div
              className="hero-badge badge-one"
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              AI
            </motion.div>

            <motion.div
              className="hero-badge badge-two"
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              CODE
            </motion.div>

            <motion.div
              className="hero-badge badge-three"
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 3.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              UX
            </motion.div>
          </div>

          <div className="scroll-indicator">
            <span></span>
            SCROLL TO EXPLORE
          </div>
        </section>

        {/* =========================================
            ABOUT
        ========================================= */}

        <section className="intro" id="about">
          <div className="section-label">01 — ABOUT KAYMATECH</div>

          <div className="intro-content">
            <div className="intro-copy">
              <h2>
                Technology should
                <br />
                <span>feel simple.</span>
              </h2>

              <p>
                We believe great technology should make life easier,
                not more complicated. KaymaTech combines thoughtful
                design, smart development and business strategy to
                create digital experiences that people actually love
                to use.
              </p>

              <a href="#services" className="text-button">
                Discover what we do
                <span>→</span>
              </a>
            </div>

            <div className="about-visual">
              <div className="about-grid"></div>

              <motion.div
                className="about-orbit about-orbit-one"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <motion.div
                className="about-orbit about-orbit-two"
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <motion.div
                className="about-orb"
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="orb-inner">
                  <div className="orb-core"></div>
                </div>
              </motion.div>

              <div className="about-floating-card about-card-one">
                <strong>50+</strong>
                <span>Digital Products</span>
              </div>

              <div className="about-floating-card about-card-two">
                <strong>10+</strong>
                <span>Years Experience</span>
              </div>

              <div className="about-floating-card about-card-three">
                <strong>∞</strong>
                <span>Ideas in Motion</span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================
            SERVICES
        ========================================= */}

        <section className="services" id="services">
          <div className="section-label">02 — WHAT WE DO</div>

          <div className="services-heading">
            <h2>
              Ideas are easy.
              <br />
              <span>Execution is everything.</span>
            </h2>
          </div>

          <div className="service-grid">
            <ServiceCard
              number="01"
              icon="✦"
              title="Product Design"
              description="We turn complex ideas into simple, intuitive and beautiful digital experiences."
            />

            <ServiceCard
              number="02"
              icon="⌘"
              title="Web Development"
              description="Fast, scalable and modern websites built to perform beautifully across every device."
            />

            <ServiceCard
              number="03"
              icon="◈"
              title="App Development"
              description="Powerful mobile experiences designed and engineered around your users and business."
            />
          </div>
        </section>

        {/* =========================================
            WORK
        ========================================= */}

        <section className="work" id="work">
          <div className="section-label">03 — SELECTED WORK</div>

          <div className="work-heading">
            <h2>
              Work that speaks
              <br />
              <span>for itself.</span>
            </h2>
          </div>

          <div className="project-grid">
            <ProjectCard
              label="01 / DIGITAL PRODUCT"
              title="Digital Product"
              type="DIGITAL PRODUCT"
              visualClass="visual-blue"
            />

            <ProjectCard
              label="02 / BRAND EXPERIENCE"
              title="Brand Experience"
              type="DIGITAL IDENTITY"
              visualClass="visual-light"
            />
          </div>
        </section>

        {/* =========================================
            PROCESS
        ========================================= */}

        <section className="process">
          <div className="process-header">
            <div className="section-label">04 — HOW WE WORK</div>

            <h2>
              From idea
              <br />
              <span>to impact.</span>
            </h2>
          </div>

          <div className="process-timeline">
            <div className="process-line"></div>

            {processSteps.map((step) => (
              <div className="process-card" key={step.number}>
                <div className="process-number">
                  {step.number}
                </div>

                <h3>{step.title}</h3>

                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================
            CONTACT
        ========================================= */}

        <section className="contact" id="contact">
          <div className="contact-inner">
            <div className="section-label">05 — LET'S TALK</div>

            <h2>
              Have an idea?
              <span>Let's build it.</span>
            </h2>

            <p>
              Whether you have a fully formed product idea or just
              the beginning of one, let's turn it into something
              meaningful.
            </p>

            <a
              href="mailto:contact@kaymatech.com"
              className="contact-email"
            >
              <span className="contact-email-icon">✉</span>

              <span className="contact-email-text">
                contact@kaymatech.com
              </span>

              <span className="contact-arrow">↗</span>
            </a>
          </div>
        </section>
      </main>

      {/* =========================================
          FOOTER
      ========================================= */}

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <img
                src="/kayma-logo.png"
                alt="KaymaTech"
              />

              <p>
                We design and build digital experiences that
                connect technology, creativity and business.
              </p>
            </div>

            <div className="footer-links">
              <div className="footer-column">
                <span>Explore</span>

                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#services">Services</a>
                <a href="#work">Work</a>
              </div>

              <div className="footer-column">
                <span>Connect</span>

                <a href="#contact">Contact</a>
                <a href="mailto:contact@kaymatech.com">
                  Email
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} KaymaTech. All rights
              reserved.
            </span>

            <span>Innovate. Build. Deliver.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;