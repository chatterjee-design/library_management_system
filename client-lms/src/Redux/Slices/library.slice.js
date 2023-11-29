import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Helpers/AxiosInstance";

const initialState = {
  libraryData: [],
  bookDetails: {},
  cartItem: JSON.parse(localStorage.getItem("cartItem")) || [],
  favouriteItem: JSON.parse(localStorage.getItem("favouriteItem")) || [],
};

const getAllBooks = createAsyncThunk("/library/books", async () => {
  try {
    const response = await axiosInstance("/library/");
    toast.promise(Promise.resolve(response), {
      loading: "Please Wait! fetching all the books",
      success: "All the books are fetched",
      error: "Error while fetching the books",
    });
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

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

      toast.promise(Promise.resolve(response), {
        loading: "Please Wait! Creating a new book details",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Something went wrong creating the book",
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
    addCartItem: (state, action) => {
      const newItem = action.payload;

      // Check if the item with the same _id already exists in cartItem
      const existingIndex = state.cartItem.findIndex(
        (item) => item._id === newItem._id
      );

      // If the item doesn't exist, add it to the array
      if (existingIndex === -1) {
        state.cartItem = [...state.cartItem, newItem];

        // Update localStorage after the state has been updated
        localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
      }
    },
    addFavouriteItem: (state, action) => {
      const newItem = action.payload;

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
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBooks.fulfilled, (state, action) => {
        if (action.payload) {
          state.libraryData = [...action.payload.books];
        }
      })
      .addCase(getBookDetails.fulfilled, (state, action) => {
        if (action.payload) {
          state.bookDetails = action?.payload?.book;
        }
      })
      .addCase(updateBookDetails.fulfilled, (state, action) => {
        // Find the index of the updated book in cartItem

        const cartItemIndex = state.cartItem.findIndex(
          (item) => item._id === action?.payload?.data?._id
        );
        
        // If the book is in cartItem, update it
        if (cartItemIndex !== -1) {
          state.cartItem[cartItemIndex] = action?.payload?.data;

          // Update localStorage after the state has been updated
          localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
        }

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
        // Remove the deleted book from cartItem
        state.cartItem = state.cartItem.filter(
          (item) => item._id !== action.meta.arg
        );
        // Remove the deleted book from favouriteItem
        state.favouriteItem = state.favouriteItem.filter(
          (item) => item._id !== action.meta.arg
        );
      });
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
export const { addCartItem, addFavouriteItem } = librarySlice.actions;
