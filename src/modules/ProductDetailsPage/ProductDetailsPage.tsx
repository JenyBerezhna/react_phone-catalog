import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { WithLoader } from '../../components/WithLoader';
import { useProductDetails } from '../../hooks/useProductDetails';
import { useSuggestedProducts } from '../../hooks/useSuggestedProducts';
import { ProductsSlider } from '../HomePage/components/ProductsSlider';
import { BackButton } from '../../components/BackButton/BackButton';

export const ProductDetailsPage = () => {
  const { productId } = useParams();

  const { product, loading, error } = useProductDetails(productId!);
  const { suggested, loadingSuggested, errorSuggested } = useSuggestedProducts(
    productId!,
  );

  const [selectedImage, setSelectedImage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');

  // Default color
  useEffect(() => {
    if (product?.colorsAvailable?.length && !selectedColor) {
      setSelectedColor(product.colorsAvailable[0]);
    }
  }, [product?.colorsAvailable, selectedColor]);

  // Default capacity
  useEffect(() => {
    if (product?.capacityAvailable?.length && !selectedCapacity) {
      setSelectedCapacity(product.capacityAvailable[0]);
    }
  }, [product?.capacityAvailable, selectedCapacity]);

  if (loading || error) {
    return (
      <WithLoader loading={loading} error={error}>
        {null}
      </WithLoader>
    );
  }

  if (!product) {
    return <p>Product was not found</p>;
  }

  return (
    <section className="product-details">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          {
            // eslint-disable-next-line max-len
            label:
              product.category[0].toUpperCase() + product.category.slice(1),
            to: `/${product.category}`,
          },
          { label: product.name },
        ]}
      />

      {/* Back button */}
      <BackButton className="product-details__back" />

      <div className="product-details__content">
        {/* Gallery */}
        <div className="product-details__gallery">
          <img
            src={selectedImage || product.images[0]}
            alt={product.name}
            className="product-details__main-image"
          />

          <div className="product-details__thumbnails">
            {product.images.map(img => (
              <button
                key={img}
                onClick={() => setSelectedImage(img)}
                className={`product-details__thumbnail ${
                  selectedImage === img ? 'is-active' : ''
                }`}
              >
                <img src={img} alt={product.name} />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="product-details__info">
          <h1 className="product-details__title">{product.name}</h1>

          {/* Price */}
          <div className="product-details__price-block">
            <span className="product-details__price--discount">
              ${product.priceDiscount}
            </span>
            <span className="product-details__price--regular">
              ${product.priceRegular}
            </span>
          </div>

          {/* Color selector */}
          <div className="product-details__section">
            <p className="product-details__label">Available colors</p>
            <div className="product-details__colors">
              {product.colorsAvailable.map(color => {
                const id = `color-${color}`;

                return (
                  <div key={color} className="product-details__color-option">
                    <input
                      id={id}
                      type="radio"
                      name="color"
                      value={color}
                      checked={selectedColor === color}
                      onChange={() => setSelectedColor(color)}
                      style={{ display: 'none' }}
                    />

                    <label
                      htmlFor={id}
                      className="product-details__color-label"
                      aria-labelledby={id}
                    >
                      <span className={`color-circle color-${color}`}></span>
                    </label>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Capacity selector */}
          <div className="product-details__section">
            <p className="product-details__label">Select capacity</p>
            <div className="product-details__capacities">
              {product.capacityAvailable.map(cap => {
                const id = `capacity-${cap}`;

                return (
                  <div key={cap} className="product-details__capacity-option">
                    <input
                      id={id}
                      type="radio"
                      name="capacity"
                      value={cap}
                      checked={selectedCapacity === cap}
                      onChange={() => setSelectedCapacity(cap)}
                    />

                    <label htmlFor={id}>
                      <span>{cap}</span>
                    </label>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tech specs */}
          <div className="product-details__tech-specs">
            <h2>Tech specs</h2>
            <ul>
              <li>
                <strong>Screen:</strong> {product.screen}
              </li>
              <li>
                <strong>Resolution:</strong> {product.resolution}
              </li>
              <li>
                <strong>Processor:</strong> {product.processor}
              </li>
              <li>
                <strong>RAM:</strong> {product.ram}
              </li>
              <li>
                <strong>Camera:</strong> {product.camera}
              </li>
              <li>
                <strong>Zoom:</strong> {product.zoom}
              </li>
              <li>
                <strong>Cell:</strong> {product.cell.join(', ')}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* About section */}
      <div className="product-details__about">
        <h2>About</h2>
        {product.description.map(block => (
          <div key={block.title} className="product-details__about-block">
            <h3>{block.title}</h3>
            {block.text.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
          </div>
        ))}
      </div>

      {/* Suggested products */}
      <WithLoader loading={loadingSuggested} error={errorSuggested}>
        {suggested.length > 0 && (
          <div className="product-details__suggested">
            <h2>You may also like</h2>
            <ProductsSlider
              title="You may also like"
              products={suggested}
              showDiscount={true}
            />
          </div>
        )}
      </WithLoader>
    </section>
  );
};
