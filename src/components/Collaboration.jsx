import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useResume } from '../contexts/ResumeContext';
import io from 'socket.io-client';

const Collaboration = ({ resumeId }) => {
  const { currentUser } = useAuth();
  const { currentResume, updateResume } = useResume();
  const [collaborators, setCollaborators] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socketRef = useRef(null);

  useEffect(() => {
    if (!resumeId || !currentUser) return;

    // Initialize socket connection
    // Note: You'll need to set up a Socket.IO server for this to work
    // For now, this is a placeholder implementation
    socketRef.current = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:3001', {
      query: {
        resumeId,
        userId: currentUser.uid,
        userName: currentUser.displayName || currentUser.email
      }
    });

    socketRef.current.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to collaboration server');
    });

    socketRef.current.on('disconnect', () => {
      setIsConnected(false);
    });

    socketRef.current.on('collaborators-updated', (collabList) => {
      setCollaborators(collabList);
    });

    socketRef.current.on('resume-updated', (data) => {
      // Handle real-time updates from other collaborators
      if (data.userId !== currentUser.uid) {
        // Update resume if it's from another user
        // updateResume(resumeId, data.resumeData, 'Updated by collaborator');
      }
    });

    socketRef.current.on('message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [resumeId, currentUser]);

  const sendMessage = () => {
    if (!newMessage.trim() || !socketRef.current) return;

    const message = {
      userId: currentUser.uid,
      userName: currentUser.displayName || currentUser.email,
      text: newMessage,
      timestamp: new Date().toISOString()
    };

    socketRef.current.emit('message', {
      resumeId,
      message
    });

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const inviteCollaborator = (email) => {
    if (!socketRef.current) return;
    
    socketRef.current.emit('invite-collaborator', {
      resumeId,
      email,
      inviterId: currentUser.uid
    });
  };

  return (
    <div style={{
      background: '#ffffff',
      borderRadius: '12px',
      padding: '24px',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: '#1a1a1a'
        }}>
          Collaboration
        </h3>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: isConnected ? '#10b981' : '#ef4444'
          }} />
          <span style={{
            fontSize: '0.875rem',
            color: '#64748b'
          }}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>

      {/* Collaborators List */}
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{
          fontSize: '1rem',
          fontWeight: '600',
          marginBottom: '12px',
          color: '#1a1a1a'
        }}>
          Active Collaborators
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {collaborators.length > 0 ? (
            collaborators.map((collab, index) => (
              <div
                key={index}
                style={{
                  padding: '12px',
                  background: '#f9fafb',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: '600',
                  fontSize: '1rem'
                }}>
                  {collab.userName?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontWeight: '600',
                    color: '#1a1a1a',
                    fontSize: '0.875rem'
                  }}>
                    {collab.userName || 'Unknown User'}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#64748b'
                  }}>
                    {collab.isActive ? 'Active now' : 'Inactive'}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{
              padding: '20px',
              textAlign: 'center',
              color: '#64748b',
              fontSize: '0.875rem'
            }}>
              No active collaborators
            </div>
          )}
        </div>
      </div>

      {/* Chat */}
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{
          fontSize: '1rem',
          fontWeight: '600',
          marginBottom: '12px',
          color: '#1a1a1a'
        }}>
          Chat
        </h4>
        <div style={{
          height: '200px',
          overflowY: 'auto',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '12px',
          marginBottom: '12px',
          background: '#f9fafb'
        }}>
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  marginBottom: '12px',
                  padding: '8px',
                  background: msg.userId === currentUser.uid ? '#667eea' : '#ffffff',
                  color: msg.userId === currentUser.uid ? '#ffffff' : '#1a1a1a',
                  borderRadius: '8px',
                  marginLeft: msg.userId === currentUser.uid ? 'auto' : '0',
                  maxWidth: '80%',
                  fontSize: '0.875rem'
                }}
              >
                <div style={{
                  fontWeight: '600',
                  marginBottom: '4px',
                  fontSize: '0.75rem',
                  opacity: 0.8
                }}>
                  {msg.userName}
                </div>
                <div>{msg.text}</div>
              </div>
            ))
          ) : (
            <div style={{
              textAlign: 'center',
              color: '#64748b',
              fontSize: '0.875rem',
              padding: '20px'
            }}>
              No messages yet. Start the conversation!
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
            style={{
              flex: 1,
              padding: '10px',
              border: '2px solid #e5e7eb',
              borderRadius: '6px',
              fontSize: '14px'
            }}
          />
          <button
            onClick={sendMessage}
            disabled={!isConnected || !newMessage.trim()}
            style={{
              padding: '10px 20px',
              background: isConnected && newMessage.trim() ? '#667eea' : '#9ca3af',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: isConnected && newMessage.trim() ? 'pointer' : 'not-allowed'
            }}
          >
            Send
          </button>
        </div>
      </div>

      {/* Note about setup */}
      {!isConnected && (
        <div style={{
          padding: '12px',
          background: '#fef3c7',
          borderRadius: '8px',
          fontSize: '0.875rem',
          color: '#92400e'
        }}>
          <strong>Note:</strong> Real-time collaboration requires a Socket.IO server. 
          Set up your backend server and configure REACT_APP_SOCKET_URL environment variable.
        </div>
      )}
    </div>
  );
};

export default Collaboration;

