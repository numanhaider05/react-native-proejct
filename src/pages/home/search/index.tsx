import React, { useRef, useState, useEffect } from 'react';
import { Image, Text, FlatList, TextInput, View } from 'react-native';
import I from 'react-native-vector-icons/MaterialIcons';
import Touch from '../../../shared/components/touch/touch';
import { STYLES } from './search.style';
import Header from '../../../shared/components/header/header';
import { HP, THEME, WP } from '../../../shared/exporter';
import SchoolCard from '../../../shared/components/cards/SchoolCard';
import RNPickerSelect from 'react-native-picker-select';

import { useDispatch } from 'react-redux';
import { searchSchools } from '../../../shared/services/HomeService';
import { schoolFilters } from '../../../shared/services/HomeService';
import Loader from '../../../shared/components/loader';

import RBSheet from "react-native-raw-bottom-sheet";

const Search = ({ navigation }: any) => {
  const refRBSheet = useRef();

  // const data = [
  //   {
  //     logo: require('../../../assets/images/sampleLogo.png'),
  //     name: 'UT Austin',
  //     location: 'Austin, TX | NCAA D1 ',
  //     academics: 'Excellent ',
  //     athletics: 'Competitive',
  //     size: 'Very large'
  //   },
  //   {
  //     logo: require('../../../assets/images/sampleLogo.png'),
  //     name: 'UT Austin',
  //     location: 'Austin, TX | NCAA D1 ',
  //     academics: 'Excellent ',
  //     athletics: 'Competitive',
  //     size: 'Very large'
  //   },
  //   {
  //     logo: require('../../../assets/images/sampleLogo.png'),
  //     name: 'UT Austin',
  //     location: 'Austin, TX | NCAA D1 ',
  //     academics: 'Excellent ',
  //     athletics: 'Competitive',
  //     size: 'Very large'
  //   }
  // ]

  const [values, setValues] = useState([])

  const [filter, setFilter] = useState('');
  const [type, setType] = useState('');

  const [search, setSearch] = useState('');
  const [division, setDivision] = useState('');
  const [state, setState] = useState('');
  const [conference, setConference] = useState('');

  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedConference, setSelectedConference] = useState('');

  const [loading, setLoading] = useState(false);
  const [bold, setBold] = useState(false);

  useEffect(() => {
    setFilters()
  }, []);

  useEffect(() => {
    setResults()
    search !== '' ? setBold(true) : setBold(false)
  }, [search, selectedDivision, selectedState, selectedConference]);

  const setFilters = () => {
    setLoading(true);

    schoolFilters()
      .then(res => {
        setConference(res.data.data.conferences)
        setState(res.data.data.states)
        setDivision(res.data.data.divisions)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const setResults = () => {
    setLoading(true);
    const params = {
      searchText: search,
      division: selectedDivision,
      state: selectedState,
      conference: selectedConference
    };
    searchSchools(params)
      .then(res => {
        // console.log(res.data.data)
        setValues(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false);
      });
  };


  const [selectedTab, setSelectedTab] = useState(1)

  return (
    <>
      <View style={STYLES.container}>
        <Header navigation={navigation} />
        <View style={STYLES.textFieldContainer}>
          <Image source={require('../../../assets/images/searchInput.png')} style={STYLES.searchIcon} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder={'What are you looking for?'}
            placeholderTextColor={THEME.colors.placeHolderDark}
            style={STYLES.textField}
            blurOnSubmit={true}
          />
        </View>

        <View style={STYLES.tabs}>
          <Touch onPress={() => setSelectedTab(1)} style={selectedTab === 1 ? STYLES.selectedTab : STYLES.tab}>
            <Text style={STYLES.tabText}>Schools</Text>
          </Touch>
          {/* <Touch onPress={() => setSelectedTab(2)} style={selectedTab === 2 ? STYLES.selectedTab : STYLES.tab}>
          <Text style={STYLES.tabText}>Sports</Text>
        </Touch>
        <Touch onPress={() => setSelectedTab(3)} style={selectedTab === 3 ? STYLES.selectedTab : STYLES.tab}>
          <Text style={STYLES.tabText}>Coaches</Text>
        </Touch>
        <Touch onPress={() => setSelectedTab(4)} style={selectedTab === 4 ? STYLES.selectedTab : STYLES.tab}>
          <Text style={STYLES.tabText}>Athletes</Text>
        </Touch> */}
        </View>

        <View style={STYLES.subtabs}>
          <Touch onPress={() => {
            setType('division')
            setFilter(division)
            refRBSheet.current.open()
          }} style={STYLES.subtab}>
            <Text style={STYLES.subtabText}>Division</Text>
            <I name="keyboard-arrow-up" size={HP(2.5)} />
          </Touch>

          <Touch onPress={() => {
            setType('state')
            setFilter(state)
            refRBSheet.current.open()
          }} style={STYLES.subtab}>
            <Text style={STYLES.subtabText}>State</Text>
            <I name="keyboard-arrow-up" size={HP(2.5)} />
          </Touch>

          <Touch onPress={() => {
            setType('conference')
            setFilter(conference)
            refRBSheet.current.open()
          }} style={STYLES.subtab}>
            <Text style={STYLES.subtabText}>Conference</Text>
            <I name="keyboard-arrow-up" size={HP(2.5)} />
          </Touch>
        </View>

        {loading ?
          <Loader />
          :
          <View style={STYLES.recommendation}>
            {values ?
              <>
                <FlatList
                  data={values}
                  renderItem={({ item, index }) => <SchoolCard bold={true} item={item} navigation={navigation} />}
                />
              </>
              :
              <Text style={STYLES.recommendationText}>Tap to see recommendeded schools</Text>
            }
          </View>
        }
      </View>

      <RBSheet
        ref={refRBSheet}
        height={HP(50)}
        customStyles={{
          container: {
            paddingTop: HP(3),
            borderTopRightRadius: HP(3),
            borderTopLeftRadius: HP(3),
          },
          wrapper: {
            height: HP(50),
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
        <View>

          <FlatList
            data={filter}
            ListHeaderComponent={() => {
              return (
                <Touch onPress={() => {
                  if (type === 'division') {
                    setSelectedDivision('')
                  } else if (type === 'state') {
                    setSelectedState('')
                  } else {
                    setSelectedConference('')
                  }
                }} style={{ margin: WP(2), alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: HP(2.2), fontWeight: 'bold', color: selectedDivision === '' || selectedConference === '' || selectedState === '' ? THEME.colors.primary : 'black' }}>ALL</Text>
                </Touch>
              )
            }}
            renderItem={({ item, index }) => {
              return (
                <Touch onPress={() => {
                  if (type === 'division') {
                    setSelectedDivision(item)
                  } else if (type === 'state') {
                    setSelectedState(item)
                  } else {
                    setSelectedConference(item)
                  }
                }} style={{ margin: WP(2), alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: type === 'conference' ? HP(1.9) : HP(2.2), fontWeight: 'bold', textAlign: 'center', color: selectedDivision === item || selectedConference === item || selectedState === item ? THEME.colors.primary : 'black' }}>{item}</Text>
                </Touch>
              )
            }}
          />

        </View>
      </RBSheet>


    </>
  );
};
export default Search;
