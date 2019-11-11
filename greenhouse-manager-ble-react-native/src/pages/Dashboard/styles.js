import styled from 'styled-components/native';
import {TextInput} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

export const UploadButton = styled(RectButton)`
  flex-direction: row;
  width: 140px;
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

export const InputText = styled(TextInput)`
  padding: 30px 10px;
  height: 10px;
  background: #eee;
`;

export const ResulText = styled.Text`
  color: #fff;
  font-weight: bold;
  background: #ddd;
  margin-top: 10px;
  font-size: 12px;
`;

export const List = styled.FlatList``;
