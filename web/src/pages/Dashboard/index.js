import React from 'react';
import api from '~/services/api';

function Dashboard() {
  api.get('appointments');
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}

export default Dashboard;
