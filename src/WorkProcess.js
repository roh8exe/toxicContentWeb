import React, { useEffect, useRef } from 'react';
import './WorkProcess.css'; // Ensure you have a separate CSS file for styles

const processSteps = [
  { number: 1, title: "Input Text", description: "Enter or paste the content you want to analyze" },
  { number: 2, title: "Analysis", description: "Our AI analyzes the content for toxic elements" },
  { number: 3, title: "Results", description: "Get instant feedback on content toxicity" },
];

export default function WorkProcess() {
  const stepRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('pop-up');
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    stepRefs.current.forEach((step) => {
      if (step) observer.observe(step);
    });

    return () => {
      stepRefs.current.forEach((step) => {
        if (step) observer.unobserve(step);
      });
    };
  }, []);

  return (
    <section className="work-process-section">
      <div className="section-container">
        <h2 className="section-title">How It Works</h2>
        <div className="process-grid">
          {processSteps.map((step, index) => (
            <div
              key={index}
              className="process-step"
              ref={el => stepRefs.current[index] = el}
            >
              <div className="step-number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}