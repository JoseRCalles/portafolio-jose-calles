import { useState, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);
import { BiosBoot } from "./components/overview/BiosBoot";
import { Hero } from "./components/overview/Hero";
import { BioTerminal } from "./components/overview/BioTerminal";
import { SkillsMatrix } from "./components/skills/SkillsMatrix";
import { NetworkHardener } from "./components/skills/NetworkHardener";
import { BentoSection } from "./components/projects/ProjectSection";
import { ContactPanel } from "./components/contact/ContactPanel";
import "./App.css";

export function App() {
  const [booted, setBooted] = useState(false);

  // Scroll Reveal Animations via IntersectionObserver & GSAP
  useEffect(() => {
    if (!booted) return;

    // Reveal animation for sections
    const sections = document.querySelectorAll(".section-container");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate card items inside section
            const childElements = entry.target.querySelectorAll(".glass-panel, h2, p, .terminal-window");

            gsap.fromTo(
              childElements,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out", clearProps: "all" }
            );

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, [booted]);



  useEffect(() => {
    if (booted) {
      gsap.fromTo(
        ".crt-overlay, .crt-vignette",
        { opacity: 0 },
        { opacity: 0.7, duration: 1.5, ease: "power2.out" }
      );
    }
  }, [booted]);

  return (
    <>
      {/* BIOS Boot check loader */}
      {!booted && <BiosBoot onComplete={() => setBooted(true)} />}

      {booted && (
        <div className="relative min-h-screen bg-bg-dark text-text-muted flex flex-col items-center overflow-hidden">
          {/* WebGL Retro wireframe grid backdrop */}

          {/* CRT scanlines and viewport glass borders */}
          <div className="crt-overlay" />
          <div className="crt-vignette" />
          <div className="crt-static" />

          {/* Scrolling Single Page Application Containers */}
          <main className="w-full relative z-10 flex flex-col items-center gap-12 pb-32">

            {/* Overview Section */}
            <section id="overview" className="section-container min-h-screen">
              <Hero />
              <BioTerminal />
              <div className="glowing-connector bottom-[-60px]" />
            </section>

            {/* Skills Section */}
            <section id="skills" className="section-container min-h-screen">
              <SkillsMatrix />
              <NetworkHardener />
              <div className="glowing-connector bottom-[-60px]" />
            </section>

            {/* Projects Section */}
            <section id="projects" className="section-container min-h-screen">
              <BentoSection />
              <div className="glowing-connector bottom-[-60px]" />
            </section>

            {/* Contact Section */}
            <section id="contact" className="section-container min-h-screen">
              <ContactPanel />
            </section>
          </main>

          {/* Floating OS Dock navigation */}
        </div>
      )}
    </>
  );
}

export default App;
