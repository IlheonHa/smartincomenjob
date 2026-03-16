
import React from 'react';
import { Link } from 'react-router-dom';
import { TargetCard, FaqItem } from '../types';

const LOGO_URL = "https://phinf.pstatic.net/contact/20260212_7/1770905359889kYONe_PNG/image.png?type=s160";

const Home: React.FC = () => {
  const targets: TargetCard[] = [
    { title: "직장인 N잡러", description: "퇴근 후 1시간, AI 시스템이 당신 대신 고객을 분석하고 리드를 수집합니다. 2026년 가장 스마트한 부업입니다.", benefit: "안정적인 추가 파이프라인", icon: "💎" },
    { title: "소상공인", description: "매장의 기존 고객 데이터를 금융 수익으로 연결하세요. 추가 비용 없이 사업의 가치를 극대화합니다.", benefit: "사업 리스크 제로 확장", icon: "⚡" },
    { title: "주부/경단녀", description: "장소와 시간에 구애받지 않고 스마트폰 하나로 시작하세요. 2026년형 유연한 전문직 활동을 보장합니다.", benefit: "자유로운 시간 활용", icon: "🌿" },
    { title: "영업 전문가", description: "지인 영업의 피로감을 버리세요. AI가 선별한 고품질 데이터로 압도적인 성과를 만들어냅니다.", benefit: "생산성 초 극대화", icon: "🚀" },
  ];

  const faqs: FaqItem[] = [
    { 
      question: "2026년 현재, 보험 지식이 전혀 없어도 수익이 가능한가요?", 
      answer: "네, 스마트 인컴의 2026년형 AI SalesOps Hub가 고객 데이터를 분석하고 최적의 제안서를 자동 생성합니다. N잡러님은 시스템 가이드를 따라 소통만 하시면 되며, 기초부터 실전까지 모든 교육(온,오프라인)이 제공됩니다." 
    },
    { 
      question: "정말로 초기 비용이 0원인가요?", 
      answer: "그렇습니다. 사업시작을 위한 초기비용은 없습니다. 다만, 상위 1% 전문가교육, 시스템 이용료는 발생할 수있습니다. N잡러님의 성공이 곧 플랫폼의 수익이 되는 상생 구조로 설계되었습니다." 
    },
    { 
      question: "영업 경험이 없는데 비대면으로도 성과가 나나요?", 
      answer: "스마트 인컴은 '비대면 자동화'에 최적화된 최신 솔루션입니다. 시스템이 자동으로 잠재 고객의 관심을 유도하고 수집되므로, 정해진 매뉴얼대로 진행하기만 하면 됩니다." 
    },
    { 
      question: "2026년 N잡러 활동의 혜택은 무엇인가요?", 
      answer: "현재 지원하시는 선착순 N잡러분들께는 AI 콘텐츠 자동 생성 툴 무상 이용권과 1:1 온보딩 컨설팅 서비스를 한정 혜택으로 제공합니다." 
    },
  ];

  const scrollToAnalysis = () => {
    document.getElementById('system-analysis')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#FDFDFD]">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-12 pb-20 md:pt-16 md:pb-32 px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-3/4 h-full bg-gradient-to-bl from-brand-navy/5 via-transparent to-transparent -z-10 rounded-bl-[40%]"></div>
        <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-brand-green/5 blur-[150px] rounded-full animate-pulse-soft"></div>
        
        <div className="responsive-container grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 md:space-y-12 text-center lg:text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-3 bg-white px-5 py-2 rounded-full shadow-lg shadow-brand-navy/5 border border-slate-100">
                <span className="flex h-2.5 w-2.5 rounded-full bg-brand-green animate-ping"></span>
                <span className="text-[11px] md:text-[13px] font-black text-brand-navy tracking-tight uppercase">2026 Insurance Business Innovation</span>
              </div>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 md:gap-3">
                {['초기비용 0원', '출퇴근 없음', 'AI 자동화', '다중수익'].map((text) => (
                  <span key={text} className="px-3 py-1 md:px-4 md:py-1.5 bg-brand-navy/5 text-brand-navy text-[10px] md:text-xs font-black rounded-lg border border-brand-navy/10">
                    {text}
                  </span>
                ))}
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-[900] text-brand-navy leading-[1.1] tracking-tighter">
              전문지식 없어도<br />
              AI가 다해주는<br />
              <span className="text-gradient">자동화 시스템</span>
            </h1>
            
            <p className="hero-p text-lg md:text-2xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
              초기비용 0원 · 출퇴근 없음 · AI 자동화 · 다중수익<br />
              2026년, 영업의 판도가 바뀝니다.<br />
              <span className="text-brand-navy font-black">Smart Income</span>이<br />
              당신의시간을<br />
              수익으로 바꿉니다.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-5 pt-4 relative z-20">
              <Link to="/apply" className="w-full sm:w-auto btn-navy text-white px-8 py-4 md:px-12 md:py-6 rounded-2xl text-[16px] md:text-[18px] font-black tracking-tight shadow-2xl shadow-brand-navy/30 hover:shadow-brand-navy/40 active:scale-[0.98] transition-all flex items-center justify-center space-x-3 group cursor-pointer">
                <span>N잡러 지원하기</span>
                <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
              </Link>
              <button 
                onClick={scrollToAnalysis}
                className="w-full sm:w-auto bg-white text-slate-700 border border-slate-200 px-8 py-4 md:px-10 md:py-6 rounded-2xl text-[16px] md:text-[18px] font-bold hover:bg-slate-50 transition-all shadow-sm active:scale-[0.98]"
              >
                자동화 수익 시스템 분석
              </button>
            </div>
          </div>
          
          <div className="relative">
            {/* Visual with Dashboard Aesthetics */}
            <div className="relative z-10 animate-float">
               <div className="bg-white p-12 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,42,91,0.12)] border border-slate-50 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-10">
                    <img src={LOGO_URL} alt="Smart Income Dashboard" className="h-8 opacity-20 grayscale" />
                  </div>
                  <div className="space-y-10">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-[11px] font-black text-brand-green tracking-[0.3em] uppercase mb-2">2026 AI Solution Active</h4>
                        <div className="text-3xl md:text-5xl font-[900] text-brand-navy tracking-tighter">₩18,240,000</div>
                        <p className="text-xs text-slate-400 font-bold mt-2">이달의 시스템 기반 Top 수익 N잡러</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                        <div className="text-[10px] font-black text-slate-400 uppercase mb-1">AI 블로그 포스팅</div>
                        <div className="text-xs font-black text-brand-navy">3,240건 완료</div>
                      </div>
                      <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                        <div className="text-[10px] font-black text-slate-400 uppercase mb-1">AI 분석기초설계</div>
                        <div className="text-xs font-black text-brand-navy">1,058건 처리</div>
                      </div>
                    </div>

                    <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                       <div className="flex -space-x-3">
                          {[1,2,3,4].map(i => (
                            <div key={i} className={`w-10 h-10 rounded-full border-4 border-white bg-slate-200`}></div>
                          ))}
                          <div className="w-10 h-10 rounded-full border-4 border-white bg-brand-navy flex items-center justify-center text-[10px] text-white font-black">+3.2k</div>
                       </div>
                       <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Active N-Jobbers (2026)</div>
                    </div>
                  </div>
               </div>
               {/* Floating Card */}
               <div className="absolute -bottom-10 -right-10 bg-brand-navy text-white p-10 rounded-5xl shadow-2xl hidden md:block border border-white/5">
                  <div className="text-brand-green font-black text-xs uppercase tracking-[0.2em] mb-4">2026 AI Success Rate</div>
                  <div className="text-3xl font-black mb-1">99.8%</div>
                  <div className="text-[10px] text-slate-400 font-bold">Accuracy in design matching</div>
               </div>
            </div>
            
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-brand-green/5 rounded-full blur-[120px] -z-10"></div>
          </div>
        </div>
      </section>

      {/* DB Purchase vs AI Content Section */}
      <section className="py-20 md:py-32 px-6 bg-brand-navy relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-green/10 blur-[120px] rounded-full -z-0"></div>
        <div className="responsive-container relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-10">
            <div className="inline-block bg-brand-green text-white px-6 py-2 rounded-full text-sm font-black tracking-widest uppercase mb-4">
              Marketing Innovation 2026
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-[900] text-white leading-[1.1] tracking-tighter">
              광고비 0원으로<br />
              <span className="text-brand-green">고객이 찾아오는 시스템</span>
            </h2>
            <div className="space-y-6 max-w-3xl mx-auto">
              <p className="text-xl md:text-3xl text-slate-300 font-bold leading-tight">
                아직도 쓸모없는 DB를 <br className="hidden sm:block" /> 
                <span className="text-white underline decoration-brand-green decoration-4 underline-offset-8">6~15만원에 구입하시나요?</span>
              </p>
              <p className="text-lg md:text-2xl text-brand-green font-black">
                지금은 나만의 콘텐츠로<br className="hidden sm:block" /> 
                온라인 영업사원을 만들 때입니다.
              </p>
            </div>
            <div className="pt-8">
              <Link to="/apply" className="inline-flex items-center space-x-4 bg-white text-brand-navy px-10 py-5 rounded-2xl font-black text-lg hover:bg-brand-green hover:text-white transition-all shadow-2xl shadow-black/20 active:scale-95">
                <span>N잡러 지원하기</span>
                <span className="text-xl">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* New Core Values Section */}
      <section id="system-analysis" className="py-20 md:py-32 px-6 bg-white">
        <div className="responsive-container">
          <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20 space-y-6">
            <h2 className="text-[13px] font-black text-brand-green uppercase tracking-[0.3em]">Smart Income Philosophy</h2>
            <h3 className="text-3xl md:text-5xl font-[900] text-brand-navy tracking-tighter leading-tight">
              Smart Income이<br />
              당신의시간을<br />
              <span className="text-gradient">수익으로 바꿉니다</span>
            </h3>
            <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed">
              기존의 노동 집약적 사업과는 차원이 다릅니다. <br />
              AI 기술력이 집약된 시스템을 통해 리스크는 최소화하고 <br />
              수익은 극대화하는 압도적인 비즈니스 모델을 경험하세요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: "💸", title: "초기비용 0원", desc: "자본금 걱정 없이 즉시 시작 가능한 비즈니스" },
              { icon: "🏠", title: "출퇴근 없음", desc: "전국 어디서나 원하는 시간에 자유로운 활동" },
              { icon: "🤖", title: "AI 자동화 영업", desc: "잠자는 동안에도 AI가 블로그와 SNS를 통해 고객을 모으고 상담을 예약합니다." },
              { icon: "💰", title: "다중 수익 구조", desc: "단순 판매를 넘어 AI 시스템 대여, 콘텐츠 수익 등 입체적인 소득 창구가 열립니다." },
              { icon: "💎", title: "평생 디지털 자산", desc: "구축된 블로그, SNS, DB는 시간이 지날수록 가치가 상승하는 당신만의 평생 자산이 됩니다." }
            ].map((item, i) => (
              <div key={i} className={`bg-slate-50 p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-300 ${i === 2 ? 'lg:col-span-1' : ''}`}>
                <div className="text-3xl md:text-4xl mb-5 md:mb-6">{item.icon}</div>
                <h4 className="text-xl md:text-2xl font-black text-brand-navy mb-3 md:mb-4">{item.title}</h4>
                <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Modules Section */}
      <section className="py-20 md:py-32 px-6 bg-slate-50/30 overflow-hidden">
        <div className="responsive-container">
          <div className="max-w-4xl mb-16 md:mb-24 text-center mx-auto space-y-6">
            <h2 className="text-[13px] font-black text-brand-green uppercase tracking-[0.3em]">Core Technology</h2>
            <h3 className="text-3xl md:text-5xl font-[900] text-brand-navy tracking-tighter leading-[1.2]">
              강력한 4대 핵심 모듈
            </h3>
            <p className="text-base md:text-xl text-slate-500 font-medium leading-relaxed">
              각 분야의 최고 전문가들이 설계한 AI 엔진이<br className="hidden md:block" />
              당신의 비즈니스를 24시간 쉬지 않고 가동시킵니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {[
              { 
                icon: "✨", 
                title: "Golden System", 
                desc: "상위 1% 전문가의 수익 자동화 비법, 황금키워드 기반 블로그, Threads, Shorts & Reels, 자동이웃신청 등 혁신적인 콘텐츠를 AI가 무한으로 자동생성합니다.",
                tags: ["수익 자동화", "혁신 콘텐츠"]
              },
              { 
                icon: "🎯", 
                title: "스마트 고객 수집", 
                desc: "타겟팅된 잠재 고객 데이터를 AI 시스템이 자동으로 수집하고 분류하여 리드를 확보합니다.",
                tags: ["리드 수집", "타겟 분석"]
              },
              { 
                icon: "📝", 
                title: "AI 수익형 콘텐츠 생성", 
                desc: "블로그, SNS 등 수익에 최적화된 고품질 콘텐츠를 AI가 자동으로 생성합니다.",
                tags: ["자동 생성", "수익 최적화"]
              },
              { 
                icon: "📊", 
                title: "AI 보험분석 설계", 
                desc: "복잡한 보험 데이터를 AI가 정밀 분석하여 최적의 맞춤형 설계를 제안합니다.(PDF 파일입력 -> 정밀분석 / 개인정보입력 -> 맞춤설계)",
                tags: ["정밀 분석", "맞춤형 설계"]
              }
            ].map((module, i) => (
              <div key={i} className="bg-white p-8 md:p-12 rounded-[3rem] md:rounded-[4rem] border border-slate-100 relative group overflow-hidden hover:shadow-2xl transition-all duration-500">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-navy/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative z-10 space-y-6">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-brand-navy rounded-2xl md:rounded-3xl flex items-center justify-center text-2xl md:text-3xl shadow-lg shadow-brand-navy/10">
                    {module.icon}
                  </div>
                  <h4 className="text-2xl md:text-3xl font-black text-brand-navy">{module.title}</h4>
                  <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed">
                    {module.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {module.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-slate-50 text-slate-400 text-[10px] md:text-xs font-black rounded-lg border border-slate-100 uppercase tracking-widest">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support & Mentorship Section */}
      <section className="py-20 md:py-32 px-6 bg-white relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl"></div>
        <div className="responsive-container relative z-10">
          <div className="bg-brand-navy rounded-[3rem] md:rounded-[5rem] p-10 md:p-24 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-green/10 to-transparent"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 md:space-y-12">
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-6xl font-[900] leading-[1.1] tracking-tighter">
                    경험, 지식이 없다고<br />
                    <span className="text-brand-green">두려워하지 마세요.</span>
                  </h2>
                  <p className="text-lg md:text-2xl text-slate-300 font-medium leading-relaxed">
                    스마트 인컴은 당신의 시작을 혼자 두지 않습니다.<br className="hidden md:block" />
                    전문가 그룹이 당신의 성공을 위해 모든 노하우를 쏟아붓습니다.
                  </p>
                </div>

                <div className="space-y-8">
                  <div className="flex items-center space-x-6 group">
                    <div className="w-14 h-14 md:w-20 md:h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl md:text-4xl group-hover:bg-brand-green transition-colors duration-500">
                      🎓
                    </div>
                    <div>
                      <h4 className="text-xl md:text-2xl font-black mb-2">1:1 밀착 컨설팅 & 교육</h4>
                      <p className="text-slate-400 font-medium text-sm md:text-lg">기초 이론부터 실전 활용까지 전문가가 직접 가이드합니다.</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 group">
                    <div className="w-14 h-14 md:w-20 md:h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl md:text-4xl group-hover:bg-brand-green transition-colors duration-500">
                      🔑
                    </div>
                    <div>
                      <h4 className="text-xl md:text-2xl font-black mb-2">상위 1% 수익 자동화 비법</h4>
                      <p className="text-slate-400 font-medium text-sm md:text-lg">검증된 전문가들의 황금 키워드와 운영 전략을 그대로 공유합니다.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white/5 p-8 md:p-12 rounded-[3rem] border border-white/10 backdrop-blur-sm space-y-8">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-brand-green uppercase tracking-[0.3em]">Mentorship Program</span>
                    <div className="flex -space-x-2">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-brand-navy bg-slate-700"></div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-green w-[85%]"></div>
                    </div>
                    <div className="flex justify-between text-[11px] font-bold text-slate-400">
                      <span>초보자 적응률</span>
                      <span className="text-white">85% UP</span>
                    </div>
                  </div>
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/5 italic text-slate-300 text-sm md:text-base leading-relaxed">
                    "컴퓨터를 잘 몰라도, 영업을 해본 적 없어도 괜찮습니다. 시스템이 90%를 하고, 나머지 10%는 저희가 채워드립니다."
                  </div>
                  <Link to="/apply" className="block w-full text-center bg-brand-green text-white py-5 rounded-2xl font-black text-lg hover:shadow-2xl hover:shadow-brand-green/20 transition-all">
                    전문가 컨설팅 신청하기
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Targets Section */}
      <section className="py-20 md:py-32 px-6 bg-slate-50/50">
        <div className="responsive-container">
          <div className="text-center mb-16 md:mb-24 space-y-4">
            <h2 className="text-[13px] font-black text-brand-green uppercase tracking-[0.3em]">2026 Recruiting Targets</h2>
            <h3 className="text-3xl md:text-5xl font-[900] text-brand-navy tracking-tighter">보험 영업의 미래,<br />당신의 차례입니다.</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {targets.map((target, idx) => (
              <div key={idx} className="bg-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_20px_40px_-12px_rgba(0,42,91,0.06)] hover:translate-y-[-10px] transition-all duration-300 group border border-slate-50 flex flex-col h-full">
                <div className="text-4xl md:text-5xl mb-8 md:mb-10 group-hover:scale-110 transition-transform origin-left">{target.icon}</div>
                <h4 className="text-xl md:text-2xl font-black text-brand-navy mb-4 md:mb-5">{target.title}</h4>
                <p className="text-slate-500 font-medium leading-relaxed mb-8 md:mb-10 text-sm md:text-[15px] flex-grow">{target.description}</p>
                <div className="pt-6 border-t border-slate-50">
                  <span className="text-brand-green font-black text-[10px] md:text-xs uppercase tracking-widest">{target.benefit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-40 bg-brand-navy text-white px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-green/15 to-transparent"></div>
        <div className="responsive-container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-16">
            <h2 className="text-4xl md:text-6xl font-[900] leading-[1.1] tracking-tighter">
              2026년형<br />
              <span className="text-brand-green">수익 자동화 솔루션.</span>
            </h2>
            
            <div className="space-y-12">
               {[
                 { title: "Smart Lead Discovery", desc: "AI가 소셜 빅데이터를 분석하여 상품 니즈가 가장 높은 가망 고객을 정밀 타겟팅합니다." },
                 { title: "Auto Content Engine", desc: "트렌드에 맞는 홍보 콘텐츠를 버튼 하나로 자동 생성하여 노출 효율을 극대화합니다." },
                 { title: "One-Click Proposal", desc: "고객 맞춤형 제안서를 1초 만에 자동 생성하여 전문적인 상담을 지원합니다." }
               ].map((item, i) => (
                 <div key={i} className="flex items-start space-x-8">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-brand-green text-xl flex-shrink-0">0{i+1}</div>
                    <div className="space-y-3">
                      <h4 className="text-2xl font-black">{item.title}</h4>
                      <p className="text-slate-400 font-medium text-lg leading-relaxed">{item.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
            
            <Link to="/apply" className="inline-block bg-brand-green text-white px-10 py-5 rounded-2xl font-black text-lg hover:shadow-2xl hover:shadow-brand-green/30 active:scale-95 transition-all">
               지금 바로 N잡러 합류하기
            </Link>
          </div>
          
          <div className="relative hidden lg:block">
             <div className="bg-white/5 rounded-6xl p-16 border border-white/10 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-12">
                  <h5 className="text-sm font-black text-brand-blue tracking-[0.3em] uppercase">2026 System Efficiency</h5>
                  <div className="px-3 py-1 rounded-full bg-brand-green/20 text-brand-green text-[10px] font-black animate-pulse">OPTIMIZED 2026</div>
                </div>
                
                <div className="space-y-10">
                   {[
                     { label: "AI Match Rate", value: 99.8 },
                     { label: "Lead Conversion", value: 84.2 },
                     { label: "N-Jobber Satisfaction", value: 99.9 }
                   ].map((data, i) => (
                     <div key={i} className="space-y-4">
                        <div className="flex justify-between text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                          <span>{data.label}</span>
                          <span className="text-white">{data.value}%</span>
                        </div>
                        <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-brand-green transition-all duration-1000" style={{ width: `${data.value}%` }}></div>
                        </div>
                     </div>
                   ))}
                </div>
                
                <div className="mt-16 pt-12 border-t border-white/10 flex items-center justify-around text-center">
                   <div>
                     <div className="text-3xl font-[900] text-white">₩2,400B+</div>
                     <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-2">Annualized Volume</p>
                   </div>
                   <div className="w-[1px] h-12 bg-white/10 mx-4"></div>
                   <div>
                     <div className="text-3xl font-[900] text-brand-green">14.8%</div>
                     <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-2">Conversion Lift</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Review Section */}
      <section className="py-24 md:py-40 px-6 bg-slate-50/50">
        <div className="responsive-container">
          <div className="text-center mb-16 md:mb-24 space-y-4">
            <h2 className="text-[13px] font-black text-brand-green uppercase tracking-[0.3em]">Success Stories</h2>
            <h3 className="text-3xl md:text-6xl font-[900] text-brand-navy tracking-tighter">Review</h3>
            <p className="text-lg md:text-2xl text-slate-500 font-bold">먼저 경험한 설계사님들의 후기</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
            {[
              {
                stars: "★★★★★",
                content: "매달 DB구입비로 200만원 넘게 썼는데, 스마트 인컴 사용 후 블로그에서 월 7건 문의가 들어오기 시작했어요. 신세계입니다.",
                author: "6년차 보험 FC, 이○○"
              },
              {
                stars: "★★★★★",
                content: "AI로 콘텐츠 만드는 게 이렇게 쉬울 줄 몰랐어요. 훌륭한 글과 사진이 만들어지는데 5분도 안걸려서 깜짝 놀랐어요.",
                author: "3년차 보험 FC, 송○○"
              }
            ].map((review, i) => (
              <div key={i} className="bg-white p-10 md:p-16 rounded-[3rem] md:rounded-[4rem] shadow-[0_30px_60px_-15px_rgba(0,42,91,0.05)] border border-slate-100 flex flex-col space-y-8 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-2 h-full bg-brand-green opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="text-brand-green text-xl md:text-2xl tracking-widest">{review.stars}</div>
                <p className="text-xl md:text-3xl font-black text-brand-navy leading-tight md:leading-snug">
                  "{review.content}"
                </p>
                <div className="pt-6 border-t border-slate-50">
                  <span className="text-slate-400 font-bold text-sm md:text-lg">— {review.author}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 md:py-40 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 md:mb-24 space-y-4">
            <h2 className="text-[13px] font-black text-brand-blue uppercase tracking-[0.3em]">Support Center</h2>
            <h3 className="text-3xl md:text-6xl font-[900] text-brand-navy tracking-tighter">자주 묻는 질문</h3>
          </div>
          
          <div className="space-y-4 md:space-y-6">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group bg-slate-50/50 rounded-[2rem] md:rounded-4xl border border-slate-100 p-6 md:p-10 open:bg-white open:shadow-[0_40px_80px_-20px_rgba(0,42,91,0.08)] transition-all">
                <summary className="list-none flex justify-between items-center cursor-pointer font-black text-base md:text-2xl text-brand-navy pr-2 md:pr-4">
                  {faq.question}
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-slate-200 flex items-center justify-center group-open:bg-brand-navy group-open:text-white transition-all">
                    <span className="group-open:rotate-180 transition-transform text-[10px] md:text-sm">▼</span>
                  </div>
                </summary>
                <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-slate-100 text-slate-500 leading-relaxed text-sm md:text-lg font-medium">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-40 px-6 relative overflow-hidden bg-brand-navy text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent opacity-40 -z-10"></div>
        <div className="max-w-5xl mx-auto space-y-12 md:space-y-16">
          <img src={LOGO_URL} alt="Smart Income Final" className="h-10 md:h-12 w-auto mx-auto brightness-0 invert opacity-40 mb-8 md:mb-12" />
          <h2 className="text-3xl md:text-7xl font-[900] text-white leading-tight tracking-tighter">
            당신의 수익을<br />
            <span className="text-brand-green">완전 자동화 하세요.</span>
          </h2>
          <p className="text-base md:text-2xl text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed">
            지금 지원하시면 선착순으로<br />
            <span className="text-white font-black underline decoration-brand-green decoration-8 underline-offset-8">무상 온보딩 마스터 클래스</span>를 제공합니다.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6 md:pt-10">
            <Link to="/apply" className="w-full sm:w-auto bg-brand-green text-white px-10 py-6 md:px-20 md:py-8 rounded-[2rem] md:rounded-[2.5rem] text-xl md:text-[24px] font-[900] tracking-tight shadow-2xl shadow-brand-green/30 hover:shadow-brand-green/60 active:scale-95 transition-all">
              지금 바로 N잡러 지원하기
            </Link>
          </div>
          
          <p className="text-slate-500 text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] pt-8 md:pt-12">
            2026 Recruitment • AI Future Driven • 24/7 Automation
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
