import React from 'react';
import { BrowserRouter as Router , Route} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footers from './components/Footers';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import Homepage from './components/Homepage';




const App = () => {
  return (
    
    <Router>
      <Header />
      <main className="py-3">
        <Container>
         <Route path='/login' component={LoginScreen}></Route>
         <Route path='/register' component={RegisterScreen}></Route>
         <Route path='/profile' component={ProfileScreen} />
        

         </Container>
      </main>
      <Footers />


    </Router>
  );
};

export default App;
