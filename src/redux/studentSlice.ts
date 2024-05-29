import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Student {
    id: number;
    name: string;
    email: string;
}

let fakeStudents: Student[] = [
    {id:1,name:"Name 1",email:"student1@epl.com"},
    {id:2,name:"Name 2",email:"student2@epl.com"},
    {id:3,name:"Name 3",email:"student3@epl.com"},
    {id:4,name:"Name 4",email:"student4@epl.com"}
];


interface StudentsState {
    students: Student [];
    currentStudent: Student | null;
    loading: string;
    error: string | null | undefined;
}

const initialState: StudentsState = {
    students: [],
    currentStudent: null,
    loading: "idle",
    error: null
};


const studentSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        setCurrentStudent: (state, action) => {
            state.currentStudent = action.payload;
          }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchStudents.pending, (state) => {
            state.loading = 'loading';
        });
        builder.addCase(fetchStudents.rejected, (state,action) => {
            state.loading = 'idle';
            state.error = action.error.message;
        })
        builder.addCase(fetchStudents.fulfilled, (state, action) => {
            state.loading = 'idle';
            state.students = action.payload;
        })
        builder.addCase(fetchSingleStudent.pending, (state) =>{
            state.loading = 'loading';
        })
        builder.addCase(fetchSingleStudent.rejected, (state,action)=>{
            state.loading='error';
            state.error = action.error.message;
        })
        builder.addCase(fetchSingleStudent.fulfilled, (state,action)=>{
            state.loading='idle';
            state.currentStudent=action.payload;
        })
    }
});

export const fetchStudents = createAsyncThunk('students/fetchStudents', async () => {
    const response = await axios.get('http://localhost:3000/students');
    console.log(response);
    return response.data;
});

export const fetchSingleStudent = createAsyncThunk<Student, number>('students/fetchSingStudent', async (id: number) => {
    const response = await axios.get(`http://localhost:3000/students/${id}`);
    console.log(response);
    return response.data;
});

export const { setCurrentStudent } = studentSlice.actions;
export default studentSlice.reducer;
