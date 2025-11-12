import React, { useEffect, useRef } from 'react';

const CompaniesShowcase = () => {
  const containerRef = useRef(null);

  const companies = [
    { name: 'Google', logo: '🔵', color: '#4285F4' },
    { name: 'Microsoft', logo: '🟦', color: '#00A4EF' },
    { name: 'Apple', logo: '🍎', color: '#000000' },
    { name: 'Meta', logo: '📘', color: '#1877F2' },
    { name: 'Amazon', logo: '📦', color: '#FF9900' },
    { name: 'Netflix', logo: '🎬', color: '#E50914' },
    { name: 'Adobe', logo: '🎨', color: '#FF0000' },
    { name: 'Stripe', logo: '💳', color: '#635BFF' },
    { name: 'Coinbase', logo: '₿', color: '#1652F0' },
    { name: 'DoorDash', logo: '🚗', color: '#FF3000' },
    { name: 'Slack', logo: '💬', color: '#4A154B' },
    { name: 'Airbnb', logo: '🏠', color: '#FF5A5F' },
    { name: 'Uber', logo: '🚕', color: '#000000' },
    { name: 'Tesla', logo: '⚡', color: '#E31937' },
    { name: 'Spotify', logo: '🎵', color: '#1DB954' },
    { name: 'Twitter', logo: '🐦', color: '#1DA1F2' },
    { name: 'LinkedIn', logo: '💼', color: '#0077B5' },
    { name: 'GitHub', logo: '🐙', color: '#181717' },
    { name: 'Figma', logo: '🎨', color: '#F24E1E' },
    { name: 'Reddit', logo: '🤖', color: '#FF4500' },
    { name: 'Discord', logo: '💬', color: '#5865F2' },
    { name: 'Zoom', logo: '📹', color: '#2D8CFF' },
    { name: 'Salesforce', logo: '☁️', color: '#00A1E0' },
    { name: 'Oracle', logo: '🗄️', color: '#F80000' },
    { name: 'IBM', logo: '💻', color: '#006699' },
    { name: 'Intel', logo: '🔵', color: '#0071C5' },
    { name: 'NVIDIA', logo: '🎮', color: '#76B900' },
    { name: 'PayPal', logo: '💸', color: '#003087' },
    { name: 'Shopify', logo: '🛒', color: '#96BF48' },
    { name: 'Square', logo: '⬜', color: '#3E4348' }
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create floating animation
    const logos = container.querySelectorAll('.company-logo');
    
    logos.forEach((logo, index) => {
      const delay = index * 0.1;
      const duration = 15 + Math.random() * 10; // 15-25 seconds
      const startPosition = Math.random() * 100;
      
      logo.style.animationDelay = `${delay}s`;
      logo.style.animationDuration = `${duration}s`;
      logo.style.left = `${startPosition}%`;
    });
  }, []);

  return (
    <div style={{
      width: '100%',
      padding: '80px 20px',
      background: 'linear-gradient(180deg, #f9fafb 0%, #ffffff 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Title Section */}
      <div style={{
        textAlign: 'center',
        marginBottom: '60px',
        position: 'relative',
        zIndex: 2
      }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: '800',
          color: '#1a1a1a',
          marginBottom: '16px',
          letterSpacing: '-0.5px'
        }}>
          Trusted by Leading Companies
        </h2>
        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          color: '#64748b',
          maxWidth: '800px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          View resumes that got moved forward at leading tech companies
        </p>
      </div>

      {/* Animated Floating Logos Container */}
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '400px',
          overflow: 'hidden',
          margin: '0 auto',
          maxWidth: '1400px'
        }}
      >
        {/* Multiple rows of floating logos */}
        {[0, 1, 2, 3, 4].map((row) => (
          <div
            key={row}
            style={{
              position: 'absolute',
              width: '100%',
              top: `${row * 20}%`,
              height: '80px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {companies.slice(row * 6, (row + 1) * 6).map((company, index) => (
              <div
                key={`${row}-${index}`}
                className="company-logo"
                style={{
                  position: 'absolute',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '20px 30px',
                  background: '#ffffff',
                  borderRadius: '16px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  border: '2px solid #e5e7eb',
                  minWidth: '140px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  animation: `floatHorizontal ${15 + Math.random() * 10}s linear infinite`,
                  animationDelay: `${index * 0.5}s`,
                  zIndex: 1
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px) scale(1.1)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.15)';
                  e.currentTarget.style.borderColor = company.color;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }}
              >
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '8px',
                  filter: 'grayscale(0%)'
                }}>
                  {company.logo}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#1a1a1a',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {company.name}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes floatHorizontal {
          0% {
            transform: translateX(-150px);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(calc(100vw + 150px));
            opacity: 0;
          }
        }

        .company-logo {
          will-change: transform;
        }

        @media (max-width: 768px) {
          .company-logo {
            min-width: 100px;
            padding: 15px 20px;
          }
        }
      `}</style>

      {/* Additional Static Grid for Mobile */}
      <div style={{
        display: 'none',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '20px',
        maxWidth: '1200px',
        margin: '40px auto 0',
        padding: '0 20px'
      }}
      className="mobile-companies-grid"
      >
        {companies.map((company, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              background: '#ffffff',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
              border: '1px solid #e5e7eb',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.12)';
              e.currentTarget.style.borderColor = company.color;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.08)';
              e.currentTarget.style.borderColor = '#e5e7eb';
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>
              {company.logo}
            </div>
            <div style={{
              fontSize: '0.75rem',
              fontWeight: '600',
              color: '#1a1a1a',
              textAlign: 'center'
            }}>
              {company.name}
            </div>
          </div>
        ))}
      </div>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          .mobile-companies-grid {
            display: grid !important;
          }
          [class*="company-logo"] {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CompaniesShowcase;

