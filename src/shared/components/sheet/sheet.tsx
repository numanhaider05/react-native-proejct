import React, { useRef } from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import { americaStates, countriesList } from './sheetData';

const Sheet = React.forwardRef((props: any, ref) => {
  const actionSheetRef: any = ref;
  const scrollViewRef: any = useRef();
  const actionSheetScrollRef: any = actionSheetRef.current?.scrollViewRef;

  function changeScrollEnabled(parent: any, child: any) {
    if (Platform.OS !== 'android') return;
    actionSheetScrollRef?.current?.setNativeProps({
      scrollEnabled: parent,
    });
    scrollViewRef.current?.setNativeProps({
      scrollEnabled: child,
      nestedScrollEnabled: false,
    });
  }

  const onScroll = (event: any) => {
    changeScrollEnabled(false, true);
  };

  const onHasReachedTop = (hasReachedTop: any) => {
    changeScrollEnabled(!hasReachedTop, hasReachedTop);
  };

  const onClose = () => {
    scrollViewRef.current?.setNativeProps({
      scrollEnabled: false,
    });
    props.itIsClosed();
  };

  const onOpen = () => {
    scrollViewRef.current?.setNativeProps({
      scrollEnabled: true,
    });
  };

  return (
    <>
      <SafeAreaView style={styles.safeareview}>
        <ActionSheet
          initialOffsetFromBottom={0.6}
          ref={actionSheetRef}
          onOpen={onOpen}
          statusBarTranslucent
          onPositionChanged={onHasReachedTop}
          bounceOnOpen={true}
          bounciness={4}
          gestureEnabled={true}
          onClose={onClose}
          defaultOverlayOpacity={0.3}>
          <View
            style={{
              paddingHorizontal: 12,
            }}>
            <View style={styles.container}>
              {/* {['#4a4e4d', '#0e9aa7', '#3da4ab', '#f6cd61', '#fe8a71'].map(
                color => (
                  <TouchableOpacity
                    onPress={() => {
                      actionSheetRef.current?.hide();
                    }}
                    key={color}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 100,
                      backgroundColor: color,
                    }}
                  />
                ),
              )}
              <TextInput
                style={styles.input}
                // multiline={true}
                placeholder="Write your text here"
              /> */}
            </View>

            <ScrollView
              ref={scrollViewRef}
              onScroll={onScroll}
              onStartShouldSetResponder={() => {
                changeScrollEnabled(false, true);
                return false;
              }}
              onScrollEndDrag={() => {
                changeScrollEnabled(true, false);
                actionSheetRef.current?.handleChildScrollEnd();
              }}
              onTouchEnd={() => {
                changeScrollEnabled(true, false);
              }}
              onScrollAnimationEnd={() => {
                changeScrollEnabled(true, false);
                actionSheetRef.current?.handleChildScrollEnd();
              }}
              onMomentumScrollEnd={() => {
                changeScrollEnabled(true, false);
                actionSheetRef.current?.handleChildScrollEnd();
              }}
              scrollEventThrottle={2}
              style={styles.scrollview}>
              {props.isCustomView ? (
                props.children
              ) : (
                <View>
                  {props.sheetStatus == 'state'
                    ? americaStates.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            props.onChangeState(item.code);
                            actionSheetRef.current?.hide();
                          }}
                          style={styles.listItem}>
                          <View
                            style={{
                              marginVertical: 15,
                              borderRadius: 5,
                            }}>
                            <Text>{item.name}</Text>
                          </View>

                          {/* <View style={styles.btnLeft} /> */}
                        </TouchableOpacity>
                      );
                    })
                    : countriesList.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            props.onChangeCountry(item.code);
                            actionSheetRef.current?.hide();
                          }}
                          style={styles.listItem}>
                          <View
                            style={{
                              marginVertical: 15,
                              borderRadius: 5,
                            }}>
                            <Text>{item.name}</Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                </View>
              )}

              <View style={styles.footer} />
            </ScrollView>
          </View>
        </ActionSheet>
      </SafeAreaView>
    </>
  );
});

export default Sheet;

const items = [
  100, 60, 150, 200, 170, 80, 41, 101, 61, 151, 202, 172, 82, 43, 103, 64, 155,
  205, 176, 86, 46, 106, 66, 152, 203, 173, 81, 42,
];

const styles = StyleSheet.create({
  footer: {
    height: 100,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnLeft: {
    width: 30,
    height: 30,
    backgroundColor: '#f0f0f0',
    borderRadius: 100,
  },
  input: {
    width: '100%',
    minHeight: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    // marginBottom: 15,
    paddingHorizontal: 10,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 15,
  },
  scrollview: {
    width: '100%',
    padding: 12,
  },
  btn: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#fe8a71',
    paddingHorizontal: 10,
    borderRadius: 5,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0.3 * 4, height: 0.5 * 4 },
    shadowOpacity: 0.2,
    shadowRadius: 0.7 * 4,
  },
  safeareview: {
    justifyContent: 'center',
    flex: 1,
  },
  btnTitle: {
    color: 'white',
    fontWeight: 'bold',
  },
});
