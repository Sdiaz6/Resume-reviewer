import React, { useState, useEffect, useCallback } from 'react';
import { useResume } from '../contexts/ResumeContext';
import { format } from 'date-fns';

const VersionHistory = ({ resumeId, onRestore }) => {
  const { getVersionHistory, restoreVersion } = useResume();
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVersion, setSelectedVersion] = useState(null);

  const loadVersions = useCallback(async () => {
    setLoading(true);
    try {
      const versionList = await getVersionHistory(resumeId);
      setVersions(versionList.sort((a, b) => b.version - a.version));
    } catch (error) {
      console.error('Error loading versions:', error);
    } finally {
      setLoading(false);
    }
  }, [resumeId, getVersionHistory]);

  useEffect(() => {
    loadVersions();
  }, [loadVersions]);

  const handleRestore = async (versionNumber) => {
    if (window.confirm(`Are you sure you want to restore version ${versionNumber}? This will replace your current resume.`)) {
      try {
        const success = await restoreVersion(resumeId, versionNumber);
        if (success) {
          alert('Version restored successfully!');
          if (onRestore) onRestore();
        } else {
          alert('Failed to restore version');
        }
      } catch (error) {
        console.error('Error restoring version:', error);
        alert('Failed to restore version');
      }
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        Loading version history...
      </div>
    );
  }

  if (versions.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>
        No version history available
      </div>
    );
  }

  return (
    <div style={{
      background: '#ffffff',
      borderRadius: '12px',
      padding: '24px',
      maxHeight: '600px',
      overflowY: 'auto'
    }}>
      <h3 style={{
        fontSize: '1.5rem',
        fontWeight: '700',
        marginBottom: '20px',
        color: '#1a1a1a'
      }}>
        Version History
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {versions.map((version) => (
          <div
            key={version.version}
            style={{
              border: selectedVersion === version.version ? '2px solid #667eea' : '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '16px',
              background: selectedVersion === version.version ? '#f0f4ff' : '#ffffff',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onClick={() => setSelectedVersion(version.version)}
            onMouseOver={(e) => {
              if (selectedVersion !== version.version) {
                e.currentTarget.style.borderColor = '#cbd5e1';
                e.currentTarget.style.background = '#f9fafb';
              }
            }}
            onMouseOut={(e) => {
              if (selectedVersion !== version.version) {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.background = '#ffffff';
              }
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px'
            }}>
              <div>
                <div style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#1a1a1a',
                  marginBottom: '4px'
                }}>
                  Version {version.version}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#64748b'
                }}>
                  {version.createdAt ? format(new Date(version.createdAt), 'MMM dd, yyyy HH:mm') : 'Unknown date'}
                </div>
              </div>
              {selectedVersion === version.version && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRestore(version.version);
                  }}
                  style={{
                    padding: '8px 16px',
                    background: '#667eea',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = '#5568d3';
                    e.target.style.transform = 'translateY(-1px)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = '#667eea';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  Restore
                </button>
              )}
            </div>
            {version.changes && (
              <div style={{
                fontSize: '0.875rem',
                color: '#64748b',
                fontStyle: 'italic',
                marginTop: '8px',
                paddingTop: '8px',
                borderTop: '1px solid #e5e7eb'
              }}>
                {version.changes}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VersionHistory;

