import React, { useEffect, useState } from 'react';
import './Notification.css';

const Notification = ({ message, type = 'success', isVisible, onClose, duration = 3000 }) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isVisible && type === 'delete') {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      
      // Adicionar efeito de vibração visual
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
      }
    }
  }, [isVisible, type]);

  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        setIsRemoving(true);
        setTimeout(() => {
          onClose();
          setIsRemoving(false);
        }, 300);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      case 'delete':
        return '🚗💨';
      default:
        return '✅';
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'success':
        return 'Sucesso!';
      case 'error':
        return 'Erro!';
      case 'warning':
        return 'Atenção!';
      case 'info':
        return 'Informação';
      case 'delete':
        return 'Carro Removido! 🎯';
      default:
        return 'Notificação';
    }
  };

  const getDescription = () => {
    if (type === 'delete') {
      // Se a mensagem contém detalhes do carro, usar ela; senão usar a mensagem padrão
      if (message && message.includes('🚗')) {
        return message;
      }
      return 'O carro foi removido permanentemente do catálogo com sucesso! 🎯';
    }
    return message;
  };

  const getAnimationClass = () => {
    if (type === 'delete') {
      return 'notification-delete-special';
    }
    return '';
  };

  return (
    <>
      {/* Confetti especial para exclusão */}
      {showConfetti && type === 'delete' && (
        <div className="confetti-container">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'][Math.floor(Math.random() * 6)]
              }}
            />
          ))}
        </div>
      )}

      <div className={`notification notification-${type} ${isRemoving ? 'removing' : ''} ${getAnimationClass()}`}>
        <div className="notification-content">
          <div className="notification-header">
            <div className="notification-icon-container">
              <span className="notification-icon">{getIcon()}</span>
              {type === 'delete' && (
                <div className="icon-glow"></div>
              )}
            </div>
            <div className="notification-text">
              <h4 className="notification-title">{getTitle()}</h4>
              <p className="notification-message">{getDescription()}</p>
            </div>
          </div>
          <button 
            className="notification-close" 
            onClick={() => {
              setIsRemoving(true);
              setTimeout(() => {
                onClose();
                setIsRemoving(false);
              }, 300);
            }}
          >
            ✕
          </button>
        </div>
        <div className="notification-progress"></div>
        
        {/* Efeitos especiais para exclusão */}
        {type === 'delete' && (
          <>
            <div className="notification-sparkles">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="sparkle"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    left: `${5 + i * 7}%`,
                    animationDuration: `${1 + Math.random() * 1}s`
                  }}
                />
              ))}
            </div>
            <div className="notification-ripple"></div>
            <div className="notification-particles">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="particle"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    left: `${10 + i * 10}%`
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Notification;
