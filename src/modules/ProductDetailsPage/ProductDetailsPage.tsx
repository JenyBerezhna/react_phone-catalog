import { useParams } from 'react-router-dom';
import { useState } from 'react';

import { WithLoader } from '../../components/WithLoader';
import { useProductDetails } from '../../hooks/useProductDetails';
import { useSuggestedProducts } from '../../hooks/useSuggestedProducts';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const { product, loading, error } = useProductDetails(productId!);
  const { suggested, loadingSuggested, errorSuggested } = useSuggestedProducts(
    productId!,
  );

  const [selectedImage, setSelectedImage] = useState('');

  return (
    <WithLoader loading={loading} error={error}>
      {!product ? (
        <p>Product was not found</p>
      ) : (
        <section className="product-details">
          <div className="product-details__content">
            <div className="product-details__images">
              <img
                src={selectedImage || product.images[0]}
                alt={product.name}
                className="product-details__main-image"
              />

              <div className="product-details__thumbnails">
                {product.images.map((img: string) => (
                  <button
                    key={img}
                    onClick={() => setSelectedImage(img)}
                    className="product-details__thumbnail"
                  >
                    <img src={img} alt={product.name} />
                  </button>
                ))}
              </div>
            </div>

            <div className="product-details__info">
              <h1>{product.name}</h1>

              <p className="product-details__price">
                ${product.price ?? product.fullPrice}
              </p>

              <ul className="product-details__specs">
                <li>Screen: {product.screen}</li>
                <li>Resolution: {product.resolution}</li>
                <li>Processor: {product.processor}</li>
                <li>RAM: {product.ram}</li>
              </ul>
            </div>
          </div>

          <WithLoader loading={loadingSuggested} error={errorSuggested}>
            {suggested.length > 0 && (
              <div className="product-details__suggested">
                <h2>You may also like</h2>
                {/* Render your suggested products however you prefer */}
              </div>
            )}
          </WithLoader>
        </section>
      )}
    </WithLoader>
  );
};
