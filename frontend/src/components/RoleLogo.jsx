import React from 'react';

/**
 * Custom SVG Vector Logos for each Skillora Dashboard:
 * - STUDENT: Indigo Rocket + Academic Cap + Skill Diamond
 * - INDUSTRY: Sky Blue Enterprise Towers + Connected Neural Network
 * - ACADEMICIAN: Emerald Green Research Microscope + Laurel Wreath + Atomic Ring
 * - INSTITUTION: Amber Gold University Colonnade + Placement Shield + Analytics Bars
 */
export default function RoleLogo({ role = 'STUDENT', size = 36, className = '' }) {
  const normRole = (role || 'STUDENT').toUpperCase();

  if (normRole === 'STUDENT') {
    return (
      <div 
        className={`relative flex items-center justify-center rounded-xl overflow-hidden shadow-lg flex-shrink-0 ${className}`}
        style={{ 
          width: size, 
          height: size, 
          background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
          boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
        <svg width={size * 0.65} height={size * 0.65} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Graduation Mortarboard & Rising Career Wings */}
          <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" fillOpacity="0.95" />
          <path d="M6 9.5V14.5C6 16.5 8.7 18.5 12 18.5C15.3 18.5 18 16.5 18 14.5V9.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <path d="M20 9V16" stroke="#C7D2FE" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="20" cy="16.5" r="1.2" fill="#FDE047" />
          <path d="M12 14L10 22L12 20L14 22L12 14Z" fill="#FDE047" />
        </svg>
      </div>
    );
  }

  if (normRole === 'INDUSTRY' || normRole === 'COMPANY') {
    return (
      <div 
        className={`relative flex items-center justify-center rounded-xl overflow-hidden shadow-lg flex-shrink-0 ${className}`}
        style={{ 
          width: size, 
          height: size, 
          background: 'linear-gradient(135deg, #0EA5E9 0%, #2563EB 100%)',
          boxShadow: '0 4px 14px rgba(14, 165, 233, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
        <svg width={size * 0.65} height={size * 0.65} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Enterprise Tower & AI Nodes */}
          <rect x="3" y="9" width="7" height="13" rx="1" fill="white" fillOpacity="0.9" />
          <rect x="14" y="3" width="7" height="19" rx="1" fill="white" />
          <path d="M5 12H7M5 15H7M5 18H7" stroke="#0EA5E9" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M16 6H18M16 9H18M16 12H18M16 15H18M16 18H18" stroke="#2563EB" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="12" cy="5" r="2.2" fill="#38BDF8" />
          <path d="M10.5 7L13.5 9" stroke="#38BDF8" strokeWidth="1.5" />
        </svg>
      </div>
    );
  }

  if (normRole === 'ACADEMICIAN') {
    return (
      <div 
        className={`relative flex items-center justify-center rounded-xl overflow-hidden shadow-lg flex-shrink-0 ${className}`}
        style={{ 
          width: size, 
          height: size, 
          background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
          boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
        <svg width={size * 0.65} height={size * 0.65} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Research Flask & Academic Laurel */}
          <path d="M9 3H15M10 3V8L5 18C4.3 19.4 5.3 21 6.8 21H17.2C18.7 21 19.7 19.4 19 18L14 8V3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7.5 15C9 14 11 16 13 14C15 12 16.5 14 17.5 15" stroke="#6EE7B7" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="12" cy="11" r="1.2" fill="#FDE047" />
          <circle cx="9.5" cy="17" r="1" fill="white" />
          <circle cx="14" cy="18" r="1.2" fill="white" />
        </svg>
      </div>
    );
  }

  if (normRole === 'INSTITUTION') {
    return (
      <div 
        className={`relative flex items-center justify-center rounded-xl overflow-hidden shadow-lg flex-shrink-0 ${className}`}
        style={{ 
          width: size, 
          height: size, 
          background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
          boxShadow: '0 4px 14px rgba(245, 158, 11, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
        <svg width={size * 0.65} height={size * 0.65} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* University Pillars & Placement Shield */}
          <path d="M2 9L12 3L22 9H2Z" fill="white" />
          <path d="M4 11V18M9 11V18M15 11V18M20 11V18" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <rect x="2" y="19" width="20" height="2.5" rx="0.5" fill="white" />
          {/* Placement Star Crest */}
          <circle cx="12" cy="14" r="2.2" fill="#FEF08A" />
          <path d="M12 12V16M10 14H14" stroke="#D97706" strokeWidth="1.2" />
        </svg>
      </div>
    );
  }

  // Default Fallback Logo
  return (
    <div 
      className={`relative flex items-center justify-center rounded-xl overflow-hidden shadow-lg flex-shrink-0 ${className}`}
      style={{ width: size, height: size, background: '#4F46E5' }}>
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none">
        <path d="M12 2L15 9H22L16.5 13.5L18.5 21L12 16.5L5.5 21L7.5 13.5L2 9H9L12 2Z" fill="white" />
      </svg>
    </div>
  );
}
