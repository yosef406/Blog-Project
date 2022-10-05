import { createSlice } from '@reduxjs/toolkit'

interface userType {
    name: string,
    email: string,
    id: string,
    role: string,
    signedIn: boolean
}

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: {
            name: "",
            email: "",
            id: "",
            role: "",
            isSignedIn: false
        }
    },
    reducers: {
        addUser: (state, action) => {
            let newUser = {
                name: action.payload.name,
                email: action.payload.email,
                id: action.payload.id,
                role: action.payload.role,
                isSignedIn: true
            }
            state.value = newUser;
        },
        removeUser: (state) => {
            state.value = {
                name: "",
                email: "",
                id: "",
                role: "",
                isSignedIn: false
            }
        }
    },
});

export const { addUser, removeUser } = userSlice.actions;

export const getUser = (state: { user: { value: userType } }) => state.user.value;

export default userSlice.reducer;
