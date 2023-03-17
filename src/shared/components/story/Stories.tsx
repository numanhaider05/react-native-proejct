import React, {useRef, useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  View,
} from 'react-native';
import StoryContainer from './StoryContainer';
// import Modal from 'react-native-modalbox';
// @ts-ignore
import {CubeNavigationHorizontal} from 'react-native-3dcube-navigation';
import {useEffect} from 'react';
import {Story} from '../../models/interface';

const Stories = ({
  statuses,
  showStory,
  closeIt,
  showThis,
}: {
  statuses: Story[];
  showStory: boolean;
  showThis: number;
  closeIt: () => void;
}) => {
  const [isModelOpen, setModel] = useState(false);
  const [currentUserIndex, setCurrentUserIndex] = useState(showThis);
  const [currentScrollValue, setCurrentScrollValue] = useState(showThis);
  const modalScroll: any = useRef(null);

  useEffect(() => {
    setCurrentUserIndex(showThis);
    setTimeout(() => {
      setModel(true);
    }, 700);
  }, []);

  const onStorySelect = (index: React.SetStateAction<number>) => {
    setCurrentUserIndex(index);
    setModel(true);
  };

  const onStoryClose = () => {
    closeIt();
  };

  const onStoryNext = (isScroll: boolean) => {
    const newIndex = currentUserIndex + 1;
    if (statuses.length > newIndex) {
      setCurrentUserIndex(newIndex);
      if (!isScroll) {
        modalScroll.current.scrollTo(newIndex, true);
      }
    } else {
      closeIt();
    }
  };

  const onStoryPrevious = (isScroll: boolean) => {
    const newIndex = currentUserIndex - 1;
    if (currentUserIndex > 0) {
      setCurrentUserIndex(newIndex);
      if (!isScroll) {
        modalScroll.current.scrollTo(newIndex, true);
      }
    } else if (currentUserIndex == 0) {
      closeIt();
    }
  };

  const onScrollChange = (scrollValue: React.SetStateAction<number>) => {
    if (currentScrollValue > scrollValue) {
      onStoryNext(true);
      setCurrentScrollValue(scrollValue);
    }
    if (currentScrollValue < scrollValue) {
      onStoryPrevious(false);
      setCurrentScrollValue(scrollValue);
    }
  };

  const renderSeperator = () => (
    <View style={{height: 1, backgroundColor: '#ccc'}} />
  );

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={showStory}
      style={styles.modal}
      onShow={() => {
        // setCurrentUserIndex(showThis);
        modalScroll?.current?.scrollTo(showThis, false);
      }}
      onRequestClose={onStoryClose}>
      {/* eslint-disable-next-line max-len */}
      <CubeNavigationHorizontal
        callBackAfterSwipe={(g: any) => onScrollChange(g)}
        ref={modalScroll}
        style={styles.container}>
        {statuses &&
          statuses.map((item, index) => (
            <View key={index} style={styles.storyWrap}>
              {isModelOpen ? (
                <StoryContainer
                  key={index}
                  nowShowing={isModelOpen}
                  onClose={onStoryClose}
                  onStoryNext={onStoryNext}
                  onStoryPrevious={onStoryPrevious}
                  status={item}
                  isNewStory={index !== currentUserIndex}
                />
              ) : (
                <ActivityIndicator color={'#fff'} />
              )}
            </View>
          ))}
      </CubeNavigationHorizontal>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingVertical: 50,
    backgroundColor: 'rgba(255,255,255,255)',
  },
  storyWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    width: '100%',
    height: '100%',
  },
  circle: {
    width: 66,
    margin: 4,
    height: 66,
    borderRadius: 33,
    borderWidth: 2,
    borderColor: '#72bec5',
  },
  modal: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 9,
    textAlign: 'center',
  },
});

export default Stories;
