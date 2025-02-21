import React from 'react';
import { Linkedin, Github, Mail } from 'lucide-react';
import './TeamSection.css';
import img1 from './photos/mayank.png'
import img2 from './photos/Himanshu.png'

// Team members data - replace with your actual team info
const teamData = {
  leader: {
    id: 1,
    name: "Prof. Mayank Singh",
    role: "Principal Investigator",
    image: img1, // Leave this empty to force the placeholder image to load
    bio: "Professor at IIT Gandhinagar leading research on toxicity detection and content moderation systems, with expertise in NLP and ethical AI.",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/mayank-singh-b591a818/",
      github: "https://github.com/mayank4490",
      email: "mailto:mayank.singh@iitgn.ac.in"
    }
  },
  members: [
    {
      id: 2,
      name: "Himanshu Beniwal",
      role: "Research Scientist",
      image: img2, // Empty to use placeholder
      bio: "PhD in Computer Science with expertise in NLP and content moderation.",
      socialLinks: {
        linkedin: "https://linkedin.com/in/janesmith",
        github: "https://github.com/janesmith",
        email: "mailto:jane.smith@example.com"
      }
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "ML Engineer",
      image: "",
      bio: "Specializes in machine learning models for toxicity detection.",
      socialLinks: {
        linkedin: "https://linkedin.com/in/michaelchen",
        github: "https://github.com/michaelchen",
        email: "mailto:michael.chen@example.com"
      }
    },
    {
      id: 4,
      name: "Priya Patel",
      role: "Data Scientist",
      image: "",
      bio: "Expert in dataset curation and model evaluation for ethical AI systems.",
      socialLinks: {
        linkedin: "https://linkedin.com/in/priyapatel",
        github: "https://github.com/priyapatel",
        email: "mailto:priya.patel@example.com"
      }
    },
    {
      id: 5,
      name: "Ahmed Hassan",
      role: "Full Stack Developer",
      image: "",
      bio: "Builds robust APIs and interfaces for toxicity detection tools.",
      socialLinks: {
        linkedin: "https://linkedin.com/in/ahmedhassan",
        github: "https://github.com/ahmedhassan",
        email: "mailto:ahmed.hassan@example.com"
      }
    },
    {
      id: 6,
      name: "Sarah Johnson",
      role: "UX Designer",
      image: "",
      bio: "Creates intuitive user experiences for content moderation interfaces.",
      socialLinks: {
        linkedin: "https://linkedin.com/in/sarahjohnson",
        github: "https://github.com/sarahjohnson",
        email: "mailto:sarah.johnson@example.com"
      }
    },
    {
      id: 7,
      name: "Carlos Rodriguez",
      role: "NLP Specialist",
      image: "",
      bio: "Develops multilingual NLP models for toxicity detection.",
      socialLinks: {
        linkedin: "https://linkedin.com/in/carlosrodriguez",
        github: "https://github.com/carlosrodriguez",
        email: "mailto:carlos.rodriguez@example.com"
      }
    },
    {
      id: 8,
      name: "Lisa Wong",
      role: "Project Manager",
      image: "",
      bio: "Coordinates research and development efforts across the platform.",
      socialLinks: {
        linkedin: "https://linkedin.com/in/lisawong",
        github: "https://github.com/lisawong",
        email: "mailto:lisa.wong@example.com"
      }
    }
  ]
};

// For placeholder images when real ones aren't available
const getPlaceholderImage = (index, isLeader = false) => {
  const colors = [
    '#4096ff', '#1677ff', '#0958d9', '#003eb3', 
    '#002c8c', '#001d66', '#5151ff', '#7B5CFF'
  ];
  const color = colors[index % colors.length].replace('#', '');
  const textColor = 'FFFFFF';
  
  if (isLeader) {
    return `https://placehold.co/300x400/${color}/${textColor}?text=Prof.+Mayank+Singh`;
  }
  return `https://placehold.co/300x400/${color}/${textColor}?text=Team+Member+${index + 1}`;
};

