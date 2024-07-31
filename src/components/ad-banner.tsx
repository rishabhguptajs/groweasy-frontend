import Image from 'next/image';
import { FaEdit } from 'react-icons/fa';

interface AdBannerProps {
  title: string;
  description: string;
  cta: string;
  image: string;
  backgroundTemplate: string;
  onEdit: () => void;
  onCtaClick: () => void;
}

const AdBanner: React.FC<AdBannerProps> = ({
  title,
  description,
  cta,
  image,
  backgroundTemplate,
  onEdit,
  onCtaClick
}) => {
  return (
    <div className={`relative p-6 ${backgroundTemplate} text-white rounded-lg overflow-hidden`}>
      <div className="relative z-10">
        <h2 className="text-2xl font-bold mb-2 text-black">{title}</h2>
        <p className="mb-4 text-gray-800">{description}</p>
        <button 
          className="bg-yellow-500 text-black py-2 cursor-pointer px-4 rounded"
          onClick={onCtaClick}
        >
          {cta}
        </button>
      </div>
      <div className="absolute inset-0">
        <Image src={image} alt={title} layout="fill" objectFit="cover" />
      </div>
      <button onClick={onEdit} className="absolute top-2 text-gray-800 right-2 text-xl z-20">
        <FaEdit />
      </button>
    </div>
  );
};

export default AdBanner;
