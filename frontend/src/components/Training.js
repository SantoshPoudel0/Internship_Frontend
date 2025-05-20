import React from 'react';
import './Training.css';

// Training courses data with images that match the course titles
const trainingCourses = [
  {
    id: 1,
    title: 'Barista Basics',
    price: 'RS 2,500',
    duration: '2 Days',
    description: 'Master espresso extraction, milk texturing techniques, and basic drink preparation. Ideal for beginners and home enthusiasts.',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 2,
    title: 'Advanced Latte Art',
    price: 'RS 3,200',
    duration: '3 Days',
    description: 'Create intricate designs including rosettas, hearts, tulips, and swans. Learn pouring techniques from award-winning baristas.',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 3,
    title: 'Coffee Tasting',
    price: 'RS 1,800',
    duration: '1 Day',
    description: 'Train your palate to identify flavor notes, acidity, body, and aroma. Includes cupping sessions with single-origin beans from around the world.',
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 4,
    title: 'Brewing Methods',
    price: 'RS 2,200',
    duration: '2 Days',
    description: 'Compare pour-over, AeroPress, French press, and siphon brewing. Learn optimal grind sizes, water temperatures, and brewing ratios.',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 5,
    title: 'Coffee Roasting Workshop',
    price: 'RS 4,500',
    duration: '3 Days',
    description: 'Understand first crack, development time, and roast profiles. Practice on commercial drum roasters with specialty green beans.',
    image: 'https://images.unsplash.com/photo-1515283709260-ee29296f1534?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 6,
    title: 'Café Management',
    price: 'RS 5,800',
    duration: '5 Days',
    description: 'Learn inventory management, staff training, equipment maintenance, pricing strategies, and customer experience optimization.',
    image: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }
];

function Training() {
  return (
    <section id="training" className="training-section">
      <div className="training-container">
        <div className="training-header">
          <h1>Coffee Training Academy</h1>
          <p className="training-description">
            Join our professional coffee training sessions to master the art of brewing, 
            latte art, and coffee appreciation. Our courses are taught by certified coffee experts.
          </p>
        </div>
        
        <div className="training-grid">
          {trainingCourses.map(course => (
            <div key={course.id} className="training-item">
              <div className="training-image" style={{ backgroundImage: `url(${course.image})` }}>
                <div className="training-overlay"></div>
              </div>
              <div className="training-content">
                <h3>{course.title}</h3>
                <p className="training-price">{course.price}</p>
                <p className="training-duration">Duration: {course.duration}</p>
                <p className="training-text">{course.description}</p>
                <button className="enroll-button">Enroll Now</button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="certification-section">
          <div className="certification-content">
            <h2>Professional Certification</h2>
            <p>All our training courses come with SCA (Specialty Coffee Association) recognized certification. Our trainers have competed in national and international barista championships.</p>
            <p>Group discounts of 15% are available for teams of 3 or more people. Custom corporate training packages available.</p>
            <button className="contact-button">Contact Us</button>
          </div>
          <div className="certification-image" style={{ backgroundImage: `url(/images/training/sample_certificate.jpg)` }}>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Training; 