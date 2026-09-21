import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";
import "./App.css";

/* =========================================================
   REVEAL ANIMATION
========================================================= */

const revealUp = {
  hidden: {
    opacity: 0,
    y: 45,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const revealFade = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
    },
  },
};

/* =========================================================
   SERVICE CARD
========================================================= */

function ServiceCard({ number, icon, title, description, index }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(y, [-100, 100], [7, -7]),
    { stiffness: 180, damping: 20 }
  );

  const rotateY = useSpring(
    useTransform(x, [-100, 100], [-7, 7]),
    { stiffness: 180, damping: 20 }
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
      variants={revealUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        delay: index * 0.12,
      }}
      whileHover={{
        y: -8,
      }}
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

/* =========================================================
   PROJECT CARD
========================================================= */

function ProjectCard({ label, title, type, visualClass, index }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [imageIndex, setImageIndex] = useState(0);

  const moveX = useSpring(
    useTransform(x, [-100, 100], [-8, 8]),
    { stiffness: 150, damping: 20 }
  );

  const moveY = useSpring(
    useTransform(y, [-100, 100], [-8, 8]),
    { stiffness: 150, damping: 20 }
  );

  const images =
    visualClass === "visual-blue"
      ? Array.from(
          { length: 6 },
          (_, i) =>
            `${import.meta.env.BASE_URL}mobile-pngs/Banner ${i + 1}.png`
        )
      : Array.from(
          { length: 6 },
          (_, i) =>
            `${import.meta.env.BASE_URL}web-pngs/Banner ${i + 1} (1).png`
        );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setImageIndex((current) => (current + 1) % images.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, [images.length]);

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
      variants={revealUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
      }}
    >
      <div className={`project-visual ${visualClass}`}>
        <img
          className="project-image"
          src={images[imageIndex]}
          alt={`${title} preview ${imageIndex + 1}`}
        />

        <div className="project-image-dots">
          {images.map((_, dotIndex) => (
            <button
              key={dotIndex}
              type="button"
              className={`image-dot ${
                dotIndex === imageIndex ? "active" : ""
              }`}
              onClick={() => setImageIndex(dotIndex)}
              aria-label={`Show preview ${dotIndex + 1}`}
            />
          ))}
        </div>
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

/* =========================================================
   APP
========================================================= */

