import React, {useState, useEffect} from 'react';

import {
  Container,
  Variable,
  TitleVariable,
  ValueRealTime,
  Line,
  UploadButton,
  UploadButtonText,
} from './styles';

import Icon from 'react-native-vector-icons/MaterialIcons';

import base64 from 'react-native-base64';

import Database from '../../database/database';

const db = new Database();

export default function RealTime({navigation}) {
  const [temperatura, setTemperatura] = useState('0.0');
  const [umidadeAr, setUmidadeAr] = useState('0');
  const [umidadeSolo, setUmidadeSolo] = useState('0');
  const [altura, setAltura] = useState('0');
  const [listener, setListener] = useState({});

  const [perm, setPerm] = useState(false);

  useEffect(() => {
    async function download() {
      const characteristic = navigation.getParam('characteristic');

      const res = await characteristic.monitor(async (error, listen) => {
        const [temp, umAr, umSolo, altu] = base64
          .decode(listen.value)
          .trim()
          .split(',');
        await db.store(temp, umAr, umSolo, altu);
        setTemperatura(temp);
        setUmidadeAr(umAr);
        setUmidadeSolo(umSolo);
        setAltura(altu);
      });
      setListener(res);
    }

    download();
  }, [navigation]);

  useEffect(() => {
    return async () => {
      if (perm) {
        listener.remove();
      }
      setPerm(true);
    };
  }, [listener, perm]);

  return (
    <Container>
      <Variable>
        <TitleVariable>Temperatura</TitleVariable>
        <ValueRealTime>{temperatura}°C</ValueRealTime>
      </Variable>
      <Line />
      <Variable>
        <TitleVariable>Umidade do Ar</TitleVariable>
        <ValueRealTime>{umidadeAr}%</ValueRealTime>
      </Variable>
      <Line />
      <Variable>
        <TitleVariable>Umidade do Solo</TitleVariable>
        <ValueRealTime>{umidadeSolo}%</ValueRealTime>
      </Variable>
      <Line />
      <Variable>
        <TitleVariable>Altura</TitleVariable>
        <ValueRealTime>{altura}cm</ValueRealTime>
      </Variable>
    </Container>
  );
}
