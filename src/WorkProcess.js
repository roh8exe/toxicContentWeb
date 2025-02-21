import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Activity, BarChart2 } from 'lucide-react';
import './WorkProcess.css'; // Make sure to replace with the new CSS file

const processSteps = [
  { 
    number: 1, 
    title: "Input Text", 
    description: "Enter or paste the content you want to analyze for toxic elements", 
    icon: <MessageSquare size={42} />
  },
  { 
    number: 2, 
    title: "Advanced Analysis", 
    description: "Our AI instantly processes the content using state-of-the-art algorithms", 
    icon: <Activity size={42} />
  },
  { 
    number: 3, 
    title: "Detailed Results", 
    description: "Get comprehensive toxicity scores and actionable insights", 
    icon: <BarChart2 size={42} />
  },
];

// Container animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

// Item animation variants
const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

export default function WorkProcess() {
  return (
    <section className="work-process-section">
      <div className="section-container work-process-container">
        <motion.h2 
          className="section-title work-process-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          How It Works
        </motion.h2>
        
        <motion.p
          className="work-process-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Our toxicity checker uses advanced AI to analyze your content in just three simple steps
        </motion.p>
        
        <motion.div 
          className="process-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              className="process-step"
              variants={itemVariants}
              whileHover={{ 
                y: -15,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08), 0 8px 16px rgba(0, 123, 255, 0.1)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="step-number">{step.number}</div>
              <div className="step-icon">{step.icon}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}