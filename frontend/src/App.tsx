

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;/

// App.tsx


// import React from 'react';
// import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
// import LoginPage from './components/Auth/Login';
// import RegisterPage from './components/Auth/Register';
// import WatchlistPage from './components/Watchlist/Watchlist';
// import DashboardPage from './components/Dashboard/Dashboard';

// const App: React.FC = () => {
//   return (
//     <Router>
//       < Routes>
//         <Route path="/login" Component={LoginPage} />
//         <Route path="/register" Component={RegisterPage} />
//         <Route path="/watchlist" Component={WatchlistPage} />
//         <Route path="/" Component={DashboardPage} />
//       </ Routes>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import StockDashboard from './components/Dashboard/Dashboard';

const App: React.FC = () => {
  return (
    <div>
      <StockDashboard />
    </div>
  );
};

export default App;



