import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogArticles } from '../data/blogArticles';

const BlogArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the article by ID
  const article = blogArticles.find(a => a.id === parseInt(id));

  // If article not found, show error message
  if (!article) {
    return (
      <div style={{
        minHeight: '100vh',
        width: '100vw',
        maxWidth: '100vw',
        overflowX: 'hidden',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          textAlign: 'center',
          color: '#ffffff'
        }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Article Not Found</h1>
          <p style={{ marginBottom: '30px', color: '#94a3b8' }}>The article you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/blog')}
            style={{
              padding: '12px 24px',
              background: '#667eea',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

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
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '60px 20px',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Back Button */}
        <button
          onClick={() => navigate('/blog')}
          style={{
            marginBottom: '32px',
            padding: '10px 20px',
            background: 'rgba(255, 255, 255, 0.1)',
            color: '#ffffff',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            fontSize: '0.9rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          onMouseOver={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.15)';
            e.target.style.borderColor = '#667eea';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
          }}
        >
          ← Back to Blog
        </button>

        {/* Article Header */}
        <div style={{
          marginBottom: '40px'
        }}>
          <div style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '20px',
            fontSize: '0.9rem',
            color: '#94a3b8'
          }}>
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
            <span>•</span>
            <span style={{
              padding: '4px 12px',
              background: 'rgba(102, 126, 234, 0.2)',
              color: '#a5b4fc',
              borderRadius: '12px',
              fontSize: '0.75rem',
              fontWeight: '500'
            }}>
              {article.category}
            </span>
          </div>
          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: '800',
            color: '#ffffff',
            marginBottom: '24px',
            lineHeight: '1.2'
          }}>
            {article.title}
          </h1>
        </div>

        {/* Featured Image */}
        <div style={{
          width: '100%',
          height: '400px',
          borderRadius: '20px',
          overflow: 'hidden',
          marginBottom: '48px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
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

        {/* Article Content */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '48px',
            color: '#e2e8f0',
            lineHeight: '1.8',
            fontSize: '1.1rem'
          }}
        >
          <style>{`
            .blog-content h2 {
              color: #ffffff;
              font-size: 1.75rem;
              font-weight: 700;
              margin-top: 2rem;
              margin-bottom: 1rem;
            }
            .blog-content h3 {
              color: #ffffff;
              font-size: 1.5rem;
              font-weight: 600;
              margin-top: 1.5rem;
              margin-bottom: 0.75rem;
            }
            .blog-content p {
              color: #e2e8f0;
              margin-bottom: 1.5rem;
              line-height: 1.8;
            }
            .blog-content ul, .blog-content ol {
              color: #e2e8f0;
              margin-bottom: 1.5rem;
              padding-left: 2rem;
            }
            .blog-content li {
              margin-bottom: 0.75rem;
            }
            .blog-content strong {
              color: #ffffff;
              font-weight: 600;
            }
            .blog-content a {
              color: #667eea;
              text-decoration: none;
            }
            .blog-content a:hover {
              text-decoration: underline;
            }
          `}</style>
          <div 
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>

        {/* Share Section */}
        <div style={{
          marginTop: '60px',
          padding: '32px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#ffffff',
            marginBottom: '16px'
          }}>
            Found this helpful?
          </h3>
          <p style={{
            color: '#94a3b8',
            marginBottom: '24px'
          }}>
            Share this article with others who might benefit
          </p>
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {['LinkedIn', 'Twitter', 'Facebook', 'Email'].map((platform) => (
              <button
                key={platform}
                style={{
                  padding: '10px 20px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = '#667eea';
                  e.target.style.borderColor = '#667eea';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
              >
                Share on {platform}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogArticle;

