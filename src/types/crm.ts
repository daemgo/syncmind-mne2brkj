// CRM Types - Customer Management, Sales Follow-ups, Opportunity Management

// ============================================
// Customer Management
// ============================================

export interface Customer {
  id: string;
  name: string;
  contact: string;
  phone: string;
  email: string;
  industry: string;
  scale: string;
  status: CustomerStatus;
  createdAt: string;
  updatedAt: string;
}

export type CustomerStatus = "潜在客户" | "意向客户" | "成交客户" | "已流失";

export interface CustomerStatusOption {
  value: CustomerStatus;
  label: string;
}

// ============================================
// Sales Follow-ups
// ============================================

export interface Followup {
  id: string;
  customerId: string;
  customerName: string;
  type: FollowupType;
  content: string;
  followupTime: string;
  nextPlan: string | null;
  nextPlanDate: string | null;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export type FollowupType = "拜访" | "电话" | "会议" | "线上沟通" | "其他";

export interface FollowupTypeOption {
  value: FollowupType;
  label: string;
}

// ============================================
// Opportunity Management
// ============================================

export interface Opportunity {
  id: string;
  name: string;
  customerId: string;
  customerName: string;
  amount: number;
  stage: OpportunityStage;
  expectedCloseDate: string;
  owner: string;
  remark: string;
  createdAt: string;
  updatedAt: string;
}

export type OpportunityStage =
  | "初步接触"
  | "需求确认"
  | "方案报价"
  | "合同谈判"
  | "已成交"
  | "已失败";

export interface OpportunityStageOption {
  value: OpportunityStage;
  label: string;
}

// ============================================
// Dashboard Stats
// ============================================

export interface DashboardStats {
  totalCustomers: number;
  totalOpportunities: number;
  totalFollowups: number;
  monthlyDealAmount: number;
}

// ============================================
// Chart Data Types
// ============================================

export interface OpportunityTrendData {
  month: string;
  amount: number;
}

export interface OpportunityStageDistribution {
  stage: string;
  count: number;
  fill: string;
}
