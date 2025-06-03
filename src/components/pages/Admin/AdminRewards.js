// src/components/pages/Admin/AdminRewards.jsx
import React, { useEffect, useState } from 'react';
import {
  fetchAdminRewards,
  createReward,
  updateReward,
  deleteReward,
  fetchRedeemedByReward
} from '../../../services/api';

export default function AdminRewards() {
  const [rewards, setRewards] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ name: '', description: '', cost: '' });
  const [redemptions, setRedemptions] = useState({}); // { rewardId: [UserRewardDto] }
  const [error, setError] = useState('');

  useEffect(() => {
    loadRewards();
  }, []);

  async function loadRewards() {
    try {
      const data = await fetchAdminRewards();
      setRewards(data);
    } catch (e) {
      console.error('No se pudieron cargar las recompensas:', e);
      setError('No se pudieron cargar las recompensas.');
    }
  }

  function clearForm() {
    setSelected(null);
    setForm({ name: '', description: '', cost: '' });
    setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || form.cost.trim() === '') {
      setError('El nombre y el costo son obligatorios.');
      return;
    }
    try {
      const payload = {
        name: form.name,
        description: form.description,
        cost: parseInt(form.cost, 10)
      };
      if (selected) {
        // EDITAR
        const updated = await updateReward(selected.id, payload);
        setRewards(r => r.map(x => (x.id === updated.id ? updated : x)));
      } else {
        // CREAR
        const created = await createReward(payload);
        setRewards(r => [...r, created]);
      }
      clearForm();
    } catch (err) {
      console.error(err);
      setError('Error al guardar la recompensa.');
    }
  }

  async function handleDelete(rId) {
    if (!window.confirm('¿Borrar esta recompensa?')) return;
    try {
      await deleteReward(rId);
      setRewards(r => r.filter(x => x.id !== rId));
      setRedemptions(rp => {
        const copy = { ...rp };
        delete copy[rId];
        return copy;
      });
    } catch (err) {
      console.error(err);
      alert('No se pudo borrar la recompensa.');
    }
  }

  function startEdit(r) {
    setSelected(r);
    setForm({
      name: r.name,
      description: r.description || '',
      cost: String(r.cost),
    });
    setError('');
  }

  async function toggleRedeemed(rId) {
    if (redemptions[rId]) {
      setRedemptions(rp => {
        const copy = { ...rp };
        delete copy[rId];
        return copy;
      });
    } else {
      try {
        const data = await fetchRedeemedByReward(rId);
        setRedemptions(rp => ({ ...rp, [rId]: data }));
      } catch (err) {
        console.error(err);
        alert('Error al cargar los canjes de esta recompensa.');
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0e27] flex flex-col items-center p-6 space-y-8">
      <h1 className="text-4xl font-semibold text-white">Admin: Gestionar Recompensas</h1>

      {/* ───── Formulario crear/editar ───── */}
      <div className="w-full max-w-xl bg-gray-800 p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl text-white mb-4">
          {selected ? 'Editar Recompensa' : 'Crear nueva Recompensa'}
        </h2>
        {error && <p className="text-red-400 mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-200">Nombre</label>
            <input
              type="text"
              className="w-full mt-1 px-3 py-2 rounded-lg bg-gray-700 text-white"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-gray-200">Descripción</label>
            <textarea
              className="w-full mt-1 px-3 py-2 rounded-lg bg-gray-700 text-white"
              rows={3}
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-gray-200">Costo (monedas)</label>
            <input
              type="number"
              className="w-full mt-1 px-3 py-2 rounded-lg bg-gray-700 text-white"
              value={form.cost}
              onChange={e => setForm(f => ({ ...f, cost: e.target.value }))}
            />
          </div>
          <div className="flex justify-end space-x-3">
            {selected && (
              <button
                type="button"
                onClick={clearForm}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
              >
                Cancelar
              </button>
            )}
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {selected ? 'Guardar Cambios' : 'Crear Recompensa'}
            </button>
          </div>
        </form>
      </div>

      {/* ───── Listado de recompensas ───── */}
      <div className="w-full max-w-3xl bg-gray-800 p-6 rounded-2xl shadow-lg space-y-4">
        {rewards.length === 0 ? (
          <p className="text-gray-400">No hay recompensas registradas.</p>
        ) : (
          rewards.map(r => (
            <div
              key={r.id}
              className="bg-gray-700 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0"
            >
              <div>
                <p className="text-white text-lg font-semibold">{r.name}</p>
                <p className="text-gray-300">{r.description || '— Sin descripción —'}</p>
                <p className="text-gray-400 italic">Precio: {r.cost} monedas</p>
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <button
                  onClick={() => startEdit(r)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(r.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Borrar
                </button>
                <button
                  onClick={() => toggleRedeemed(r.id)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                >
                  {redemptions[r.id] ? 'Ocultar Canjes' : 'Ver Canjes'}
                </button>
              </div>
              {redemptions[r.id] && (
                <div className="w-full mt-4 bg-gray-600 p-4 rounded-lg">
                  <h3 className="text-gray-200 mb-2">Usuarios que canjearon:</h3>
                  {redemptions[r.id].length === 0 ? (
                    <p className="text-gray-400">— Ningún usuario lo ha canjeado aún —</p>
                  ) : (
                    <ul className="space-y-2">
                      {redemptions[r.id].map((ur, idx) => (
                        <li key={idx} className="bg-gray-700 p-3 rounded-lg flex justify-between">
                          <span className="text-white">{ur.getUsername()}</span>
                          <span className="text-gray-300 italic text-sm">
                            {new Date(ur.getRedeemedAt()).toLocaleString()}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
