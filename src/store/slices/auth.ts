import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type UserAuth = {
  token: string;
  firstName: string;
  lastName: string;
  email: string | null;
  user_verified: boolean;
};

export const userAuthSliceInit: UserAuth = {
  token: ``,
  firstName: ``,
  lastName: ``,
  email: "",
  user_verified: false,
};

export const userAuthSlice = createSlice({
  name: `userAuth`,
  initialState: userAuthSliceInit,
  reducers: {
    token(state, { payload }: PayloadAction<string>) {
      state.token = payload;
    },

    setUser(state, { payload }: PayloadAction<UserAuth>) {
      state.email = payload.email;
      state.user_verified = payload.user_verified;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
    },

    logOut(state) {
      state.token = userAuthSliceInit.token;
      state.firstName = userAuthSliceInit.firstName;
      state.lastName = userAuthSliceInit.lastName;
      state.email = userAuthSliceInit.email;
      state.user_verified = userAuthSliceInit.user_verified;
    },
  },
});

export const userAuthActions = userAuthSlice.actions;
