import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  TourGuideProvider,
  TourGuideStep,
  walkthroughable,
  useTourGuide,
} from 'react-native-tour-guide';

const WalkthroughableText = walkthroughable(Text);
const WalkthroughableImage = walkthroughable(Image);

function App() {
  const { start, TourGuideEvents } = useTourGuide();
  const [secondStepActive, setSecondStepActive] = useState(true);
  const [lastEvent, setLastEvent] = useState(null);

  useEffect(() => {
    TourGuideEvents.on('stepChange', (step) => {
      setLastEvent(`stepChange: ${step.name}`);
    });
    TourGuideEvents.on('start', () => {
      setLastEvent(`start`);
    });
    TourGuideEvents.on('stop', () => {
      setLastEvent(`stop`);
    });
  }, [TourGuideEvents]);

  return (
    <SafeAreaView style={styles.container}>
      <TourGuideStep
        text="Hey! This is the first step of the tour!"
        order={1}
        name="openApp"
      >
        <WalkthroughableText style={styles.title}>
          {'Welcome to the demo of\n"React Native TourGuide"'}
        </WalkthroughableText>
      </TourGuideStep>
      <View style={styles.middleView}>
        <TourGuideStep
          active={secondStepActive}
          text="Here goes your profile picture!"
          order={2}
          name="secondText"
        >
          <WalkthroughableImage
            source={{
              uri: 'https://images.pexels.com/photos/11608681/pexels-photo-11608681.jpeg',
            }}
            style={styles.profilePhoto}
          />
        </TourGuideStep>
        <View style={styles.activeSwitchContainer}>
          <Text>Profile photo step activated?</Text>
          <View style={{ flexGrow: 1 }} />
          <Switch
            onValueChange={(secondStepActive) =>
              setSecondStepActive(secondStepActive)
            }
            value={secondStepActive}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={() => start()}>
          <Text style={styles.buttonText}>START THE TUTORIAL!</Text>
        </TouchableOpacity>
        <View style={styles.eventContainer}>
          <Text>{lastEvent && `Last event: ${lastEvent}`}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <TourGuideStep
          text="Here is an item in the corner of the screen."
          order={3}
          name="thirdText"
        >
          <WalkthroughableText style={styles.tabItem}>
            <Ionicons name="apps" size={25} color="#888" />
          </WalkthroughableText>
        </TourGuideStep>

        <Ionicons
          style={styles.tabItem}
          name="airplane"
          size={25}
          color="#888"
        />
        <Ionicons
          style={styles.tabItem}
          name="ios-globe"
          size={25}
          color="#888"
        />
        <Ionicons
          style={styles.tabItem}
          name="ios-navigate-outline"
          size={25}
          color="#888"
        />
        <Ionicons
          style={styles.tabItem}
          name="ios-rainy"
          size={25}
          color="#888"
        />
      </View>
    </SafeAreaView>
  );
}

const AppwithProvider = () => (
  <TourGuideProvider stopOnOutsideClick androidStatusBarVisible>
    <App />
  </TourGuideProvider>
);

export default AppwithProvider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 25,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  profilePhoto: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginVertical: 20,
  },
  middleView: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2980b9',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabItem: {
    flex: 1,
    textAlign: 'center',
  },
  activeSwitchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  eventContainer: {
    marginTop: 20,
  },
});
