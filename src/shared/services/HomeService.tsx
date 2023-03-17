import { HTTP_CLIENT } from '../utils/config';

export const searchSchools = (params: any) => {
  return HTTP_CLIENT.get(
    `college?searchText=${params.searchText}&division=${params.division}&state=${params.state}&conference=${params.conference}`,
    params,
  );
};

export const schoolFilters = () => {
  return HTTP_CLIENT.get('college/filters');
};

export const searchUser = (search: any) => {
  return HTTP_CLIENT.get(`user/search?searchText=${search}`);
};

export const addSchool = (params: any, token: any) => {
  return HTTP_CLIENT.post('user/college/', params);
};

export const addConnection = (params: any, token: any) => {
  return HTTP_CLIENT.post(`/user/${params}/connection`, params);
};

export const removeSchool = (params: any, token: any) => {
  return HTTP_CLIENT.delete(`/user/college/${params}`);
};

export const removeConnection = (params: any, token: any) => {
  return HTTP_CLIENT.delete(`/user/${params}/remove-connection`);
};

export const getMyStories = () => {
  return HTTP_CLIENT.get(`user/story`);
};

export const spotLight = (token: any) => {
  return HTTP_CLIENT.get(`posting/trending`);
};

export const getStories = () => {
  return HTTP_CLIENT.get('user/following/story');
};

export const deleteStory = (id: any) => {
  return HTTP_CLIENT.delete(`user/story/${id}`);
};

export const viewStory = (id: number) => {
  return HTTP_CLIENT.put(`user/story/${id}/view`);
};

export const getMySchools = (token: any) => {
  return HTTP_CLIENT.get(`user/college`);
};

export const getConnections = (token: any) => {
  return HTTP_CLIENT.get(`user/connections`);
};

export const getChatMessages = (id: any) => {
  return HTTP_CLIENT.get(`message/${id}?offset=0&limit=10`);
};

export const getChatThreads = () => {
  return HTTP_CLIENT.get(`message`);
};

export const markMessageRead = (params: any) => {
  return HTTP_CLIENT.put(`message/${params}/read`);
};

export const getNotifications = (params: any) => {
  return HTTP_CLIENT.get('notification');
};

export const markNotificationRead = (params: any) => {
  return HTTP_CLIENT.put(`notification/${params}/read`);
};

export const getUserDetails = () => {
  return HTTP_CLIENT.get(`user/me`);
};

//Teammates ----------------

export const getMates = (params: any, token: any) => {
  return HTTP_CLIENT.get(`/user/sport/${params}/teammates`);
};

export const removeTeammate = (params: any, token: any) => {
  return HTTP_CLIENT.delete(`/user/teammate/${params}`);
};

export const upsertTeammate = (id: any, params: any, token: any) => {
  return HTTP_CLIENT.post(`/user/sport/${id}/teammate`, params);
};

//posts----------------

export const userPosts = (id: any) => {
  return HTTP_CLIENT.get(`user/${id}/postings`);
};

export const userFollowingsPosts = () => {
  return HTTP_CLIENT.get(`/posting/following`);
};

export const getPostById = (id: any) => {
  return HTTP_CLIENT.get(`/posting/${id}/detail`);
};

export const addPost = (params: any) => {
  return HTTP_CLIENT.post(`/posting`, params);
};

export const getPostComments = (id: any, token: any) => {
  return HTTP_CLIENT.get(`posting/${id}/comments`);
};

export const sharePost = (params: any, token: any) => {
  return HTTP_CLIENT.put(`posting/${params}/share`);
};

export const likePost = (params: any, token: any) => {
  return HTTP_CLIENT.post(`/posting/${params}/like`, params);
};

export const addComment = (id: any, params: any, token: any) => {
  return HTTP_CLIENT.post(`/posting/${id}/comment`, params);
};

export const unLikePost = (params: any, token: any) => {
  return HTTP_CLIENT.delete(`posting/${params}/unlike`);
};

// follow

export const getUserFollowers = (token: any) => {
  return HTTP_CLIENT.get(`user/followers`);
};

export const getUserFollowings = (token: any) => {
  return HTTP_CLIENT.get(`user/following`);
};

export const getUserFollowersById = (id: any) => {
  return HTTP_CLIENT.get(`user/${id}/followers`);
};

export const getUserFollowingsById = (id: any) => {
  return HTTP_CLIENT.get(`user/${id}/following`);
};

export const unFollowUser = (params: any, token: any) => {
  return HTTP_CLIENT.delete(`user/${params}/unfollow`);
};

export const follow = (params: any, token: any) => {
  return HTTP_CLIENT.post(`/user/${params}/follow`, params);
};

export const unFollow = (params: any, token: any) => {
  return HTTP_CLIENT.delete(`/user/${params}/unfollow`);
};

export const acceptFollow = (params: any) => {
  let data = {
    userId: params,
  };
  return HTTP_CLIENT.put(`/user/${params}/follow/accept`, data);
};

export const rejectFollow = (params: any) => {
  let data = {
    userId: params,
  };
  return HTTP_CLIENT.put(`/user/${params}/follow/reject`, data);
};

// ---- user

export const getUserDetailsById = (params: any) => {
  return HTTP_CLIENT.get(`user/${params}/details`);
};

export const upload = (params: any) => {
  return HTTP_CLIENT.post('file', params);
};

export const updateUserProfile = (id: any, params: any) => {
  return HTTP_CLIENT.patch(`user/${id}`, params);
};

export const updateUserInfo = (id: any, params: any) => {
  return HTTP_CLIENT.patch(`user/${id}/info`, params);
};

export const getCoaches = (collegeId: any, params: any) => {
  console.log('collegeId====', collegeId);
  console.log('params====', params);
  return HTTP_CLIENT.get(`college/${collegeId}/sport/${params}/coaches`);
};

export const saveSchedule = (params: any) => {
  return HTTP_CLIENT.post('/schedule', params);
};

export const getSchedules = (token: any) => {
  return HTTP_CLIENT.get(`/schedule`);
};

export const deleteUser = (token: any) => {
  return HTTP_CLIENT.delete('/user');
};
