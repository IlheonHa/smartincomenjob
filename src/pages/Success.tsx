import React from 'react';
import { Link } from 'react-router-dom';

const Success: React.FC = () => {
  return (
    <div className="responsive-container py-16 md:py-32 text-center min-h-[80vh] flex flex-col justify-center">
      <div className="w-20 h-20 md:w-24 md:h-24 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto mb-8 md:mb-10 animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 md:h-12 md:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <h1 className="text-2xl md:text-6xl font-[900] mb-6 text-brand-navy tracking-tighter leading-tight">N잡러 지원이<br />성공적으로 접수되었습니다!</h1>
      <p className="text-slate-500 mb-12 md:mb-16 text-base md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
        2026년 스마트 인컴 시스템과 함께할 N잡러님을 환영합니다.<br />
        검토 후 영업일 기준 24시간 내에 안내 연락을 드리겠습니다.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        {[
          { 
            label: "2026 N잡러 채팅방", 
            desc: "실시간 수익 팁과 동료 N잡러들의 2026년 성공 사례를 공유하세요.", 
            icon: "💬", 
            color: "bg-yellow-400",
            link: "https://open.kakao.com/o/gcWwFggi"
          },
          { label: "설명회 사전 예약", desc: "2026년형 자동화 시스템 활용법을 상세히 알려드리는 세션입니다.", icon: "📅", color: "bg-brand-blue" },
          { label: "온보딩 가이드 2026", desc: "첫 수익 발생까지의 2026년 최신 로드맵을 미리 확인하세요.", icon: "📄", color: "bg-brand-navy" }
        ].map((item, i) => (
          <div 
            key={i} 
            onClick={() => item.link && window.open(item.link, '_blank')}
            className={`bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 hover:shadow-2xl transition-all group flex flex-col justify-between h-full ${item.link ? 'cursor-pointer' : 'cursor-default'}`}
          >
            <div>
              <div className={`w-10 h-10 md:w-12 md:h-12 ${item.color} rounded-xl md:rounded-2xl flex items-center justify-center text-lg md:text-xl mb-5 md:mb-6 shadow-lg`}>
                {item.icon}
              </div>
              <h3 className="font-black text-brand-navy text-lg md:text-xl mb-2 md:mb-3">{item.label}</h3>
              <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
            </div>
            <div className="mt-6 md:mt-8 text-[10px] md:text-[11px] font-black text-brand-green uppercase tracking-widest group-hover:translate-x-2 transition-all">Next Step 2026 →</div>
          </div>
        ))}
      </div>

      <div className="mt-20">
        <Link to="/" className="text-brand-navy font-black hover:text-brand-green transition-colors border-b-2 border-slate-100 pb-1 text-lg">메인 페이지로 돌아가기</Link>
      </div>
    </div>
  );
};

export default Success;