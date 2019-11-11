import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Conexao from './pages/Conexao';
import Home from './pages/Home';
import Graph from './pages/Graph';
import RealTime from './pages/RealTime';
import Dashboard from './pages/Dashboard';

const Routes = createAppContainer(
  createStackNavigator(
    {Conexao, Home, Graph, RealTime, Dashboard},
    {
      headerLayoutPreset: 'center',
      headerBackTitleVisible: false,
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: 'green',
        },
        headerTintColor: '#FFF',
      },
    },
  ),
);

export default Routes;
