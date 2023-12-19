import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Helpers/AxiosInstance";

const initialState = {
  libraryData: [],
  bookDetails: {},
  favouriteItem: JSON.parse(localStorage.getItem("favouriteItem")) || [],
  query: "",
  loading: false,
};

const getAllBooks = createAsyncThunk(
  "/library/books",
  async (_, { getState }) => {
    try {
      const { query } = getState().library; // Get the query from the Redux state
      const response = await axiosInstance("/library/", { params: { query } });
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const getBookDetails = createAsyncThunk(
  "/library/books/details",
  async (_id) => {
    try {
      const response = await axiosInstance(`/library/${_id}`, {
        method: "GET",
      });
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const createBookDetails = createAsyncThunk(
  "/library/books/create",
  async (data) => {
    try {
      const response = await axiosInstance("/library/", {
        method: "POST",
        data: data,
      });
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const updateBookDetails = createAsyncThunk(
  "/library/books/update",
  async ({ _id, data }) => {
    try {
      const response = await axiosInstance(`/library/${_id}`, {
        method: "PUT",
        data: data,
      });
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const deleteBookDetails = createAsyncThunk(
  "/library/books/delete",
  async (_id) => {
    try {
      const response = await axiosInstance(`/library/${_id}`, {
        method: "DELETE",
      });
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    addFavouriteItem: (state, action) => {
      const newItem = action.payload;
      state.loading = true;
      if(newItem) {
      // Check if the item with the same _id already exists in favouriteItem
      const existingIndex = state.favouriteItem.findIndex(
        (item) => item._id === newItem._id
      );

      // If the item doesn't exist, add it to the array
      if (existingIndex === -1) {
        state.favouriteItem = [...state.favouriteItem, newItem];

        // Update localStorage after the state has been updated
        localStorage.setItem(
          "favouriteItem",
          JSON.stringify(state.favouriteItem)
        );
        state.loading = false
      }
    }
    },
    searchQuery: (state, action) => {
      const payload = action.payload;
      state.query = payload;
    },
  },
  extraReducers: (builder) => {
    builder
    //if action is fulfilled
      .addCase(getAllBooks.fulfilled, (state, action) => {
        if (action.payload) {
          state.libraryData = [...action.payload.books];
        }
        state.loading = false;
      })
      .addCase(getBookDetails.fulfilled, (state, action) => {
        if (action.payload) {
          state.bookDetails = action?.payload?.book;
        }
        state.loading = false;
      })
      .addCase(updateBookDetails.fulfilled, (state, action) => {
        state.loading = false;
        // Find the index of the updated book in favouriteItem
        const favouriteItemIndex = state.favouriteItem.findIndex(
          (item) => item._id === action?.payload?.data?._id
        );

        // If the book is in favouriteItem, update it
        if (favouriteItemIndex !== -1) {
          state.favouriteItem[favouriteItemIndex] = action?.payload?.data;

          // Update localStorage after the state has been updated
          localStorage.setItem(
            "favouriteItem",
            JSON.stringify(state.favouriteItem)
          );
        }
      })
      .addCase(deleteBookDetails.fulfilled, (state, action) => {
        state.bookDetails = {};
        // Remove the deleted book from favouriteItem
        state.favouriteItem = state.favouriteItem.filter(
          (item) => item._id !== action.meta.arg
        );
        state.loading = false;
      })
      .addCase(createBookDetails.fulfilled, (state, action) => {
        state.loading = false;
      })

     //if action is pending 
     .addCase(getAllBooks.pending, (state, action) => {
      state.loading = true;
    })
     .addCase(getBookDetails.pending, (state, action) => {
      state.loading = true;
    })
     .addCase(updateBookDetails.pending, (state, action) => {
      state.loading = true;
    })
     .addCase(deleteBookDetails.pending, (state, action) => {
      state.loading = true;
    })
     .addCase(createBookDetails.pending, (state, action) => {
      state.loading = true;
    })
  },
});

export default librarySlice.reducer;
export {
  getAllBooks,
  createBookDetails,
  getBookDetails,
  updateBookDetails,
  deleteBookDetails,
};
export const { addFavouriteItem, searchQuery } = librarySlice.actions;
