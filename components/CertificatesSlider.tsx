
import React from 'react';

const CERTIFICATES = [
  { name: 'ISO 13485:2016', label: 'Medical Devices QMS', icon: '/images/cert-iso.svg' },
  { name: 'CE MARK', label: 'European Compliance', icon: '/images/cert-ce.svg' },
  { name: 'AAMI PB70', label: 'Barrier Protection', icon: '/images/cert-aami.svg' },
  { name: 'FDA REGISTERED', label: 'US Food & Drug Admin', icon: '/images/cert-fda.svg' },
  { name: 'GMP CERTIFIED', label: 'Good Manufacturing', icon: '/images/cert-gmp.svg' },
  { name: 'ISO 9001:2015', label: 'Quality Management', icon: '/images/cert-iso.svg' },
  { name: 'OEKO-TEX', label: 'Textile Safety', icon: '/images/cert-oeko.svg' },
];

const CertificatesSlider: React.FC = () => {
  const items = [...CERTIFICATES, ...CERTIFICATES, ...CERTIFICATES];

  return (
