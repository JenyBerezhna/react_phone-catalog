import { useNavigate } from 'react-router-dom';

export const BackButton = ({ className = '' }) => {
  const navigate = useNavigate();

  return (
    <button className={`back-button ${className}`} onClick={() => navigate(-1)}>
      <img src="/img/icons/arrow-left.svg" alt="" />
      Back
    </button>
  );
};
