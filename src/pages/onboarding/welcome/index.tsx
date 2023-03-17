import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import AppButton from '../../../shared/components/button';
import Touch from '../../../shared/components/touch/touch';
import { STYLES } from './welcome.style';
import { BoxShadow } from 'react-native-shadow';
import Wrapper from '../../../shared/components/wrapper/wrapper';
const Welcome = ({ navigation, route }: any) => {
  const [user, setUser] = useState(route.params.user)

  const shadowOpt = {
    width: 250,
    height: 340,
    color: '#000',
    border: 8,
    radius: 20,
    opacity: 0.1,
    x: 2,
    y: 3,
    style: { marginVertical: 5 },
  };
  return (
    <Wrapper>
      <View style={STYLES.container}>
        <View style={{ flex: 1, zIndex: 0 }}>
          <View style={STYLES.subHeader}>
            <Text style={STYLES.headerText}>{user.fullName}, welcome to NxtGem!</Text>
          </View>
          <View style={STYLES.subHeader}>
            <Text style={STYLES.headerSubText}>
              Before you jump in, let's introduce you to the platform and walk
              through some key functions...
            </Text>
          </View>
          <View style={STYLES.buttonContainer}>
            <View style={STYLES.continueContainer}>
              <AppButton
                name="Continue"
                onPress={() => navigation.navigate('GetDiscovered', { user: user })}
              />
            </View>
            <View style={STYLES.skipStyle}>
              <Touch onPress={() => navigation.navigate('GetDiscovered', { user: user })}>
                <Text style={STYLES.skipText}>Skip</Text>
              </Touch>
            </View>
          </View>
        </View>
        <View style={STYLES.removeTopShadow}></View>
      </View>
    </Wrapper>
  );
};
export default Welcome;
