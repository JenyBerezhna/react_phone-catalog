export const ImageSelector = ({
  images,
  selected,
  onSelect,
}: {
  images: string[];
  selected: string;
  onSelect: (img: string) => void;
}) => (
  <div className="image-selector">
    {images.map(img => (
      <img
        key={img}
        src={img}
        alt=""
        className={selected === img ? 'active' : ''}
        onClick={() => onSelect(img)}
      />
    ))}
  </div>
);
