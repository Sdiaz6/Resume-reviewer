import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Blog = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categories = ['All', 'Career Tips', 'Resume Advice', 'Interview Prep', 'Remote Work', 'AI & Tech'];

  const blogArticles = [
    {
      id: 1,
      title: 'How to Land a High-Paying Remote Job',
      description: 'Learn the top strategies for landing a high-paying remote job that you actually love.',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=400&fit=crop',
      date: 'February 17, 2025',
      readTime: '7 min read',
      category: 'Remote Work',
      featured: true,
      content: 'Full article content here...'
    },
    {
      id: 2,
      title: 'How to Land Your Dream Job: A Step-by-Step Guide for Career Changers',
      description: 'Complete guide for professionals looking to transition into a new career field.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop',
      date: 'February 6, 2025',
      readTime: '7 min read',
      category: 'Career Tips',
      featured: false,
      content: 'Full article content here...'
    },
    {
      id: 3,
      title: 'Getting Started with ResumePro',
      description: 'Your complete guide to using ResumePro to create professional resumes and land interviews.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
      date: 'February 4, 2025',
      readTime: '2 min read',
      category: 'Career Tips',
      featured: false,
      content: 'Full article content here...'
    },
    {
      id: 4,
      title: 'AI in Job Hunting: Optimize Your Applications and Get Noticed',
      description: 'Discover how AI tools can help you optimize your resume and stand out to recruiters.',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop',
      date: 'February 15, 2025',
      readTime: '9 min read',
      category: 'AI & Tech',
      featured: false,
      content: 'Full article content here...'
    },
    {
      id: 5,
      title: '10 Resume Mistakes That Are Costing You Interviews',
      description: 'Common resume errors that automatically disqualify candidates and how to fix them.',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop',
      date: 'February 12, 2025',
      readTime: '5 min read',
      category: 'Resume Advice',
      featured: false,
      content: 'Full article content here...'
    },
    {
      id: 6,
      title: 'Ace Your Next Interview: The Ultimate Preparation Guide',
      description: 'Master the art of interviewing with proven strategies and practice techniques.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
      date: 'February 10, 2025',
      readTime: '8 min read',
      category: 'Interview Prep',
      featured: false,
      content: 'Full article content here...'
    },
    {
      id: 7,
      title: 'ATS Optimization: Make Your Resume Pass Every System',
      description: 'Learn how to format and optimize your resume for Applicant Tracking Systems.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      date: 'February 8, 2025',
      readTime: '6 min read',
      category: 'Resume Advice',
      featured: false,
      content: 'Full article content here...'
    },
    {
      id: 8,
      title: 'Remote Work Success: Building Your Home Office',
      description: 'Create a productive workspace that helps you excel in your remote career.',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop',
      date: 'February 5, 2025',
      readTime: '4 min read',
      category: 'Remote Work',
      featured: false,
      content: 'Full article content here...'
    },
    {
      id: 9,
      title: 'Networking Strategies That Actually Work',
      description: 'Build meaningful professional connections that lead to job opportunities.',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop',
      date: 'February 3, 2025',
      readTime: '5 min read',
      category: 'Career Tips',
      featured: false,
      content: 'Full article content here...'
    }
  ];

  const featuredArticle = blogArticles.find(article => article.featured);
  const regularArticles = blogArticles.filter(article => !article.featured);

  const filteredArticles = selectedCategory === 'all' 
    ? regularArticles 
    : regularArticles.filter(article => article.category === selectedCategory);

  const handleArticleClick = (articleId) => {
    navigate(`/blog/${articleId}`);
  };

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
          radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
          repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.03) 4px)
        `,
        pointerEvents: 'none'
      }} />

      {/* Curved decorative lines */}
      <svg style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}>
        <path
          d="M 0,400 Q 200,300 400,350 T 800,300"
          stroke="rgba(102, 126, 234, 0.2)"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M 800,400 Q 1000,300 1200,350 T 1600,300"
          stroke="rgba(139, 92, 246, 0.2)"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '60px 20px',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header Section */}
        <div style={{
          marginBottom: '60px',
          paddingLeft: '8px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px'
          }}>
            <span style={{
              color: '#667eea',
              fontSize: '1.2rem',
              fontWeight: '600'
            }}>
              /
            </span>
            <h1 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '800',
              color: '#ffffff',
              margin: 0,
              letterSpacing: '-1px'
            }}>
              Blog
            </h1>
          </div>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: '#94a3b8',
            margin: 0,
            paddingLeft: '24px'
          }}>
            Insights for your job search journey
          </p>
        </div>

        {/* Category Filters */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '48px',
          flexWrap: 'wrap',
          paddingLeft: '8px'
        }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category === 'All' ? 'all' : category)}
              style={{
                padding: '10px 20px',
                background: selectedCategory === (category === 'All' ? 'all' : category)
                  ? '#667eea'
                  : 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                border: selectedCategory === (category === 'All' ? 'all' : category)
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
                if (selectedCategory !== (category === 'All' ? 'all' : category)) {
                  e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                }
              }}
              onMouseOut={(e) => {
                if (selectedCategory !== (category === 'All' ? 'all' : category)) {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Article */}
        {featuredArticle && selectedCategory === 'all' && (
          <div
            onClick={() => handleArticleClick(featuredArticle.id)}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              overflow: 'hidden',
              marginBottom: '60px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'grid',
              gridTemplateColumns: windowWidth < 768 ? '1fr' : '1fr 1fr',
              gap: 0
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.borderColor = '#667eea';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(102, 126, 234, 0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{
              position: 'relative',
              minHeight: '400px',
              background: `linear-gradient(135deg, ${featuredArticle.color || '#667eea'} 0%, ${featuredArticle.color || '#764ba2'} 100%)`
            }}>
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.9
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div style={{
              padding: '48px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <div style={{
                display: 'flex',
                gap: '16px',
                marginBottom: '20px',
                fontSize: '0.875rem',
                color: '#94a3b8'
              }}>
                <span>{featuredArticle.date}</span>
                <span>•</span>
                <span>{featuredArticle.readTime}</span>
              </div>
              <h2 style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: '800',
                color: '#ffffff',
                marginBottom: '16px',
                lineHeight: '1.2'
              }}>
                {featuredArticle.title}
              </h2>
              <p style={{
                fontSize: '1.1rem',
                color: '#94a3b8',
                marginBottom: '32px',
                lineHeight: '1.6'
              }}>
                {featuredArticle.description}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleArticleClick(featuredArticle.id);
                }}
                style={{
                  alignSelf: 'flex-start',
                  padding: '12px 24px',
                  background: '#667eea',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = '#5568d3';
                  e.target.style.transform = 'translateX(4px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = '#667eea';
                  e.target.style.transform = 'translateX(0)';
                }}
              >
                Read article
                <span style={{ fontSize: '1.2rem' }}>→</span>
              </button>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '32px',
          marginBottom: '60px'
        }}>
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => handleArticleClick(article.id)}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column'
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
                position: 'relative',
                width: '100%',
                height: '200px',
                overflow: 'hidden',
                background: `linear-gradient(135deg, ${article.color || '#667eea'} 0%, ${article.color || '#764ba2'} 100%)`
              }}>
                <img
                  src={article.image}
                  alt={article.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <div style={{
                padding: '24px',
                flex: 1,
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  marginBottom: '12px',
                  fontSize: '0.8rem',
                  color: '#94a3b8'
                }}>
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#ffffff',
                  marginBottom: '12px',
                  lineHeight: '1.3'
                }}>
                  {article.title}
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#94a3b8',
                  marginBottom: '20px',
                  lineHeight: '1.5',
                  flex: 1
                }}>
                  {article.description}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleArticleClick(article.id);
                  }}
                  style={{
                    alignSelf: 'flex-start',
                    padding: '8px 16px',
                    background: 'transparent',
                    color: '#667eea',
                    border: '1px solid #667eea',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = '#667eea';
                    e.target.style.color = '#ffffff';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#667eea';
                  }}
                >
                  Read more
                  <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px',
            color: '#94a3b8'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '24px' }}>📝</div>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#ffffff',
              marginBottom: '16px'
            }}>
              No articles found
            </h2>
            <p style={{ fontSize: '1.1rem' }}>
              Try selecting a different category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;

