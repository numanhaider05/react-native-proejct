import React, { useState } from 'react';
import { Text, View } from 'react-native';
import I from 'react-native-vector-icons/MaterialIcons';
import { STYLES } from './moreinfo.style';
import { HP, IMAGE_PICKER_OPTIONS } from '../../../shared/exporter';
import InfoCard from '../../../shared/components/cards/InfoCard';
import Touch from '../../../shared/components/touch/touch';
import { RootStateOrAny, useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Loader from '../../../shared/components/loader';
import { updateUserInfo, upload } from '../../../shared/services/HomeService';
import helpers, { Options } from '../../../shared/utils/helpers';
import { InfoType } from '../../../shared/models/interface';
import { CONSTANTS } from '../../../shared/utils/constants';

const MoreInfo = (props: any) => {
  const { user, authToken } = useSelector(
    (state: RootStateOrAny) => state.root.user,
  );
  const userDetails = props.route.params.userDetails;
  const { phoneNumber } = userDetails;
  const {
    filmLink,
    cellPhone,
    designation,
    facebook,
    gpa,
    graduatingClassSize,
    height,
    hsAddress,
    id,
    instagram,
    isActive,
    isDeleted,
    stats,
    twitter,
    updatedAt,
    userId,
    hsCoachNameCell,
    guardianNameCell,
    weight,
    offers,
    transcript,
    guidanceCounselorNameCell,
  } = userDetails.userInfo;
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
      type: 'number-pad',
    },
    {
      category: 'Transcript',
      key: 'transcript',
      type: 'picture',
    },
    {
      category: 'Height',
      key: 'height',
      type: 'number-pad',
    },
    {
      category: 'Weight',
      key: 'weight',
      type: 'number-pad',
    },
    {
      category: 'Other Sports',
      key: 'otherSports',
      type: 'default',
    },
    {
      category: 'Graduating Class Size',
      key: 'graduatingClassSize',
      type: 'number-pad',
    },
    {
      category: 'Stats',
      key: 'stats',
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

  const [body, setBody] = useState<any>({
    designation: designation ? designation : '',
    filmLink: filmLink ? filmLink : '',
    instagram: instagram ? instagram : '',
    facebook: facebook ? facebook : '',
    twitter: twitter ? twitter : '',
    gpa: gpa,
    hsAddress: hsAddress ? hsAddress : '',
    height: height,
    weight: weight,
    graduatingClassSize: graduatingClassSize,
    stats: stats ? stats : '',
    cellPhone: cellPhone ? cellPhone : '',
    hsCoachNameCell: hsCoachNameCell ? hsCoachNameCell : '',
    guardianNameCell: guardianNameCell ? guardianNameCell : '',
    guidanceCounselorNameCell: guidanceCounselorNameCell ? guidanceCounselorNameCell : '',
    offers: offers ? offers : '',
    transcript: transcript ? transcript : ''
  });
  const [tran, setTran] = useState<any>(false);

  const [progress, setProgress] = useState('10%');
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  const save = (params: any) => {
    if (params.transcript.includes('http') || params.transcript.includes('https')) {
      delete params.transcript;
    }
    setLoading(true);
    const id = user.id;
    updateUserInfo(id, params)
      .then(res => {
        userDetails.userInfo = res.data.data;
        setBody({
          ...res.data.data
        });
        helpers.showToastSuccess('User Info Updated');
      })
      .catch(err => {
        helpers.showToastFail(err.response?.data?.meta?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={{ ...STYLES.container }}>
      {loading && <Loader />}
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
          <View
            style={{
              ...STYLES.barIn,
              width: `${userDetails.userInfo.progress}%`,
            }}>
            <Text style={STYLES.percent}>
              {userDetails && `${userDetails.userInfo.progress}%`}
            </Text>
          </View>
        </View>
        <Text style={STYLES.txt}>
          This Info can <Text style={STYLES.txtBold}>only</Text> be seen by
          Coaches. When they look at your profile they want to find out more
          about you to see if you are a potential fit!
        </Text>
      </View>

      <KeyboardAwareScrollView>
        <Text style={STYLES.heading2}>Tap any card to add information</Text>
        <View style={STYLES.rowView}>
          {profInfo.map((info: InfoType) => {
            return (
              <View>
                <InfoCard
                  information={info}
                  infoParams={body}
                  updated={(result) => {
                    save(result);
                  }}
                  shouldSave={true}
                />
              </View>
            )
          })}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
export default MoreInfo;
