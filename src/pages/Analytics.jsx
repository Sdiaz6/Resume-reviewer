import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useResume } from '../contexts/ResumeContext';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, subDays, startOfWeek, endOfWeek } from 'date-fns';

const Analytics = () => {
  const { userProfile } = useAuth();
  const { resumes } = useResume();
  const [timeRange, setTimeRange] = useState('7d');

  // Calculate analytics data
  const analyticsData = {
    totalResumes: resumes.length,
    totalExports: resumes.reduce((sum, r) => sum + (r.analytics?.exports || 0), 0),
    totalViews: resumes.reduce((sum, r) => sum + (r.analytics?.views || 0), 0),
    totalShares: resumes.reduce((sum, r) => sum + (r.analytics?.shares || 0), 0),
    avgATSScore: resumes.length > 0 
      ? Math.round(resumes.reduce((sum, r) => sum + (r.atsScore || 0), 0) / resumes.length)
      : 0
  };

  // Template distribution
  const templateData = resumes.reduce((acc, resume) => {
    const template = resume.template || 'unknown';
    acc[template] = (acc[template] || 0) + 1;
    return acc;
  }, {});

  const templateChartData = Object.entries(templateData).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value
  }));

  // Activity over time (mock data - would come from backend)
  const activityData = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i);
    return {
      date: format(date, 'MMM dd'),
      resumes: Math.floor(Math.random() * 5),
      exports: Math.floor(Math.random() * 10),
      views: Math.floor(Math.random() * 20)
    };
  });

  const COLORS = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#f5576c'];

  return (
    <div style={{
      width: '100vw',
      maxWidth: '100vw',
      overflowX: 'hidden',
      margin: 0,
      padding: '40px 20px',
      background: '#f9fafb',
      minHeight: '100vh'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#1a1a1a',
          marginBottom: '10px'
        }}>
          Analytics Dashboard
        </h1>
        <p style={{
          color: '#64748b',
          marginBottom: '40px',
          fontSize: '1.1rem'
        }}>
          Track your resume performance and insights
        </p>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          {[
            { label: 'Total Resumes', value: analyticsData.totalResumes, color: '#667eea' },
            { label: 'Total Exports', value: analyticsData.totalExports, color: '#764ba2' },
            { label: 'Total Views', value: analyticsData.totalViews, color: '#f093fb' },
            { label: 'Total Shares', value: analyticsData.totalShares, color: '#4facfe' },
            { label: 'Avg ATS Score', value: `${analyticsData.avgATSScore}%`, color: '#f5576c' }
          ].map((stat, index) => (
            <div
              key={index}
              style={{
                background: '#ffffff',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                borderLeft: `4px solid ${stat.color}`
              }}
            >
              <div style={{
                fontSize: '0.875rem',
                color: '#64748b',
                marginBottom: '8px',
                fontWeight: '500'
              }}>
                {stat.label}
              </div>
              <div style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#1a1a1a'
              }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '20px',
          marginBottom: '20px'
        }}>
          {/* Activity Over Time */}
          <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              marginBottom: '20px',
              color: '#1a1a1a'
            }}>
              Activity Over Time
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="resumes" stroke="#667eea" strokeWidth={2} />
                <Line type="monotone" dataKey="exports" stroke="#764ba2" strokeWidth={2} />
                <Line type="monotone" dataKey="views" stroke="#f093fb" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Template Distribution */}
          <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              marginBottom: '20px',
              color: '#1a1a1a'
            }}>
              Template Distribution
            </h3>
            {templateChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={templateChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {templateChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div style={{
                height: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#64748b'
              }}>
                No data available
              </div>
            )}
          </div>
        </div>

        {/* Top Resumes */}
        <div style={{
          background: '#ffffff',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          marginBottom: '20px'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '700',
            marginBottom: '20px',
            color: '#1a1a1a'
          }}>
            Top Performing Resumes
          </h3>
          {resumes.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600' }}>Resume</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600' }}>Template</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600' }}>ATS Score</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600' }}>Views</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600' }}>Exports</th>
                    <th style={{ padding: '12px', textAlign: 'left', color: '#64748b', fontWeight: '600' }}>Shares</th>
                  </tr>
                </thead>
                <tbody>
                  {resumes
                    .sort((a, b) => (b.analytics?.views || 0) - (a.analytics?.views || 0))
                    .slice(0, 10)
                    .map((resume, index) => (
                      <tr key={resume.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '12px', color: '#1a1a1a' }}>
                          {resume.data?.personalInfo?.fullName || `Resume ${index + 1}`}
                        </td>
                        <td style={{ padding: '12px', color: '#64748b', textTransform: 'capitalize' }}>
                          {resume.template || 'N/A'}
                        </td>
                        <td style={{ padding: '12px', color: '#1a1a1a', fontWeight: '600' }}>
                          {resume.atsScore ? `${resume.atsScore}%` : 'N/A'}
                        </td>
                        <td style={{ padding: '12px', color: '#1a1a1a' }}>
                          {resume.analytics?.views || 0}
                        </td>
                        <td style={{ padding: '12px', color: '#1a1a1a' }}>
                          {resume.analytics?.exports || 0}
                        </td>
                        <td style={{ padding: '12px', color: '#1a1a1a' }}>
                          {resume.analytics?.shares || 0}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{
              padding: '40px',
              textAlign: 'center',
              color: '#64748b'
            }}>
              No resumes yet. Create your first resume to see analytics!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;

