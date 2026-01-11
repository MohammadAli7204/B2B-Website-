
import React from 'react';
import { Shield, Award, Activity, RefreshCw } from 'lucide-react';
import { Product, Testimonial, Stat } from './types';

const STANDARD_SIZE_CHART = [
  { label: 'XXXS', inches: '30-32', cm: '76-81' },
  { label: 'XXS', inches: '32-34', cm: '81-86' },
  { label: 'XS', inches: '34-36', cm: '86-91' },
  { label: 'S', inches: '36-38', cm: '91-96' },
  { label: 'M', inches: '38-40', cm: '96-101' },
  { label: 'L', inches: '40-42', cm: '101-106' },
  { label: 'XL', inches: '42-44', cm: '106-111' },
  { label: 'XXL', inches: '44-46', cm: '111-116' },
  { label: 'XXXL', inches: '46-48', cm: '116-121' },
];

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Premium Surgical Gown',
    category: 'Sterile',
    description: 'AAMI Level 3 protection featuring breathable SMS fabric with ultrasonic seams for total fluid resistance.',
    image: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&q=80&w=800',
    extraImages: [
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800'
    ],
    features: ['AAMI Level 3', 'Fluid Resistant', 'Elastic Cuffs'],
    sizeChart: STANDARD_SIZE_CHART,
    additionalInfo: {
      material: 'Laminated Non-woven / SMS',
      compliance: 'AAMI Level 3',
      packaging: 'Individually Sterile Packed'
    }
  },
  {
    id: '2',
    name: 'Clinical V-Neck Scrubs',
    category: 'Custom',
    description: 'High-performance polyester-cotton blend designed for comfort, durability, and moisture management.',
    image: 'https://images.unsplash.com/photo-1628594716769-38e19bb47895?auto=format&fit=crop&q=80&w=800',
    extraImages: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800'
    ],
    features: ['Moisture Wicking', 'Reinforced Pockets', 'Industrial Washable'],
    sizeChart: STANDARD_SIZE_CHART,
    additionalInfo: {
      material: 'Performance Polyester/Cotton Blend',
      compliance: 'Standard Industrial Health',
      packaging: 'Bulk Pack / Set'
    }
  },
  {
    id: '3',
    name: 'Full Isolation PPE Kit',
    category: 'Protective',
    description: 'Comprehensive barrier protection kit including gown, double-layer mask, and reinforced shoe covers.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
    features: ['Full Body Coverage', 'Latex Free', 'Tear Resistant'],
    sizeChart: STANDARD_SIZE_CHART,
    additionalInfo: {
      material: 'PP/PE Laminated Fabric',
      compliance: 'AAMI Level 2/3',
      packaging: 'Vacuum Sealed Hygiene Kit'
    }
  },
  {
    id: '4',
    name: 'Professional Lab Coat',
    category: 'Protective',
    description: 'Classic white lab coat with antimicrobial finish and reinforced utility pockets for medical professionals.',
    image: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=800',
    features: ['Wrinkle Resistant', 'Button Front', 'Tablet Pockets'],
    sizeChart: STANDARD_SIZE_CHART,
    additionalInfo: {
      material: '65% Poly / 35% Cotton Antimicrobial',
      compliance: 'Professional Workwear Standard',
      packaging: 'Polybagged'
    }
  },
  {
    id: '5',
    name: 'Industrial Cleanroom Suit',
    category: 'Custom',
    description: 'Full-body coverall with integrated carbon-fiber grid for ESD protection in sensitive environments.',
    image: 'https://images.unsplash.com/photo-1582921017967-79d1cb6702ee?auto=format&fit=crop&q=80&w=800',
    features: ['ESD Protection', 'Hooded Design', 'Lint Free'],
    sizeChart: STANDARD_SIZE_CHART,
    additionalInfo: {
      material: 'Static Dissipative Polyester / Carbon',
      compliance: 'EN 61340-5-1',
      packaging: 'Cleanroom Class 10/100 compatible'
    }
  },
  {
    id: '6',
    name: 'Hygienic Patient Apparel',
    category: 'Consumables',
    description: 'Soft-touch non-woven patient gowns designed for patient dignity and ease of clinical access.',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
    features: ['Eco-Friendly', 'Soft Texture', 'Secure Fastenings'],
    sizeChart: STANDARD_SIZE_CHART,
    additionalInfo: {
      material: 'Soft-touch Spunbond PP',
      compliance: 'Hygiene Standard',
      packaging: 'Dispenser Pack'
    }
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    role: 'Chief of Surgery',
    company: 'St. Mary\'s Medical Center',
    content: 'The ability to source both high-quality disposable kits and durable reusable gowns from one manufacturer has simplified our procurement immensely.',
    image: 'https://i.pravatar.cc/150?u=sarah'
  },
  {
    id: '2',
    name: 'Mark Thompson',
    role: 'Procurement Manager',
    company: 'Global Health Logistics',
    content: 'Their focus on manufacturing both disposable and reusable options allows us to hit our sustainability goals without compromising on immediate clinical needs.',
    image: 'https://i.pravatar.cc/150?u=mark'
  }
];

export const STATS: Stat[] = [
  { label: 'Years of Excellence', value: '15+', icon: <Award className="w-6 h-6" /> },
  { label: 'Daily Units', value: '50k+', icon: <Activity className="w-6 h-6" /> },
  { label: 'Sustainability Focus', value: '100%', icon: <RefreshCw className="w-6 h-6" /> },
  { label: 'Global Compliance', value: 'ISO', icon: <Shield className="w-6 h-6" /> }
];