const TeamSection = () => {
  return (
    <section className="team-section">
      <div className="team-container">
        <h2 className="team-title">Our Team</h2>
        <p className="team-subtitle">
          Our diverse team of experts is dedicated to creating safer online spaces through innovative toxicity detection
        </p>
        
        {/* Team Leader Card - Social links removed by CSS */}
        <div className="team-leader-container">
          <div className="team-leader-card">
            <div className="team-leader-image">
              <img 
                src={teamData.leader.image || getPlaceholderImage(0, true)} 
                alt={teamData.leader.name}
                onError={(e) => {
                  console.log("Leader image load error, using placeholder");
                  e.target.src = getPlaceholderImage(0, true);
                }}
              />
            </div>
            <div className="team-leader-info">
              <h3 className="team-leader-name">{teamData.leader.name}</h3>
              <p className="team-leader-role">{teamData.leader.role}</p>
              <p className="team-leader-bio">{teamData.leader.bio}</p>
              
              {/* This will be hidden by CSS */}
              <div className="team-leader-social">
                {teamData.leader.socialLinks.linkedin && (
                  <a href={teamData.leader.socialLinks.linkedin} 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     aria-label="LinkedIn Profile">
                    <Linkedin size={16} />
                  </a>
                )}
                
                {teamData.leader.socialLinks.github && (
                  <a href={teamData.leader.socialLinks.github} 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     aria-label="GitHub Profile">
                    <Github size={16} />
                  </a>
                )}
                
                {teamData.leader.socialLinks.email && (
                  <a href={teamData.leader.socialLinks.email} 
                     aria-label="Email">
                    <Mail size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Team Members Grid */}
        <div className="team-members-grid">
          {/* First 6 Team Members */}
          {teamData.members.slice(0, 6).map((member, index) => (
            <div key={member.id} className="team-member-card">
              <div className="team-member-image">
                <img 
                  src={member.image || getPlaceholderImage(index)} 
                  alt={member.name}
                  onError={(e) => {
                    console.log(`Member ${index+1} image load error, using placeholder`);
                    e.target.src = getPlaceholderImage(index);
                  }}
                />
              </div>
              <div className="team-member-info">
                <h3 className="team-member-name">{member.name}</h3>
                <p className="team-member-role">{member.role}</p>
                <div className="team-member-social">
                  {member.socialLinks.linkedin && (
                    <a href={member.socialLinks.linkedin} 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       aria-label="LinkedIn Profile">
                      <Linkedin size={16} />
                    </a>
                  )}
                  {member.socialLinks.github && (
                    <a href={member.socialLinks.github} 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       aria-label="GitHub Profile">
                      <Github size={16} />
                    </a>
                  )}
                  {member.socialLinks.email && (
                    <a href={member.socialLinks.email} 
                       aria-label="Email">
                      <Mail size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {/* Team Member 7 (Carlos Rodriguez) - Last in a row, will be centered by CSS */}
          <div key={teamData.members[6].id} className="team-member-card">
            <div className="team-member-image">
              <img 
                src={teamData.members[6].image || getPlaceholderImage(6)} 
                alt={teamData.members[6].name}
                onError={(e) => {
                  console.log(`Member 7 image load error, using placeholder`);
                  e.target.src = getPlaceholderImage(6);
                }}
              />
            </div>
            <div className="team-member-info">
              <h3 className="team-member-name">{teamData.members[6].name}</h3>
              <p className="team-member-role">{teamData.members[6].role}</p>
              <div className="team-member-social">
                {teamData.members[6].socialLinks.linkedin && (
                  <a href={teamData.members[6].socialLinks.linkedin} 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     aria-label="LinkedIn Profile">
                    <Linkedin size={16} />
                  </a>
                )}
                {teamData.members[6].socialLinks.github && (
                  <a href={teamData.members[6].socialLinks.github} 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     aria-label="GitHub Profile">
                    <Github size={16} />
                  </a>
                )}
                {teamData.members[6].socialLinks.email && (
                  <a href={teamData.members[6].socialLinks.email} 
                     aria-label="Email">
                    <Mail size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>
          
          {/* Last Team Member */}
          {teamData.members.slice(7).map((member, index) => (
            <div key={member.id} className="team-member-card">
              <div className="team-member-image">
                <img 
                  src={member.image || getPlaceholderImage(index + 7)} 
                  alt={member.name}
                  onError={(e) => {
                    console.log(`Member ${index+8} image load error, using placeholder`);
                    e.target.src = getPlaceholderImage(index + 7);
                  }}
                />
              </div>
              <div className="team-member-info">
                <h3 className="team-member-name">{member.name}</h3>
                <p className="team-member-role">{member.role}</p>
                <div className="team-member-social">
                  {member.socialLinks.linkedin && (
                    <a href={member.socialLinks.linkedin} 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       aria-label="LinkedIn Profile">
                      <Linkedin size={16} />
                    </a>
                  )}
                  {member.socialLinks.github && (
                    <a href={member.socialLinks.github} 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       aria-label="GitHub Profile">
                      <Github size={16} />
                    </a>
                  )}
                  {member.socialLinks.email && (
                    <a href={member.socialLinks.email} 
                       aria-label="Email">
                      <Mail size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;