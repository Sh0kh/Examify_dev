import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import  { axiosAPI1 } from "../Service/axios";
export const fetchData = createAsyncThunk('data/fetchData', async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');

    try {
        const response = await axiosAPI1.get('/user/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
        }           
    }
});



const MyinfoSlice = createSlice({
    name: 'data',
    initialState: {
        data: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchData.pending, (state) => {
            state.status = 'loading';
        })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.status = 'failed';
                state.status = action.error.message
            })
    }
})

export default MyinfoSlice.reducer