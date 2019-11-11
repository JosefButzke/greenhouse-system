import React, {Component} from 'react';

import {
  Container,
  UploadButton,
  UploadButtonText,
  ResulText,
  List,
} from './styles';

import Database from '../../database/database';

const db = new Database();

export default class Dashboard extends Component {
  static navigationOptions = () => ({
    title: 'Dashboard',
  });

  state = {result: []};

  handleIndex = async () => {
    const response = await db.index();
    for (let i = 0; i < response.rows.length; ++i) {
      console.tron.log(response.rows.item(i));
      this.setState({result: [...this.state.result, response.rows.item(i)]});
      console.tron.log(this.state.result);
    }
  };

  handleStore = async () => {
    const response = await db.store(28.2, 70, 80, new Date().toISOString());
    this.setState({result: []});
    console.tron.log(response);
    // db.closeDatabase();
  };

  handleDeleteTable = async () => {
    const response = await db.deleteDataOfTable();
    this.setState({result: []});
    console.tron.log(response);
    // db.closeDatabase();
  };

  render() {
    const {result} = this.state;
    return (
      <Container>
        <UploadButton onPress={() => this.handleIndex()}>
          <UploadButtonText>Index</UploadButtonText>
        </UploadButton>
        <UploadButton onPress={() => this.handleStore()}>
          <UploadButtonText>Store</UploadButtonText>
        </UploadButton>
        <UploadButton onPress={() => this.handleDeleteTable()}>
          <UploadButtonText>Delete Table</UploadButtonText>
        </UploadButton>

        <List
          data={result}
          keyExtractor={device => String(device.id)}
          renderItem={({item}) => (
            <ResulText>
              {`${item.id} - ${item.date},${item.temperatura}°C, ${
                item.umidade_ar
              }%, ${item.umidade_solo}%`}
            </ResulText>
          )}
        />
      </Container>
    );
  }
}
