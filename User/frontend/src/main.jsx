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
import Genetic_Plan from './screens/Genetic_Engineering/Genetic_Plan.jsx';
import Genetic_Trait from './screens/Genetic_Engineering/Genetic_Trait.jsx';
import Genetic_DB from './screens/Genetic_Engineering/Genetic_DB.jsx';
import CropDetailModal from './screens/Genetic_Engineering/CropDetailModel.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />


      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfileScreen />} />

        {/* Genetic Engineering */}
        <Route path='/genetic_home' element={<Genetic_Home />} />
        <Route path='/genetic_plan' element={<Genetic_Plan />} />
        <Route path='/genetic_trait' element={<Genetic_Trait />} />
        <Route path='/genetic_db' element={<Genetic_DB />} />
        <Route path='/crop_model' element={<CropDetailModal />} />

        {/* Fertilizer Recommender */}
        <Route path='/fertilizer_home' element={<Fertilizer_home />} />

        {/* Fertilizer Distribution */}
        <Route path='/warehouse_home' element={<Warehouse_Home />}/>

        {/* Pest & Disease */}
        <Route path='/pest_home' element={<Pest_Home />}/>

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
