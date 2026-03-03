
import React from 'react';

const Privacy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-slate-700 leading-relaxed">
      <h1 className="text-3xl font-black text-slate-900 mb-8">개인정보처리방침</h1>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 mb-4">1. 수집하는 개인정보 항목</h2>
        <p>스마트 인컴(이하 '회사')은 N잡러 지원 및 상담을 위해 아래와 같은 개인정보를 수집하고 있습니다.</p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>필수항목: 이름, 연락처, 이메일, 거주지역</li>
          <li>선택항목: 현재 상태, 관심 분야, 활동 가능 시간, 자기소개</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 mb-4">2. 개인정보의 수집 및 이용 목적</h2>
        <p>회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.</p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>N잡러 지원 의사 확인 및 본인 식별</li>
          <li>상담을 위한 연락 및 안내사항 전달</li>
          <li>서비스 이용에 따른 불만 처리 등 민원 처리</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 mb-4">3. 개인정보의 보유 및 이용기간</h2>
        <p>회사는 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 관계법령에서 정한 일정한 기간 동안 정보를 보관합니다.</p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>N잡러 지원 정보: 지원 후 1년 (미선발 시 즉시 파기 가능)</li>
          <li>소비자 불만 또는 분쟁처리에 관한 기록: 3년</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 mb-4">4. 개인정보의 파기절차 및 방법</h2>
        <p>회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 파기절차 및 방법은 다음과 같습니다.</p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>파기절차: 지원자가 입력한 정보는 목적이 달성된 후 별도의 DB로 옮겨져 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라 일정 기간 저장된 후 파기됩니다.</li>
          <li>파기방법: 전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.</li>
        </ul>
      </section>
      <p className="text-sm text-slate-400 mt-12">시행일자: 2025년 1월 1일</p>
    </div>
  );
};

export default Privacy;
