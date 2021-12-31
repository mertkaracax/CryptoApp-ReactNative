import * as React from 'react';
import {Animated, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useRef} from 'react';
import PushNotification from 'react-native-push-notification';
import {useEffect} from 'react/cjs/react.development';

const FadeInView = props => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);
  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};

const FadeInView2 = props => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  React.useEffect(() => {
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 200);
  }, [fadeAnim]);
  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};

const FadeInView3 = props => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  React.useEffect(() => {
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 400);
  }, [fadeAnim]);
  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};

const FadeInView4 = props => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  React.useEffect(() => {
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 600);
  }, [fadeAnim]);
  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};

const FadeInText = props => {
  const fadeAnim2 = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  React.useEffect(() => {
    setTimeout(() => {
      Animated.timing(fadeAnim2, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 1500);
  }, [fadeAnim2]);
  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim2, // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.body}>
      <FadeInView style={styles.fadeView}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Main', {name: 'Mert'});
          }}
          style={styles.btn}>
          <Text style={styles.text1}>Porfolio</Text>
        </TouchableOpacity>
      </FadeInView>
      <FadeInView2 style={styles.fadeView}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Orders', {name: 'Mert'});
          }}
          style={styles.btn}>
          <Text style={styles.text1}>Orders</Text>
        </TouchableOpacity>
      </FadeInView2>
      <FadeInView3 style={styles.fadeView}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Statistics');
          }}
          style={styles.btn}>
          <Text style={styles.text1}>Statistics</Text>
        </TouchableOpacity>
      </FadeInView3>
      <FadeInView4 style={styles.fadeView}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('BuySell');
          }}
          style={styles.btn}>
          <Text style={styles.text1}>Add Buy/Sell</Text>
        </TouchableOpacity>
      </FadeInView4>
      <FadeInText style={styles.fadeText}>
        <Text style={styles.text2}>-Mert Karaca</Text>
      </FadeInText>
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  backView: {
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    height: '100%',
    width: '100%',
    backgroundColor: '#1A232B',
  },
  btn: {
    borderRadius: 15,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fadeView: {
    borderWidth: 2,
    borderColor: '#0E68AD',
    borderRadius: 15,
    height: '10%',
    width: '50%',
    alignSelf: 'center',
    top: '25%',
    margin: 5,
  },
  fadeText: {
    alignSelf: 'center',
    top: '40%',
  },
  text1: {
    fontSize: 20,
    color: 'white',
    fontStyle: 'normal',
  },
  text2: {
    fontSize: 18,
    color: 'white',
    fontStyle: 'italic',
  },
});
