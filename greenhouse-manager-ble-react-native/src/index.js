import React from 'react';

import {StatusBar} from 'react-native';

// import './Config/ReactotronConfig';

import Routes from './routes';

// import { Container } from './styles';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="green" />
      <Routes />
    </>
  );
}
