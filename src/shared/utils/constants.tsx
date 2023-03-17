import { CameraOptions } from 'react-native-image-picker';
import { RF } from '../exporter';

export const CONSTANTS = {
  BASE_URL: 'http://nxtgem-dev.us-east-2.elasticbeanstalk.com/api/',
  S3_STORY_PATH: 'https://nxtgem-api.s3.us-east-2.amazonaws.com/story/',
  PROFILE_PIC_PATH: 'https://nxtgem-api.s3.us-east-2.amazonaws.com/profile/',
  DOC_BASE_PATH: 'https://nxtgem-api.s3.us-east-2.amazonaws.com/assets/',
  SOCKETBASEURL: 'https://nxtgem-api.s3.us-east-2.elasticbeanskalt.com',
  DEEPLINK_URL: "https://nxtgem.com"
};

export const IMAGE_PICKER_OPTIONS: CameraOptions = {
  mediaType: 'mixed',
  maxWidth: RF(480),
  maxHeight: RF(640),
  quality: 1,
  videoQuality: 'low',
  durationLimit: 15,
};

export const ONLY_IMG_OPTS: CameraOptions = {
  mediaType: 'photo',
  maxWidth: RF(480),
  maxHeight: RF(640),
  quality: 1,
  videoQuality: 'low',
  durationLimit: 15,
};
