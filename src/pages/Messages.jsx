import React, { useState, useRef, useEffect } from 'react';
import { Search, Send, Phone, Video, MoreVertical, Check, CheckCheck, Circle } from 'lucide-react';
import Navbar from '../components/Navbar';
import './Messages.css';

/* ─── Avatar helper ─── */
const initials = (name) =>
  name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

const avatarColors = [
  '#1e3a8a', '#7c3aed', '#0891b2', '#059669', '#b45309',
];

/* ─── Sample data ─── */
const conversations = [
  {
    id: 1,
    name: 'Shahzeb Sardar',
    role: 'Sardar Enterprises',
    online: true,
    unread: 2,
    lastMessage: "I've reviewed your proposal for the...",
    lastTime: '9:41 AM',
    color: avatarColors[0],
    messages: [
      {
        id: 1, from: 'them', text: "Hello! I've had a chance to review the portfolio samples you sent over yesterday. The aesthetic really aligns with what we're looking for at Sardar Enterprises.", time: '9:30 AM', date: 'TODAY, JUNE 12',
      },
      {
        id: 2, from: 'me', text: "That's great to hear, Shahzeb! I'm glad the direction resonates. Which specific project stood out the most to you?", time: '9:33 AM', read: true,
      },
      {
        id: 3, from: 'them', text: "Definitely the industrial design system you built for the logistics firm. We have a similar scale of complexity. I've reviewed your proposal for the project and I'd like to discuss the timeline.", time: '9:38 AM',
      },
      {
        id: 4, from: 'me', text: "I'm available for a call this afternoon to go over those details. Shall we say 3:00 PM?", time: '9:41 AM', read: false,
      },
      {
        id: 5, from: 'them', text: "3 PM works perfectly for me. I'll send over a calendar invite shortly. Looking forward to it!", time: '9:44 AM',
      },
    ],
  },
  {
    id: 2,
    name: 'Ahmed Tanoli',
    role: 'Tanoli Digital',
    online: false,
    unread: 0,
    lastMessage: 'Can you send the revised contract by EOD?',
    lastTime: 'Yesterday',
    color: avatarColors[1],
    messages: [
      {
        id: 1, from: 'them', text: "Hi! I wanted to follow up on the project milestones we discussed last week.", time: '11:00 AM', date: 'YESTERDAY, JUNE 11',
      },
      {
        id: 2, from: 'me', text: "Hey Ahmed! Yes, the first milestone is complete. I've pushed the deliverables to the shared drive.", time: '11:15 AM', read: true,
      },
      {
        id: 3, from: 'them', text: "Perfect. The client reviewed the mockups and loved them. Can you send the revised contract by EOD?", time: '11:20 AM',
      },
      {
        id: 4, from: 'me', text: "Absolutely, I'll have it in your inbox by 5 PM. Should I include the revised payment schedule as well?", time: '11:22 AM', read: true,
      },
      {
        id: 5, from: 'them', text: "Yes, please include it. Thanks for staying on top of this!", time: '11:25 AM',
      },
    ],
  },
  {
    id: 3,
    name: 'Muneeb Ali',
    role: 'Ali Tech Solutions',
    online: true,
    unread: 1,
    lastMessage: 'The backend APIs are ready for testing',
    lastTime: 'Tue',
    color: avatarColors[2],
    messages: [
      {
        id: 1, from: 'them', text: "Hey! Just wanted to give you a heads up — the backend APIs are ready for testing.", time: '3:10 PM', date: 'TUESDAY, JUNE 10',
      },
      {
        id: 2, from: 'me', text: "That was fast, Muneeb! Great work. I'll start integration testing on my end tomorrow morning.", time: '3:20 PM', read: true,
      },
      {
        id: 3, from: 'them', text: "The auth endpoints use JWT — I've shared the Postman collection in the repo. Let me know if anything's unclear.", time: '3:25 PM',
      },
      {
        id: 4, from: 'me', text: "Awesome. One question — what's the token expiry set to?", time: '3:28 PM', read: true,
      },
      {
        id: 5, from: 'them', text: "15 minutes for access tokens, 7 days for refresh tokens. It's configurable via env vars if you need to adjust.", time: '3:32 PM',
      },
    ],
  },
  {
    id: 4,
    name: 'Ahmer Solangi',
    role: 'Solangi Creative',
    online: false,
    unread: 0,
    lastMessage: 'Let me know once the designs are approved',
    lastTime: 'Mon',
    color: avatarColors[3],
    messages: [
      {
        id: 1, from: 'me', text: "Ahmer, I've shared the latest design iterations with the client. They should have feedback by end of day.", time: '10:00 AM', date: 'MONDAY, JUNE 9', read: true,
      },
      {
        id: 2, from: 'them', text: "Thanks for the update! The new color palette looks much stronger. I think the client will be happy with it.", time: '10:15 AM',
      },
      {
        id: 3, from: 'me', text: "Agreed. I especially like how the typography hierarchy turned out. Fingers crossed!", time: '10:18 AM', read: true,
      },
      {
        id: 4, from: 'them', text: "Same here. Let me know once the designs are approved and we'll move to the dev handoff stage.", time: '10:22 AM',
      },
    ],
  },
  {
    id: 5,
    name: 'Maaz Civil',
    role: 'Civil Construction Co.',
    online: false,
    unread: 0,
    lastMessage: 'The site inspection report is attached',
    lastTime: 'Sun',
    color: avatarColors[4],
    messages: [
      {
        id: 1, from: 'them', text: "Hi, I wanted to share an update from the site visit last Saturday. Everything looks on track.", time: '9:00 AM', date: 'SUNDAY, JUNE 8',
      },
      {
        id: 2, from: 'me', text: "Great news, Maaz! Any issues with the foundation work?", time: '9:10 AM', read: true,
      },
      {
        id: 3, from: 'them', text: "Minor drainage concern on the east side — the engineer is addressing it this week. Nothing that will affect the timeline.", time: '9:15 AM',
      },
      {
        id: 4, from: 'me', text: "Good to know. Please keep me posted. When's the next inspection scheduled?", time: '9:18 AM', read: true,
      },
      {
        id: 5, from: 'them', text: "Next Friday. The site inspection report is attached for your records.", time: '9:20 AM',
      },
    ],
  },
];

