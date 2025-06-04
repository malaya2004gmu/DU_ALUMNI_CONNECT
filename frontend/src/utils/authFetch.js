export async function authFetch(url, options = {}) {
  const token = localStorage.getItem("token");
  const headers = {
    ...options.headers,
    Authorization: token ? `Bearer ${token}` : "",
  };

  const response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    // Token expired or invalid
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redirect to login
    return;
  }

  return response;
}