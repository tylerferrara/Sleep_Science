import React from 'react';
import { Text, View, TimePickerAndroid, Button, Alert } from 'react-native';
import io from 'socket.io-client';
const socket = io('https://mohm.serveo.net/');


export default class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          hour: 1,
          minute: 0,
          canSave: false
      }
  }

  async setAlarmTime() {
      try {
          const {action, hour, minute} = await TimePickerAndroid.open({
            hour: this.state.hour,
            minute: this.state.minute,
            is24Hour: false, // Will display '2 PM'
          });
          if (action !== TimePickerAndroid.dismissedAction) {
            // Selected hour (0-23), minute (0-59)
          }
          this.setState({
              hour,
              minute,
              canSave: true
          });
      } catch ({code, message}) {
          console.warn('Cannot open time picker', message);
      }
  }

  saveAlart() {
      Alert.alert('Alarm Set')
      socket.emit('setAlarm', { hour: this.state.hour, minute: this.state.minute })
      this.setState({
          canSave: false
      });

  }

  // converts hour & minute => { hour, minute, t }
  filterTime(hour, minute) {
      let timeBlock = {}
      if (hour < 12) {
          timeBlock.t = 'AM';
          timeBlock.hour = hour;
          timeBlock.minute = minute;
      } else {
          timeBlock = {
              t: 'PM',
              hour: (hour-12),
              minute: minute
          }
      }
      return timeBlock;
  }

  render() {
      // const {navigate} = this.props.navigation;
      const timeBlock = this.filterTime(this.state.hour, this.state.minute);
      const min = (timeBlock.minute < 10) ? ("0"+timeBlock.minute) : timeBlock.minute;
      const {canSave} = this.state;
      return (
          <View>
              <View style={style.container}>
                  <Text>Set Time:</Text>
                  <Text onPress={() => this.setAlarmTime()} style={style.time}>
                  {timeBlock.hour}:{min}{" " + timeBlock.t}
                  </Text>
                  <Button
                      disabled={!canSave}
                      title={canSave ? "Save Alarm" : "Alarm Saved"}
                      onPress={() => this.saveAlart()}
                  />
              </View>
          </View>
      );
  }
}

socket.on('playAlarm', () => {
  Alert.alert('lets wake this BITCH up!')
  
})

const style = {
  time: {
      fontSize: 40,
  },
  container: {
      marginTop: 200,
      marginLeft: 20,
      marginRight: 20,
  }
}

