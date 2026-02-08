import { useParams } from 'react-router-dom';

import { Breadcrumbs } from './components/Breadcrumbs';
import { BackButton } from './components/BackButton';
import { ImageSelector } from './components/ImageSelector';
import { ColorSelector } from './components/ColorSelector';
import { CapacitySelector } from './components/CapacitySelector';
import { TechSpecs } from './components/TechSpecs';
import { AboutSection } from './components/AboutSection';
// eslint-disable-next-line max-len
import { SuggestedProducts } from '../ProductDetailsPage/components/SuggestedProducts/SuggestedProducts';

import { useProductDetails } from '../../hooks/useProductDetails';
import { useSuggestedProducts } from '../../hooks/useSuggestedProducts';
import { useState } from 'react';
import { WithLoader } from '../../components/WithLoader';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const { product, loading, error } = useProductDetails(productId!);
  const { suggested, loadingSuggested, errorSuggested } = useSuggestedProducts(
    productId!,
  );

  const [selectedImage, setSelectedImage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');

  return (
    <WithLoader loading={loading} error={error}>
      {!product ? (
        <p>Product was not found</p>
      ) : (
        <section className="product-details">
          <Breadcrumbs category={product.category} name={product.name} />
          <BackButton />

          <div className="product-details__content">
            <ImageSelector
              images={product.images}
              selected={selectedImage || product.images[0]}
              onSelect={setSelectedImage}
            />

            <div className="product-details__info">
              <h1>{product.name}</h1>

              <ColorSelector
                colors={product.colorsAvailable}
                selected={selectedColor || product.color}
                onSelect={setSelectedColor}
              />

              <CapacitySelector
                capacities={product.capacityAvailable}
                selected={selectedCapacity || product.capacity}
                onSelect={setSelectedCapacity}
              />

              <TechSpecs product={product} />
            </div>
          </div>

          <AboutSection description={product.description} />

          <WithLoader loading={loadingSuggested} error={errorSuggested}>
            <SuggestedProducts products={suggested} />
          </WithLoader>
        </section>
      )}
    </WithLoader>
  );
};
