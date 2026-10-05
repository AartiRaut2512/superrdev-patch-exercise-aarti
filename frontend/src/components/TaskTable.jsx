export default function TaskTable({ tasks, loading, error }) {
  if (loading) {
    return (
      <div className="state-message" role="status" aria-live="polite">
        Loading tasks...
      </div>
    );
  }

  if (error) {
    return (
      <div className="state-message error" role="alert">
        Unable to load tasks. {error}
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="state-message" role="status">
        No tasks found. Try changing your search or filter.
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="task-table">
        <caption className="sr-only">Task list</caption>

        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Status</th>
            <th scope="col">Priority</th>
            <th scope="col">Assignee</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>

              <td>
                <div className="task-title">
                  {task.title || "Untitled task"}
                </div>

                {task.description && (
                  <div className="task-desc">
                    {task.description}
                  </div>
                )}
              </td>

              <td>
                <span
                  className={`status-badge ${
                    task.status?.toLowerCase() || "unknown"
                  }`}
                >
                  {task.status || "Unknown"}
                </span>
              </td>

              <td>{task.priority || "—"}</td>

              <td>{task.assignee || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}