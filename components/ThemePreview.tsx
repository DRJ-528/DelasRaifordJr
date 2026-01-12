import React, { useEffect, useState, useRef } from 'react';
import { DELAS_INFO, PROJECTS, GALLERY_ITEMS, getYouTubeEmbedUrl } from '../constants.tsx';
import { GalleryItem } from '../types';

const ThemePreview: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [wordIndex, setWordIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const galleryCategories = ['Print', 'Digital', 'Photography', 'Videography', 'Hard & Soft Goods'] as const;
  const [activeTab, setActiveTab] = useState<typeof galleryCategories[number]>('Print');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number[]>(new Array(PROJECTS.length).fill(0));
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [activeGalleryId, setActiveGalleryId] = useState<string | null>(null);
  
  // Swipe State
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  // Mobile Focus Tracking
  const [focusedProjectIdx, setFocusedProjectIdx] = useState<number | null>(null);
  
  const words = ["Direction.", "Branding.", "Design."];
  const scrollRefs = useRef<(HTMLDivElement | null)[]>([]);

  const navItems = [
    { id: 'hero', label: 'About' },
    { id: 'experience', label: 'Trajectory' },
    { id: 'work', label: 'Case Studies' },
    { id: 'gallery', label: 'Archive' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Connect' }
  ];

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 3000);

    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -20% 0px',
      threshold: 0.05,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (sectionId && navItems.some(item => item.id === sectionId)) {
            setActiveSection(sectionId);
          }

          if (sectionId.startsWith('project-')) {
             const idx = parseInt(sectionId.split('-')[1]);
             setFocusedProjectIdx(idx);
          }
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('section[id], footer[id]');
    sections.forEach(section => observer.observe(section));

    // Gallery Item Observer for Scroll Activation on Mobile
    const galleryObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveGalleryId(entry.target.getAttribute('data-id'));
        }
      });
    }, { threshold: 0.6, rootMargin: '0px -10% 0px -10%' });

    const items = document.querySelectorAll('.gallery-item-trigger');
    items.forEach(i => galleryObserver.observe(i));

    const handleScroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50) {
        setActiveSection('contact');
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      galleryObserver.disconnect();
      clearInterval(wordInterval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeTab]);

  const handleProjectScroll = (idx: number) => {
    const el = scrollRefs.current[idx];
    if (el) {
      const progress = el.scrollLeft / (el.scrollWidth - el.clientWidth);
      setScrollProgress(prev => {
        const next = [...prev];
        next[idx] = isNaN(progress) ? 0 : progress;
        return next;
      });
    }
  };

  const scrollProject = (idx: number, direction: 'prev' | 'next') => {
    const el = scrollRefs.current[idx];
    if (el) {
      const scrollAmount = el.clientWidth;
      const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;
      const isAtStart = el.scrollLeft <= 10;

      if (direction === 'next') {
        if (isAtEnd) el.scrollTo({ left: 0, behavior: 'smooth' });
        else el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      } else {
        if (isAtStart) el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
        else el.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const getNavList = () => GALLERY_ITEMS.filter(i => i.category === activeTab);
  const navList = getNavList();
  const currentIndex = selectedItem ? navList.findIndex(item => item.id === selectedItem.id) : -1;

  const handleNext = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    if (currentIndex !== -1) setSelectedItem(navList[(currentIndex + 1) % navList.length]);
  };

  const handlePrev = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    if (currentIndex !== -1) setSelectedItem(navList[(currentIndex - 1 + navList.length) % navList.length]);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
  };

  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setSelectedItem(null); setIsLoginOpen(false); setIsMenuOpen(false); }
      if (selectedItem) {
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, [selectedItem, currentIndex]);

  const handlePortalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggingIn(false);
    }, 2000);
  };

  return (
    <div className="w-full bg-slate-50 text-slate-900 selection:bg-black selection:text-white">
      {/* Side Navigation Indicator */}
      <nav className="fixed right-10 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col items-end gap-6 pointer-events-auto">
        {navItems.map((item) => (
          <a 
            key={item.id} 
            href={`#${item.id}`} 
            className="group flex items-center gap-4 transition-all"
            aria-label={`Scroll to ${item.label}`}
          >
            <span className={`text-[10px] font-black uppercase tracking-widest transition-opacity duration-300 ${activeSection === item.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`}>
              {item.label}
            </span>
            <div className={`h-[1px] transition-all duration-500 bg-black ${activeSection === item.id ? 'w-12 opacity-100' : 'w-4 group-hover:w-8 opacity-20'}`} />
          </a>
        ))}
      </nav>

      {/* Persistent Navigation */}
      <header className="fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center z-40 bg-slate-50/80 backdrop-blur-md border-b border-slate-200">
        <div className="text-xs md:text-sm font-black uppercase tracking-[0.4em] reveal">
          Delas Raiford Jr <span className="hidden sm:inline font-light opacity-50">/ {DELAS_INFO.role}</span>
        </div>
        
        <div className="hidden lg:flex gap-8 text-[10px] font-bold uppercase tracking-widest">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} className={`transition-colors hover:text-blue-600 ${activeSection === item.id ? 'text-blue-600' : ''}`}>
              {item.label}
            </a>
          ))}
        </div>

        <button className="lg:hidden p-2 flex flex-col gap-1.5 relative z-50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className={`w-6 h-[2px] bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-6 h-[2px] bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-[2px] bg-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[45] bg-white/95 backdrop-blur-xl transition-all duration-500 lg:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col h-full justify-center px-12 space-y-8">
          {navItems.map((item, idx) => (
            <a 
              key={item.id} 
              href={`#${item.id}`} 
              onClick={() => setIsMenuOpen(false)}
              className={`text-4xl font-black uppercase tracking-tighter transition-all duration-500 transform ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <span className={`mr-4 text-xs font-mono text-slate-300`}>0{idx + 1}</span>
              <span className={`${activeSection === item.id ? 'text-blue-600' : 'text-slate-900'}`}>{item.label}</span>
            </a>
          ))}
          <div className={`pt-12 border-t border-slate-100 transition-all duration-500 delay-500 transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4">Direct Communication</div>
            <a href={`mailto:${DELAS_INFO.email}`} className="text-lg font-light italic mb-8 block">{DELAS_INFO.email}</a>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 hover:text-slate-900 transition-colors"
            >
              Close Menu [ESC]
            </button>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section id="hero" className="min-h-screen flex items-center px-8 md:px-24 pt-32 pb-20 relative overflow-hidden bg-white scroll-mt-20">
        <div className="max-w-7xl w-full">
          <h1 className="text-[14.5vw] sm:text-[8rem] md:text-[10rem] font-light leading-[0.85] tracking-tighter mb-12 reveal w-full">
            Creative <br />
            <span key={wordIndex} className="font-black italic text-slate-400 animate-fly-in">{words[wordIndex]}</span>
          </h1>
          <p className="text-lg md:text-2xl font-light text-slate-500 max-w-4xl leading-relaxed reveal stagger-1 italic">
            {DELAS_INFO.summary}
          </p>
          <div className="mt-16 flex flex-wrap items-center gap-12 reveal stagger-2">
            <a href="#work" className="px-12 py-6 bg-black text-white text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95">Examine Case Studies</a>
            <div className="flex gap-16">
              {DELAS_INFO.stats.map((stat, i) => (
                <div key={i} className="border-l border-slate-200 pl-6">
                  <div className="text-4xl font-black">{stat.value}</div>
                  <div className="text-[10px] uppercase tracking-widest font-bold opacity-30">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trajectory (Experience) Section */}
      <section id="experience" className="py-24 md:py-48 bg-slate-100/50 scroll-mt-20 border-b border-slate-200">
        <div className="px-8 md:px-24 max-w-7xl mx-auto">
          <div className="text-left mb-24 reveal">
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4">Creative Narrative</div>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight text-slate-900">Professional Trajectory</h2>
          </div>
          
          <div className="space-y-24">
            {DELAS_INFO.experience.map((job, idx) => (
              <div key={idx} className="grid grid-cols-1 lg:grid-cols-12 gap-12 reveal transition-all hover:translate-x-2">
                <div className="lg:col-span-4">
                  <div className="text-xs font-mono text-slate-400 mb-2">{job.period}</div>
                  <h3 className="text-2xl font-bold uppercase tracking-tighter">{job.title}</h3>
                  <div className="text-sm font-black text-blue-600 uppercase tracking-widest mt-1">{job.company}</div>
                  <div className="text-[10px] text-slate-400 uppercase mt-1">{job.location}</div>
                </div>
                <div className="lg:col-span-8">
                   <ul className="space-y-6">
                      {job.highlights.map((point, pIdx) => (
                        <li key={pIdx} className="text-lg text-slate-600 font-light leading-relaxed border-l-2 border-slate-200 pl-6 hover:border-blue-600 transition-colors italic">
                          {point}
                        </li>
                      ))}
                   </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section id="work" className="bg-white scroll-mt-20">
        {PROJECTS.map((project, idx) => (
          <div 
            key={idx} 
            id={`project-${idx}`}
            className="min-h-screen grid grid-cols-1 lg:grid-cols-2 border-b border-slate-100"
          >
            <div className={`p-8 md:p-24 flex flex-col justify-center bg-slate-50/50 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
               <div className="max-w-lg reveal">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-4">{project.category}</div>
                  <h3 className="text-4xl md:text-5xl font-light tracking-tight mb-8 leading-[1.1]">{project.title}</h3>
                  <div className="space-y-12">
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">The Challenge</h4>
                      <p className="text-xl text-slate-600 font-light leading-relaxed italic">{project.challenge}</p>
                    </div>
                    <div className="flex items-center justify-between pt-8 border-t border-slate-200">
                       <span className="text-[10px] font-black uppercase tracking-widest border-b-2 border-blue-600 pb-1">{project.metrics}</span>
                       <div className="flex gap-8">
                         <button onClick={() => scrollProject(idx, 'prev')} className="text-[10px] font-black uppercase tracking-widest hover:text-blue-600 active:scale-90 transition-all">Back</button>
                         <button onClick={() => scrollProject(idx, 'next')} className="text-[10px] font-black uppercase tracking-widest hover:text-blue-600 active:scale-90 transition-all">Next</button>
                       </div>
                    </div>
                  </div>
               </div>
            </div>

            <div className="relative h-[50vh] lg:h-auto overflow-hidden group">
               <div 
                 ref={el => { scrollRefs.current[idx] = el; }}
                 onScroll={() => handleProjectScroll(idx)}
                 className="absolute inset-0 flex overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth"
               >
                  {project.images.map((img, iIdx) => (
                    <div key={iIdx} className="flex-none w-full h-full snap-center overflow-hidden">
                      <img 
                        src={img} 
                        alt={project.title} 
                        className={`w-full h-full object-cover transition-all duration-1000 lg:grayscale lg:group-hover:grayscale-0 lg:group-hover:scale-105 ${focusedProjectIdx === idx ? 'max-lg:scale-105' : ''}`} 
                      />
                    </div>
                  ))}
               </div>
               <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-200/20">
                 <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${scrollProgress[idx] * 100}%` }} />
               </div>
            </div>
          </div>
        ))}
      </section>

      {/* Archive */}
      <section id="gallery" className="py-24 md:py-48 bg-slate-50 overflow-hidden scroll-mt-20">
        <div className="px-8 md:px-24 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="text-left reveal">
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4">Categorized Excellence</div>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight text-slate-900">Portfolio Archive</h2>
          </div>
          
          <div className="flex gap-8 md:gap-12 border-b border-slate-200 pb-4 overflow-x-auto no-scrollbar">
            {galleryCategories.map(cat => (
              <button 
                key={cat} 
                onClick={() => setActiveTab(cat)} 
                className={`whitespace-nowrap text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === cat ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        <div key={activeTab} className="flex overflow-x-auto gap-8 px-8 md:px-24 pb-12 snap-x no-scrollbar scroll-smooth">
          {GALLERY_ITEMS.filter(i => i.category === activeTab).map((item) => (
            <div 
              key={item.id} 
              data-id={item.id}
              className="gallery-item-trigger flex-none w-[300px] md:w-[520px] aspect-video relative overflow-hidden bg-white border border-slate-200 snap-center group reveal active:scale-95 transition-all cursor-zoom-in" 
              onClick={() => setSelectedItem(item)}
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className={`w-full h-full object-cover transition-all duration-700 lg:grayscale lg:group-hover:grayscale-0 lg:group-hover:scale-105 ${activeGalleryId === item.id ? 'max-lg:scale-105' : ''}`} 
              />
              
              {item.videoUrl && (
                <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity pointer-events-none">
                   <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 shadow-xl">
                      <svg className="w-8 h-8 text-white fill-current translate-x-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                   </div>
                </div>
              )}

              <div className="lg:hidden absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                <div className="text-[8px] font-mono text-blue-400 mb-1">ARC-{item.year}</div>
                <h4 className="text-xs font-bold uppercase tracking-tight">{item.title}</h4>
              </div>

              <div className="hidden lg:flex absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex-col justify-end p-8 text-white">
                <div className="text-[10px] font-mono mb-2 text-blue-400">ARC-{item.year}</div>
                <h4 className="text-2xl font-bold uppercase tracking-tighter leading-none">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Expertise & Systems (Skills) Section */}
      <section id="skills" className="py-24 md:py-48 bg-black text-white scroll-mt-20">
        <div className="px-8 md:px-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32">
            
            <div className="lg:col-span-6 space-y-20">
              <div className="reveal">
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] mb-12 text-zinc-400">Education & Growth</h2>
                
                <div className="space-y-16">
                  <div>
                    <h3 className="text-[9px] font-bold uppercase tracking-widest text-zinc-600 mb-6">Academic Roots</h3>
                    <div className="bg-zinc-900/40 border border-zinc-800 p-8 md:p-12 transition-colors hover:border-zinc-700 group">
                      <h4 className="text-xl md:text-2xl font-bold uppercase tracking-tighter leading-tight mb-2 group-hover:text-blue-400 transition-colors">
                        {DELAS_INFO.education.degree}
                      </h4>
                      <p className="text-sm italic text-zinc-400 mb-6">{DELAS_INFO.education.school}</p>
                      <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600">{DELAS_INFO.education.date}</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[9px] font-bold uppercase tracking-widest text-zinc-600 mb-6">Continuous Growth</h3>
                    <ul className="space-y-4">
                      {DELAS_INFO.certifications.map((cert, idx) => (
                        <li key={idx} className="flex items-center gap-6 p-4 border border-zinc-900 bg-zinc-900/20 hover:bg-zinc-900/40 hover:border-zinc-700 transition-all reveal group" style={{ animationDelay: `${idx * 0.05}s` }}>
                          <span className="w-1 h-1 bg-zinc-600 rounded-full group-hover:bg-blue-400 transition-colors" />
                          <span className="text-xs md:text-sm font-light italic text-zinc-300 group-hover:text-blue-400 transition-colors">{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="reveal">
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] mb-12 text-zinc-400">Core Expertise</h2>
                
                <div className="space-y-16">
                  <div>
                    <h3 className="text-[9px] font-bold uppercase tracking-widest text-zinc-600 mb-8 border-b border-zinc-800 pb-4 w-48">Creative Strategy</h3>
                    <ul className="space-y-5">
                      {DELAS_INFO.skills.creatives.map((skill, idx) => (
                        <li key={idx} className="text-sm font-light text-zinc-300 hover:text-white transition-colors cursor-default">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-[9px] font-bold uppercase tracking-widest text-zinc-600 mb-8 border-b border-zinc-800 pb-4 w-48">Creative Suite</h3>
                    <ul className="space-y-5">
                      {DELAS_INFO.skills.software.map((skill, idx) => (
                        <li key={idx} className="text-sm font-light text-zinc-300 hover:text-white transition-colors cursor-default">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Connect (Footer) Section */}
      <footer id="contact" className="py-32 md:py-64 text-center scroll-mt-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-5xl md:text-9xl font-light mb-12 md:mb-20 italic tracking-tighter leading-none">
            Directing <br /><span className="font-black not-italic text-black opacity-100">Experiences</span>
          </div>
          <a href={`mailto:${DELAS_INFO.email}`} className="text-2xl md:text-5xl font-light border-b-2 border-slate-100 pb-4 hover:border-blue-600 transition-all text-blue-600 break-all active:opacity-50">{DELAS_INFO.email}</a>
          <div className="mt-24 md:mt-40 flex flex-wrap justify-center gap-12 md:gap-16 text-[10px] font-black uppercase tracking-[0.4em] opacity-30">
             <a href={`https://${DELAS_INFO.linkedin}`} target="_blank" rel="noreferrer" className="hover:text-blue-600">LinkedIn</a>
             <button onClick={() => setIsLoginOpen(true)} className="hover:text-blue-600">CLIENT PORTAL</button>
             <a href="https://cdn.prod.website-files.com/5ffb5d0601b4d62ce7b1f115/68d45efce263b32befc7b2c2_7c22a50c26cd17b57ad6ab043ac1c236_Delas_Raiford_Jr.pdf" target="_blank" className="hover:text-blue-600">Resume PDF</a>
          </div>
        </div>
      </footer>

      {/* Client Portal Overlay */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-md flex items-center justify-center p-8 animate-in fade-in duration-300">
          <div className="max-w-md w-full bg-white p-12 shadow-2xl reveal relative">
            <div className="text-center mb-12">
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4">Secure Gateway</div>
              <h2 className="text-4xl font-light italic text-slate-900 leading-none">Client Portal</h2>
            </div>
            
            <form className="space-y-8" onSubmit={handlePortalSubmit}>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Project Identifier</label>
                <input 
                  type="text" 
                  placeholder="e.g. SLRA-2025-X" 
                  className="w-full bg-slate-50 border border-slate-200 p-4 text-sm font-mono focus:outline-none focus:border-blue-600 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Access Key</label>
                <input 
                  type="password" 
                  placeholder="••••••••••••" 
                  className="w-full bg-slate-50 border border-slate-200 p-4 text-sm font-mono focus:outline-none focus:border-blue-600 transition-colors"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-6 bg-black text-white text-[10px] font-black uppercase tracking-[0.4em] hover:bg-slate-800 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                {isLoggingIn ? (
                  <>
                    <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    Verifying...
                  </>
                ) : "Request Entry"}
              </button>
            </form>

            <button 
              onClick={() => setIsLoginOpen(false)}
              className="mt-12 w-full text-center text-[9px] font-bold uppercase tracking-widest text-slate-300 hover:text-slate-900 transition-colors"
            >
              Exit Portal [ESC]
            </button>
          </div>
        </div>
      )}

      {/* Expanded Modal with Swipe Gestures */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center bg-white/95 backdrop-blur-sm p-8 touch-none" 
          onClick={() => setSelectedItem(null)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="max-w-7xl w-full flex flex-col md:flex-row items-center gap-16 text-black" onClick={e => e.stopPropagation()}>
            <div className="w-full md:w-2/3 h-[50vh] md:h-auto select-none pointer-events-none md:pointer-events-auto">
              {selectedItem.videoUrl ? (
                <div className="w-full aspect-video rounded-lg shadow-2xl overflow-hidden bg-black pointer-events-auto">
                  <iframe 
                    src={getYouTubeEmbedUrl(selectedItem.videoUrl)} 
                    className="w-full h-full" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen 
                  />
                </div>
              ) : (
                <img src={selectedItem.image} alt={selectedItem.title} className="w-full h-full object-contain drop-shadow-2xl" />
              )}
            </div>
            <div className="w-full md:w-1/3 space-y-8 text-left">
              <div className="text-[10px] font-mono text-slate-400">[{selectedItem.category}] — ARC-{selectedItem.year}</div>
              <h2 className="text-4xl md:text-6xl font-light italic leading-none">{selectedItem.title}</h2>
              <p className="opacity-60 italic leading-relaxed font-light"></p>
              
              <div className="flex flex-wrap gap-6 items-center">
                <button onClick={() => setSelectedItem(null)} className="text-[10px] font-black uppercase tracking-widest border-b-2 border-black pb-1 hover:border-blue-600 active:scale-95 transition-all">Close Archive</button>
                <div className="flex gap-4">
                  <button onClick={handlePrev} className="text-[10px] font-black uppercase tracking-widest border-b-2 border-black pb-1 hover:border-blue-600 active:scale-95 transition-all">Back</button>
                  <button onClick={handleNext} className="text-[10px] font-black uppercase tracking-widest border-b-2 border-black pb-1 hover:border-blue-600 active:scale-95 transition-all">Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemePreview;