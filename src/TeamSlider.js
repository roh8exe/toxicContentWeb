// import React from 'react';
// import { Linkedin, Github, Mail } from 'lucide-react';
// import './TeamSection.css';
// import img1 from './photos/mayank.png' 
// import img2 from './photos/Himanshu.png'
// import img3 from './photos/DakshJain.png'
// import img4 from './photos/ReddybathuniVenkat.png'
// import img5 from './photos/rohit.png'
// import img6 from './photos/EshwarDhande.png'
// import img7 from './photos/Pavandeekshith Doddi.png'
// import img8 from './photos/BirudugaddaSrivibhav.png'

// // Team members data - replace with your actual team info
// const teamData = {
//   leader: {
//     id: 1,
//     name: "Prof. Mayank Singh",
//     role: "Principal Investigator",
//     image: img1, // Leave this empty to force the placeholder image to load
//     fallbackImage: "https://drive.google.com/uc?export=view&id=1RCfuR7OK1DwFHkV7hJ71W0_FUxlbDySx",
//     bio: "Professor at IIT Gandhinagar leading research on toxicity detection and content moderation systems, with expertise in NLP and ethical AI.",
//     socialLinks: {
//       linkedin: "https://www.linkedin.com/in/mayank-singh-b591a818/",
//       github: "https://github.com/mayank4490",
//       email: "mailto:singh.mayank@iitgn.ac.in"
//     }
//   },
//   members: [
//     {
//       id: 2,
//       name: "Himanshu Beniwal",
//       role: "Student",
//       image: img2, // Empty to use placeholder
//       bio: "PhD in Computer Science with expertise in NLP",
//       socialLinks: {
//         linkedin: "https://www.linkedin.com/in/himanshubeniwal/",
//         github: "https://github.com/himanshubeniwal",
//         email: "mailto:himanshubeniwal@iitgn.ac.in"
//       }
//     },
//     {
//       id: 3,
//       name: "Daksh Jain",
//       role: "Student",
//       image: img3,
//       bio: "",
//       socialLinks: {
//         linkedin: "https://www.linkedin.com/in/dkshjn/",
//         github: "https://dkshjn.github.io/portfolio/#header",
//         email: "mailto:daksh.jain@iitgn.ac.in"
//       }
//     },
//     {
//       id: 4,
//       name: "Venkat Reddybathuni",
//       role: "Student",
//       image: img4,
//       bio: "",
//       socialLinks: {
//         linkedin: "https://www.linkedin.com/in/reddybathuni-venkat-158364261/?originalSubdomain=in",
//         github: "https://github.com/VenkatReddybathuni",
//         email: "mailto:reddybathuni.venkat@iitgn.ac.in"
//       }
//     },
//     {
//       id: 5,
//       name: "Rohit Kumar",
//       role: "Student",
//       image: img5,
//       bio: "",
//       socialLinks: {
//         linkedin: "https://www.linkedin.com/in/rohit-bansal-/",
//         github: "https://github.com/roh8exe",
//         email: "mailto:rohit.kumar.23063@iitgoa.ac.in"
//       }
//     },
//     {
//       id: 6,
//       name: "Eshwar Dhande",
//       role: "Student",
//       image: img6,
//       bio: "",
//       socialLinks: {
//         linkedin: "https://www.linkedin.com/in/eshwar-dhande/",
//         github: "https://github.com/sarahjohnson",
//         email: "mailto:eshwar.dhande@iitgn.ac.in"
//       }
//     },
//     {
//       id: 7,
//       name: "Pavan Deekshith",
//       role: "Student",
//       image: img7,
//       bio: "",
//       socialLinks: {
//         linkedin: "https://www.linkedin.com/in/pavan-deekshith-doddi-40153a2a3/",
//         github: "https://github.com/carlosrodriguez",
//         email: "mailto:carlos.rodriguez@example.com"
//       }
//     },
//     {
//       id: 8,
//       name: "Birudugadda Srivibhav",
//       role: "Student",
//       image: img8,
//       bio: "",
//       socialLinks: {
//         linkedin: "https://www.linkedin.com/in/birudugadda-srivibhav/",
//         github: "https://github.com/lisawong",
//         email: "mailto:birudugadda.srivibhav@iitgn.ac.in"
//       }
//     }
//   ]
// };

