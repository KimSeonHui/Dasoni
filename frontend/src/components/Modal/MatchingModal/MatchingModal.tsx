import React from 'react';
import './MatchingModal.css';
import axios from 'axios';
import { useAppSelector } from '../../../app/hooks';

interface MatchingModalProps {
  onClose: () => void;
}

const MatchingModal: React.FC<MatchingModalProps> = ({ onClose }) => {
  const member = useAppSelector((state) => state.user);

  const handleCancel = async () => {
    try {
      // 서버 API 요청을 이곳에 추가
      // 예: await fetch('/api/cancel-matching');
      const res = await axios.delete(`/api/match/members/${member.memberId}`);
      console.log('status', res.data);
      onClose();
    } catch (error) {
      console.error('Error canceling the matching:', error);
    }
  };

  return (
    <div className="openroommodal-overlay active">
      <div className="openroom-modal">
        <div className="header">매칭중</div>
        <div className="box">
          <div className="box-content">
            <div className="box-title-content">현재 매칭중입니다.</div>
            <div className="openroom-button">
              <button className="close-button" onClick={handleCancel}>
                매칭 취소
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchingModal;