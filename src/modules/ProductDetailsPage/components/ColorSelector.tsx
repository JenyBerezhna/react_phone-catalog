export const ColorSelector = ({
  colors,
  selected,
  onSelect,
}: {
  colors: string[];
  selected: string;
  onSelect: (c: string) => void;
}) => (
  <div className="color-selector">
    {colors.map(color => (
      <label key={color}>
        <input
          type="radio"
          name="color"
          value={color}
          checked={selected === color}
          onChange={() => onSelect(color)}
        />
        {color}
      </label>
    ))}
  </div>
);
