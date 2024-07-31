import { useState, useEffect } from 'react';
import Image from 'next/image';

interface EditBannerTemplateBsProps {
  banner: any;
  onClose: () => void;
  onSave: (updatedBanner: any) => void;
}

const EditBannerBs: React.FC<EditBannerTemplateBsProps> = ({ banner, onClose, onSave }) => {
  const [editBanner, setEditBanner] = useState(banner);
  const [customImage, setCustomImage] = useState<string | null>(null);

  useEffect(() => {
    setEditBanner(banner);
  }, [banner]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditBanner({ ...editBanner, [name]: value });
  };

  const handleSave = () => {
    onSave(editBanner);
    onClose();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomImage(reader.result as string);
        setEditBanner({ ...editBanner, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const imageOptions = [
    "https://bannerbot-public.s3.ap-south-1.amazonaws.com/templates/9/square.png",
    "https://bannerbot-public.s3.ap-south-1.amazonaws.com/templates/1/square.png",
    "https://bannerbot-public.s3.ap-south-1.amazonaws.com/templates/15/square.png",
    "https://bannerbot-public.s3.ap-south-1.amazonaws.com/templates/12/square.png",
  ];

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-black text-white w-full max-w-md p-4 rounded-lg overflow-auto max-h-screen">
        <h2 className="text-2xl font-bold mb-4">Edit Banner</h2>
        <div className="mb-4">
          <Image src={editBanner.image} alt={editBanner.title} width={600} height={200} className="rounded-lg mb-4" />
          <p className="text-sm text-gray-400">Image Attribution: Photo by Xu Haiwei on Unsplash</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Images</label>
          <div className="flex space-x-2 mb-2">
            {imageOptions.map((img, index) => (
              <div
                key={index}
                className={`w-16 h-16 rounded-full overflow-hidden cursor-pointer ${editBanner.image === img ? 'border-4 border-white' : ''}`}
                onClick={() => setEditBanner({ ...editBanner, image: img })}
              >
                <Image src={img} alt={`Option ${index + 1}`} width={64} height={64} />
              </div>
            ))}
          </div>
          <label className="block text-sm font-medium mb-2">Upload Custom Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
          />
        </div>
        <label className="block mb-2">
          Title:
          <input
            type="text"
            name="title"
            value={editBanner.title}
            onChange={handleChange}
            className="block w-full p-2 mt-1 border rounded text-black"
          />
        </label>
        <label className="block mb-2">
          Description:
          <textarea
            name="description"
            value={editBanner.description}
            onChange={handleChange}
            className="block w-full p-2 mt-1 border rounded text-black"
          />
        </label>
        <label className="block mb-2">
          CTA:
          <input
            type="text"
            name="cta"
            value={editBanner.cta}
            onChange={handleChange}
            className="block w-full p-2 mt-1 border rounded text-black"
          />
        </label>
        <label className="block mb-4">
          Background Template:
          <input
            type="text"
            name="backgroundTemplate"
            value={editBanner.backgroundTemplate}
            onChange={handleChange}
            className="block w-full p-2 mt-1 border rounded text-black"
          />
        </label>
        <div className="flex justify-between">
          <button onClick={handleSave} className="bg-blue-500 text-white py-2 px-4 rounded mr-2">Done</button>
          <button onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditBannerBs;
