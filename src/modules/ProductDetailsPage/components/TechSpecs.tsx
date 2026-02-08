interface Product {
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  battery: string;
  camera: string;
  weight: string;
}

export const TechSpecs = ({ product }: { product: Product }) => (
  <div className="tech-specs">
    <h2>Tech specs</h2>
    <ul>
      <li>Screen: {product.screen}</li>
      <li>Resolution: {product.resolution}</li>
      <li>Processor: {product.processor}</li>
      <li>RAM: {product.ram}</li>
      <li>Battery: {product.battery}</li>
      <li>Camera: {product.camera}</li>
      <li>Weight: {product.weight}</li>
    </ul>
  </div>
);
