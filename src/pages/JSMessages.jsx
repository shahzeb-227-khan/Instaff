import React, { useState, useRef, useEffect } from 'react';
import { Search, Send, Phone, Video, MoreVertical, Check, CheckCheck, Circle } from 'lucide-react';
import JobSeekerNavbar from '../components/JobSeekerNavbar';
import EmployerFooter  from '../components/EmployerFooter';
import './JSMessages.css';

const initials = (name) =>
  name.split(' ').slice(0, 2).map((w) => w[0].toUpperCase()).join('');

const COLORS = ['#003f8b','#356a35','#583d00','#7c3aed','#0891b2'];

const CONVERSATIONS = [
  {
    id:1, name:'TechCorp Global', role:'Re: Senior React Developer', online:true, unread:2,
    lastMessage:"We'd love to schedule a technical interview with you…", lastTime:'10:22 AM', color:COLORS[0],
    messages:[
      { id:1, from:'them', text:"Hi! We reviewed your application for the Senior React Developer role and were very impressed.", time:'10:00 AM', date:'TODAY' },
      { id:2, from:'me',   text:"Thank you so much! I'm really excited about this opportunity and the team's mission.", time:'10:05 AM', read:true },
      { id:3, from:'them', text:"Great! Your portfolio work on the design system was particularly impressive.", time:'10:18 AM' },
      { id:4, from:'me',   text:"That's kind of you to say. I put a lot of thought into component architecture there.", time:'10:20 AM', read:false },
      { id:5, from:'them', text:"We'd love to schedule a technical interview with you — are you free Thursday?", time:'10:22 AM' },
    ],
  },
  {
    id:2, name:'Stripe', role:'Re: DevOps Engineer', online:true, unread:1,
    lastMessage:"Our technical lead wants to connect on your AWS experience…", lastTime:'Yesterday', color:COLORS[1],
    messages:[
      { id:1, from:'me',   text:"Hello, I applied for the DevOps Engineer role yesterday and wanted to follow up.", time:'9:00 AM', date:'YESTERDAY', read:true },
      { id:2, from:'them', text:"We received your application. Your Terraform and Kubernetes experience looks excellent.", time:'9:30 AM' },
      { id:3, from:'me',   text:"Thank you! I've been working with multi-region AWS setups for the past 3 years.", time:'9:35 AM', read:true },
      { id:4, from:'them', text:"Our technical lead wants to connect on your AWS experience — can you do a call Friday?", time:'9:45 AM' },
    ],
  },
  {
    id:3, name:'Figma', role:'Re: Engineering Manager', online:false, unread:0,
    lastMessage:'We have a strong interest in your leadership background', lastTime:'Tue', color:COLORS[2],
    messages:[
      { id:1, from:'them', text:"Hi, we reviewed your Engineering Manager application. Your scaling experience is impressive.", time:'2:00 PM', date:'TUESDAY' },
      { id:2, from:'me',   text:"Thanks for reaching out! I'm very excited about Figma's culture and the team size.", time:'2:20 PM', read:true },
      { id:3, from:'them', text:"We have a strong interest in your leadership background. Can we schedule a panel interview?", time:'3:00 PM' },
    ],
  },
  {
    id:4, name:'Notion', role:'Re: Product Manager', online:false, unread:0,
    lastMessage:'Offer letter coming your way tomorrow', lastTime:'Mon', color:COLORS[3],
    messages:[
      { id:1, from:'them', text:"Congratulations! You've passed all interview rounds for the Product Manager role.", time:'11:00 AM', date:'MONDAY' },
      { id:2, from:'me',   text:"This is incredible news! I'm absolutely thrilled to be moving forward.", time:'11:05 AM', read:true },
      { id:3, from:'them', text:"We're aligning on compensation. Expecting to confirm by end of day.", time:'4:00 PM', read:true },
      { id:4, from:'them', text:"Offer letter coming your way tomorrow morning. Congratulations again!", time:'5:30 PM' },
    ],
  },
  {
    id:5, name:'Cloudflare', role:'Re: Backend Engineer', online:true, unread:0,
    lastMessage:'Can you share more about your Go microservices experience?', lastTime:'Sun', color:COLORS[4],
    messages:[
      { id:1, from:'them', text:"Thank you for applying to our Backend Engineer (Go) position at Cloudflare.", time:'3:00 PM', date:'SUNDAY' },
      { id:2, from:'me',   text:"Happy to — I've been building Go microservices at scale for 2 years handling millions of requests daily.", time:'3:15 PM', read:true },
      { id:3, from:'them', text:"Can you share more about your Go microservices experience, specifically around gRPC and service discovery?", time:'3:30 PM' },
    ],
  },
];

