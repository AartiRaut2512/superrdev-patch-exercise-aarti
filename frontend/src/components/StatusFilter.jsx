export default function StatusFilter({ value, onChange }) {
  return (
    <div className="filter-container">
      <label htmlFor="status-filter" className="filter-label">
        Filter by status
      </label>

      <select
        id="status-filter"
        className="status-filter"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Filter tasks by status"
      >
        <option value="">All statuses</option>
        <option value="OPEN">Open</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="DONE">Done</option>
      </select>
    </div>
  );
}