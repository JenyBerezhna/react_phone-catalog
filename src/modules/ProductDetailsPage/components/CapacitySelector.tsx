export const CapacitySelector = ({
  capacities,
  selected,
  onSelect,
}: {
  capacities: string[];
  selected: string;
  onSelect: (c: string) => void;
}) => (
  <div className="capacity-selector">
    {capacities.map(cap => (
      <label key={cap}>
        <input
          type="radio"
          name="capacity"
          value={cap}
          checked={selected === cap}
          onChange={() => onSelect(cap)}
        />
        {cap}
      </label>
    ))}
  </div>
);