// // For placeholder images when real ones aren't available
// const getPlaceholderImage = (index, isLeader = false) => {
//   const colors = [
//     '#4096ff', '#1677ff', '#0958d9', '#003eb3', 
//     '#002c8c', '#001d66', '#5151ff', '#7B5CFF'
//   ];
//   const color = colors[index % colors.length].replace('#', '');
//   const textColor = 'FFFFFF';
  
//   if (isLeader) {
//     return `https://placehold.co/300x400/${color}/${textColor}?text=Prof.+Mayank+Singh`;
//   }
//   return `https://placehold.co/300x400/${color}/${textColor}?text=Team+Member+${index + 1}`;
// };

// const TeamSection = () => {
//   return (
//     <section className="team-section">
//       <div className="team-container">
//         <h2 className="team-title">Our Team</h2>
//         <p className="team-subtitle">
//           Our diverse team of experts is dedicated to creating safer online spaces through innovative toxicity detection
//         </p>
        
//         {/* Team Leader Card - Social links removed by CSS */}
//         <div className="team-leader-container">
//           <div className="team-leader-card">
//             <div className="team-leader-image">
//               <img 
//                 src={teamData.leader.image || getPlaceholderImage(0, true)} 
//                 alt={teamData.leader.name}
//                 onError={(e) => {
//                   console.log("Leader image load error, using placeholder");
//                   e.target.src = getPlaceholderImage(0, true);
//                 }}
//               />
//             </div>
//             <div className="team-leader-info">
//               <h3 className="team-leader-name">{teamData.leader.name}</h3>
//               <p className="team-leader-role">{teamData.leader.role}</p>
//               <p className="team-leader-bio">{teamData.leader.bio}</p>
              
//               {/* This will be hidden by CSS */}
//               <div className="team-leader-social">
//                 {teamData.leader.socialLinks.linkedin && (
//                   <a href={teamData.leader.socialLinks.linkedin} 
//                      target="_blank" 
//                      rel="noopener noreferrer" 
//                      aria-label="LinkedIn Profile">
//                     <Linkedin size={16} />
//                   </a>
//                 )}
                
//                 {teamData.leader.socialLinks.github && (
//                   <a href={teamData.leader.socialLinks.github} 
//                      target="_blank" 
//                      rel="noopener noreferrer" 
//                      aria-label="GitHub Profile">
//                     <Github size={16} />
//                   </a>
//                 )}
                
//                 {teamData.leader.socialLinks.email && (
//                   <a href={teamData.leader.socialLinks.email} 
//                      aria-label="Email">
//                     <Mail size={16} />
//                   </a>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Team Members Grid */}
//         <div className="team-members-grid">
//           {/* First 6 Team Members */}
//           {teamData.members.slice(0, 6).map((member, index) => (
//             <div key={member.id} className="team-member-card">
//               <div className="team-member-image">
//                 <img 
//                   src={member.image || getPlaceholderImage(index)} 
//                   alt={member.name}
//                   onError={(e) => {
//                     console.log(`Member ${index+1} image load error, using placeholder`);
//                     e.target.src = getPlaceholderImage(index);
//                   }}
//                 />
//               </div>
//               <div className="team-member-info">
//                 <h3 className="team-member-name">{member.name}</h3>
//                 <p className="team-member-role">{member.role}</p>
//                 <div className="team-member-social">
//                   {member.socialLinks.linkedin && (
//                     <a href={member.socialLinks.linkedin} 
//                        target="_blank" 
//                        rel="noopener noreferrer" 
//                        aria-label="LinkedIn Profile">
//                       <Linkedin size={16} />
//                     </a>
//                   )}
//                   {member.socialLinks.github && (
//                     <a href={member.socialLinks.github} 
//                        target="_blank" 
//                        rel="noopener noreferrer" 
//                        aria-label="GitHub Profile">
//                       <Github size={16} />
//                     </a>
//                   )}
//                   {member.socialLinks.email && (
//                     <a href={member.socialLinks.email} 
//                        aria-label="Email">
//                       <Mail size={16} />
//                     </a>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
          
