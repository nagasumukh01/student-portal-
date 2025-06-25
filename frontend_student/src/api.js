// Centralized API utility for backend communication
const API_BASE = '/api/students';

async function handleResponse(res) {
  const text = await res.text();
  try {
    const data = JSON.parse(text);
    if (!res.ok) throw data;
    return data;
  } catch (e) {
    if (!res.ok) throw { error: text };
    return text;
  }
}

export async function fetchStudentsPaged({ search = '', page = 0, size = 10 }) {
  const res = await fetch(`${API_BASE}/paged?search=${encodeURIComponent(search)}&page=${page}&size=${size}`);
  return handleResponse(res);
}

export async function fetchStudent(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  return handleResponse(res);
}

export async function createStudent(student) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(student)
  });
  return handleResponse(res);
}

export async function updateStudent(id, student) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(student)
  });
  return handleResponse(res);
}

export async function deleteStudent(id) {
  const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
  return handleResponse(res);
}
