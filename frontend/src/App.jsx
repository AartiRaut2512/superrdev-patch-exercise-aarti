import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import StatusFilter from './components/StatusFilter';
import TaskTable from './components/TaskTable';
import { useTasks } from './hooks/useTasks';

const PAGE_SIZE = 10;

export default function App() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);

  const { tasks, total, loading, error } = useTasks(
    query,
    status,
    page,
    PAGE_SIZE
  );

  const totalPages = Math.ceil(total / PAGE_SIZE);

  // Reset to the first page whenever the search/filter changes.
  useEffect(() => {
    setPage(1);
  }, [query, status]);

  // Keep the current page valid if the result count changes.
  useEffect(() => {
    if (totalPages > 0 && page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const handlePrevious = () => {
    setPage((currentPage) => Math.max(1, currentPage - 1));
  };

  const handleNext = () => {
    setPage((currentPage) =>
      Math.min(totalPages, currentPage + 1)
    );
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Tracker</h1>
        <p className="subtitle">Internal task management</p>
      </header>

      <main>
        <div className="controls">
          <SearchBar value={query} onChange={setQuery} />
          <StatusFilter value={status} onChange={setStatus} />
        </div>

        <TaskTable
          tasks={tasks}
          loading={loading}
          error={error}
        />

        {totalPages > 1 && (
          <nav className="pagination" aria-label="Task pagination">
            <button
              type="button"
              disabled={page <= 1 || loading}
              onClick={handlePrevious}
              aria-label="Go to previous page"
            >
              Previous
            </button>

            <span aria-live="polite">
              Page {page} of {totalPages}
            </span>

            <button
              type="button"
              disabled={page >= totalPages || loading}
              onClick={handleNext}
              aria-label="Go to next page"
            >
              Next
            </button>
          </nav>
        )}
      </main>
    </div>
  );
}