import { useState, useEffect } from "react";
import "./TeamSlider.css";
import img1 from './photos/mayanksingh.png'
import img2 from './photos/Himanshu.png'
import img5 from './photos/rohit.png'
import img6 from './photos/Eshwar Dhande.png'

const teamMembers = [
  { name: "Dr. Mayank Singh", role: "Supervisior", img: img1, email: "singh.mayank@iitgn.ac.in" },
  { name: "Himanshu Beniwal", role: "Role", img: img2, email: "himanshubeniwal@iitgn.ac.in" },
  { name: "Daksh Jain", role: "Role", img: "member3.jpg", email: "daksh.jain@iitgn.ac.in" },
  { name: "Birudugadda Srivibhav", role: "Role", img: "member4.jpg", email: "birudugadda.srivibhav@iitgn.ac.in" },
  { name: "Rohit Kumar", role: "Role", img: img5, email: "rohit.kumar.23063@iitgoa.ac.in" },
  { name: "Eshwar Dhande", role: "Role", img: img6, email: "eshwar.dhande@iitgn.ac.in" },
  { name: "Reddybathuni Venkat", role: "Role", img: "member7", email: "reddybathuni.venkat@iitgn.ac.in" },
  { name: "Pavan Doddi", role: "Role", img: "member8", email: "pavan.doddi@iitgn.ac.in" },
];

export default function TeamSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="team-slider-container">
      <div className="team-slider-wrapper" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {teamMembers.map((member, index) => (
          <div key={index} className="team-slide">
            <img src={member.img} alt={member.name} className="team-img" />
            <div className="team-info">
              <h3>{member.name}</h3>
              <p>{member.role}</p>
              <a href={`mailto:${member.email}`} className="team-email-link">{member.email}</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
