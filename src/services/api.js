// src/services/api.js
import axios from 'axios'

// 1) Instancia apuntando al backend
const API = axios.create({
  baseURL: 'http://localhost:8080/api'
})

// 2) Interceptor para inyectar BasicAuth
API.interceptors.request.use(config => {
  const basic = localStorage.getItem('basicAuth')
  if (basic) config.headers.Authorization = `Basic ${basic}`
  return config
})

/** — AUTHENTICATION — */

// Registro de usuario
export async function register({ username, email, password, avatarClass }) {
  localStorage.removeItem('basicAuth')
  const { data } = await API.post('/users', {
    username,
    email,
    password,
    avatarClass
  })
  return data
}

// Login (HTTP Basic)
export async function authenticate({ username, password }) {
  const basic = btoa(`${username}:${password}`)
  localStorage.setItem('basicAuth', basic)
  const { data } = await API.get('/users/me')
  return data
}

// Recuperar perfil (incluye monedas, XP actualizadas, etc.)
export async function fetchProfile() {
  const { data } = await API.get('/users/me')
  return data
}

/** — PLAYER FLOWS (ROLE_USER) — */

// Misiones pendientes
export async function fetchMissions() {
  const { data } = await API.get('/users/me/missions')
  return data
}

// Completar misión (desc + adjunto opcional)
export async function completeMission({ missionId, description, attachment }) {
  const form = new FormData()
  if (description) form.append('description', description)
  if (attachment)  form.append('attachment', attachment)
  await API.post(`/users/me/missions/${missionId}/complete`, form)
}

// Listar recompensas (para usuarios)
export async function fetchRewards() {
  const { data } = await API.get('/rewards')
  return data
}

// Canjear recompensa
// Simplificamos: sólo pasamos rewardId; backend lee Principal para saber quién canjea.
export async function redeemReward(rewardId) {
  await API.post(`/rewards/${rewardId}/redeem`)
}

// Listar ranking (público)
export async function fetchRankings() {
  const { data } = await API.get('/rankings')
  return data
}

// Listar recompensas canjeadas (admin), pero ya agrupadas bajo AdminRewards
export async function fetchRedeemedRewards() {
  const { data } = await API.get('/admin/rewards/redeemed')
  return data
}

/** — ADMIN FLOWS (ROLE_ADMIN) — */

// Listar todos los usuarios
export async function fetchUsers() {
  const { data } = await API.get('/admin/users')
  return data
}

// Listar todas las misiones (CRUD)
export async function fetchAllMissions() {
  const { data } = await API.get('/admin/missions')
  return data
}

// Crear una misión (título, description, difficulty, dueDate…)
export async function createMission(missionPayload) {
  const { data } = await API.post('/admin/missions', missionPayload)
  return data
}

// Actualizar misión existente
export async function updateMission(missionId, missionPayload) {
  const { data } = await API.put(`/admin/missions/${missionId}`, missionPayload)
  return data
}

// Borrar misión
export async function deleteMission(missionId) {
  await API.delete(`/admin/missions/${missionId}`)
}

// Listar misiones asignadas a un usuario
export async function fetchUserMissions(userId) {
  const { data } = await API.get(`/admin/users/${userId}/missions`)
  return data
}

// Listar misiones completadas por un usuario (con descripción y adjunto)
export async function fetchUserCompletedMissions(userId) {
  const { data } = await API.get(`/admin/users/${userId}/missions/completed`)
  return data
}

// Asignar misión a un usuario
export async function assignMissionToUser(userId, missionId) {
  await API.post(`/admin/users/${userId}/missions/${missionId}/assign`)
}

// Revocar misión asignada a un usuario
export async function revokeMissionFromUser(userId, missionId) {
  await API.delete(`/admin/users/${userId}/missions/${missionId}`)
}

/** — ADMIN REWARDS (ROLE_ADMIN) — */

// 1) Listar todas las recompensas (administrador)
export async function fetchAdminRewards() {
  const { data } = await API.get('/admin/rewards')
  return data
}

// 2) Crear nueva recompensa (admin)
export async function createReward(rewardPayload) {
  const { data } = await API.post('/admin/rewards', rewardPayload)
  return data
}

// 3) Actualizar recompensa existente (admin)
export async function updateReward(rewardId, rewardPayload) {
  const { data } = await API.put(`/admin/rewards/${rewardId}`, rewardPayload)
  return data
}

// 4) Borrar recompensa (admin)
export async function deleteReward(rewardId) {
  await API.delete(`/admin/rewards/${rewardId}`)
}

// 5) Listar todos los canjes de una recompensa específica (admin)
export async function fetchRedeemedByReward(rewardId) {
  const { data } = await API.get(`/admin/rewards/${rewardId}/redeemed`)
  return data
}

export default API
