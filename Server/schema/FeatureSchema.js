import mongoose from "mongoose";

const FeatureSchema = new mongoose.Schema({
  airConditioner: {
    type: Boolean,
    default: false,
  },
  digitalOdometer: {
    type: Boolean,
    default: false,
  },
  heater: {
    type: Boolean,
    default: false,
  },
  leatherSeats: {
    type: Boolean,
    default: false,
  },
  panoramicMoonroof: {
    type: Boolean,
    default: false,
  },
  tachometer: {
    type: Boolean,
    default: false,
  },
  touchscreenDisplay: {
    type: Boolean,
    default: false,
  },
  antiLockBraking: {
    type: Boolean,
    default: false,
  },
  brakeAssist: {
    type: Boolean,
    default: false,
  },
  childSafetyLocks: {
    type: Boolean,
    default: false,
  },
  driverAirBag: {
    type: Boolean,
    default: false,
  },
  powerDoorLocks: {
    type: Boolean,
    default: false,
  },
  stabilityControl: {
    type: Boolean,
    default: false,
  },
  tractionControl: {
    type: Boolean,
    default: false,
  },
  fogLightsFront: {
    type: Boolean,
    default: false,
  },
  rainSensingWiper: {
    type: Boolean,
    default: false,
  },
  rearSpoiler: {
    type: Boolean,
    default: false,
  },
  windowsElectric: {
    type: Boolean,
    default: false,
  },
  comfortConvenience: {
    type: Boolean,
    default: false,
  },
  androidAuto: {
    type: Boolean,
    default: false,
  },
  appleCarPlay: {
    type: Boolean,
    default: false,
  },
  bluetooth: {
    type: Boolean,
    default: false,
  },
  homeLink: {
    type: Boolean,
    default: false,
  },
  powerSteering: {
    type: Boolean,
    default: false,
  },
  vanityMirror: {
    type: Boolean,
    default: false,
  },
});

export default FeatureSchema;