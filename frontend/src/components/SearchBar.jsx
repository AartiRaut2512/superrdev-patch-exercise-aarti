export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-container">
      <label htmlFor="task-search" className="search-label">
        Search tasks
      </label>

      <input
        id="task-search"
        type="search"
        className="search-input"
        placeholder="Search tasks..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search tasks"
      />
    </div>
  );
}