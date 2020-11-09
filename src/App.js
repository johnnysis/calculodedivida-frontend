import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import { AppBar, Toolbar, Tab } from '@material-ui/core';
import Home from './components/paginas/Home';
import ConfiguracaoCalculo from './components/paginas/ConfiguracaoCalculo';
import Dividas from './components/paginas/Dividas';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Tab label="Configuração Cálculo" component={Link} to="/configuracaocalculo" className=""></Tab>
          <Tab label="Dívida" component={Link} to="/dividas" className=""></Tab>
        </Toolbar>
      </AppBar>

      <Switch>
        <Route path="/" exact component={ConfiguracaoCalculo} />
        <Route path="/configuracaocalculo/" component={ConfiguracaoCalculo} />
        <Route path="/dividas/" component={Dividas} />
      </Switch>
    </Router>
  );
}

export default App;