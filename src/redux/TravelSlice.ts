import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { publicToast } from "../components/toast";
import { db } from "../firebase/config";
import { SearchTravelState, TravelState } from "../type";
type initialStateType = {
  successChange: boolean;
  successDelete: boolean;
  successAdd: boolean;

  statusGetTravels: string;
  statusAddTravels: string;
  statusDeleteTravels: string;
  statusChangeTravel: string;

  travelList: TravelState[];
  searchKey: string;
};
const successChange: boolean = false;
const successDelete = false;
const successAdd: boolean = false;

const statusChangeTravel: string = "";
const statusDeleteTravels: string = "";
const statusAddTravels: string = "";
const statusGetTravels: string = "";

const searchKey: string = "";
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
        publicToast({
          type: "success",
          message: "Th??m chuy???n th??nh c??ng",
          description: "????y s??? l?? m???t chuy???n ??i th?? v???",
        });
      })
      .addCase(addNewTravels.pending, (state, action) => {
        state.statusAddTravels = "loading";
      })
      .addCase(addNewTravels.rejected, (state, action) => {
        state.statusAddTravels = "error";
        publicToast({
          type: "error",
          message: "Th??m chuy???n th???t b???i",
          description: "C?? m???t s??? l???i ???? x???y ra, vui l??ng th??? l???i!",
        });
      })
      //Delete travel
      .addCase(deleteTravel.fulfilled, (state, action) => {
        state.successDelete = !state.successDelete;
        state.statusDeleteTravels = "success";
        publicToast({
          type: "success",
          message: "X??a chuy???n ??i th??nh c??ng",
          description: "H??y c??n nh???c tr?????c khi x??a c??c chuy???n ??i",
        });
      })
      .addCase(deleteTravel.pending, (state, action) => {
        state.statusDeleteTravels = "loading";
      })
      .addCase(deleteTravel.rejected, (state, action) => {
        state.statusDeleteTravels = "error";
        publicToast({
          type: "error",
          message: "X??a chuy???n th???t b???i",
          description: "C?? m???t s??? l???i ???? x???y ra, vui l??ng th??? l???i!",
        });
      })
      //Change travel
      .addCase(changeTravel.fulfilled, (state, action) => {
        state.successChange = !state.successChange;
        state.statusChangeTravel = "success";
        publicToast({
          type: "success",
          message: "S???a chuy???n ??i th??nh c??ng",
          description: "H??y th??m chuy???n ??i m???i n???u n?? c???n thi???t",
        });
      })
      .addCase(changeTravel.pending, (state, action) => {
        state.statusChangeTravel = "loading";
      })
      .addCase(changeTravel.rejected, (state, action) => {
        state.statusChangeTravel = "error";
        publicToast({
          type: "error",
          message: "S???a chuy???n th???t b???i",
          description: "C?? m???t s??? l???i ???? x???y ra, vui l??ng th??? l???i!",
        });
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
