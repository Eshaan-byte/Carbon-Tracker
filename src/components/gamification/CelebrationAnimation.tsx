'use client';

import React, { useState, useEffect, useCallback } from 'react';


const ConfettiPiece = ({ id }: { id: number }) => {
  const style = {
    left: `${Math.random() * 100}%`,
    animationDuration: `${Math.random() * 3 + 2}s`,
    animationDelay: `${Math.random() * 2}s`,
    backgroundColor: ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'][id % 16],
  };
  return <div className="confetti" style={style}></div>;
};

// The main celebration component
export const CelebrationAnimation = ({
  message,
  onClose,
}: {
  message: string | null;
  onClose: () => void;
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        handleClose();
      }, 3500); // Auto-dismiss after 3.5 seconds
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleClose = useCallback(() => {
    setVisible(false);
   
    setTimeout(onClose, 500);
  }, [onClose]);

  if (!message) return null;

  return (
    <>
      <style jsx>{`
        .confetti-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9999;
          overflow: hidden;
        }
        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          top: -20px;
          opacity: 0;
          animation: drop-confetti 5s linear infinite;
        }
        @keyframes drop-confetti {
          0% {
            transform: translateY(0) rotateZ(0);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotateZ(360deg);
            opacity: 0;
          }
        }
        .celebration-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.3);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9998;
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
        }
        .celebration-overlay.visible {
          opacity: 1;
        }
        .celebration-modal {
          transform: scale(0.5);
          opacity: 0;
          transition: all 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
        }
        .celebration-modal.visible {
          transform: scale(1);
          opacity: 1;
        }
      `}</style>
      <div
        className={`celebration-overlay ${visible ? 'visible' : ''}`}
        onClick={handleClose}
      >
        <div
          className={`celebration-modal ${visible ? 'visible' : ''} bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl text-center max-w-sm w-full mx-4`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Milestone Unlocked!
          </h2>
          <p className="text-gray-600 dark:text-gray-300">{message}</p>
        </div>
      </div>
      {visible && (
        <div className="confetti-container">
          {Array.from({ length: 100 }).map((_, i) => (
            <ConfettiPiece key={i} id={i} />
          ))}
        </div>
      )}
    </>
  );
};