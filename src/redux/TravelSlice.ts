import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { SearchTravelState, TravelState } from "../type";
type initialStateType = {
  successChange: boolean;
  successDelete: boolean;
  successAdd: boolean;
  travelList: TravelState[];
  searchKey: string;
  statusGetTravels: string;
  statusAddTravels: string;
  statusDeleteTravels: string;
  statusChangeTravel: string;
};
const successChange: boolean = false;
const statusChangeTravel: string = "";
const successDelete = false;
const statusDeleteTravels: string = "";
const statusAddTravels: string = "";
const successAdd: boolean = false;
const searchKey: string = "";
const statusGetTravels: string = "";
const travelList: TravelState[] = [
  // {
  //   id: "1",
  //   title: "1984",
  //   author: "George Orwell",
  // },
];
const initialState: initialStateType = {
  successChange,
  statusChangeTravel,
  successDelete,
  statusDeleteTravels,
  statusAddTravels,
  successAdd,
  statusGetTravels,
  searchKey,
  travelList,
};
export const travelSlice = createSlice({
  name: "travel",
  initialState,
  reducers: {
    searchTravel: (state, action: PayloadAction<SearchTravelState>) => {
      state.searchKey = action.payload.key;
    },
  },
  extraReducers: (builder) => {
    builder
      //get travels
      .addCase(getTravels.fulfilled, (state, action) => {
        state.travelList = action.payload;
        state.statusGetTravels = "success";
      })
      .addCase(getTravels.pending, (state, action) => {
        state.statusGetTravels = "loading";
      })
      .addCase(getTravels.rejected, (state, action) => {
        state.statusGetTravels = "error";
      })
      //add travel
      .addCase(addNewTravels.fulfilled, (state, action) => {
        state.successAdd = !state.successAdd;
        state.statusAddTravels = "success";
      })
      .addCase(addNewTravels.pending, (state, action) => {
        state.statusAddTravels = "loading";
      })
      .addCase(addNewTravels.rejected, (state, action) => {
        state.statusAddTravels = "error";
      })
      //Delete travel
      .addCase(deleteTravel.fulfilled, (state, action) => {
        state.successDelete = !state.successDelete;
        state.statusDeleteTravels = "success";
      })
      .addCase(deleteTravel.pending, (state, action) => {
        state.statusDeleteTravels = "loading";
      })
      .addCase(deleteTravel.rejected, (state, action) => {
        state.statusDeleteTravels = "error";
      })
      //Change travel
      .addCase(changeTravel.fulfilled, (state, action) => {
        state.successChange = !state.successChange;
        state.statusChangeTravel = "success";
      })
      .addCase(changeTravel.pending, (state, action) => {
        state.statusChangeTravel = "loading";
      })
      .addCase(changeTravel.rejected, (state, action) => {
        state.statusChangeTravel = "error";
      });
  },
});
export const getTravels = createAsyncThunk("travel/list", async () => {
  const querySnapshot = await getDocs(collection(db, "travels"));
  let result: any = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    if (doc.exists()) {
      result.push(doc.data());
    }
  });
  return result;
});

export const deleteTravel = createAsyncThunk(
  "travel/delete",
  async (id: string) => {
    await deleteDoc(doc(db, "travels", id));
  }
);
export const addNewTravels = createAsyncThunk(
  "travel/add",
  async (travel: any) => {
    await setDoc(doc(db, "travels", travel.id), travel);
    return true;
  }
);

export const changeTravel = createAsyncThunk(
  "travel/change",
  async (travel: any) => {
    await updateDoc(doc(db, "travels", travel.id), travel);
    return true;
  }
);
export const { searchTravel } = travelSlice.actions;
export default travelSlice;