export default function JSMessages() {
  const [activeId, setActiveId] = useState(1);
  const [search,   setSearch]   = useState('');
  const [newMsg,   setNewMsg]   = useState('');
  const [convos,   setConvos]   = useState(CONVERSATIONS);
  const chatEndRef = useRef(null);

  const active   = convos.find((c) => c.id === activeId);
  const filtered = convos.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.role.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior:'smooth' });
  }, [activeId, convos]);

  const openConvo = (id) => {
    setActiveId(id);
    setConvos((prev) => prev.map((c) => c.id === id ? { ...c, unread:0 } : c));
  };

  const handleSend = () => {
    const text = newMsg.trim();
    if (!text) return;
    const timeStr = new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' });
    setConvos((prev) =>
      prev.map((c) => c.id !== activeId ? c : {
        ...c, lastMessage:text, lastTime:'Just now',
        messages:[...c.messages, { id:Date.now(), from:'me', text, time:timeStr, read:false }],
      })
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
    <div className="jsm-root">
      <JobSeekerNavbar />

      <main className="jsm-main">
        {/* ── Sidebar ── */}
        <aside className="jsm-sidebar">
          <div className="jsm-sidebar__top">
            <h1 className="jsm-sidebar__title">Messages</h1>
          </div>

          <div className="jsm-sidebar__search">
            <Search size={15} className="jsm-search-icon" />
            <input
              type="text"
              className="jsm-search-input"
              placeholder="Search conversations…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="jsm-convo-list">
            {filtered.map((c) => (
              <button key={c.id} className={`jsm-convo ${c.id === activeId ? 'jsm-convo--active':''}`} onClick={() => openConvo(c.id)}>
                <div className="jsm-avatar" style={{ background:c.color }}>
                  {initials(c.name)}
                  {c.online && <span className="jsm-online-dot"/>}
                </div>
                <div className="jsm-convo__info">
                  <div className="jsm-convo__top">
                    <span className="jsm-convo__name">{c.name}</span>
                    <span className="jsm-convo__time">{c.lastTime}</span>
                  </div>
                  <div className="jsm-convo__role">{c.role}</div>
                  <div className="jsm-convo__bottom">
                    <span className="jsm-convo__preview">{c.lastMessage}</span>
                    {c.unread > 0 && <span className="jsm-unread">{c.unread}</span>}
                  </div>
                </div>
              </button>
            ))}
            {filtered.length === 0 && <p className="jsm-no-convos">No conversations found.</p>}
          </div>
        </aside>

        {/* ── Chat panel ── */}
        <section className="jsm-chat">
          {/* Header */}
          <div className="jsm-chat__header">
            <div className="jsm-chat__header-left">
              <div className="jsm-chat__avatar" style={{ background:active.color }}>{initials(active.name)}</div>
              <div className="jsm-chat__info">
                <span className="jsm-chat__name">{active.name}</span>
                <span className="jsm-chat__role">{active.role}</span>
              </div>
            </div>
            <div className="jsm-chat__actions">
              <button className="jsm-action-btn" aria-label="Video call"><Video size={20}/></button>
              <button className="jsm-action-btn" aria-label="Phone call"><Phone size={20}/></button>
              <button className="jsm-action-btn" aria-label="More options"><MoreVertical size={20}/></button>
            </div>
          </div>

          {/* Messages */}
          <div className="jsm-chat__messages">
            {grouped.map((item, idx) => {
              if (item.type === 'date') {
                return (
                  <div key={`d-${idx}`} className="jsm-date-divider">
                    <span>{item.label}</span>
                  </div>
                );
              }
              const isMe = item.from === 'me';
              return (
                <div key={item.id} className={`jsm-msg-row ${isMe ? 'jsm-msg-row--me':'jsm-msg-row--them'}`}>
                  {!isMe && (
                    <div className="jsm-msg-avatar" style={{ background:active.color }}>{initials(active.name)}</div>
                  )}
                  <div className="jsm-bubble-wrap">
                    <div className={`jsm-bubble ${isMe ? 'jsm-bubble--me':'jsm-bubble--them'}`}>{item.text}</div>
                    <div className={`jsm-msg-meta ${isMe ? 'jsm-msg-meta--me':''}`}>
                      <span className="jsm-msg-time">{item.time}</span>
                      {isMe && (
                        item.read === true
                          ? <CheckCheck size={14} className="jsm-read-icon jsm-read-icon--read"/>
                          : <Check      size={14} className="jsm-read-icon"/>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={chatEndRef}/>
          </div>

          {/* Input */}
          <div className="jsm-chat__input-bar">
            <textarea
              className="jsm-chat__input"
              placeholder={`Message ${active.name}…`}
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
            />
            <button className="jsm-send-btn" onClick={handleSend} disabled={!newMsg.trim()} aria-label="Send">
              <Send size={18}/>
            </button>
          </div>
        </section>
      </main>

      <EmployerFooter />
    </div>
  );
}
