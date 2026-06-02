import { useNavigate } from 'react-router-dom';

export const BackButton = ({ className = '' }) => {
  const navigate = useNavigate();

  return (
    <button className={`back-button ${className}`} onClick={() => navigate(-1)}>
      <img
        className="back-button__icon"
        src="/img/icons/ArrowLeft.svg"
        alt=""
      />
      Back
    </button>
  );
};
