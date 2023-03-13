import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import contactService from './contactService';

const initialState = {
  contacts: [],
  current: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
};

// Create contact
export const createContact = createAsyncThunk('contact/create', async (contactData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await contactService.createContact(contactData, token)
  } catch (error) {
    console.log(error);
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get user contacts
export const getContacts = createAsyncThunk('contact/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await contactService.getContacts(token);
  } catch (error) {
    console.log(error);
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

// Update user contact
export const updateContact = createAsyncThunk('contact/update', async (contactData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await contactService.updateContact(contactData, token)
  } catch (error) {
    console.log(error);
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete user contact
export const deleteContact = createAsyncThunk('contact/delete', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await contactService.deleteContact(id, token)
  } catch (error) {
    console.log(error);
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});


export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    reset: state => initialState,
    setCurrent: (state, action) => {
      state.current = action.payload;
    },
    unsetCurrent: state => {
      state.current = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(createContact.pending, state => {
        state.isLoading = true
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contacts.push(action.payload);
      })
      .addCase(createContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getContacts.pending, state => {
        state.isLoading = true
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contacts = action.payload;
      })
      .addCase(getContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateContact.pending, state => {
        state.isLoading = true
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contacts = state.contacts.map(contact => contact._id === action.payload._id ? action.payload : contact);
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteContact.pending, state => {
        state.isLoading = true
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contacts = state.contacts.filter(contact => contact._id !== action.payload.id);
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

  }
});

export const { reset, setCurrent, unsetCurrent } = contactSlice.actions;
export default contactSlice.reducer;