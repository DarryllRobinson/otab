import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// attempt silent token refresh before startup
//userService.refreshToken().finally(startApp);

// function startApp() {
//   render(
//     <Router history={history}>
//       <App />
//     </Router>,
//     document.getElementById('app')
//   );
// }
