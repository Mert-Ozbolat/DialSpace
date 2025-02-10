import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    contacts: [],
    pending: false,

};
const contactSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {
        setContacts: (state, action) => {
            state.contacts = action.payload,
                state.pending = false
        },
        setPending: (state, action) => {
            state.pending = action.payload;

        },
    },
});
export const { setContacts, setPending } = contactSlice.actions
export default contactSlice.reducer