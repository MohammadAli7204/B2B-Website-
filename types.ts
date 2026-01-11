
import React from 'react';

export interface SizeChartEntry {
  label: string;
  inches: string;
  cm: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  extraImages?: string[];
  features: string[];
  sizeChart?: SizeChartEntry[];
  additionalInfo?: {
    material: string;
    compliance: string;
    packaging: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: 'Technical' | 'Industry' | 'Sustainability';
  image: string;
}

/**
 * Fix: Added company field to InquiryData interface.
 * This resolves TypeScript errors in Admin.tsx where inq.company was being accessed
 * for both CSV export and table display.
 */
export interface InquiryData {
  id: string;
  productId: string;
  productName: string;
  name: string;
  email: string;
  company: string;
  quantity: string;
  message: string;
  requirement: string;
  timestamp: string; // ISO string
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
}

export interface Stat {
  label: string;
  value: string;
  icon: React.ReactNode;
}
