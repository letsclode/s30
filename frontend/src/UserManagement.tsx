import React, { useEffect, useState } from 'react';
import { fetchUsers, createUser } from './api';

const rolesList = ['Author', 'Editor', 'Subscriber', 'Administrator'];

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [roleFilter, setRoleFilter] = useState<string>('');
  const [form, setForm] = useState({ name: '', email: '', roles: [] as string[] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await fetchUsers(roleFilter);
      setUsers(data);
      setError(null);
    } catch (err: any) {
      setError('Failed to fetch users');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, [roleFilter]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setForm((prev) => ({
        ...prev,
        roles: checked
          ? [...prev.roles, value]
          : prev.roles.filter((r) => r !== value),
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUser(form);
      setForm({ name: '', email: '', roles: [] });
      loadUsers();
      setError(null);
    } catch (err: any) {
      setError('Failed to create user');
    }
    setLoading(false);
  };

  return (
    <div style={{
      maxWidth: 500,
      margin: '3rem auto',
      padding: '2.5rem',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      borderRadius: 16,
      boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      border: '1px solid #e2e8f0',
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#334155', letterSpacing: 1 }}>User Management</h2>
      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 12 }}>
        <label style={{ fontWeight: 500, color: '#475569' }}>Filter by Role:</label>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          style={{
            padding: '0.4rem 1rem',
            borderRadius: 6,
            border: '1px solid #cbd5e1',
            background: '#fff',
            fontSize: 15,
            color: '#334155',
            outline: 'none',
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
          }}
        >
          <option value="">All</option>
          {rolesList.map((role) => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
      </div>
      {loading && <p style={{ textAlign: 'center', color: '#64748b' }}>Loading...</p>}
      {error && <p style={{ color: '#ef4444', textAlign: 'center', marginBottom: 12 }}>{error}</p>}
      <ul style={{
        listStyle: 'none',
        padding: 0,
        marginBottom: '2rem',
      }}>
        {users.map((user) => (
          <li
            key={user.id}
            style={{
              background: '#fff',
              borderRadius: 8,
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              marginBottom: 10,
              padding: '0.75rem 1rem',
              display: 'flex',
              flexDirection: 'column',
              transition: 'box-shadow 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.10)')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)')}
          >
            <span style={{ fontWeight: 600, color: '#334155', fontSize: 16 }}>{user.name}</span>
            <span style={{ color: '#64748b', fontSize: 14 }}>{user.email}</span>
            <span style={{ color: '#0ea5e9', fontSize: 13, marginTop: 2 }}>Roles: {user.roles?.join(', ')}</span>
          </li>
        ))}
        {users.length === 0 && !loading && (
          <li style={{ textAlign: 'center', color: '#64748b', padding: '1rem' }}>No users found.</li>
        )}
      </ul>
      <h3 style={{ color: '#334155', marginBottom: '1rem', fontWeight: 500 }}>Create User</h3>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          background: '#f1f5f9',
          padding: '1.25rem',
          borderRadius: 10,
          boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleFormChange}
          required
          style={{
            padding: '0.5rem 1rem',
            borderRadius: 6,
            border: '1px solid #cbd5e1',
            fontSize: 15,
            outline: 'none',
            background: '#fff',
            color: '#334155',
          }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleFormChange}
          required
          style={{
            padding: '0.5rem 1rem',
            borderRadius: 6,
            border: '1px solid #cbd5e1',
            fontSize: 15,
            outline: 'none',
            background: '#fff',
            color: '#334155',
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontWeight: 500, color: '#475569', marginBottom: 2 }}>Roles:</span>
          <div style={{ display: 'flex', gap: 12 }}>
            {rolesList.map((role) => (
              <label key={role} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 14, color: '#334155' }}>
                <input
                  type="checkbox"
                  name="roles"
                  value={role}
                  checked={form.roles.includes(role)}
                  onChange={handleFormChange}
                  style={{ accentColor: '#0ea5e9', width: 16, height: 16 }}
                />
                {role}
              </label>
            ))}
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '0.6rem 1.5rem',
            borderRadius: 6,
            border: 'none',
            background: loading ? '#94a3b8' : '#0ea5e9',
            color: '#fff',
            fontWeight: 600,
            fontSize: 16,
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 1px 4px rgba(14,165,233,0.08)',
            transition: 'background 0.2s',
          }}
        >
          {loading ? 'Creating...' : 'Create User'}
        </button>
      </form>
    </div>
  );
};

export default UserManagement;
