import { PRIORITIES, STATUSES } from "../constants";
import FilterSelect from "./FilterSelect";

function Toolbar({ search, priorityFilter, statusFilter, onSearchChange, onPriorityChange, onStatusChange }) {
  return (
    <div className="mb-6 flex flex-col gap-3 rounded-lg border border-gray-800 bg-[#222222] p-3 sm:flex-row">
      <label className="relative min-w-0 flex-1">
        <span className="sr-only">Search task titles</span>
        <span
          className="pointer-events-none absolute left-3 top-2.5 text-gray-500"
          aria-hidden="true"
        >
          ⌕
        </span>
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search task titles..."
          className="w-full rounded-md border border-gray-700 bg-[#1c1c1c] py-2 pl-9 pr-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </label>
      <FilterSelect
        label="Priority"
        value={priorityFilter}
        options={["All", ...PRIORITIES]}
        onChange={onPriorityChange}
      />
      <FilterSelect
        label="Status"
        value={statusFilter}
        options={["All", ...STATUSES]}
        onChange={onStatusChange}
      />
    </div>
  );
}

export default Toolbar;