function App() {
  const [darkMode, setDarkMode] = useState(false);

  /* =======================================================
     HERO MOUSE PARALLAX
  ======================================================= */

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const phoneX = useSpring(
    useTransform(mouseX, [-500, 500], [-18, 18]),
    {
      stiffness: 80,
      damping: 20,
    }
  );

  const phoneParallaxY = useSpring(
    useTransform(mouseY, [-500, 500], [-12, 12]),
    {
      stiffness: 80,
      damping: 20,
    }
  );

  const orbitX = useSpring(
    useTransform(mouseX, [-500, 500], [-8, 8]),
    {
      stiffness: 80,
      damping: 20,
    }
  );

  const orbitY = useSpring(
    useTransform(mouseY, [-500, 500], [-8, 8]),
    {
      stiffness: 80,
      damping: 20,
    }
  );

  const cardX = useSpring(
    useTransform(mouseX, [-500, 500], [-20, 20]),
    {
      stiffness: 80,
      damping: 20,
    }
  );

  const cardY = useSpring(
    useTransform(mouseY, [-500, 500], [-16, 16]),
    {
      stiffness: 80,
      damping: 20,
    }
  );

  const handleMouseMove = (event) => {
    mouseX.set(event.clientX - window.innerWidth / 2);
    mouseY.set(event.clientY - window.innerHeight / 2);
  };

  /* =======================================================
     PROCESS
  ======================================================= */

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
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header className="navbar">
        <a href="#home" className="brand">
          <img src={`${import.meta.env.BASE_URL}kayma-logo.png`} alt="KaymaTech" />
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

      <main>

        {/* ===================================================
            HERO
        =================================================== */}

        <section className="hero" id="home">
          <div className="grid-background"></div>

          <motion.div
            className="hero-glow glow-left"
            animate={{
              scale: [1, 1.12, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="hero-glow glow-right"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div className="hero-content">

            <motion.div
              className="eyebrow"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.1,
              }}
            >
              <motion.span
                className="dot"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              DIGITAL PRODUCT STUDIO
            </motion.div>

            <motion.h1
              initial={{
                opacity: 0,
                y: 45,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.9,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              We build digital
              <br />
              experiences that{" "}
              <span>matter.</span>
            </motion.h1>

            <motion.p
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.35,
              }}
            >
              We design and develop digital products that combine
              strategy, creativity and technology to create meaningful
              experiences.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.5,
              }}
            >
              <motion.a
                href="#contact"
                className="primary-button"
                whileHover={{
                  scale: 1.05,
                  y: -3,
                }}
                whileTap={{
                  scale: 0.97,
                }}
              >
                Start a project ↗
              </motion.a>

              <motion.a
                href="#work"
                className="text-button"
                whileHover={{
                  x: 5,
                }}
              >
                Explore our work
                <span>→</span>
              </motion.a>
            </motion.div>
          </div>

          {/* =================================================
              HERO VISUAL
          ================================================= */}

          <div className="hero-visual">

            {/* ORBIT 1 */}
            <motion.div
              className="orbit orbit-1"
              style={{
                x: orbitX,
                y: orbitY,
              }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* ORBIT 2 */}
            <motion.div
              className="orbit orbit-2"
              style={{
                x: orbitX,
                y: orbitY,
              }}
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* PHONE FLOAT WRAPPER */}
            <motion.div
              className="phone-float"
              animate={{
                y: [0, -12, 0],
                rotate: [2, 1, 2],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="phone"
                style={{
                  x: phoneX,
                  y: phoneParallaxY,
                }}
              >
                <div className="phone-top">
                  <span></span>
                </div>

                <div className="phone-content">

                  <motion.div
                    className="phone-card"
                    animate={{
                      y: [0, -4, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="mini-circle"></div>

                    <div className="phone-bars">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </motion.div>

                  <motion.div
                    className="phone-card"
                    animate={{
                      y: [0, 5, 0],
                    }}
                    transition={{
                      duration: 4.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="mini-circle"></div>

                    <div className="phone-bars">
                      <span></span>
                      <span></span>
                    </div>
                  </motion.div>

                </div>

                <div className="phone-bottom"></div>
              </motion.div>
            </motion.div>

            {/* FLOATING CARD 1 */}
            <motion.div
              className="floating-ui ui-one"
              style={{
                x: cardX,
                y: cardY,
              }}
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="ui-icon">✦</span>

              <div>
                <small>Design</small>
                <strong>Creative</strong>
              </div>
            </motion.div>

            {/* FLOATING CARD 2 */}
            <motion.div
              className="floating-ui ui-two"
              style={{
                x: cardX,
                y: cardY,
              }}
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="ui-icon">↗</span>

              <div>
                <small>Growth</small>
                <strong>+128%</strong>
              </div>
            </motion.div>

            {/* AI */}
            <motion.div
              className="hero-badge badge-one"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 2, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              AI
            </motion.div>

            {/* CODE */}
            <motion.div
              className="hero-badge badge-two"
              animate={{
                y: [0, 10, 0],
                rotate: [0, -2, 0],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              CODE
            </motion.div>

            {/* UX */}
            <motion.div
              className="hero-badge badge-three"
              animate={{
                y: [0, -7, 0],
                rotate: [0, 2, 0],
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

          <motion.div
            className="scroll-indicator"
            animate={{
              y: [0, 8, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span></span>
            SCROLL TO EXPLORE
          </motion.div>
        </section>

        {/* ===================================================
            ABOUT
        =================================================== */}

        <section className="intro" id="about">
          <div className="section-label">
            01 — ABOUT KAYMATECH
          </div>

          <div className="intro-content">

            <motion.div
              className="intro-copy"
              variants={revealUp}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.25,
              }}
            >
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

              <motion.a
                href="#services"
                className="text-button"
                whileHover={{
                  x: 6,
                }}
              >
                Discover what we do
                <span>→</span>
              </motion.a>
            </motion.div>

            <motion.div
              className="about-visual"
              initial={{
                opacity: 0,
                scale: 0.85,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
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
                  scale: [1, 1.04, 1],
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

              <motion.div
                className="about-floating-card about-card-one"
                animate={{
                  y: [0, -7, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <strong>50+</strong>
                <span>Digital Products</span>
              </motion.div>

              <motion.div
                className="about-floating-card about-card-two"
                animate={{
                  y: [0, 8, 0],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <strong>10+</strong>
                <span>Years Experience</span>
              </motion.div>

              <motion.div
                className="about-floating-card about-card-three"
                animate={{
                  y: [0, -6, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <strong>∞</strong>
                <span>Ideas in Motion</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ===================================================
            SERVICES
        =================================================== */}

        <section className="services" id="services">
          <div className="section-label">
            02 — WHAT WE DO
          </div>

          <motion.div
            className="services-heading"
            variants={revealUp}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.25,
            }}
          >
            <h2>
              Ideas are easy.
              <br />
              <span>Execution is everything.</span>
            </h2>
          </motion.div>

          <div className="service-grid">
            <ServiceCard
              index={0}
              number="01"
              icon="✦"
              title="Product Design"
              description="We turn complex ideas into simple, intuitive and beautiful digital experiences."
            />

            <ServiceCard
              index={1}
              number="02"
              icon="⌘"
              title="Web Development"
              description="Fast, scalable and modern websites built to perform beautifully across every device."
            />

            <ServiceCard
              index={2}
              number="03"
              icon="◈"
              title="App Development"
              description="Powerful mobile experiences designed and engineered around your users and business."
            />
          </div>
        </section>

        {/* ===================================================
            WORK
        =================================================== */}

        <section className="work" id="work">
          <div className="section-label">
            03 — SELECTED WORK
          </div>

          <motion.div
            className="work-heading"
            variants={revealUp}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.25,
            }}
          >
            <h2>
              Work that speaks
              <br />
              <span>for itself.</span>
            </h2>
          </motion.div>

          <div className="project-grid">
            <ProjectCard
              index={0}
              label="01 / DIGITAL PRODUCT"
              title="Digital Product"
              type="DIGITAL PRODUCT"
              visualClass="visual-blue"
            />

            <ProjectCard
              index={1}
              label="02 / BRAND EXPERIENCE"
              title="Brand Experience"
              type="DIGITAL IDENTITY"
              visualClass="visual-light"
            />
          </div>
        </section>

        {/* ===================================================
            PROCESS
        =================================================== */}

        <section className="process">
          <motion.div
            className="process-header"
            variants={revealUp}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.25,
            }}
          >
            <div className="section-label">
              04 — HOW WE WORK
            </div>

            <h2>
              From idea
              <br />
              <span>to impact.</span>
            </h2>
          </motion.div>

          <div className="process-timeline">
            <motion.div
              className="process-line"
              initial={{
                scaleX: 0,
              }}
              whileInView={{
                scaleX: 1,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 1.5,
                ease: "easeOut",
              }}
            />

            {processSteps.map((step, index) => (
              <motion.div
                className="process-card"
                key={step.number}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.25,
                }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                }}
              >
                <motion.div
                  className="process-number"
                  whileHover={{
                    scale: 1.1,
                  }}
                >
                  {step.number}
                </motion.div>

                <h3>{step.title}</h3>

                <p>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ===================================================
            CONTACT
        =================================================== */}

        <section className="contact" id="contact">
          <motion.div
            className="contact-inner"
            variants={revealUp}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.25,
            }}
          >
            <div className="section-label">
              05 — LET'S TALK
            </div>

            <h2>
              Have an idea?
              <span>Let's build it.</span>
            </h2>

            <p>
              Whether you have a fully formed product idea or just
              the beginning of one, let's turn it into something
              meaningful.
            </p>

            <motion.a
              href="mailto:contact@kaymatech.com"
              className="contact-email"
              whileHover={{
                y: -5,
              }}
            >
              <span className="contact-email-icon">✉</span>

              <span className="contact-email-text">
                contact@kaymatech.com
              </span>

              <span className="contact-arrow">↗</span>
            </motion.a>
          </motion.div>
        </section>
      </main>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="footer">
        <div className="footer-inner">

          <motion.div
            className="footer-top"
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
            }}
          >
            <div className="footer-brand">
              <img
                src={`${import.meta.env.BASE_URL}kayma-logo.png`}
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
          </motion.div>

          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} KaymaTech. All rights
              reserved.
            </span>

            <span>
              Innovate. Build. Deliver.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
