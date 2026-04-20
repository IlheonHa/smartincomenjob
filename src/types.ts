
export interface ApplicationData {
  id: string;
  name: string;
  phone: string;
  email: string;
  password?: string;
  region: string;
  status: string; // 직장인, 자영업 등
  interest: string;
  time: string;
  intro: string;
  appliedAt: string;
  statusTag: 'new' | 'contacted' | 'meeting' | 'joined';
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TargetCard {
  title: string;
  description: string;
  benefit: string;
  icon: string;
}
