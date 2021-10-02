import React, {Component} from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import {normalize} from "../utils/normalize";
import {Grid, Col, Row} from "react-native-easy-grid";
import { magnetometer, SensorTypes, setUpdateIntervalForType } from "react-native-sensors";
import LPF from "lpf"
import Location from "../components/Geolocation";
import Direction from "../components/Direction";


export default class Qibla extends Component {
      constructor() {
        super();
        this.state = {
          magnetometer: "0",
        };
        LPF.init([]);
        LPF.smoothing = 0.2;
      }

      componentDidMount() {
        this._toggle();
      }
      componentWillUnmount() {
        this._unsubscribe();
      }


      _toggle = () => {
        if (this._subscription) {
          this._unsubscribe();
        } else {
          this._subscribe();
        }
      };

      _subscribe = async () => {
        setUpdateIntervalForType(SensorTypes.magnetometer, 16);
        this._subscription = magnetometer.subscribe(
          sensorData => this.setState({magnetometer: this._angle(sensorData)}),
          error => console.log("The sensor is not available"),
        );
      };

      _unsubscribe = () => {
        this._subscription && this._subscription.unsubscribe();
        this._subscription = null;
      };

      _angle = magnetometer => {
        let angle = 0;
        if (magnetometer) {
          let {x, y} = magnetometer;
          if (Math.atan2(y, x) >= 0) {
            angle = Math.atan2(y, x) * (180 / Math.PI);
          } else {
            angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
          }
        }
        return Math.round(LPF.next(angle));
      };

      _direction = degree => {
        if (degree >= 22.5 && degree < 67.5) {
          return "NE";
        } else if (degree >= 67.5 && degree < 112.5) {
          return "E";
        } else if (degree >= 112.5 && degree < 157.5) {
          return "SE";
        } else if (degree >= 157.5 && degree < 202.5) {
          return "S";
        } else if (degree >= 202.5 && degree < 247.5) {
          return "SW";
        } else if (degree >= 247.5 && degree < 292.5) {
          return "W";
        } else if (degree >= 292.5 && degree < 337.5) {
          return "NW";
        } else {
          return "N";
        }
      };

      // Match the device top with pointer 0° degree. (By default 0° starts from the right of the device.)
      _degree = magnetometer => {
        return magnetometer - 90 >= 0
          ? magnetometer - 90
          : magnetometer + 271;
      };

      render() {
        return (
          <Grid style={{backgroundColor: "#8B9DFA"}}>
              <Row style={{alignItems: "center"}} size={0.9}>
                  <Col style={{alignItems: "center"}}>
                    <Text style={styles.qibla}>Кибла</Text>
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: normalize(22),
                        fontWeight: "bold",
                        marginTop: normalize(20)
                      }}
                    >
                      <Direction/>
                    </Text>
                  </Col>
              </Row>

            <Row style={{alignItems: "center"}} size={0.1}>
              <Col style={{alignItems: "center"}}>
                <View style={{width: normalize(350), alignItems: "center", bottom: 0}}>
                  <Image
                    source={require("../assets/compass/compass_pointer.png")}
                    style={{
                      height: 40,
                      resizeMode: "contain",
                    }}
                  />
                </View>
              </Col>
            </Row>

            <Row style={{alignItems: "center", justifyContent: 'center'}} size={2}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: normalize(20),
                  width: normalize(350),
                  position: "absolute",
                  textAlign: "center",
                }}
              >
                {this._degree(this.state.magnetometer)}°
              </Text>

              <Col style={{alignItems: "center"}}>
                <Image
                  source={require("../assets/compass/compass_bg.png")}
                  style={{
                    height: normalize(300),
                    justifyContent: "center",
                    alignItems: "center",
                    resizeMode: "contain",
                    transform: [
                      {rotate: 360 - this.state.magnetometer + "deg"},
                    ],
                  }}
                />
              </Col>
            </Row>

            <Row style={{alignItems: "center"}} size={1}>
              <Col style={{alignItems: "center"}}>
                    <Location/>
              </Col>
            </Row>
          </Grid>
        );
      }
}
const styles = StyleSheet.create({
    qibla: {
        fontSize: normalize(25),
        color: '#FFFFFF',
        lineHeight: normalize(30),
        fontWeight: 'bold'
    }
})