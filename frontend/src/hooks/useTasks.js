import { useState, useEffect } from 'react';
import { fetchTasks } from '../api';

export function useTasks(query, status, page, pageSize) {
  const [tasks, setTasks] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
      setError(null);

      fetchTasks({ query, status, page, pageSize })
        .then((data) => {
          setTasks(data.items || []);
          setTotal(data.total || 0);
        })
        .catch((err) => {
          setError(err.message || 'Failed to load tasks.');
        })
        .finally(() => {
          setLoading(false);
        });
    }, 300);

    return () => clearTimeout(timer);
  }, [query, status, page, pageSize]);

  return { tasks, total, loading, error };
}