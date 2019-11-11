import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.View`
  flex: 1;
  padding: 15px;
`;

export const Cultivo = styled.View`
  flex-direction: column;
  flex: 1;
  background: #eee;
`;

export const CultivoRow = styled.View`
  justify-content: space-between;
  flex-direction: row;
`;

export const Variaveis = styled.View`
  flex-direction: column;
  align-items: center;
  background: #eee;
  padding: 10px;
  margin-top: 10px;
`;

export const TitleSlider = styled.Text`
  font-size: 16px;
  color: black;
  padding: 10px;
  background: #eee;
`;

export const Slider = styled.Slider`
  width: 100%;
  height: auto;
`;

export const ValueSliderText = styled.Text`
  font-size: 16px;
  color: black;
`;

export const Picker = styled.Picker`
  width: 50%;
  color: #747474;
`;

export const UploadButton = styled(RectButton)`
  flex-direction: row;
  flex: 1;
  margin: 10px;
  margin-top: 30px;
  margin-bottom: 20px;
  border-radius: 4px;
  background: green;
  justify-content: space-around;
  align-items: center;
  align-self: center;
  height: 44px;
`;

export const UploadButtonText = styled.Text`
  font-size: 20px;
  color: white;
  padding: 5px;
`;

export const ScrollView = styled.ScrollView``;

export const AddButton = styled(RectButton)`
  flex-direction: row;
  width: 44px;
  height: 44px;
  border-radius: 4px;
  background: green;
  justify-content: space-around;
  align-items: center;
  align-self: center;
`;

export const TextInput = styled.TextInput`
  height: 40;
  width: 60;
  margin-bottom: 10px;
  border-radius: 4px;
  background: white;
`;

export const ContainerButons = styled.View`
  flex-direction: row;
`;

export const IconStyled = styled(Icon)`
  padding: 5px;
`;