//           {/* Team Member 7 (Carlos Rodriguez) - Last in a row, will be centered by CSS */}
//           <div key={teamData.members[6].id} className="team-member-card">
//             <div className="team-member-image">
//               <img 
//                 src={teamData.members[6].image || getPlaceholderImage(6)} 
//                 alt={teamData.members[6].name}
//                 onError={(e) => {
//                   console.log(`Member 7 image load error, using placeholder`);
//                   e.target.src = getPlaceholderImage(6);
//                 }}
//               />
//             </div>
//             <div className="team-member-info">
//               <h3 className="team-member-name">{teamData.members[6].name}</h3>
//               <p className="team-member-role">{teamData.members[6].role}</p>
//               <div className="team-member-social">
//                 {teamData.members[6].socialLinks.linkedin && (
//                   <a href={teamData.members[6].socialLinks.linkedin} 
//                      target="_blank" 
//                      rel="noopener noreferrer" 
//                      aria-label="LinkedIn Profile">
//                     <Linkedin size={16} />
//                   </a>
//                 )}
//                 {teamData.members[6].socialLinks.github && (
//                   <a href={teamData.members[6].socialLinks.github} 
//                      target="_blank" 
//                      rel="noopener noreferrer" 
//                      aria-label="GitHub Profile">
//                     <Github size={16} />
//                   </a>
//                 )}
//                 {teamData.members[6].socialLinks.email && (
//                   <a href={teamData.members[6].socialLinks.email} 
//                      aria-label="Email">
//                     <Mail size={16} />
//                   </a>
//                 )}
//               </div>
//             </div>
//           </div>
          
//           {/* Last Team Member */}
//           {teamData.members.slice(7).map((member, index) => (
//             <div key={member.id} className="team-member-card">
//               <div className="team-member-image">
//                 <img 
//                   src={member.image || getPlaceholderImage(index + 7)} 
//                   alt={member.name}
//                   onError={(e) => {
//                     console.log(`Member ${index+8} image load error, using placeholder`);
//                     e.target.src = getPlaceholderImage(index + 7);
//                   }}
//                 />
//               </div>
//               <div className="team-member-info">
//                 <h3 className="team-member-name">{member.name}</h3>
//                 <p className="team-member-role">{member.role}</p>
//                 <div className="team-member-social">
//                   {member.socialLinks.linkedin && (
//                     <a href={member.socialLinks.linkedin} 
//                        target="_blank" 
//                        rel="noopener noreferrer" 
//                        aria-label="LinkedIn Profile">
//                       <Linkedin size={16} />
//                     </a>
//                   )}
//                   {member.socialLinks.github && (
//                     <a href={member.socialLinks.github} 
//                        target="_blank" 
//                        rel="noopener noreferrer" 
//                        aria-label="GitHub Profile">
//                       <Github size={16} />
//                     </a>
//                   )}
//                   {member.socialLinks.email && (
//                     <a href={member.socialLinks.email} 
//                        aria-label="Email">
//                       <Mail size={16} />
//                     </a>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TeamSection;


import React from 'react';
import { Linkedin, Github, Mail } from 'lucide-react';
import './TeamSection.css';

