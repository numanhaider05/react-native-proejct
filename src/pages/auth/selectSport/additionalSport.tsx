import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, Image, Platform } from 'react-native';
import Wrapper from '../../../shared/components/wrapper/wrapper';

import { STYLES } from './selectSport.style';
import { RFValue } from 'react-native-responsive-fontsize';
import { getSports } from '../../../shared/services/sport.service';
import Card from '../../../shared/components/sportCard';
import Touch from '../../../shared/components/touch/touch';
import AdditionalSportsHeader from './additionalSportHeader';
import { GST } from '../../../shared/exporter';
import I from 'react-native-vector-icons/FontAwesome';
const AdditionalSports = ({ navigation, route }: any) => {

  const [params, setParams] = useState(route.params.params);
  const [sportsType, setSportsType] = useState(route.params.sportsType);
  const [sports, setSports] = useState([]);

  useEffect(() => {
    setParams({ ...params, mainSportId: route.params.mainSportId })
    getSports((res: any) => setSports(res.data));
  }, []);
  return (
    <Wrapper style={GST.wrap}>
      <ScrollView>
        <AdditionalSportsHeader navigation={navigation} params={params} />
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
                              navigation.navigate('Guardian', { params: params, sportIds: [item.id] })
                            }}
                            key={index}>
                            <Card
                              item={item}
                              index={index} />
                          </Touch>
                        }
                      </>
                      :
                      <>
                        {item.gender === 'F' &&
                          <Touch
                            onPress={() => {
                              navigation.navigate('Guardian', { params: params, sportIds: [item.id] })
                            }}
                            key={index}>
                            <Card
                              item={item}
                              index={index} />
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
      {/* {selectedAdditionalSports ? (
        <View style={STYLES.nextArrowContainer}>
          <Touch onPress={() => navigation.navigate('Guardian')}>
            <I name="angle-right" color="black" size={35} />
          </Touch>
        </View>
      ) : null} */}
    </Wrapper >
  );
};
export default AdditionalSports;
