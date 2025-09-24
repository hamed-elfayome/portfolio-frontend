import React, { useEffect, useRef, useState } from 'react';

const BasePopover = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "md:max-w-3xl",
  showBackButton = true,
  showCloseButton = true
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      setIsClosing(false);
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      if (!isOpen && !isClosing) {
        document.body.style.overflow = 'unset';
      }
    };
  }, [isOpen, onClose, isClosing]);

  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => {
        onClose();
        setIsClosing(false);
        document.body.style.overflow = 'unset';
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isClosing, onClose]);

  const handleClose = () => {
    setIsClosing(true);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 ${
        isClosing ? 'animate-backdropFadeOut' : 'animate-backdropFadeIn'
      }`}
      onClick={handleBackdropClick}
    >
      {/* Mobile Back Button */}
      {showBackButton && (
        <button
          onClick={handleClose}
          className="md:hidden fixed top-4 left-4 z-[60] w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800/90 backdrop-blur-sm rounded-full transition-colors border border-slate-700/50"
          aria-label="Back"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      <div
        ref={popoverRef}
        className={`relative w-full h-full md:w-full ${maxWidth} md:h-auto md:max-h-[85vh] bg-slate-900/70 border-0 md:border md:border-slate-700 rounded-none md:rounded-xl shadow-xl overflow-y-auto md:overflow-hidden md:flex md:flex-col pt-12 md:pt-0 ${
          isClosing ? 'animate-slideDown' : 'animate-slideUp'
        }`}
      >
        {/* Header */}
        <div className="relative p-4 border-b border-slate-700 md:flex-shrink-0">
          {/* Desktop Close Button */}
          {showCloseButton && (
            <button
              onClick={handleClose}
              className="hidden md:flex absolute top-3 right-3 w-8 h-8 items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          <div className="md:pr-10">
            {title && (
              <h2 className="text-lg font-semibold text-white mb-2">
                {title}
              </h2>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="md:flex-1 md:overflow-y-auto md:min-h-0">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BasePopover;