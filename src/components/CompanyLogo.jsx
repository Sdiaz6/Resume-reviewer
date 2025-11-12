import React, { useState } from 'react';

const CompanyLogo = ({ company }) => {
  const [imageError, setImageError] = useState(false);
  const [currentSource, setCurrentSource] = useState(0);

  // Multiple logo sources for reliability
  const logoSources = [
    `https://logo.clearbit.com/${company.domain}`,
    `https://www.google.com/s2/favicons?domain=${company.domain}&sz=128`,
    `https://${company.domain}/favicon.ico`
  ];

  const handleError = () => {
    if (currentSource < logoSources.length - 1) {
      // Try next source
      setCurrentSource(currentSource + 1);
    } else {
      // All sources failed, show fallback
      setImageError(true);
    }
  };

  if (imageError) {
    // Fallback: colored box with initial
    return (
      <div style={{
        width: '60px',
        height: '60px',
        background: company.color || '#667eea',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '8px'
      }}>
        {company.name.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <img
      src={logoSources[currentSource]}
      alt={company.name}
      onError={handleError}
      style={{
        width: '60px',
        height: '60px',
        objectFit: 'contain',
        marginBottom: '8px'
      }}
    />
  );
};

export default CompanyLogo;

