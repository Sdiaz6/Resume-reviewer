import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogArticles } from '../data/blogArticles';

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