/* ─── Component ─── */
const Messages = () => {
  const [activeId, setActiveId] = useState(1);
  const [search, setSearch] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [convos, setConvos] = useState(conversations);
  const chatEndRef = useRef(null);

  const active = convos.find((c) => c.id === activeId);

  const filtered = convos.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.role.toLowerCase().includes(search.toLowerCase())
  );

  /* Auto-scroll on message change */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeId, convos]);

  /* Send message */
  const handleSend = () => {
    const text = newMessage.trim();
    if (!text) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setConvos((prev) =>
      prev.map((c) => {
        if (c.id !== activeId) return c;
        return {
          ...c,
          lastMessage: text,
          lastTime: 'Just now',
          messages: [
            ...c.messages,
            { id: Date.now(), from: 'me', text, time: timeStr, read: false },
          ],
        };
      })
    );
    setNewMessage('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  /* Mark as read on open */
  const openConvo = (id) => {
    setActiveId(id);
    setConvos((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c))
    );
  };

  /* Group messages by date */
  const groupedMessages = active.messages.reduce((acc, msg) => {
    if (msg.date) acc.push({ type: 'date', label: msg.date });
    acc.push(msg);
    return acc;
  }, []);

  return (
    <div className="messages-page">
      <Navbar />

      <main className="messages-main">
        {/* ── Sidebar ── */}
        <aside className="messages-sidebar">
          <div className="sidebar-header">
            <h1 className="sidebar-title">Messages</h1>
          </div>

          <div className="sidebar-search">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search conversations"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="convo-list">
            {filtered.map((c) => (
              <button
                key={c.id}
                className={`convo-item ${c.id === activeId ? 'active' : ''}`}
                onClick={() => openConvo(c.id)}
              >
                <div className="convo-avatar" style={{ background: c.color }}>
                  {initials(c.name)}
                  {c.online && <span className="online-dot" />}
                </div>
                <div className="convo-info">
                  <div className="convo-top">
                    <span className="convo-name">{c.name}</span>
                    <span className="convo-time">{c.lastTime}</span>
                  </div>
                  <div className="convo-role">{c.role}</div>
                  <div className="convo-bottom">
                    <span className="convo-preview">{c.lastMessage}</span>
                    {c.unread > 0 && (
                      <span className="unread-badge">{c.unread}</span>
                    )}
                  </div>
                </div>
              </button>
            ))}

            {filtered.length === 0 && (
              <p className="no-convos">No conversations found.</p>
            )}
          </div>
        </aside>

        {/* ── Chat Panel ── */}
        <section className="chat-panel">
          {/* Chat header */}
          <div className="chat-header">
            <div className="chat-header-left">
              <div className="chat-avatar" style={{ background: active.color }}>
                {initials(active.name)}
                {active.online && <span className="online-dot" />}
              </div>
              <div className="chat-header-info">
                <span className="chat-name">{active.name}</span>
                <span className="chat-status">
                  {active.online ? (
                    <><Circle size={8} className="status-dot online" /> Online</>
                  ) : (
                    <><Circle size={8} className="status-dot offline" /> Offline</>
                  )}
                </span>
              </div>
            </div>
            <div className="chat-header-actions">
              <button className="chat-action-btn" aria-label="Video call"><Video size={20} /></button>
              <button className="chat-action-btn" aria-label="Phone call"><Phone size={20} /></button>
              <button className="chat-action-btn" aria-label="More options"><MoreVertical size={20} /></button>
            </div>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {groupedMessages.map((item, idx) => {
              if (item.type === 'date') {
                return (
                  <div key={`date-${idx}`} className="date-divider">
                    <span>{item.label}</span>
                  </div>
                );
              }

              const isMe = item.from === 'me';
              return (
                <div key={item.id} className={`message-row ${isMe ? 'me' : 'them'}`}>
                  {!isMe && (
                    <div className="msg-avatar" style={{ background: active.color }}>
                      {initials(active.name)}
                    </div>
                  )}
                  <div className="message-bubble-wrap">
                    <div className={`message-bubble ${isMe ? 'bubble-me' : 'bubble-them'}`}>
                      {item.text}
                    </div>
                    <div className={`message-meta ${isMe ? 'meta-me' : 'meta-them'}`}>
                      <span className="msg-time">{item.time}</span>
                      {isMe && (
                        item.read === true
                          ? <CheckCheck size={14} className="read-icon read" />
                          : <Check size={14} className="read-icon" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="chat-input-bar">
            <textarea
              className="chat-input"
              placeholder={`Message ${active.name}…`}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
            />
            <button
              className="send-btn"
              onClick={handleSend}
              disabled={!newMessage.trim()}
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Messages;
