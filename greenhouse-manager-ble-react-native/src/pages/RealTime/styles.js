import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Variable = styled.View`
  align-items: center;
`;

export const TitleVariable = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: green;
`;

export const ValueRealTime = styled.TextInput`
  width: 100px;
  border: 1px;
  border-radius: 4px;
  text-align: center;
  margin: 10px;
`;

export const Line = styled.View`
  width: 70%;
  border-bottom-width: 1px;
  border-color: #eee;
  margin: 15px;
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
