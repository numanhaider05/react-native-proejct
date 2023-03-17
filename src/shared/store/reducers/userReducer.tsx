import { createSlice } from '@reduxjs/toolkit';

export const userReducer = createSlice({
  name: 'user',
  initialState: {
    authToken: null,
    user: null,
    fcmToken: null,
    ownStories: []
  },

  reducers: {
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
    setFcmToken: (state, action) => {
      state.fcmToken = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    signOut: (state, action) => {
      state.user = null;
    },
    setOwnStories: (state, action) => {
      state.ownStories = action.payload;
    },
    removeStory: (state: any, action) => {
      state.ownStories[0].stories = state.ownStories[0].stories.filter((s: any) => s.id != action.payload.id);
      if (state.ownStories[0].stories.length == 0) {
        state.ownStories = [];
      }
    }
  },
});

export const { setUser, signOut, setAuthToken, setFcmToken, setOwnStories, removeStory } = userReducer.actions;

export default userReducer.reducer;
