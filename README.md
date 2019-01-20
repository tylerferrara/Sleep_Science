# Sleep Science - "MOHM"

Programmable & Modular IOT Alarm Clock.

## About

There are three components to this alarm (Server, App, and the Motion Detecton)

The Server is the heart of the project with APIs for all connected devices. When the App sets the alarm, the API notifies the connected IOT speaker. Once the alarm is active, the Motion Detection camera can identify motion, and turn off the alarm if the user is out of bed.

This project was adapted to also use a hacked Wii Balance Board as a preasure plate, which forces the user to stand on the plate for 3-10sec to dismiss the alarm.


### Run

Server (express)
```
Install: npm install
Run: npm start
Dev-Server: npm run dev
```

App (react-native)
```
Install: npm install
Run: npm start
Run-Android: npm run android
Run-IOS: npm run ios
```

## Deployment

The server is deployed on the Google App engine, and the App can easily be exported to Android or IOS.
