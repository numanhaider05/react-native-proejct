import React, { useRef, useState } from 'react';
import { Text, ScrollView, FlatList, View } from 'react-native';
import I from 'react-native-vector-icons/MaterialIcons';
import { STYLES } from './search.style';
import { HP, THEME, WP } from '../../../shared/exporter';
import Touch from '../../../shared/components/touch/touch';
import { useEffect } from 'react';
import { InfoType } from '../../../shared/models/interface';
import InfoCard from '../../../shared/components/cards/InfoCard';


const UserMoreInfo = (props: any) => {

  const userDetails = props.route.params.userDetails;
  const profInfo: Array<InfoType> = [
    {
      category: 'Cell Phone',
      key: 'cellPhone',
      type: 'number-pad',
    },
    {
      category: 'Film Link',
      key: 'filmLink',
      type: 'default',
    },
    {
      category: 'Instagram',
      key: 'instagram',
      type: 'default',
    },
    {
      category: 'Facebook',
      key: 'facebook',
      type: 'default',
    },
    {
      category: 'Twitter',
      key: 'twitter',
      type: 'default',
    },
    {
      category: 'HS Address',
      key: 'hsAddress',
      type: 'default',
    },
    {
      category: 'GPA',
      key: 'gpa',
      type: 'default',
    },
    {
      category: 'Transcript',
      key: 'transcript',
      type: 'picture',
    },
    {
      category: 'Height',
      key: 'height',
      type: 'default',
    },
    {
      category: 'Weight',
      key: 'weight',
      type: 'default',
    },
    {
      category: 'Graduating Class Size',
      key: 'graduatingClassSize',
      type: 'default',
    },
    {
      category: 'HS Coach Name/Cell',
      key: 'hsCoachNameCell',
      type: 'default',
    },
    {
      category: 'Guardian Name/Cell',
      key: 'guardianNameCell',
      type: 'default',
    },
    {
      category: 'Guidance Counselor Name/ Cell',
      key: 'guidanceCounselorNameCell',
      type: 'default',
    },
    {
      category: 'Offers',
      key: 'offers',
      type: 'default',
    },
  ]
  const [progress, setProgress] = useState('25%');

  useEffect(() => {
    console.log("userDetails.userInfo", userDetails.userInfo)
    setProgress(`${userDetails.userInfo.progress}%`)
  }, [])

  return (
    <>
      <ScrollView style={STYLES.container} contentContainerStyle={STYLES.scrollContainer}>

        <Touch onPress={() => props.navigation.goBack()} style={STYLES.back}>
          <I name={'arrow-back-ios'} size={HP(2.5)} />
        </Touch>
        <Text style={STYLES.heading}>More Info</Text>

        <View style={STYLES.topView}>
          <View style={STYLES.row}>
            <Text style={STYLES.txt}>Your Progress</Text>
            <Text style={STYLES.txt}>Needs Work</Text>
          </View>
          <View style={STYLES.barOut}>
            <View style={{ ...STYLES.barIn, width: progress }}>
              <Text style={STYLES.percent}>{progress}</Text>
            </View>
          </View>
        </View>

        <FlatList
          scrollEnabled={false}
          data={profInfo}
          numColumns={3}
          renderItem={({ item, index }) => (
            <InfoCard
              information={item}
              infoParams={{
                phoneNumber: userDetails.phoneNumber,
                ...userDetails.userInfo,
              }}
              shouldSave={false}
            />
          )}
        />
      </ScrollView>
    </>
  );
};
export default UserMoreInfo;