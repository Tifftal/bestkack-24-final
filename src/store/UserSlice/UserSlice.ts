import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { createReduxHookFactory } from "../createReduxHookFactory";
import { SliceActions } from "../sliceActions";

export type JwtTokens = {
    access: string;
    refresh: string;
}

export type User = {
    id: string;
    name: string;
    surname: string;
    middleName: string;
    roles: string[];
    username: string;
    phone: string,
    jwtTokens: JwtTokens;
}

const initialState: User = {
    id: '',
    username: '',
    roles: [],
    middleName: '',
    surname: '',
    name: '',
    phone: '',
    jwtTokens: {
        access: '',
        refresh: '',
    },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            console.log(state, action.payload)
            Object.assign(state, action.payload);
            console.log(state, action.payload)
        },
        // refreshTokens: (state, action: PayloadAction<JwtTokens>) => {
        //     Object.assign(state.jwtTokens, action.payload);
        // },
        // logout: (state) => {
        //     Object.assign(state, initialState);
        // },
        // setUsers: (state, action: PayloadAction<UserState[]>) => {
        //     state.users = action.payload;
        // },
    }
})

export const {
    setUser,
    // refreshTokens,
    // logout,
    // setUsers,
} = userSlice.actions;

export const userReducer = userSlice.reducer;

export type RootState = {
    [userSlice.name]: User;
};

export const { useSelector, useDispatch } = createReduxHookFactory<
    RootState,
    SliceActions<typeof userSlice.actions>
>();
