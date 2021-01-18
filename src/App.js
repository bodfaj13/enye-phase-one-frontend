import React from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import Homepage from './pages/homepage/homepage'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Redirect path="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
