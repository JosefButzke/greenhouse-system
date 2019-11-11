import React, {Component} from 'react';
import {PermissionsAndroid} from 'react-native';

import PropTypes from 'prop-types';

import {BleManager} from 'react-native-ble-plx';

import {
  Container,
  Ativador,
  TitleSwitch,
  TitleList,
  Line,
  List,
  DeviceButton,
  DeviceButtonText,
  DeviceButtonSync,
  IconSync,
} from './styles';

import '../../Config/ReactotronConfig';

export default class Conexao extends Component {
  constructor() {
    super();
    this.manager = new BleManager();
  }
  static navigationOptions = {title: 'Conexão'};

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    devices: [],
    error: '',
  };

  getServicesAndCharacteristics(device) {
    return new Promise((resolve, reject) => {
      device.services().then(services => {
        const characteristics = [];

        services.forEach((service, i) => {
          service.characteristics().then(c => {
            characteristics.push(c);

            if (i === services.length - 1) {
              const temp = characteristics.reduce((acc, current) => {
                return [...acc, ...current];
              }, []);
              const dialog = temp.find(
                characteristic => characteristic.isWritableWithoutResponse,
              );
              if (!dialog) {
                reject('No writable characteristic');
              }
              resolve(dialog);
            }
          });
        });
      });
    });
  }

  scanAndConnect() {
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ).then(result => {
      if (!result) {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        );
      }
    });
    this.manager.startDeviceScan(null, null, (error, device) => {
      if (device.name) {
        this.setState({devices: [device]});
        this.manager.stopDeviceScan();
      }
    });
  }

  handleNavigate = async device => {
    const {navigation} = this.props;

    const connectedDevice = await this.manager.connectToDevice(device.id);
    const services = await connectedDevice.discoverAllServicesAndCharacteristics();
    await this.getServicesAndCharacteristics(services).then(char => {
      navigation.navigate('Home', {device: device.name, characteristic: char});
    });
  };

  handleNavigateBD = () => {
    const {navigation} = this.props;

    navigation.navigate('Home', {device: 'BT05', characteristic: {}});
  };

  render() {
    const {devices} = this.state;

    return (
      <Container>
        <Ativador>
          <TitleSwitch>Buscar devices</TitleSwitch>
          <DeviceButtonSync onPress={() => this.scanAndConnect()}>
            <IconSync name="sync" size={20} />
          </DeviceButtonSync>
        </Ativador>

        <Line />
        <TitleList>Lista de devices</TitleList>
        {devices.length !== 0 ? (
          <List
            data={devices}
            keyExtractor={device => device.name}
            renderItem={({item}) => (
              <DeviceButton onPress={() => this.handleNavigate(item)}>
                <DeviceButtonText>{item.name}</DeviceButtonText>
              </DeviceButton>
            )}
          />
        ) : (
          <TitleList>Nenhum devices encontrado</TitleList>
        )}
        <DeviceButtonSync onPress={() => this.handleNavigateBD()}>
          <IconSync name="save" size={20} />
        </DeviceButtonSync>
      </Container>
    );
  }
}
