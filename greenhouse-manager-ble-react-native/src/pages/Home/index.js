import React, {useState, useEffect} from 'react';

import base64 from 'react-native-base64';

import {
  Container,
  TitleSlider,
  Slider,
  Variaveis,
  ValueSliderText,
  Picker,
  UploadButton,
  UploadButtonText,
  ScrollView,
  Cultivo,
  CultivoRow,
  ContainerButons,
  IconStyled,
  TextInput,
} from './styles';

function Home({navigation}) {
  const [temperatura, setTemperatura] = useState(0);
  const [umidadeAr, setUmidadeAr] = useState(0);
  const [umidadeSolo, setUmidadeSolo] = useState(0);
  const [temperaturaText, setTemperaturaText] = useState('');
  const [umidadeArText, setUmidadeArText] = useState('');
  const [umidadeSoloText, setUmidadeSoloText] = useState('');
  const [cultivo, setCultivo] = useState('166585');
  const [characteristic] = useState(navigation.getParam('characteristic'));
  const [periodo, setPeriodo] = useState('60');

  useEffect(() => {
    const [temp, humAr, humSolo] = [
      parseInt(cultivo.slice(0, 2), 10),
      parseInt(cultivo.slice(2, 4), 10),
      parseInt(cultivo.slice(4, 6), 10),
    ];
    console.tron.log(navigation);

    setTemperatura(temp);
    setUmidadeAr(humAr);
    setUmidadeSolo(humSolo);
    setTemperaturaText(temp);
    setUmidadeArText(humAr);
    setUmidadeSoloText(humSolo);
  }, [cultivo, navigation]);

  const upload = async () => {
    const response =
      temperatura +
      ',' +
      umidadeAr +
      ',' +
      umidadeSolo +
      ',' +
      (periodo.toString() * 60 * 1000).toString();
    const res = await characteristic.writeWithoutResponse(
      base64.encode(response),
    );
    console.tron.log(res);
  };

  const handleNavigateRealTime = () => {
    navigation.navigate('RealTime', {characteristic: characteristic});
  };

  const handleNavigateBD = () => {
    navigation.navigate('Graph');
  };

  return (
    <ScrollView>
      <Container>
        <Cultivo>
          <CultivoRow>
            <TitleSlider>Cultivo</TitleSlider>
            <Picker
              selectedValue={cultivo}
              onValueChange={val => setCultivo(val)}>
              <Picker.Item label="Alcaçuz" value="166585" />
              <Picker.Item label="Alfazema" value="206570" />
              <Picker.Item label="Babosa" value="266060" />
              <Picker.Item label="Boldo-do-chile" value="246080" />
              <Picker.Item label="Calêndula" value="246080" />
              <Picker.Item label="Hortelã" value="187045" />
              <Picker.Item label="Malva" value="246080" />
            </Picker>
          </CultivoRow>
          <CultivoRow>
            <TitleSlider>Intervalo Coleta dados</TitleSlider>
            <CultivoRow>
              <TextInput
                keyboardType="number-pad"
                value={periodo}
                onChangeText={value => setPeriodo(value)}
              />
              <TitleSlider>minutos</TitleSlider>
            </CultivoRow>
          </CultivoRow>
        </Cultivo>
        <Variaveis>
          <TitleSlider>Temperatura</TitleSlider>
          <Slider
            value={temperatura}
            step={1}
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor="#35b7fc"
            maximumTrackTintColor="#fc6860"
            thumbTintColor="#00ba09"
            onValueChange={val => setTemperaturaText(val)}
            onSlidingComplete={val => setTemperatura(val)}
          />
          <ValueSliderText>{`${temperaturaText}°C`}</ValueSliderText>
        </Variaveis>
        <Variaveis>
          <TitleSlider>Umidade do Ar</TitleSlider>
          <Slider
            value={umidadeAr}
            step={1}
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor="#35b7fc"
            maximumTrackTintColor="#fc6860"
            thumbTintColor="#00ba09"
            onValueChange={val => setUmidadeArText(val)}
            onSlidingComplete={val => setUmidadeAr(val)}
          />
          <ValueSliderText>{`${umidadeArText}%`}</ValueSliderText>
        </Variaveis>
        <Variaveis>
          <TitleSlider>Umidade do Solo</TitleSlider>
          <Slider
            value={umidadeSolo}
            step={1}
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor="#35b7fc"
            maximumTrackTintColor="#fc6860"
            thumbTintColor="#00ba09"
            onValueChange={val => setUmidadeSoloText(val)}
            onSlidingComplete={val => setUmidadeSolo(val)}
          />
          <ValueSliderText>{`${umidadeSoloText}%`}</ValueSliderText>
        </Variaveis>
        <ContainerButons>
          <ScrollView horizontal>
            <UploadButton onPress={() => upload()}>
              <UploadButtonText>Upload</UploadButtonText>
              <IconStyled name="cached" size={30} color="#FFF" />
            </UploadButton>
            <UploadButton onPress={() => handleNavigateRealTime()}>
              <UploadButtonText>Real Time</UploadButtonText>
              <IconStyled name="timeline" size={30} color="#FFF" />
            </UploadButton>
            <UploadButton onPress={() => handleNavigateBD()}>
              <UploadButtonText>Grafico</UploadButtonText>
              <IconStyled name="save" size={20} color="#FFF" />
            </UploadButton>
          </ScrollView>
        </ContainerButons>
      </Container>
    </ScrollView>
  );
}

Home.navigationOptions = props => ({
  title: props.navigation.getParam('device'),
});

export default Home;
