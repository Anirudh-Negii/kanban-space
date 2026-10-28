function FilterSelect({ label, value, options, onChange }) {
  return (
    <label className="flex items-center gap-2 text-sm text-gray-400">
      <span className="sr-only">{label} filter</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full cursor-pointer rounded-md border border-gray-700 bg-[#1c1c1c] px-3 py-2 text-sm text-gray-200 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:w-auto"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {label}: {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export default FilterSelect;
