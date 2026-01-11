
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
