import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Constants, BarCodeScanner, Permissions } from 'expo';
import { Container, Header, Content, Toast, Button, Text, Body } from 'native-base';

class Sample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: false,
      hasData: false,
    }
  }

  async takeCameraPermission() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  }

  startScanning = () => {
    this.takeCameraPermission();
  }

  barCodeHandler = (data) => {
    this.setState({
      hasCameraPermission: data ? false : true,
      hasData: true,
    })
    this.showToast(data);
  };

  showToast = ({ type, data }) => {
    Toast.show({
      text: `barcode data ${data} `,
      duration: 3000
    })
  }

  render() {
    return (
      <View style={styles.buttonBox}>
        {
          this.state.hasCameraPermission === false ?

            <Button onPress={this.startScanning} style={styles.btn}>
              <Text style={styles.btnText}>Scan</Text>
            </Button>

            :
            <BarCodeScanner
              onBarCodeRead={this.barCodeHandler}
              style={StyleSheet.absoluteFill}>
              <View style={styles.layerTop} />
              <View style={styles.layerCenter}>
                <View style={styles.layerLeft} />
                <View style={styles.focused} />
                <View style={styles.layerRight} />
              </View>
              <View style={styles.layerBottom} />
            </BarCodeScanner>
        }
      </View>
    );
  }
}

export default Sample;


const styles = StyleSheet.create({
  buttonBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    
  },
  btn: {
    alignSelf: null,
    flexDirection: null,
    height: 30,
  },
  btnText: {

  },
  layerTop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .6)'
  },
  layerCenter: {
    flex: 1,
    flexDirection: 'row'
  },
  layerLeft: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .6)'
  },
  focused: {
    flex: 10
  },
  layerRight: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .6)'
  },
  layerBottom: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .6)'
  },
});
