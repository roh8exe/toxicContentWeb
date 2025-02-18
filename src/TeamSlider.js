import { useState, useEffect } from "react";
import "./TeamSlider.css";
import img1 from './  rohit.png'

const teamMembers = [
  { name: "Member 1", role: "Developer", img: img1, email: "m1@example.com" },
  { name: "Member 2", role: "Designer", img: "member2.jpg", email: "m2@example.com" },
  { name: "Member 3", role: "Manager", img: "member3.jpg", email: "m3@example.com" },
  { name: "Member 4", role: "Tester", img: "member4.jpg", email: "m4@example.com" },
  { name: "Member 5", role: "Analyst", img: "member5.jpg", email: "m5@example.com" },
  { name: "Member 6", role: "Researcher", img: "member6.jpg", email: "m6@example.com" },
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
