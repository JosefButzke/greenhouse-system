import styled from 'styled-components/native';

import {RectButton} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';

export const Container = styled.View`
  flex: 1;
  padding: 5px;
`;

export const Ativador = styled.View`
  flex-direction: row;
  justify-content: space-around;
  background: white;
  padding: 15px;
`;

export const TitleSwitch = styled.Text`
  font-size: 24px;
  color: black;
`;

export const TitleList = styled.Text`
  align-self: center;
  padding-bottom: 10px;
  font-weight: bold;
  padding: 10px;
`;

export const Line = styled.View`
  background: red;
  border-bottom-width: 1;
  border-color: #e3e3e3;
`;

export const List = styled.FlatList``;

export const DeviceButton = styled(RectButton)`
  flex-direction: row;
  width: 40%;
  margin-top: 30px;
  border-radius: 4px;
  background: #00ba09;
  justify-content: space-around;
  align-items: center;
  align-self: center;
  height: 44px;
`;

export const DeviceButtonText = styled.Text`
  color: white;
`;

export const DeviceButtonSync = styled(RectButton)`
  width: 80px;
  height: 40px;
  border-radius: 4px;
  background: #15d146;
  align-items: center;
  justify-content: center;
`;

export const IconSync = styled(Icon)`
  color: white;
`;