// Google Drive Image Links
const teamData = {
  leader: {
    id: 1,
    name: "Prof. Mayank Singh",
    role: "Principal Investigator",
    image: "https://github.com/VenkatReddybathuni/UnityAI-guard-team-images/blob/main/mayank.png?raw=true",
    bio: "Professor at IIT Gandhinagar leading research on toxicity detection and content moderation systems, with expertise in NLP and ethical AI.",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/mayank-singh-b591a818/",
      github: "https://github.com/mayank4490",
      email: "mailto:singh.mayank@iitgn.ac.in"
    }
  },
  members: [
    {
      id: 2,
      name: "Himanshu Beniwal",
      role: "PhD Student, IIT Gandhinagar ",
      image: "https://github.com/VenkatReddybathuni/UnityAI-guard-team-images/blob/main/Himanshu.png?raw=true",
      bio: "PhD in Computer Science with expertise in NLP",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/himanshubeniwal/",
        github: "https://github.com/himanshubeniwal",
        email: "mailto:himanshubeniwal@iitgn.ac.in"
      }
    },
    {
      id: 3,
      name: "Daksh Jain",
      role: "BTech. Student, IIT Gandhinagar",
      image: "https://github.com/VenkatReddybathuni/UnityAI-guard-team-images/blob/main/DakshJain.png?raw=true",
      bio: "",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/dkshjn/",
        github: "https://dkshjn.github.io/portfolio/#header",
        email: "mailto:daksh.jain@iitgn.ac.in"
      }
    },
    {
      id: 4,
      name: "Venkat Reddybathuni",
      role: "BTech. Student, IIT Gandhinagar",
      image: "https://github.com/VenkatReddybathuni/UnityAI-guard-team-images/blob/main/ReddybathuniVenkat.png?raw=true",
      bio: "",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/reddybathuni-venkat-158364261/?originalSubdomain=in",
        github: "https://github.com/VenkatReddybathuni",
        email: "mailto:reddybathuni.venkat@iitgn.ac.in"
      }
    },
    {
      id: 5,
      name: "Rohit Kumar",
      role: "BTech. Student, IIT Goa",
      image: "https://github.com/VenkatReddybathuni/UnityAI-guard-team-images/blob/main/rohit.png?raw=true",
      bio: "",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/rohit-bansal-/",
        github: "https://github.com/roh8exe",
        email: "mailto:rohit.kumar.23063@iitgoa.ac.in"
      }
    },
    {
      id: 6,
      name: "Eshwar Dhande",
      role: "MTech. Student, IIT Gandhinagar",
      image: "https://github.com/VenkatReddybathuni/UnityAI-guard-team-images/blob/main/EshwarDhande.png?raw=true",
      bio: "",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/eshwar-dhande/",
        github: "https://www.linkedin.com/in/eshwar-dhande/",
        email: "mailto:eshwar.dhande@iitgn.ac.in"
      }
    },
    {
      id: 7,
      name: "Pavan Deekshith",
      role: "BTech. Student, IIT Gandhinagar",
      image: "https://github.com/VenkatReddybathuni/UnityAI-guard-team-images/blob/main/Pavandeekshith%20Doddi.png?raw=true",
      bio: "",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/pavan-deekshith-doddi-40153a2a3/",
        github: "https://github.com/pavandeekshith",
        email: "mailto:pavan.doddi@iitgn.ac.in"
      }
    },
    {
      id: 8,
      name: "Birudugadda Srivibhav",
      role: "BTech. Student, IIT Gandhinagar",
      image: "https://github.com/VenkatReddybathuni/UnityAI-guard-team-images/blob/main/BirudugaddaSrivibhav.png?raw=true",
      bio: "",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/birudugadda-srivibhav/",
        github: "https://github.com/Sparky1743",
        email: "mailto:birudugadda.srivibhav@iitgn.ac.in"
      }
    },
    {
      id: 9,
      name: "Pratham Sharda",
      role: "BTech. Student, IIT Gandhinagar",
      image: "https://github.com/VenkatReddybathuni/UnityAI-guard-team-images/blob/main/PrathamSharda.png?raw=true",
      bio: "",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/pratham-sharda-0147a9260/",
        github: "https://github.com/Pratham-Sharda",
        email: "mailto:pratham.sharda@iitgn.ac.in"
      }
    },
    {
      id: 10,
      name: "Adithya Ananth",
      role: "BTech. Student, IIT Tirupati",
      image: "https://github.com/VenkatReddybathuni/UnityAI-guard-team-images/blob/main/AdithyaAnanth.png?raw=true",
      bio: "",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/ananth-adithya/",
        github: "https://github.com/adithya-ananth",
        email: "mailto:cs23b001@iittp.ac.in"
      }
    }
  ]
};

const TeamSection = () => {
  return (
    <section className="team-section">
      <div className="team-container">
        <h2 className="team-title">Our Team</h2>
        <p className="team-subtitle">
          Our diverse team of experts is dedicated to creating safer online spaces through innovative toxicity detection
        </p>

        {/* Team Leader */}
        <div className="team-leader-container">
          <div className="team-leader-card">
            <div className="team-leader-image">
              <img 
                src={teamData.leader.image} 
                alt={teamData.leader.name}
              />
            </div>
            <div className="team-leader-info">
              <h3>{teamData.leader.name}</h3>
              <p>{teamData.leader.role}</p>
              <p>{teamData.leader.bio}</p>
              <div className="team-leader-social">
                {teamData.leader.socialLinks.linkedin && <a href={teamData.leader.socialLinks.linkedin}><Linkedin size={16} /></a>}
                {teamData.leader.socialLinks.github && <a href={teamData.leader.socialLinks.github}><Github size={16} /></a>}
                {teamData.leader.socialLinks.email && <a href={teamData.leader.socialLinks.email}><Mail size={16} /></a>}
              </div>
            </div>
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="team-members-grid">
          {teamData.members.map((member) => (
            <div key={member.id} className="team-member-card">
              <div className="team-member-image">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="team-member-info">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <div className="team-member-social">
                  {member.socialLinks.linkedin && <a href={member.socialLinks.linkedin}><Linkedin size={16} /></a>}
                  {member.socialLinks.github && <a href={member.socialLinks.github}><Github size={16} /></a>}
                  {member.socialLinks.email && <a href={member.socialLinks.email}><Mail size={16} /></a>}
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
