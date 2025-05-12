import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

const HeaderAnnouncement = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-primary-charcoal text-white py-2 relative">
      <div className="container-custom text-center text-sm">
        Free shipping on orders over $150
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
      >
        <CloseIcon fontSize="small" />
      </button>
    </div>
  );
};

export default HeaderAnnouncement;
