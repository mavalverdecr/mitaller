import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';

import { ApplProvider } from './context/ApplContext';

const App = () => {
  return (
    <ApplProvider>
      <Router>
        <Routes />
      </Router>
    </ApplProvider>
  )
}

export default App;
