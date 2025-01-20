/** @type {Detox.DetoxConfig} */
module.exports = {
  testRunner: {
    args: {
      '$0': 'jest',
      config: './detox.config.ts'
    },
    jest: {
      setupTimeout: 300000
    }
  },
  apps: {
    'ios': {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Release-iphonesimulator/FrogTime.app',
      build: 'xcodebuild -workspace ios/FrogTime.xcworkspace -scheme "FrogTime" -configuration Release -sdk iphonesimulator -derivedDataPath ios/build -quiet'
    },
    'android': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
      build: 'cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug && cd ..',
      reversePorts: [
        8081
      ]
    }
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 16 Pro'
      }
    },
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: 'MAIN'
      }
    }
  },
  configurations: {
    'ios.sim': {
      device: 'simulator',
      app: 'ios'
    },
    'android.emu': {
      device: 'emulator',
      app: 'android'
    }
  }
};
