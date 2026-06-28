'use client';
import React from 'react';
import StaggeredGrid from '@/components/ui/staggered-grid';
import { Layers, Cuboid, Aperture } from 'lucide-react';

import capinstaImg from '@/app/capinsta.webp';

const PRODUCT_IMAGES: string[] = [];

const BENTO_ITEMS = [
  {
    id: 'capinsta',
    title: "Capinsta",
    subtitle: "Product",
    description: "Capinsta Platform",
    icon: <Layers className="w-5 h-5" />,
    image: capinstaImg.src,
    link: "https://capinsta.huygenstudios.com/"
  }
];

export default function HuygenProducts() {
  return (
    <div className="relative w-full overflow-hidden bg-black pt-20 pb-0">
      <StaggeredGrid 
        images={PRODUCT_IMAGES}
        bentoItems={BENTO_ITEMS}
        centerText="Products"
        showFooter={false}
      />
    </div>
  );
}
