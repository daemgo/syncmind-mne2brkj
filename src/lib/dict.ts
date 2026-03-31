// Global Data Dictionary for CRM

import type {
  CustomerStatusOption,
  FollowupTypeOption,
  OpportunityStageOption,
} from "@/types/crm";

// ============================================
// Customer Status Options
// ============================================

export const customerStatusOptions: CustomerStatusOption[] = [
  { value: "潜在客户", label: "潜在客户" },
  { value: "意向客户", label: "意向客户" },
  { value: "成交客户", label: "成交客户" },
  { value: "已流失", label: "已流失" },
];

// ============================================
// Follow-up Type Options
// ============================================

export const followupTypeOptions: FollowupTypeOption[] = [
  { value: "拜访", label: "拜访" },
  { value: "电话", label: "电话" },
  { value: "会议", label: "会议" },
  { value: "线上沟通", label: "线上沟通" },
  { value: "其他", label: "其他" },
];

// ============================================
// Opportunity Stage Options
// ============================================

export const opportunityStageOptions: OpportunityStageOption[] = [
  { value: "初步接触", label: "初步接触" },
  { value: "需求确认", label: "需求确认" },
  { value: "方案报价", label: "方案报价" },
  { value: "合同谈判", label: "合同谈判" },
  { value: "已成交", label: "已成交" },
  { value: "已失败", label: "已失败" },
];

// ============================================
// Industry Options
// ============================================

export const industryOptions = [
  "互联网",
  "软件开发",
  "企业服务",
  "云计算",
  "智能制造",
  "半导体",
  "电子制造",
  "汽车制造",
  "消费电子",
  "医疗健康",
  "医疗器械",
  "金融科技",
  "银行",
  "保险",
  "证券",
  "新能源",
  "电力",
  "石油化工",
  "建筑工程",
  "房地产",
  "教育培训",
  "零售",
  "物流",
  "农业",
  "其他",
];

// ============================================
// Company Scale Options
// ============================================

export const scaleOptions = [
  "1-10人",
  "10-50人",
  "50-100人",
  "100-500人",
  "500-1000人",
  "1000人以上",
];

// ============================================
// Sales Owner Options
// ============================================

export const ownerOptions = [
  "张伟",
  "李明",
  "王芳",
  "赵强",
  "刘洋",
];
