// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { fetchProfile } from './services/api';

import Welcome       from './components/Welcome';
import Login         from './components/pages/Auth/Login';
import Register      from './components/pages/Auth/Register';
import MainLayout    from './components/Layout/MainLayout';
import Profile       from './components/pages/Profile/Profile';
import MissionsBoard from './components/pages/Missions/MissionsBoard';
import RewardsBoard  from './components/pages/Rewards/RewardsBoard';
import RankingsBoard from './components/pages/Rankings/RankingsBoard';
import AdminPanel    from './components/pages/Admin/AdminPanel';
import AdminRewards  from './components/pages/Admin/AdminRewards';

function App() {
  const [user, setUser] = useState(() => {
    const json = localStorage.getItem('currentUser');
    return json ? JSON.parse(json) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('basicAuth');
    }
  }, [user]);

  const refreshUserProfile = async () => {
    try {
      const data = await fetchProfile();
      setUser(data);
    } catch (e) {
      console.error('No se pudo refrescar perfil', e);
    }
  };

  return (
    <Routes>
      {!user ? (
        <>
          <Route path="/welcome"  element={<Welcome />} />
          <Route path="/login"    element={<Login   onLogin={setUser} />} />
          <Route path="/register" element={<Register onRegister={setUser} />} />
          <Route path="*"         element={<Navigate to="/welcome" replace />} />
        </>
      ) : (
        <Route element={<MainLayout user={user} onLogout={() => setUser(null)} />}>
          <Route index           element={<Navigate to="profile" replace />} />
          <Route
            path="profile"
            element={<Profile user={user} />}
          />
          <Route
            path="missions"
            element={<MissionsBoard user={user} onRefreshUser={refreshUserProfile} />}
          />
          <Route
            path="rewards"
            element={<RewardsBoard user={user} onRefreshUser={refreshUserProfile} />}
          />
          <Route
            path="rankings"
            element={<RankingsBoard user={user} />}
          />
          <Route
            path="admin"
            element={
              user.role === 'ADMIN'
                ? <AdminPanel user={user} />
                : <Navigate to="profile" replace/>
            }
          />
          <Route
            path="admin/rewards"
            element={
              user.role === 'ADMIN'
                ? <AdminRewards />
                : <Navigate to="profile" replace/>
            }
          />
          <Route path="*" element={<Navigate to="profile" replace />} />
        </Route>
      )}
    </Routes>
  );
}

export default App;
