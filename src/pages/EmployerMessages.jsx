import React, { useState, useRef, useEffect } from 'react';
import { Search, Send, Phone, Video, MoreVertical, Check, CheckCheck, Circle } from 'lucide-react';
import EmployerNavbar from '../components/EmployerNavbar';
import EmployerFooter from '../components/EmployerFooter';
import './EmployerMessages.css';

const initials = (name) =>
  name.split(' ').slice(0, 2).map((w) => w[0].toUpperCase()).join('');

const COLORS = ['#003f8b','#356a35','#583d00','#7c3aed','#0891b2'];

const CONVERSATIONS = [
  {
    id:1, name:'Aisha Rahman', role:'Senior Frontend Engineer', online:true, unread:2,
    lastMessage:"Thank you for reaching out! I'd love to discuss…", lastTime:'10:14 AM', color:COLORS[0],
    messages:[
      { id:1, from:'them', text:"Hello! I saw your job posting for a Senior Frontend Engineer. I'm very interested in the role.", time:'10:00 AM', date:'TODAY' },
      { id:2, from:'me',   text:"Hi Aisha! Great to hear from you. Your profile is impressive — 97% match for us.", time:'10:05 AM', read:true },
      { id:3, from:'them', text:"That's wonderful! I've been building React applications for 6 years and I'm particularly excited about the CSS architecture work.", time:'10:10 AM' },
      { id:4, from:'me',   text:"Excellent. Could you be available for a quick call this week?", time:'10:12 AM', read:false },
      { id:5, from:'them', text:"Thank you for reaching out! I'd love to discuss the project in more detail.", time:'10:14 AM' },
    ],
  },
  {
    id:2, name:'Mei Tanaka', role:'AI / ML Engineer', online:true, unread:1,
    lastMessage:"I can share my portfolio of LLM projects…", lastTime:'Yesterday', color:COLORS[1],
    messages:[
      { id:1, from:'me',   text:"Hi Mei, we have an exciting AI project and your background in LLMs looks like a perfect fit.", time:'2:00 PM', date:'YESTERDAY', read:true },
      { id:2, from:'them', text:"Hi! Thank you for the message. Could you tell me more about the scope and timeline?", time:'2:30 PM' },
      { id:3, from:'me',   text:"It's a 6-month engagement to build a domain-specific LLM for legal document analysis.", time:'2:35 PM', read:true },
      { id:4, from:'them', text:"I can share my portfolio of LLM projects — I've done similar work for a healthcare client.", time:'2:40 PM' },
    ],
  },
  {
    id:3, name:"James O'Brien", role:'DevOps / Cloud Engineer', online:false, unread:0,
    lastMessage:'The AWS architecture diagram is ready for review', lastTime:'Tue', color:COLORS[2],
    messages:[
      { id:1, from:'me',   text:"James, we need someone to architect our multi-region AWS setup. Are you available?", time:'11:00 AM', date:'TUESDAY', read:true },
      { id:2, from:'them', text:"Absolutely. I've done this for 3 companies in the past 2 years. What's your current setup?", time:'11:15 AM' },
      { id:3, from:'me',   text:"We're on a single-region EC2 setup. Looking to move to EKS across 3 regions.", time:'11:20 AM', read:true },
      { id:4, from:'them', text:"The AWS architecture diagram is ready for review — I've shared it to your email.", time:'11:45 AM' },
    ],
  },
  {
    id:4, name:'Zara Khan', role:'Engineering Manager', online:false, unread:0,
    lastMessage:"Let me know once the contract terms are finalised", lastTime:'Mon', color:COLORS[3],
    messages:[
      { id:1, from:'them', text:"Hi, I'm very interested in the Engineering Manager role. I've scaled teams from 5 to 40 engineers.", time:'9:00 AM', date:'MONDAY' },
      { id:2, from:'me',   text:"Zara, your experience is exactly what we need. Can we schedule a leadership round interview?", time:'9:30 AM', read:true },
      { id:3, from:'them', text:"Sure! I'm available Thursday or Friday afternoon. Let me know what works.", time:'9:35 AM' },
      { id:4, from:'me',   text:"Thursday 3PM works great. I'll send a calendar invite now.", time:'9:40 AM', read:true },
      { id:5, from:'them', text:"Let me know once the contract terms are finalised and I'll review ASAP.", time:'9:45 AM' },
    ],
  },
  {
    id:5, name:'Priya Sharma', role:'Product Designer', online:true, unread:0,
    lastMessage:'Attached the redesigned onboarding flow wireframes', lastTime:'Sun', color:COLORS[4],
    messages:[
      { id:1, from:'me',   text:"Priya, we're building a new onboarding experience and need a top-tier product designer.", time:'4:00 PM', date:'SUNDAY', read:true },
      { id:2, from:'them', text:"I'd love to help! I've recently completed a similar project that increased user retention by 35%.", time:'4:15 PM' },
      { id:3, from:'me',   text:"Impressive! Can you share some samples of your onboarding work?", time:'4:20 PM', read:true },
      { id:4, from:'them', text:"Attached the redesigned onboarding flow wireframes — let me know what you think!", time:'4:25 PM' },
    ],
  },
];

