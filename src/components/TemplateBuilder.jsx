import React, { useState } from 'react';

const TemplateBuilder = ({ onSave, initialTemplate = null }) => {
  const [template, setTemplate] = useState(initialTemplate || {
    name: '',
    colors: {
      primary: '#667eea',
      secondary: '#764ba2',
      text: '#1a1a1a',
      background: '#ffffff'
    },
    fonts: {
      heading: 'Montserrat',
      body: 'Inter'
    },
    layout: {
      headerStyle: 'centered',
      sectionSpacing: 'normal',
      showPhoto: false
    },
    sections: {
      summary: true,
      experience: true,
      education: true,
      skills: true,
      projects: false,
      certifications: false
    }
  });

  const handleColorChange = (colorType, value) => {
    setTemplate(prev => ({
      ...prev,
      colors: { ...prev.colors, [colorType]: value }
    }));
  };

  const handleFontChange = (fontType, value) => {
    setTemplate(prev => ({
      ...prev,
      fonts: { ...prev.fonts, [fontType]: value }
    }));
  };

  const handleLayoutChange = (layoutType, value) => {
    setTemplate(prev => ({
      ...prev,
      layout: { ...prev.layout, [layoutType]: value }
    }));
  };

  const toggleSection = (section) => {
    setTemplate(prev => ({
      ...prev,
      sections: { ...prev.sections, [section]: !prev.sections[section] }
    }));
  };

  const handleSave = () => {
    if (!template.name.trim()) {
      alert('Please enter a template name');
      return;
    }
    if (onSave) onSave(template);
  };

  return (
    <div style={{
      background: '#ffffff',
      borderRadius: '12px',
      padding: '24px',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h2 style={{
        fontSize: '1.75rem',
        fontWeight: '700',
        marginBottom: '24px',
        color: '#1a1a1a'
      }}>
        Custom Template Builder
      </h2>

      {/* Template Name */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{
          display: 'block',
          marginBottom: '8px',
          fontWeight: '600',
          color: '#1a1a1a'
        }}>
          Template Name
        </label>
        <input
          type="text"
          value={template.name}
          onChange={(e) => setTemplate(prev => ({ ...prev, name: e.target.value }))}
          placeholder="My Custom Template"
          style={{
            width: '100%',
            padding: '12px',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '16px',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* Colors */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          marginBottom: '16px',
          color: '#1a1a1a'
        }}>
          Colors
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {Object.entries(template.colors).map(([key, value]) => (
            <div key={key}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '0.875rem',
                color: '#64748b',
                textTransform: 'capitalize'
              }}>
                {key}
              </label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input
                  type="color"
                  value={value}
                  onChange={(e) => handleColorChange(key, e.target.value)}
                  style={{
                    width: '50px',
                    height: '40px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                />
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleColorChange(key, e.target.value)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fonts */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          marginBottom: '16px',
          color: '#1a1a1a'
        }}>
          Fonts
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {Object.entries(template.fonts).map(([key, value]) => (
            <div key={key}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '0.875rem',
                color: '#64748b',
                textTransform: 'capitalize'
              }}>
                {key} Font
              </label>
              <select
                value={value}
                onChange={(e) => handleFontChange(key, e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              >
                <option value="Montserrat">Montserrat</option>
                <option value="Inter">Inter</option>
                <option value="Roboto">Roboto</option>
                <option value="Open Sans">Open Sans</option>
                <option value="Lato">Lato</option>
                <option value="Playfair Display">Playfair Display</option>
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Layout */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          marginBottom: '16px',
          color: '#1a1a1a'
        }}>
          Layout
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '0.875rem',
              color: '#64748b'
            }}>
              Header Style
            </label>
            <select
              value={template.layout.headerStyle}
              onChange={(e) => handleLayoutChange('headerStyle', e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '2px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            >
              <option value="centered">Centered</option>
              <option value="left">Left Aligned</option>
              <option value="split">Split Layout</option>
            </select>
          </div>
          <div>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={template.layout.showPhoto}
                onChange={(e) => handleLayoutChange('showPhoto', e.target.checked)}
                style={{ width: '18px', height: '18px' }}
              />
              <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
                Show Profile Photo
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          marginBottom: '16px',
          color: '#1a1a1a'
        }}>
          Sections
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {Object.entries(template.sections).map(([key, value]) => (
            <label
              key={key}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                cursor: 'pointer',
                background: value ? '#f0f4ff' : '#ffffff',
                transition: 'all 0.2s'
              }}
            >
              <input
                type="checkbox"
                checked={value}
                onChange={() => toggleSection(key)}
                style={{ width: '18px', height: '18px' }}
              />
              <span style={{
                fontSize: '0.875rem',
                color: '#1a1a1a',
                textTransform: 'capitalize'
              }}>
                {key}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        style={{
          width: '100%',
          padding: '14px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 10px 20px rgba(102, 126, 234, 0.3)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = 'none';
        }}
      >
        Save Template
      </button>
    </div>
  );
};

export default TemplateBuilder;

