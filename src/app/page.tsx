"use client";

import { useState } from "react";
import AdBanner from "@/components/ad-banner";
import EditBannerBs from "@/components/edit-banner-bs";
import { banners as initialBanners } from "./adbanners";
import { toast, Toaster } from 'react-hot-toast'

export default function Home() {
  const [banners, setBanners] = useState<any[]>(initialBanners);
  const [editingBanner, setEditingBanner] = useState<any | null>(null);

  const handleEdit = (index: number) => {
    setEditingBanner({ ...banners[index], index });
  };

  const handleSave = (updatedBanner: any) => {
    const updatedBanners = banners.map((banner, index) =>
      index === updatedBanner.index ? updatedBanner : banner
    );
    setBanners(updatedBanners);
    setEditingBanner(null);
  };

  const handleCtaClick = () => {
    toast.success('CTA Clicked!')
  };

  return (
    <main className="flex min-h-screen flex-col text-white bg-black items-center justify-between p-24">
      <Toaster />
      <span className="text-3xl">Banners</span>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 p-4">
        {banners.map((banner, index) => (
          <AdBanner
            key={index}
            title={banner.title}
            description={banner.description}
            cta={banner.cta}
            image={banner.image}
            backgroundTemplate={banner.backgroundTemplate}
            onEdit={() => handleEdit(index)}
            onCtaClick={handleCtaClick}
          />
        ))}
      </div>
      {editingBanner && (
        <EditBannerBs
          banner={editingBanner}
          onClose={() => setEditingBanner(null)}
          onSave={handleSave}
        />
      )}
    </main>
  );
}