export default function EmployerMessages() {
  const [activeId,    setActiveId]    = useState(1);
  const [search,      setSearch]      = useState('');
  const [newMsg,      setNewMsg]      = useState('');
  const [convos,      setConvos]      = useState(CONVERSATIONS);
  const chatEndRef = useRef(null);

  const active   = convos.find((c) => c.id === activeId);
  const filtered = convos.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.role.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeId, convos]);

  const openConvo = (id) => {
    setActiveId(id);
    setConvos((prev) => prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c)));
  };

  const handleSend = () => {
    const text = newMsg.trim();
    if (!text) return;
    const timeStr = new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' });
    setConvos((prev) =>
      prev.map((c) =>
        c.id !== activeId ? c : {
          ...c,
          lastMessage: text,
          lastTime: 'Just now',
          messages: [...c.messages, { id: Date.now(), from:'me', text, time:timeStr, read:false }],
        }
      )
    );
    setNewMsg('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const grouped = active.messages.reduce((acc, msg) => {
    if (msg.date) acc.push({ type:'date', label:msg.date });
    acc.push(msg);
    return acc;
  }, []);

  return (
    <div className="em-root">
      <EmployerNavbar />

      <main className="em-main">
        {/* ── Sidebar ── */}
        <aside className="em-sidebar">
          <div className="em-sidebar__top">
            <h1 className="em-sidebar__title">Messages</h1>
          </div>

          <div className="em-sidebar__search">
            <Search size={15} className="em-search-icon" />
            <input
              type="text"
              className="em-search-input"
              placeholder="Search conversations…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search conversations"
            />
          </div>

          <div className="em-convo-list">
            {filtered.map((c) => (
              <button
                key={c.id}
                className={`em-convo ${c.id === activeId ? 'em-convo--active' : ''}`}
                onClick={() => openConvo(c.id)}
              >
                <div className="em-avatar" style={{ background: c.color }}>
                  {initials(c.name)}
                  {c.online && <span className="em-online-dot" />}
                </div>
                <div className="em-convo__info">
                  <div className="em-convo__top">
                    <span className="em-convo__name">{c.name}</span>
                    <span className="em-convo__time">{c.lastTime}</span>
                  </div>
                  <div className="em-convo__role">{c.role}</div>
                  <div className="em-convo__bottom">
                    <span className="em-convo__preview">{c.lastMessage}</span>
                    {c.unread > 0 && <span className="em-unread">{c.unread}</span>}
                  </div>
                </div>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="em-no-convos">No conversations found.</p>
            )}
          </div>
        </aside>

        {/* ── Chat panel ── */}
        <section className="em-chat">
          {/* Header */}
          <div className="em-chat__header">
            <div className="em-chat__header-left">
              <div className="em-chat__avatar" style={{ background: active.color }}>
                {initials(active.name)}
                {active.online && <span className="em-online-dot" />}
              </div>
              <div className="em-chat__info">
                <span className="em-chat__name">{active.name}</span>
                <span className="em-chat__status">
                  {active.online
                    ? <><Circle size={8} className="em-dot em-dot--on" /> Online</>
                    : <><Circle size={8} className="em-dot em-dot--off" /> Offline</>
                  }
                </span>
              </div>
            </div>
            <div className="em-chat__actions">
              <button className="em-action-btn" aria-label="Video call"><Video size={20} /></button>
              <button className="em-action-btn" aria-label="Phone call"><Phone size={20} /></button>
              <button className="em-action-btn" aria-label="More options"><MoreVertical size={20} /></button>
            </div>
          </div>

          {/* Messages */}
          <div className="em-chat__messages">
            {grouped.map((item, idx) => {
              if (item.type === 'date') {
                return (
                  <div key={`d-${idx}`} className="em-date-divider">
                    <span>{item.label}</span>
                  </div>
                );
              }
              const isMe = item.from === 'me';
              return (
                <div key={item.id} className={`em-msg-row ${isMe ? 'em-msg-row--me' : 'em-msg-row--them'}`}>
                  {!isMe && (
                    <div className="em-msg-avatar" style={{ background: active.color }}>
                      {initials(active.name)}
                    </div>
                  )}
                  <div className="em-bubble-wrap">
                    <div className={`em-bubble ${isMe ? 'em-bubble--me' : 'em-bubble--them'}`}>
                      {item.text}
                    </div>
                    <div className={`em-msg-meta ${isMe ? 'em-msg-meta--me' : ''}`}>
                      <span className="em-msg-time">{item.time}</span>
                      {isMe && (
                        item.read === true
                          ? <CheckCheck size={14} className="em-read-icon em-read-icon--read" />
                          : <Check      size={14} className="em-read-icon" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="em-chat__input-bar">
            <textarea
              className="em-chat__input"
              placeholder={`Message ${active.name}…`}
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              aria-label="Type a message"
            />
            <button
              className="em-send-btn"
              onClick={handleSend}
              disabled={!newMsg.trim()}
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </div>
        </section>
      </main>

      <EmployerFooter />
    </div>
  );
}
