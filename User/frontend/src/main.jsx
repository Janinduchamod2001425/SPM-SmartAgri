import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

import Genetic_Home from './screens/Genetic_Engineering/Genetic_Home.jsx';
import Fertilizer_home from './screens/Fertilizer/Fertilizer_home.jsx';
import Warehouse_Home from './screens/Warehouse/Warehouse_Home.jsx';
import Pest_Home from './screens/Pest_Disease/Pest_Home.jsx';
import FertilizerFeedback from './screens/Fertilizer/FertilizerFeedback.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />


      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfileScreen />} />
        <Route path='/genetic_home' element={<Genetic_Home />} />
        <Route path='/fertilizer_home' element={<Fertilizer_home />} />
        <Route path='/warehouse_home' element={<Warehouse_Home />}/>
        <Route path='/pest_home' element={<Pest_Home />}/>
        <Route path='/fertilizer_feedback' element={<FertilizerFeedback/>}/>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
