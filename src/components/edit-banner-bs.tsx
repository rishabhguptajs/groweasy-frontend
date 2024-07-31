import { useState, useEffect } from 'react';

interface EditBannerTemplateBsProps {
  banner: any;
  onClose: () => void;
  onSave: (updatedBanner: any) => void;
}

const EditBannerBs: React.FC<EditBannerTemplateBsProps> = ({ banner, onClose, onSave }) => {
  const [editBanner, setEditBanner] = useState(banner);

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

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-end justify-center z-50">
      <div className="bg-black text-white w-full max-w-md p-4 rounded-t-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Banner</h2>
        <label className="block mb-2">
          Title:
          <input
            type="text"
            name="title"
            value={editBanner.title}
            onChange={handleChange}
            className="block w-full p-2 border rounded text-black"
          />
        </label>
        <label className="block mb-2">
          Description:
          <textarea
            name="description"
            value={editBanner.description}
            onChange={handleChange}
            className="block w-full p-2 border rounded text-black"
          />
        </label>
        <label className="block mb-2">
          CTA:
          <input
            type="text"
            name="cta"
            value={editBanner.cta}
            onChange={handleChange}
            className="block w-full p-2 border rounded text-black"
          />
        </label>
        <label className="block mb-2">
          Image URL:
          <input
            type="text"
            name="image"
            value={editBanner.image}
            onChange={handleChange}
            className="block w-full p-2 border rounded text-black"
          />
        </label>
        <label className="block mb-4">
          Background Template:
          <input
            type="text"
            name="backgroundTemplate"
            value={editBanner.backgroundTemplate}
            onChange={handleChange}
            className="block w-full p-2 border rounded text-black"
          />
        </label>
        <button onClick={handleSave} className="bg-blue-500 text-white py-2 px-4 rounded mr-2">Save</button>
        <button onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded">Cancel</button>
      </div>
    </div>
  );
};

export default EditBannerBs;
