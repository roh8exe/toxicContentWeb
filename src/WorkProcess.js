import React from 'react';
import { motion } from 'framer-motion';
import './WorkProcess.css'; // Ensure you have a separate CSS file for styles

const processSteps = [
  { number: 1, title: "Input Text", description: "Enter or paste the content you want to analyze" },
  { number: 2, title: "Analysis", description: "Our AI analyzes the content for toxic elements" },
  { number: 3, title: "Results", description: "Get instant feedback on content toxicity" },
];

export default function WorkProcess() {
  return (
    <section className="work-process-section">
      <div className="section-container">
        <h2 className="section-title">How It Works</h2>
        <div className="process-grid">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              className="process-step"
              initial={{ opacity: 0, y: 20 }} // Start off-screen
              whileInView={{ opacity: 1, y: 0 }} // Animate to visible
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1.0, delay: index * 0.2 }} // Delay for sequential effect
              viewport={{ once: false }} // Allow multiple triggers
            >
              <div className="step-number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}