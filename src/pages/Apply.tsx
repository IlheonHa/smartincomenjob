import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const Apply: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  
  console.log('Apply component rendering, loading:', loading);

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    region: '',
    status: '직장인',
    interest: '보험/재무',
    time: '평일 저녁',
    intro: '',
    agreement: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent | React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    console.log('--- Submission Started ---');
    console.log('Form Data:', formData);
    setStatusMsg('제출을 시작합니다...');

    // 1. Basic Validation
    if (!formData.name || !formData.phone || !formData.email || !formData.password || !formData.region) {
      const msg = '모든 필수 항목(이름, 연락처, 이메일, 비밀번호, 지역)을 입력해 주세요.';
      console.log(msg);
      setStatusMsg(msg);
      alert(msg);
      return;
    }

    if (formData.password.length < 6) {
      const msg = '비밀번호는 6자리 이상 작성해야 합니다.';
      console.log(msg);
      setStatusMsg(msg);
      alert(msg);
      return;
    }

    if (!formData.agreement) {
      const msg = '개인정보 수집 및 이용에 동의해 주세요.';
      console.log(msg);
      setStatusMsg(msg);
      alert(msg);
      return;
    }

    setLoading(true);
    setStatusMsg('데이터를 서버로 전송 중입니다...');

    try {
      // 2. Prepare Data
      const insertData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        region: formData.region,
        status: formData.status,
        interest: formData.interest,
        time: formData.time,
        intro: formData.intro || ''
        // statusTag and appliedAt are handled by database defaults or omitted to avoid schema cache errors
      };

      console.log('Inserting data to Supabase...', insertData);

      // 3. Direct Insert
      const { error: insertError, status, statusText } = await supabase
        .from('applications')
        .insert([insertData]);

      console.log('Supabase response:', { status, statusText, insertError });

      if (insertError) {
        console.error('Supabase insert error:', insertError);
        const errorMsg = `저장 실패: ${insertError.message} (상태: ${status})`;
        setStatusMsg(errorMsg);
        throw new Error(errorMsg);
      }

      // 4. Success
      console.log('Submission successful');
      setStatusMsg('지원이 완료되었습니다!');
      alert('지원이 성공적으로 완료되었습니다! 감사합니다.');
      navigate('/success');
      
    } catch (error: any) {
      console.error('Submission catch block:', error);
      const catchMsg = `제출 중 오류가 발생했습니다: ${error.message}`;
      setStatusMsg(catchMsg);
      alert(catchMsg);
    } finally {
      setLoading(false);
      console.log('--- Submission Finished ---');
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-12 md:py-20 px-6 relative overflow-hidden">
      {/* Decorative BG */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-brand-navy/5 to-transparent -z-10"></div>
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-12 md:mb-16">
          <div className="inline-block bg-brand-green/10 text-brand-green px-4 py-1.5 rounded-full text-[10px] md:text-[11px] font-black tracking-widest uppercase">2026 N-Jobber Onboarding</div>
          <h1 className="text-2xl md:text-5xl font-[900] text-brand-navy tracking-tighter">N잡러 지원하기</h1>
          <p className="text-sm md:text-base text-slate-500 font-medium">자동화 수익 시스템으로 가는 2026년의 첫 발걸음입니다.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 md:p-16 rounded-[2rem] md:rounded-[4rem] shadow-[0_40px_80px_-20px_rgba(0,42,91,0.08)] border border-slate-100 space-y-10 md:space-y-12">
          
          <div className="space-y-8 md:space-y-10">
            <h3 className="text-xl md:text-2xl font-black text-brand-navy flex items-center space-x-3">
              <span className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-brand-navy text-white text-sm md:text-base flex items-center justify-center">1</span>
              <span>기본 정보</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-3">
                <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest">이름 (실명)</label>
                <input name="name" value={formData.name} onChange={handleChange} className="w-full px-6 py-4 md:py-5 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-brand-green/10 focus:border-brand-green outline-none transition-all font-bold text-slate-700" placeholder="홍길동" />
              </div>
              <div className="space-y-3">
                <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest">연락처</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-6 py-4 md:py-5 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-brand-green/10 focus:border-brand-green outline-none transition-all font-bold text-slate-700" placeholder="010-0000-0000" />
              </div>
              <div className="space-y-3">
                <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest">이메일 주소(시스템 아이디로 사용예정)</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-6 py-4 md:py-5 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-brand-green/10 focus:border-brand-green outline-none transition-all font-bold text-slate-700" placeholder="smartincome@gmail.com" />
                <p className="text-[14px] md:text-base font-black text-red-600 uppercase tracking-widest mt-2">
                  * 반드시 @gmail.com 이메일을 작성해주세요
                </p>
              </div>
              <div className="space-y-3">
                <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest">비밀번호</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-6 py-4 md:py-5 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-brand-green/10 focus:border-brand-green outline-none transition-all font-bold text-slate-700" placeholder="6자리 이상 입력" />
                <p className="text-[14px] md:text-base font-black text-red-600 uppercase tracking-widest mt-2">
                  * 비밀번호는 6자리 이상 작성해주세요
                </p>
              </div>
              <div className="space-y-3">
                <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest">활동 거주지역</label>
                <input name="region" value={formData.region} onChange={handleChange} className="w-full px-6 py-4 md:py-5 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-brand-green/10 focus:border-brand-green outline-none transition-all font-bold text-slate-700" placeholder="시/군/구 단위 입력" />
              </div>
            </div>
          </div>

          <div className="space-y-8 md:space-y-10">
            <h3 className="text-xl md:text-2xl font-black text-brand-navy flex items-center space-x-3">
              <span className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-brand-navy text-white text-sm md:text-base flex items-center justify-center">2</span>
              <span>2026 활동 희망 분야</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest">현재 직업 상태</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full px-6 py-4 md:py-5 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-4 focus:ring-brand-green/10 outline-none font-bold text-slate-700">
                  <option>직장인</option>
                  <option>자영업</option>
                  <option>주부</option>
                  <option>보험설계사</option>
                  <option>구직 중</option>
                  <option>기타</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest">가장 큰 관심 분야</label>
                <select name="interest" value={formData.interest} onChange={handleChange} className="w-full px-6 py-4 md:py-5 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-4 focus:ring-brand-green/10 outline-none font-bold text-slate-700">
                  <option>보험/재무 설계</option>
                  <option>디지털 마케팅</option>
                  <option>AI 도구 활용</option>
                  <option>기타</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest">활동 가능 시간</label>
                <select name="time" value={formData.time} onChange={handleChange} className="w-full px-6 py-4 md:py-5 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-4 focus:ring-brand-green/10 outline-none font-bold text-slate-700">
                  <option>상시 가능</option>
                  <option>평일 오후/저녁</option>
                  <option>주말 중심</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl md:text-2xl font-black text-brand-navy flex items-center space-x-3">
              <span className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-brand-navy text-white text-sm md:text-base flex items-center justify-center">3</span>
              <span>지원 동기 (선택)</span>
            </h3>
            <textarea name="intro" value={formData.intro} onChange={handleChange} className="w-full h-48 px-6 md:px-8 py-6 rounded-3xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-brand-green/10 focus:border-brand-green outline-none resize-none transition-all font-medium text-slate-600 leading-relaxed" placeholder="2026년, 시스템과 함께 이루고 싶은 목표를 적어주세요."></textarea>
          </div>

          <div className="pt-10 border-t border-slate-50">
            <div className="bg-slate-50/50 p-6 md:p-8 rounded-3xl border border-slate-100 mb-10 md:mb-12">
               <label className="flex items-start space-x-4 cursor-pointer group">
                  <input type="checkbox" name="agreement" checked={formData.agreement} onChange={handleChange} className="mt-1 w-6 h-6 rounded-lg text-brand-green border-slate-300 focus:ring-brand-green" />
                  <div className="space-y-1">
                    <p className="text-base font-bold text-brand-navy group-hover:text-brand-green transition-colors">개인정보 수집 및 이용 동의 (필수)</p>
                    <p className="text-[13px] text-slate-400 font-medium">2026년 N잡러 선발 및 상담 연락 목적으로 안전하게 처리됩니다.</p>
                  </div>
               </label>
            </div>

            {statusMsg && (
              <div className={`mb-6 p-4 rounded-2xl text-center font-bold text-sm ${
                statusMsg.includes('완료') ? 'bg-brand-green/10 text-brand-green' : 'bg-red-50 text-red-500'
              }`}>
                {statusMsg}
              </div>
            )}

            <button 
              disabled={loading} 
              type="button"
              onClick={handleSubmit}
              className={`w-full py-6 md:py-8 rounded-[2rem] font-[900] text-xl md:text-2xl text-white shadow-2xl transition-all ${loading ? 'bg-slate-300' : 'btn-navy shadow-brand-navy/20 active:scale-[0.98]'}`}
            >
              {loading ? '2026 시스템으로 전송 중...' : 'N잡러 지원서 제출'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Apply;