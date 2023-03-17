import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, Image, Platform } from 'react-native';
import Wrapper from '../../../shared/components/wrapper/wrapper';
import { STYLES } from './selectSport.style';
import { RFValue } from 'react-native-responsive-fontsize';
import { getSports } from '../../../shared/services/sport.service';
import Card from '../../../shared/components/sportCard';
import Touch from '../../../shared/components/touch/touch';
import Header from './header';
import { GST } from '../../../shared/exporter';
import I from 'react-native-vector-icons/FontAwesome';

import { signUp } from '../../../shared/services/AuthService';
import Loader from '../../../shared/components/loader';
import helpers from '../../../shared/utils/helpers';

const SelectSport = ({ navigation, route }: any) => {

  const [params, setParams] = useState(route.params.params);
  const [type, setType] = useState(route.params.type);
  const [sportsType, setSportsType] = useState(route.params.sportsType);

  const [sports, setSports] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(params)
    getSports((res: any) => setSports(res.data));
  }, []);

  const handleSubmit = () => {
    setLoading(true);
    console.log(params)
    signUp(params)
      .then(res => {
        if (res.data.data.success) {
          helpers.showToastFail(res.data.data.success)
          navigation.navigate('Verify', { params: params })
        } else {
          helpers.showToastFail(res.data.data.message)
        }
      })
      .catch(err => {
        alert(err.response.data.meta.message,
          [{ text: 'OK' }],
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Wrapper style={GST.wrap}>
      {loading && <Loader />}
      <ScrollView>
        <Header navigation={navigation} name={params.firstName} />
        <View style={{ marginTop: RFValue(5) }}>
          <View style={STYLES.cardContainer}>
            {sports.length > 0 &&
              sports.map((item, index) => {
                return (
                  <>
                    {sportsType.menActive ?
                      <>
                        {item.gender === 'M' &&
                          <Touch
                            onPress={() => {
                              if (type === 'Athlete') {
                                navigation.navigate('AdditionalSports', { params: params, mainSportId: item.id, sportsType: sportsType })
                              } else {
                                handleSubmit()
                              }
                            }}
                            key={index}>
                            <Card
                              item={item}
                              index={index}
                            />
                          </Touch>
                        }
                      </>
                      :
                      <>
                        {item.gender === 'F' &&
                          <Touch
                            onPress={() => {
                              if (type === 'Athlete') {
                                navigation.navigate('AdditionalSports', { params: params, mainSportId: item.id, sportsType: sportsType })
                              } else {
                                handleSubmit()
                              }
                            }}
                            key={index}>
                            <Card
                              item={item}
                              index={index}
                            />
                          </Touch>
                        }
                      </>
                    }
                  </>
                );
              })}
          </View>
        </View>
      </ScrollView>
      {/* {selectedSports ? (
        <View style={STYLES.nextArrowContainer}>
          <Touch onPress={() => navigation.navigate('AdditionalSports')}>
            <I name="angle-right" color="black" size={35} />
          </Touch>
        </View>
      ) : null} */}
    </Wrapper>
  );
};
export default SelectSport;
