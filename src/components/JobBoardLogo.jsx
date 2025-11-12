import React, { useState } from 'react';

const JobBoardLogo = ({ board }) => {
  const [imageError, setImageError] = useState(false);
  const [currentSource, setCurrentSource] = useState(0);

  // Multiple logo sources for reliability
  const logoSources = [
    `https://logo.clearbit.com/${board.domain}`,
    `https://www.google.com/s2/favicons?domain=${board.domain}&sz=128`,
    `https://${board.domain}/favicon.ico`
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
        width: '100%',
        height: '100%',
        background: board.color || '#667eea',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        fontSize: '1.5rem',
        fontWeight: 'bold'
      }}>
        {board.name.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <img
      src={logoSources[currentSource]}
      alt={board.name}
      onError={handleError}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        borderRadius: '6px'
      }}
    />
  );
};

export default JobBoardLogo;

