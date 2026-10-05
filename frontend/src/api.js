const API_BASE = '/api';

export async function fetchTasks({
  query = '',
  status = '',
  page = 1,
  pageSize = 10,
  signal,
}) {
  const params = new URLSearchParams();

  if (query.trim()) {
    params.set('q', query.trim());
  }

  if (status) {
    params.set('status', status);
  }

  params.set('page', String(page));
  params.set('pageSize', String(pageSize));

  const url = `${API_BASE}/tasks?${params.toString()}`;

  const response = await fetch(url, { signal });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;

    try {
      const errorData = await response.json();

      if (errorData?.error) {
        message = errorData.error;
      }
    } catch {
      // Keep the default error message if the response isn't JSON.
    }

    throw new Error(message);
  }

  return response.json();
}