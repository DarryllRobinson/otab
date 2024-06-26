import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { userService } from './features/users/user.service';

import App from './App';

// attempt silent token refresh before startup
userService.refreshToken().finally(startApp);

//startApp();

function startApp() {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
