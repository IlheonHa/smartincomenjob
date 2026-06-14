
import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';

// Critical pages - direct import for faster initial load
import Home from './pages/Home';
import Apply from './pages/Apply';

// Secondary pages - keep lazy loading to reduce initial bundle size
const Success = lazy(() => import('./pages/Success'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Admin = lazy(() => import('./pages/Admin'));

const LOGO_URL = "https://phinf.pstatic.net/contact/20260212_7/1770905359889kYONe_PNG/image.png?type=s160";

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass border-b border-slate-100">
      <div className="responsive-container h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center group">
          <img 
            src={LOGO_URL} 
            alt="Smart Income Logo" 
            className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
          />
        </Link>
        
        <nav className="hidden lg:flex items-center space-x-12 text-[15px] font-bold text-slate-600">
          <Link to="/" className="hover:text-brand-navy transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-brand-green hover:after:w-full after:transition-all">시스템 소개</Link>
          <Link to="/" className="hover:text-brand-navy transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-brand-green hover:after:w-full after:transition-all">수익 모델</Link>
          <Link to="/admin" className="hover:text-brand-navy transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-brand-green hover:after:w-full after:transition-all">회원관리</Link>
          <Link to="/privacy" className="hover:text-brand-navy transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-brand-green hover:after:w-full after:transition-all">개인정보정책</Link>
        </nav>
        
        <div className="flex items-center space-x-4 md:space-x-8">
          <Link to="/apply" className="btn-navy px-6 py-2.5 md:py-3.5 rounded-xl text-[14px] font-black shadow-lg shadow-brand-navy/10 active:scale-95 whitespace-nowrap">
            N잡러 지원하기
          </Link>
        </div>
      </div>
    </header>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-[#040911] text-slate-400 py-16 md:py-24 px-6 border-t border-white/5">
    <div className="responsive-container">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 mb-16 md:mb-20">
        <div className="lg:col-span-5 space-y-6 md:space-y-8">
          <img src={LOGO_URL} alt="Smart Income White" className="h-8 md:h-10 w-auto brightness-0 invert opacity-90" />
          <p className="text-base md:text-lg leading-relaxed max-w-md font-medium text-slate-300">
            영업의 패러다임을 기술로 혁신합니다.<br />
            2026년, 당신의 시간을 디지털 자산으로 만드는<br /> 
            <span className="text-brand-green font-bold">Smart Income</span> N잡러 활동을 시작하세요.
          </p>
          <div className="flex space-x-4 md:space-x-5">
             {['Blog', 'Insta', 'YouTube'].map(social => (
               <div key={social} className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-green hover:text-white transition-all cursor-pointer text-[10px] md:text-[11px] font-bold">
                 {social[0]}
               </div>
             ))}
          </div>
        </div>
        
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10 md:gap-12">
          <div>
            <h4 className="text-white font-black text-[10px] md:text-xs uppercase tracking-widest mb-6 md:mb-8">Service</h4>
            <ul className="space-y-3 md:space-y-4 text-xs md:text-sm font-medium">
              <li><Link to="/" className="hover:text-brand-green transition-colors">시스템 가이드</Link></li>
              <li><Link to="/apply" className="hover:text-brand-green transition-colors">2026 N잡러 활동</Link></li>
              <li><Link to="/" className="hover:text-brand-green transition-colors">수익 시뮬레이터</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black text-[10px] md:text-xs uppercase tracking-widest mb-6 md:mb-8">Support</h4>
            <ul className="space-y-3 md:space-y-4 text-xs md:text-sm font-medium">
              <li><Link to="/privacy" className="hover:text-brand-green transition-colors">개인정보처리방침</Link></li>
              <li><Link to="/admin" className="hover:text-brand-green transition-colors">회원관리(관리자)</Link></li>
              <li><span className="hover:text-brand-green transition-colors cursor-pointer">이용약관</span></li>
              <li><span className="hover:text-brand-green transition-colors cursor-pointer">공지사항</span></li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-white font-black text-[10px] md:text-xs uppercase tracking-widest mb-6 md:mb-8">Contact</h4>
            <div className="space-y-2">
              <p className="text-base md:text-lg font-black text-white">010-3214-9333</p>
              <p className="text-[11px] md:text-xs">이메일: newtechkim@naver.com</p>
              <p className="text-[11px] md:text-xs">상담가능: AM 10:00 - PM 18:00</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-10 md:pt-12 border-t border-white/5 space-y-6 md:space-y-8">
        <div className="bg-white/5 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/5 text-[11px] md:text-[12px] leading-relaxed text-slate-500">
          <p className="mb-2"><strong>스마트인컴</strong> | 대표자: 김경조 | 사업자등록번호: 231-12-03021</p>
          <p className="mb-1">※ 본 플랫폼은 보험 모집을 지원하는 2026년형 테크 기반 수익 솔루션입니다. 공식 설계사 활동은 법정 자격 요건을 갖추어야 합니다.</p>
          <p>※ 수익 고지: 모든 수익은 개인의 활동량과 시장 상황에 따라 상이하며 특정 금액을 무조건적으로 보장하지 않습니다.</p>
        </div>
        <p className="text-center text-[10px] font-black tracking-[0.3em] text-slate-600 uppercase">
          &copy; 2026 Smart Income Automation System. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.body.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  React.useEffect(() => {
    // Remove initial loader after mount
    const loader = document.getElementById('initial-loader');
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => {
        if (loader.parentNode) {
          loader.remove();
        }
      }, 300);
    }
  }, []);

  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-20 overflow-x-hidden">
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="w-12 h-12 border-4 border-brand-navy border-t-brand-green rounded-full animate-spin"></div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/apply" element={<Apply />} />
              <Route path="/success" element={<Success />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        
        {/* Mobile Sticky CTA */}
        <div className="md:hidden fixed bottom-6 left-6 right-6 z-[100]">
           <Link to="/apply" className="block w-full btn-green text-white text-center py-5 rounded-2xl font-black text-lg shadow-2xl shadow-brand-green/30 active:scale-95 transition-all cursor-pointer">
             N잡러 지원하기
           </Link>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
