
import React, { useEffect, useState } from 'react';
import { ApplicationData } from '../types';
import { supabase } from '../lib/supabase';
import * as XLSX from 'xlsx';

const Admin: React.FC = () => {
  const [leads, setLeads] = useState<ApplicationData[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(true);
  
  const [testStatus, setTestStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error', message: string }>({ type: 'idle', message: '' });
  
  // Password change states
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [changeSuccess, setChangeSuccess] = useState('');
  const [changeError, setChangeError] = useState('');
  
  // Detail Modal states
  const [selectedLead, setSelectedLead] = useState<ApplicationData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Edit states
  const [isEditMode, setIsEditMode] = useState(false);
  const [editFormData, setEditFormData] = useState<Partial<ApplicationData>>({});

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      setIsLoggedIn(true);
      fetchLeads();
    }
    setLoading(false);
  };

  const handleViewDetails = (lead: ApplicationData) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedLead(null);
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditFormData({});
  };

  const handleEditClick = () => {
    if (selectedLead) {
      setEditFormData({ ...selectedLead });
      setIsEditMode(true);
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async () => {
    if (!selectedLead) return;
    
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('applications')
        .update(editFormData)
        .eq('id', selectedLead.id);

      if (error) throw error;

      // Update local state
      const updatedLead = { ...selectedLead, ...editFormData } as ApplicationData;
      setLeads(leads.map(lead => lead.id === selectedLead.id ? updatedLead : lead));
      setSelectedLead(updatedLead);
      setIsEditMode(false);
      alert('정보가 성공적으로 수정되었습니다.');
    } catch (err: any) {
      console.error('Error updating lead:', err);
      alert(`수정 실패: ${err.message}`);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDownloadExcel = () => {
    if (leads.length === 0) {
      alert('다운로드할 데이터가 없습니다.');
      return;
    }

    const dataToExport = leads.map(lead => ({
      '이름': lead.name,
      '연락처': lead.phone,
      '이메일': lead.email,
      '지역': lead.region,
      '직업상태': lead.status,
      '관심분야': lead.interest,
      '활동시간': lead.time,
      '자기소개': lead.intro,
      '지원일시': lead.appliedAt ? new Date(lead.appliedAt).toLocaleString('ko-KR') : '',
      '관리상태': lead.statusTag === 'new' ? '신규 지원' : 
                 lead.statusTag === 'contacted' ? '연락 완료' :
                 lead.statusTag === 'meeting' ? '미팅 예정' :
                 lead.statusTag === 'joined' ? '합류 완료' : lead.statusTag
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, '지원자목록');
    
    // Set column widths
    const wscols = [
      { wch: 10 }, { wch: 15 }, { wch: 25 }, { wch: 15 }, { wch: 15 },
      { wch: 20 }, { wch: 15 }, { wch: 50 }, { wch: 25 }, { wch: 15 }
    ];
    worksheet['!cols'] = wscols;

    XLSX.writeFile(workbook, `N잡러_지원자목록_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const handleUpdateStatus = async (id: string, newStatus: ApplicationData['statusTag']) => {
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('applications')
        .update({ statusTag: newStatus })
        .eq('id', id);

      if (error) throw error;

      // Update local state
      setLeads(leads.map(lead => 
        lead.id === id ? { ...lead, statusTag: newStatus } : lead
      ));
      
      if (selectedLead && selectedLead.id === id) {
        setSelectedLead({ ...selectedLead, statusTag: newStatus });
      }
      
      alert('상태가 성공적으로 업데이트되었습니다.');
    } catch (err: any) {
      console.error('Error updating status:', err);
      alert(`상태 업데이트 실패: ${err.message}`);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!window.confirm('정말로 이 지원자를 삭제하시겠습니까?')) return;
    
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('applications')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setLeads(leads.filter(lead => lead.id !== id));
      closeModal();
      alert('지원자가 삭제되었습니다.');
    } catch (err: any) {
      console.error('Error deleting lead:', err);
      alert(`삭제 실패: ${err.message}`);
    } finally {
      setIsUpdating(false);
    }
  };

  const fetchLeads = async () => {
    try {
      console.log('Fetching leads from Supabase...');
      let { data, error, status } = await supabase
        .from('applications')
        .select('*')
        .order('appliedAt', { ascending: false });

      console.log('Fetch response status:', status);

      if (error) {
        console.warn('Ordered fetch failed, trying without order...', error);
        // Try without order if appliedAt doesn't exist
        const { data: fallbackData, error: fallbackError, status: fallbackStatus } = await supabase
          .from('applications')
          .select('*');
        
        if (fallbackError) {
          console.error('Fallback fetch failed:', fallbackError);
          alert(`데이터를 불러오는데 실패했습니다 (코드: ${fallbackStatus}): ${fallbackError.message}\n\n'applications' 테이블이 생성되었는지 확인해주세요.`);
        } else {
          console.log('Fallback fetch success, count:', fallbackData?.length || 0);
          setLeads(fallbackData || []);
        }
      } else {
        console.log('Fetched leads count:', data?.length || 0);
        setLeads(data || []);
      }
    } catch (err: any) {
      console.error('Unexpected error during fetch:', err);
      alert(`데이터 로딩 중 예기치 못한 오류가 발생했습니다: ${err.message}`);
    }
  };

  const handleTestConnection = async () => {
    setTestStatus({ type: 'loading', message: '데이터베이스 연결 확인 중...' });
    try {
      console.log('Testing connection to Supabase...');
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('연결 시간 초과 (10초)')), 10000)
      );
      
      const fetchPromise = supabase.from('applications').select('*', { count: 'exact', head: true });
      const result: any = await Promise.race([fetchPromise, timeoutPromise]);
      const { count, error } = result;
      
      if (error) {
        setTestStatus({ type: 'error', message: `연결 실패: ${error.message}` });
        alert(`연결 테스트 실패: ${error.message}`);
      } else {
        const msg = `연결 성공! (현재 지원자: ${count !== null ? count : 0}명)`;
        setTestStatus({ type: 'success', message: msg });
        alert(`Supabase 연결 테스트 성공!\n\n현재 등록된 지원자 수: ${count !== null ? count : 0}명\n데이터베이스와 정상적으로 통신하고 있습니다.`);
      }
    } catch (err: any) {
      setTestStatus({ type: 'error', message: `오류: ${err.message}` });
      alert(`연결 테스트 중 오류 발생: ${err.message}`);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    // Hardcoded Admin Account Check
    if (email === 'admin' && password === '20260301') {
      setIsLoggedIn(true);
      fetchLeads();
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes('secret API key')) {
        setLoginError('로그인 실패: 브라우저에서 사용할 수 없는 "Secret/Service Role" 키가 설정되어 있습니다. Supabase 설정에서 "anon" (public) 키를 사용해주세요.');
      } else {
        setLoginError(`로그인 실패: ${error.message}`);
      }
      console.error('Login error:', error);
    } else {
      setIsLoggedIn(true);
      fetchLeads();
    }
  };

  const handleInitializeAdmin = async () => {
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role: 'admin' }
      }
    });

    if (error) {
      alert(`초기화 실패: ${error.message}`);
    } else {
      alert('관리자 계정이 생성되었습니다. 이메일 인증이 활성화되어 있다면 메일을 확인하시거나, Supabase 대시보드에서 이메일 인증을 비활성화(Confirm User 체크) 해주세요.');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setLeads([]);
    setEmail('');
    setPassword('');
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setChangeError('');
    setChangeSuccess('');

    if (newPassword.length < 6) {
      setChangeError('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) {
      setChangeError('비밀번호 변경 중 오류가 발생했습니다.');
    } else {
      setChangeSuccess('비밀번호가 성공적으로 변경되었습니다.');
      setNewPassword('');
      setTimeout(() => {
        setShowPasswordChange(false);
        setChangeSuccess('');
      }, 2000);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-600';
      case 'contacted': return 'bg-yellow-100 text-yellow-600';
      case 'meeting': return 'bg-purple-100 text-purple-600';
      case 'joined': return 'bg-green-100 text-green-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-navy border-t-brand-green rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-brand-navy/5">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-brand-navy tracking-tighter mb-2">Admin Login</h1>
            <p className="text-slate-500 font-medium">관리자 계정으로 로그인하세요.</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">아이디 (또는 이메일)</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="아이디 또는 이메일 입력"
                className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:border-brand-navy focus:ring-4 focus:ring-brand-navy/5 outline-none transition-all font-bold"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호 입력"
                className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:border-brand-navy focus:ring-4 focus:ring-brand-navy/5 outline-none transition-all font-bold"
                required
              />
              {loginError && (
                <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl">
                  <p className="text-red-600 text-xs font-bold leading-relaxed">{loginError}</p>
                  {loginError.includes('anon') && (
                    <div className="mt-2 pt-2 border-t border-red-100">
                      <p className="text-[10px] text-red-500 font-medium">
                        방법: Supabase 설정 {'->'} API {'->'} Project API keys에서 'anon' 'public' 키를 복사하여 환경 변수에 설정해주세요.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex flex-col space-y-4">
              <button
                type="submit"
                className="w-full bg-brand-navy text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-brand-navy/20 hover:shadow-brand-navy/30 active:scale-95 transition-all"
              >
                로그인
              </button>
              <button
                type="button"
                onClick={handleTestConnection}
                className={`w-full py-4 rounded-2xl border-2 font-black text-sm transition-all ${
                  testStatus.type === 'success' ? 'border-brand-green text-brand-green bg-brand-green/5' :
                  testStatus.type === 'error' ? 'border-red-500 text-red-500 bg-red-50' :
                  'border-brand-green text-brand-green hover:bg-brand-green/5'
                }`}
              >
                {testStatus.type === 'loading' ? '확인 중...' : '데이터베이스 연결 상태 확인 (필수 테스트)'}
              </button>
              {testStatus.message && (
                <p className={`text-center text-xs font-bold ${
                  testStatus.type === 'success' ? 'text-brand-green' :
                  testStatus.type === 'error' ? 'text-red-500' :
                  'text-slate-400'
                }`}>
                  {testStatus.message}
                </p>
              )}
            </div>
            <div className="pt-4 text-center">
              <button 
                type="button"
                onClick={handleInitializeAdmin}
                className="text-xs text-slate-400 font-bold hover:text-brand-navy transition-colors underline underline-offset-4"
              >
                처음이신가요? 관리자 계정 생성하기
              </button>
            </div>
          </form>
          <div className="mt-8 pt-8 border-t border-slate-100">
            <details className="text-[10px] text-slate-300 cursor-pointer">
              <summary className="font-bold hover:text-slate-400">시스템 진단 정보 (클릭)</summary>
              <div className="mt-2 p-4 bg-slate-50 rounded-xl space-y-1 font-mono break-all">
                <p>URL: https://tbktvoipvuyemzpbofnm.supabase.co</p>
                <p>Key: eyJhbGci...4CuKDs (Anon Key)</p>
                <p>Table: applications</p>
                <p>Status: {isLoggedIn ? 'Authenticated' : 'Guest'}</p>
                <p>Leads: {leads.length}</p>
              </div>
            </details>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 bg-brand-navy/5 px-3 py-1 rounded-full mb-4">
            <span className="w-2 h-2 bg-brand-green rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black text-brand-navy uppercase tracking-widest">Admin Dashboard</span>
          </div>
          <h1 className="text-4xl font-[900] text-brand-navy tracking-tighter mb-2">N잡러 지원자 관리</h1>
          <p className="text-slate-500 font-medium">총 <span className="text-brand-navy font-black">{leads.length}명</span>의 지원자가 시스템에 등록되어 있습니다.</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex flex-col items-end">
            <button 
              onClick={handleTestConnection}
              className={`px-5 py-3 rounded-xl font-bold text-sm transition-all ${
                testStatus.type === 'success' ? 'bg-brand-green text-white' :
                testStatus.type === 'error' ? 'bg-red-500 text-white' :
                'bg-brand-green/10 text-brand-green hover:bg-brand-green/20'
              }`}
            >
              {testStatus.type === 'loading' ? '확인 중...' : '연결 테스트'}
            </button>
            {testStatus.message && (
              <span className={`text-[10px] font-bold mt-1 ${
                testStatus.type === 'success' ? 'text-brand-green' :
                testStatus.type === 'error' ? 'text-red-500' :
                'text-slate-400'
              }`}>
                {testStatus.message}
              </span>
            )}
          </div>
          <button 
            onClick={() => setShowPasswordChange(!showPasswordChange)}
            className="bg-white border border-slate-200 px-5 py-3 rounded-xl font-bold text-sm text-slate-600 hover:bg-slate-50 transition-all"
          >
            비밀번호 변경
          </button>
          <button 
            onClick={handleLogout}
            className="bg-white border border-slate-200 px-5 py-3 rounded-xl font-bold text-sm text-slate-600 hover:bg-slate-50 transition-all"
          >
            로그아웃
          </button>
          <button 
            onClick={handleDownloadExcel}
            className="bg-green-600 text-white px-5 py-3 rounded-xl font-bold text-sm shadow-lg shadow-green-600/10 hover:shadow-green-600/20 active:scale-95 transition-all flex items-center space-x-2"
          >
            <span>📊 엑셀 다운로드</span>
          </button>
          <button 
            onClick={fetchLeads} 
            className="bg-brand-navy text-white px-5 py-3 rounded-xl font-bold text-sm shadow-lg shadow-brand-navy/10 hover:shadow-brand-navy/20 active:scale-95 transition-all"
          >
            데이터 새로고침
          </button>
        </div>
      </div>

      {showPasswordChange && (
        <div className="mb-12 bg-slate-50 p-8 rounded-[2rem] border border-slate-200 animate-in fade-in slide-in-from-top-4 duration-300">
          <h3 className="text-xl font-black text-brand-navy mb-6">관리자 비밀번호 변경</h3>
          <form onSubmit={handleUpdatePassword} className="flex flex-col sm:flex-row items-end gap-4">
            <div className="flex-grow max-w-md">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">새 비밀번호</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="새 비밀번호 입력 (최소 6자)"
                className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:border-brand-navy outline-none font-bold"
                required
              />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="bg-brand-navy text-white px-6 py-3 rounded-xl font-black text-sm">변경하기</button>
              <button type="button" onClick={() => setShowPasswordChange(false)} className="bg-white border border-slate-200 px-6 py-3 rounded-xl font-black text-sm text-slate-500">취소</button>
            </div>
          </form>
          {changeSuccess && <p className="text-brand-green text-sm font-bold mt-4">{changeSuccess}</p>}
          {changeError && <p className="text-red-500 text-sm font-bold mt-4">{changeError}</p>}
        </div>
      )}

      <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-brand-navy/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/50 text-slate-400 font-black text-[11px] uppercase tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-8 py-6">이름 / 연락처</th>
                <th className="px-8 py-6">상태 / 관심사</th>
                <th className="px-8 py-6">지역 / 시간</th>
                <th className="px-8 py-6">지원일시</th>
                <th className="px-8 py-6">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="font-black text-brand-navy text-base mb-1">{lead.name}</div>
                    <div className="text-xs text-slate-500 font-bold">{lead.phone}</div>
                    <div className="text-[10px] text-slate-400 font-medium">{lead.email}</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col space-y-2">
                      <span className={`px-2 py-1 rounded-lg text-[10px] font-black w-fit uppercase tracking-tighter ${getStatusColor(lead.statusTag || 'new')}`}>
                        {lead.statusTag === 'new' ? '신규 지원' : lead.statusTag}
                      </span>
                      <div className="font-bold text-slate-700">{lead.status}</div>
                      <div className="text-xs text-slate-400 font-medium">{lead.interest}</div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="font-bold text-slate-700 mb-1">{lead.region}</div>
                    <div className="text-xs text-slate-400 font-medium">{lead.time}</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-xs text-slate-500 font-bold">
                      {lead.appliedAt ? new Date(lead.appliedAt).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }) : '날짜 없음'}
                    </div>
                    <div className="text-[10px] text-slate-400 font-medium">
                      {lead.appliedAt ? new Date(lead.appliedAt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }) : '-'}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <button 
                      onClick={() => handleViewDetails(lead)}
                      className="bg-slate-100 text-slate-600 px-4 py-2 rounded-lg font-black text-[11px] uppercase tracking-widest hover:bg-brand-navy hover:text-white transition-all"
                    >
                      상세보기
                    </button>
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-24 text-center">
                    <div className="text-4xl mb-4">📂</div>
                    <div className="text-slate-400 font-bold">아직 접수된 지원자가 없습니다.</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Detail Modal */}
      {isModalOpen && selectedLead && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <div className="absolute inset-0 bg-brand-navy/60 backdrop-blur-sm" onClick={closeModal}></div>
          <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-8 md:p-12 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h3 className="text-2xl md:text-3xl font-black text-brand-navy mb-2">
                    {isEditMode ? `${selectedLead.name} 정보 수정` : `${selectedLead.name} 지원자 상세 정보`}
                  </h3>
                  <p className="text-slate-400 font-bold">지원일시: {selectedLead.appliedAt ? new Date(selectedLead.appliedAt).toLocaleString('ko-KR') : '정보 없음'}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {!isEditMode && (
                    <button 
                      onClick={handleEditClick}
                      className="px-4 py-2 bg-brand-navy/5 text-brand-navy rounded-xl font-bold text-xs hover:bg-brand-navy/10 transition-all"
                    >
                      정보 수정
                    </button>
                  )}
                  <button onClick={closeModal} className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-all">✕</button>
                </div>
              </div>

              {isEditMode ? (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">이름</label>
                      <input 
                        name="name" 
                        value={editFormData.name || ''} 
                        onChange={handleEditChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-2 focus:ring-brand-navy/10 outline-none font-bold text-brand-navy"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">연락처</label>
                      <input 
                        name="phone" 
                        value={editFormData.phone || ''} 
                        onChange={handleEditChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-2 focus:ring-brand-navy/10 outline-none font-bold text-brand-navy"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">이메일</label>
                      <input 
                        name="email" 
                        value={editFormData.email || ''} 
                        onChange={handleEditChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-2 focus:ring-brand-navy/10 outline-none font-bold text-brand-navy"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">거주지역</label>
                      <input 
                        name="region" 
                        value={editFormData.region || ''} 
                        onChange={handleEditChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-2 focus:ring-brand-navy/10 outline-none font-bold text-brand-navy"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">직업 상태</label>
                      <input 
                        name="status" 
                        value={editFormData.status || ''} 
                        onChange={handleEditChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-2 focus:ring-brand-navy/10 outline-none font-bold text-brand-navy"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">관심 분야</label>
                      <input 
                        name="interest" 
                        value={editFormData.interest || ''} 
                        onChange={handleEditChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-2 focus:ring-brand-navy/10 outline-none font-bold text-brand-navy"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">활동 가능 시간</label>
                      <input 
                        name="time" 
                        value={editFormData.time || ''} 
                        onChange={handleEditChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-2 focus:ring-brand-navy/10 outline-none font-bold text-brand-navy"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">자기소개 및 포부</label>
                    <textarea 
                      name="intro" 
                      value={editFormData.intro || ''} 
                      onChange={handleEditChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-2 focus:ring-brand-navy/10 outline-none font-bold text-brand-navy resize-none"
                    />
                  </div>
                  <div className="flex space-x-3 pt-6">
                    <button 
                      onClick={handleSaveEdit}
                      disabled={isUpdating}
                      className="flex-grow bg-brand-navy text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-brand-navy/10 hover:shadow-brand-navy/20 transition-all disabled:opacity-50"
                    >
                      {isUpdating ? '저장 중...' : '수정 완료'}
                    </button>
                    <button 
                      onClick={() => setIsEditMode(false)}
                      className="px-8 bg-slate-100 text-slate-500 py-4 rounded-2xl font-black text-sm hover:bg-slate-200 transition-all"
                    >
                      취소
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="space-y-6">
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">연락처</label>
                        <div className="text-lg font-black text-brand-navy">{selectedLead.phone}</div>
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">이메일</label>
                        <div className="text-lg font-black text-brand-navy">{selectedLead.email}</div>
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">거주지역</label>
                        <div className="text-lg font-black text-brand-navy">{selectedLead.region}</div>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">현재 직업 상태</label>
                        <div className="text-lg font-black text-brand-navy">{selectedLead.status}</div>
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">관심 분야</label>
                        <div className="text-lg font-black text-brand-navy">{selectedLead.interest}</div>
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">활동 가능 시간</label>
                        <div className="text-lg font-black text-brand-navy">{selectedLead.time}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-12">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">자기소개 및 포부</label>
                    <div className="bg-slate-50 p-6 rounded-2xl text-slate-700 font-medium leading-relaxed">
                      {selectedLead.intro || '입력된 내용이 없습니다.'}
                    </div>
                  </div>

                  <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center space-x-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">관리 상태 변경:</label>
                      <select 
                        value={selectedLead.statusTag || 'new'} 
                        onChange={(e) => handleUpdateStatus(selectedLead.id, e.target.value as any)}
                        disabled={isUpdating}
                        className="bg-slate-50 border border-slate-100 rounded-lg px-4 py-2 text-sm font-black text-brand-navy outline-none focus:ring-2 focus:ring-brand-navy/10"
                      >
                        <option value="new">신규 지원</option>
                        <option value="contacted">연락 완료</option>
                        <option value="meeting">미팅 예정</option>
                        <option value="joined">합류 완료</option>
                      </select>
                    </div>
                    <button 
                      onClick={() => handleDeleteLead(selectedLead.id)}
                      disabled={isUpdating}
                      className="text-red-500 font-black text-xs uppercase tracking-widest hover:underline disabled:opacity-50"
                    >
                      지원자 삭제
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;

