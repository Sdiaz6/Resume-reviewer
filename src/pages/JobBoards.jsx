import React, { useState } from 'react';
import JobBoardLogo from '../components/JobBoardLogo';

const JobBoards = () => {
  const [activeTab, setActiveTab] = useState('job-boards');
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    'All',
    'All Industries',
    'Local',
    'Remote',
    'Tech',
    'Startup',
    'Customer Support',
    'Sales',
    'Design',
    'Programming',
    'Marketing'
  ];

  // Helper function to get logo URL with fallback
  const getLogoUrl = (domain) => {
    // Use Clearbit logo API for reliable company logos
    return `https://logo.clearbit.com/${domain}`;
  };

  // Job boards with actual logo URLs
  const remoteJobBoards = [
    {
      id: 1,
      name: 'Remotive',
      description: 'Curated remote jobs in tech, marketing, and customer support',
      logo: getLogoUrl('remotive.com'),
      domain: 'remotive.com',
      tags: ['Remote', 'Tech', 'Customer Support', 'Sales'],
      url: 'https://remotive.com',
      color: '#1a1a1a'
    },
    {
      id: 2,
      name: 'NoDesk',
      description: 'Hand-curated remote jobs from distributed companies worldwide',
      logo: getLogoUrl('nodesk.co', 'NoDesk'),
      domain: 'nodesk.co',
      tags: ['Remote', 'Tech', 'Design', 'Customer Support'],
      url: 'https://nodesk.co',
      color: '#4A90E2'
    },
    {
      id: 3,
      name: 'Arc',
      description: 'Remote developer jobs with AI-powered talent matching',
      logo: getLogoUrl('arc.dev', 'Arc'),
      domain: 'arc.dev',
      tags: ['Remote', 'Tech', 'Programming'],
      url: 'https://arc.dev',
      color: '#FFD700'
    },
    {
      id: 4,
      name: 'JustRemote',
      description: 'Global remote job board with PowerSearch feature',
      logo: getLogoUrl('justremote.co', 'JustRemote'),
      domain: 'justremote.co',
      tags: ['Remote', 'Tech', 'Marketing', 'Design'],
      url: 'https://justremote.co',
      color: '#9CA3AF'
    },
    {
      id: 5,
      name: 'We Work Remotely',
      description: 'Largest remote work community in the world',
      logo: getLogoUrl('weworkremotely.com', 'We Work Remotely'),
      domain: 'weworkremotely.com',
      tags: ['Remote', 'Tech', 'Design', 'Marketing'],
      url: 'https://weworkremotely.com',
      color: '#2C3E50'
    },
    {
      id: 6,
      name: 'Remote.co',
      description: 'Remote work resources and job listings',
      logo: getLogoUrl('remote.co', 'Remote.co'),
      domain: 'remote.co',
      tags: ['Remote', 'All Industries'],
      url: 'https://remote.co',
      color: '#00A8E8'
    },
    {
      id: 7,
      name: 'FlexJobs',
      description: 'Premium remote and flexible job opportunities',
      logo: getLogoUrl('flexjobs.com', 'FlexJobs'),
      domain: 'flexjobs.com',
      tags: ['Remote', 'Flexible', 'All Industries'],
      url: 'https://flexjobs.com',
      color: '#00B4D8'
    },
    {
      id: 8,
      name: 'EU Remote Jobs',
      description: 'Remote jobs focused on European time zones',
      logo: getLogoUrl('euremotejobs.com', 'EU Remote Jobs'),
      domain: 'euremotejobs.com',
      tags: ['Remote', 'Europe', 'Tech', 'Marketing'],
      url: 'https://euremotejobs.com',
      color: '#003399'
    }
  ];

  const techJobBoards = [
    {
      id: 1,
      name: 'LinkedIn Jobs',
      description: 'Professional network with millions of job listings',
      logo: getLogoUrl('linkedin.com', 'LinkedIn'),
      domain: 'linkedin.com',
      tags: ['Tech', 'All Industries', 'Remote', 'Local'],
      url: 'https://www.linkedin.com/jobs',
      color: '#0077B5'
    },
    {
      id: 2,
      name: 'Indeed',
      description: 'World\'s largest job site with tech opportunities',
      logo: getLogoUrl('indeed.com', 'Indeed'),
      domain: 'indeed.com',
      tags: ['Tech', 'All Industries', 'Local'],
      url: 'https://indeed.com',
      color: '#2164F3'
    },
    {
      id: 3,
      name: 'Stack Overflow Jobs',
      description: 'Developer-focused job board with technical roles',
      logo: getLogoUrl('stackoverflow.com', 'Stack Overflow'),
      domain: 'stackoverflow.com',
      tags: ['Tech', 'Programming', 'Remote'],
      url: 'https://stackoverflow.com/jobs',
      color: '#F48024'
    },
    {
      id: 4,
      name: 'GitHub Jobs',
      description: 'Software development and engineering positions',
      logo: getLogoUrl('github.com', 'GitHub'),
      domain: 'github.com',
      tags: ['Tech', 'Programming', 'Remote'],
      url: 'https://jobs.github.com',
      color: '#24292E'
    },
    {
      id: 5,
      name: 'Glassdoor',
      description: 'Job search with company reviews and salary insights',
      logo: getLogoUrl('glassdoor.com', 'Glassdoor'),
      domain: 'glassdoor.com',
      tags: ['Tech', 'All Industries', 'Local'],
      url: 'https://glassdoor.com',
      color: '#0CAA41'
    },
    {
      id: 6,
      name: 'Dice',
      description: 'Specialized job board for IT and technology professionals',
      logo: getLogoUrl('dice.com', 'Dice'),
      domain: 'dice.com',
      tags: ['Tech', 'IT', 'Programming'],
      url: 'https://dice.com',
      color: '#00A8E8'
    },
    {
      id: 7,
      name: 'AngelList',
      description: 'Startup jobs and equity opportunities',
      logo: getLogoUrl('angel.co', 'AngelList'),
      domain: 'angel.co',
      tags: ['Startup', 'Tech', 'Remote'],
      url: 'https://angel.co',
      color: '#000000'
    },
    {
      id: 8,
      name: 'Hacker News Jobs',
      description: 'Who is hiring? Monthly job postings from Y Combinator',
      logo: getLogoUrl('ycombinator.com', 'Hacker News'),
      domain: 'ycombinator.com',
      tags: ['Tech', 'Startup', 'Programming'],
      url: 'https://news.ycombinator.com/jobs',
      color: '#FF6600'
    },
    {
      id: 9,
      name: 'Triplebyte',
      description: 'Technical screening and job matching for engineers',
      logo: getLogoUrl('triplebyte.com', 'Triplebyte'),
      domain: 'triplebyte.com',
      tags: ['Tech', 'Programming'],
      url: 'https://triplebyte.com',
      color: '#00D4AA'
    },
    {
      id: 10,
      name: 'TechCrunch Jobs',
      description: 'Tech industry jobs from leading companies',
      logo: getLogoUrl('techcrunch.com', 'TechCrunch'),
      domain: 'techcrunch.com',
      tags: ['Tech', 'Startup'],
      url: 'https://techcrunch.com/jobs',
      color: '#00A8E8'
    },
    {
      id: 11,
      name: 'Monster',
      description: 'Global job search platform with millions of listings',
      logo: getLogoUrl('monster.com', 'Monster'),
      domain: 'monster.com',
      tags: ['Tech', 'All Industries', 'Local'],
      url: 'https://monster.com',
      color: '#6B46C1'
    },
    {
      id: 12,
      name: 'ZipRecruiter',
      description: 'AI-powered job matching and application tracking',
      logo: getLogoUrl('ziprecruiter.com', 'ZipRecruiter'),
      domain: 'ziprecruiter.com',
      tags: ['Tech', 'All Industries', 'Local'],
      url: 'https://ziprecruiter.com',
      color: '#2E7D32'
    }
  ];

  const designJobBoards = [
    {
      id: 1,
      name: 'Dribbble Jobs',
      description: 'Design jobs from top companies and agencies',
      logo: getLogoUrl('dribbble.com', 'Dribbble'),
      domain: 'dribbble.com',
      tags: ['Design', 'Remote', 'Tech'],
      url: 'https://dribbble.com/jobs',
      color: '#EA4C89'
    },
    {
      id: 2,
      name: 'Behance Jobs',
      description: 'Creative opportunities for designers',
      logo: getLogoUrl('behance.net', 'Behance'),
      domain: 'behance.net',
      tags: ['Design', 'Creative'],
      url: 'https://behance.net/joblist',
      color: '#1769FF'
    },
    {
      id: 3,
      name: 'AIGA Design Jobs',
      description: 'Professional design opportunities',
      logo: getLogoUrl('aiga.org', 'AIGA'),
      domain: 'aiga.org',
      tags: ['Design', 'Local'],
      url: 'https://designjobs.aiga.org',
      color: '#FF6B35'
    },
    {
      id: 4,
      name: 'Creative Mornings',
      description: 'Creative community job board',
      logo: getLogoUrl('creativemornings.com', 'Creative Mornings'),
      domain: 'creativemornings.com',
      tags: ['Design', 'Creative'],
      url: 'https://creativemornings.com',
      color: '#FF6B6B'
    }
  ];

  // Combined job boards for potential future use
  // const allJobBoards = [...remoteJobBoards, ...techJobBoards, ...designJobBoards];

  const filterJobBoards = (boards) => {
    if (activeFilter === 'all') return boards;
    if (activeFilter === 'remote') {
      return boards.filter(board => board.tags.includes('Remote'));
    }
    if (activeFilter === 'tech') {
      return boards.filter(board => board.tags.includes('Tech'));
    }
    if (activeFilter === 'startup') {
      return boards.filter(board => board.tags.includes('Startup'));
    }
    if (activeFilter === 'design') {
      return boards.filter(board => board.tags.includes('Design'));
    }
    if (activeFilter === 'programming') {
      return boards.filter(board => board.tags.includes('Programming'));
    }
    if (activeFilter === 'marketing') {
      return boards.filter(board => board.tags.includes('Marketing'));
    }
    if (activeFilter === 'sales') {
      return boards.filter(board => board.tags.includes('Sales'));
    }
    if (activeFilter === 'customer support') {
      return boards.filter(board => board.tags.includes('Customer Support'));
    }
    if (activeFilter === 'local') {
      return boards.filter(board => board.tags.includes('Local'));
    }
    return boards;
  };

  const filteredRemote = filterJobBoards(remoteJobBoards);
  const filteredTech = filterJobBoards(techJobBoards);
  const filteredDesign = filterJobBoards(designJobBoards);

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      maxWidth: '100vw',
      overflowX: 'hidden',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      position: 'relative',
      padding: '0'
    }}>
      {/* Decorative background elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)
        `,
        pointerEvents: 'none'
      }} />

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '40px 20px',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header */}
        <div style={{
          marginBottom: '40px',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '800',
            color: '#ffffff',
            marginBottom: '16px',
            letterSpacing: '-1px'
          }}>
            Job Search Resources
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: '#94a3b8',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Discover the best job boards and career resources to land your dream job
          </p>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '32px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => setActiveTab('job-boards')}
            style={{
              padding: '12px 24px',
              background: activeTab === 'job-boards' ? '#667eea' : 'rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              borderBottom: activeTab === 'job-boards' ? '3px solid #667eea' : '3px solid transparent'
            }}
            onMouseOver={(e) => {
              if (activeTab !== 'job-boards') {
                e.target.style.background = 'rgba(255, 255, 255, 0.15)';
              }
            }}
            onMouseOut={(e) => {
              if (activeTab !== 'job-boards') {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              }
            }}
          >
            Job Boards
          </button>
          <button
            onClick={() => setActiveTab('career-resources')}
            style={{
              padding: '12px 24px',
              background: activeTab === 'career-resources' ? '#667eea' : 'rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              borderBottom: activeTab === 'career-resources' ? '3px solid #667eea' : '3px solid transparent'
            }}
            onMouseOver={(e) => {
              if (activeTab !== 'career-resources') {
                e.target.style.background = 'rgba(255, 255, 255, 0.15)';
              }
            }}
            onMouseOut={(e) => {
              if (activeTab !== 'career-resources') {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              }
            }}
          >
            Career Resources
          </button>
        </div>

        {/* Filter Pills */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '40px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter.toLowerCase())}
              style={{
                padding: '10px 20px',
                background: activeFilter === filter.toLowerCase() 
                  ? '#667eea' 
                  : 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                border: activeFilter === filter.toLowerCase() 
                  ? '2px solid #667eea' 
                  : '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s',
                backdropFilter: 'blur(10px)'
              }}
              onMouseOver={(e) => {
                if (activeFilter !== filter.toLowerCase()) {
                  e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                }
              }}
              onMouseOut={(e) => {
                if (activeFilter !== filter.toLowerCase()) {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Job Boards Content */}
        {activeTab === 'job-boards' && (
          <div>
            {/* Tech Job Boards Section - Show first */}
            {filteredTech.length > 0 && (
              <div style={{ marginBottom: '60px' }}>
                <h2 style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#ffffff',
                  marginBottom: '32px',
                  paddingLeft: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Tech Job Boards
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                  gap: '24px'
                }}>
                  {filteredTech.map((board) => (
                    <a
                      key={board.id}
                      href={board.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px',
                        padding: '24px',
                        textDecoration: 'none',
                        color: 'inherit',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        cursor: 'pointer',
                        display: 'block'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                        e.currentTarget.style.borderColor = '#667eea';
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.2)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        color: '#94a3b8',
                        fontSize: '1.2rem',
                        opacity: 0.7
                      }}>
                        ↗
                      </div>
                      <div style={{
                        width: '64px',
                        height: '64px',
                        background: '#ffffff',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '16px',
                        padding: '12px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        <JobBoardLogo board={board} />
                      </div>
                      <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        color: '#ffffff',
                        marginBottom: '8px'
                      }}>
                        {board.name}
                      </h3>
                      <p style={{
                        fontSize: '0.9rem',
                        color: '#94a3b8',
                        marginBottom: '16px',
                        lineHeight: '1.5'
                      }}>
                        {board.description}
                      </p>
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px'
                      }}>
                        {board.tags.map((tag, index) => (
                          <span
                            key={index}
                            style={{
                              padding: '4px 12px',
                              background: 'rgba(102, 126, 234, 0.2)',
                              color: '#a5b4fc',
                              borderRadius: '12px',
                              fontSize: '0.75rem',
                              fontWeight: '500'
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Remote Job Boards Section */}
            {filteredRemote.length > 0 && (
              <div style={{ marginBottom: '60px' }}>
                <h2 style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#ffffff',
                  marginBottom: '32px',
                  paddingLeft: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Remote Job Boards
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                  gap: '24px'
                }}>
                  {filteredRemote.map((board) => (
                    <a
                      key={board.id}
                      href={board.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px',
                        padding: '24px',
                        textDecoration: 'none',
                        color: 'inherit',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        cursor: 'pointer',
                        display: 'block'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                        e.currentTarget.style.borderColor = '#667eea';
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.2)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        color: '#94a3b8',
                        fontSize: '1.2rem',
                        opacity: 0.7
                      }}>
                        ↗
                      </div>
                      <div style={{
                        width: '64px',
                        height: '64px',
                        background: '#ffffff',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '16px',
                        padding: '8px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                      }}>
                        <img
                          src={board.logo}
                          alt={board.name}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.style.background = board.color;
                            e.target.parentElement.innerHTML = `<div style="color: white; font-size: 1.5rem; font-weight: bold;">${board.name.charAt(0)}</div>`;
                          }}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            borderRadius: '8px'
                          }}
                        />
                      </div>
                      <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        color: '#ffffff',
                        marginBottom: '8px'
                      }}>
                        {board.name}
                      </h3>
                      <p style={{
                        fontSize: '0.9rem',
                        color: '#94a3b8',
                        marginBottom: '16px',
                        lineHeight: '1.5'
                      }}>
                        {board.description}
                      </p>
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px'
                      }}>
                        {board.tags.map((tag, index) => (
                          <span
                            key={index}
                            style={{
                              padding: '4px 12px',
                              background: 'rgba(102, 126, 234, 0.2)',
                              color: '#a5b4fc',
                              borderRadius: '12px',
                              fontSize: '0.75rem',
                              fontWeight: '500'
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Design Job Boards Section */}
            {filteredDesign.length > 0 && (
              <div>
                <h2 style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#ffffff',
                  marginBottom: '32px',
                  paddingLeft: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Design Job Boards
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                  gap: '24px'
                }}>
                  {filteredDesign.map((board) => (
                    <a
                      key={board.id}
                      href={board.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px',
                        padding: '24px',
                        textDecoration: 'none',
                        color: 'inherit',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        cursor: 'pointer',
                        display: 'block'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                        e.currentTarget.style.borderColor = '#667eea';
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.2)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        color: '#94a3b8',
                        fontSize: '1.2rem',
                        opacity: 0.7
                      }}>
                        ↗
                      </div>
                      <div style={{
                        width: '64px',
                        height: '64px',
                        background: '#ffffff',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '16px',
                        padding: '8px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                      }}>
                        <img
                          src={board.logo}
                          alt={board.name}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.style.background = board.color;
                            e.target.parentElement.innerHTML = `<div style="color: white; font-size: 1.5rem; font-weight: bold;">${board.name.charAt(0)}</div>`;
                          }}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            borderRadius: '8px'
                          }}
                        />
                      </div>
                      <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        color: '#ffffff',
                        marginBottom: '8px'
                      }}>
                        {board.name}
                      </h3>
                      <p style={{
                        fontSize: '0.9rem',
                        color: '#94a3b8',
                        marginBottom: '16px',
                        lineHeight: '1.5'
                      }}>
                        {board.description}
                      </p>
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px'
                      }}>
                        {board.tags.map((tag, index) => (
                          <span
                            key={index}
                            style={{
                              padding: '4px 12px',
                              background: 'rgba(102, 126, 234, 0.2)',
                              color: '#a5b4fc',
                              borderRadius: '12px',
                              fontSize: '0.75rem',
                              fontWeight: '500'
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Career Resources Tab */}
        {activeTab === 'career-resources' && (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px',
            color: '#94a3b8'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '24px' }}>📚</div>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#ffffff',
              marginBottom: '16px'
            }}>
              Career Resources Coming Soon
            </h2>
            <p style={{ fontSize: '1.1rem' }}>
              We're building a comprehensive library of career resources, interview tips, and job search guides.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobBoards;
