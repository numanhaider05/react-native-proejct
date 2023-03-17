import React, { useRef, useState, useEffect } from 'react';
import { Image, Text, FlatList, TextInput, View } from 'react-native';
import I from 'react-native-vector-icons/MaterialIcons';
import Touch from '../../../shared/components/touch/touch';
import { STYLES } from './search.style';
import Header from '../../../shared/components/header/header';
import { HP, THEME, WP } from '../../../shared/exporter';

import { useDispatch } from 'react-redux';
import { RootStateOrAny, useSelector } from 'react-redux';
import { searchUser } from '../../../shared/services/HomeService';
import { schoolFilters } from '../../../shared/services/HomeService';
import Loader from '../../../shared/components/loader';

import RBSheet from "react-native-raw-bottom-sheet";

const SearchUser = ({ navigation }: any) => {
  const refRBSheet = useRef();
  const { user, authToken } = useSelector((state: RootStateOrAny) => state.root.user);

  const [values, setValues] = useState([])

  // const [filter, setFilter] = useState('');
  // const [type, setType] = useState('');

  const [search, setSearch] = useState('');

  const [loading, setLoading] = useState(false);
  const [bold, setBold] = useState(false);

  useEffect(() => {
    setResults()
  }, []);

  useEffect(() => {
    setResults()
  }, [search]);


  const setResults = () => {
    setLoading(true);
    const params = {
      "searchText": search,
    };
    const token = user.accessToken

    searchUser(search)
      .then(res => {
        console.log(res.data.data)
        setValues(res.data.data)
      })
      .catch(err => {
        console.log(err.response)
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <View style={STYLES.container}>
        <Header navigation={navigation} />
        <View style={STYLES.textFieldContainer}>
          <Image source={require('../../../assets/images/searchInput.png')} style={STYLES.searchIcon} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder={'Who are you looking for?'}
            placeholderTextColor={THEME.colors.placeHolderDark}
            style={STYLES.textField}
            blurOnSubmit={true}
          />
        </View>

        {loading ?
          <Loader />
          :
          <View style={STYLES.recommendation}>
            {values ?
              <View style={{ flex: 1 }}>
                <FlatList
                  style={{ height: HP(100) }}
                  data={values}
                  renderItem={({ item, index }) => <Touch
                    onPress={() => navigation.navigate('UserDetails', { item: item.id })}
                    style={STYLES.cont} >
                    {item.pictureUrl === null ?
                      <Image source={require('../../../assets/images/user.png')} style={STYLES.logo} />
                      :
                      <Image source={{ uri: item.pictureUrl }} style={STYLES.logo} />
                    }
                    <View>
                      <Text style={STYLES.name}>{item.fullName}</Text>
                      <Text style={STYLES.location}>{item.bio}</Text>
                    </View>
                  </Touch>}
                />
              </View>
              :
              <Text style={STYLES.recommendationText}>Tap to see recommendeded schools</Text>
            }
          </View>
        }
      </View>
    </>
  );
};

export default SearchUser;
