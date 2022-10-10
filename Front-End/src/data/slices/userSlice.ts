import { createSlice } from '@reduxjs/toolkit'

interface userType {
    name: string,
    email: string,
    id: string,
    role: string,
    signedIn: boolean
}

function getCurrentUser() {
    if (sessionStorage.getItem('currentUser')) {
        return JSON.parse(sessionStorage.getItem('currentUser') as string) as userType;
    }
    return {
        name: "",
        email: "",
        id: "",
        role: "",
        signedIn: false
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: getCurrentUser()
    },
    reducers: {
        addUser: (state, action) => {
            let newUser = {
                name: action.payload.name,
                email: action.payload.email,
                id: action.payload.id,
                role: action.payload.role,
                signedIn: true
            }
            sessionStorage.setItem('currentUser', JSON.stringify(newUser));
            state.value = newUser;
        },
        removeUser: (state) => {
            state.value = {
                name: "",
                email: "",
                id: "",
                role: "",
                signedIn: false
            }
            sessionStorage.removeItem('currentUser');
        }
    },
});

export const { addUser, removeUser } = userSlice.actions;

export const getUser = (state: { user: { value: userType } }) => state.user.value;
export const getUserRole = (state: { user: { value: userType } }) => state.user.value.role;
export const getUserSignInState = (state: { user: { value: userType } }) => state.user.value.signedIn;

export default userSlice.reducer;
