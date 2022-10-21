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
          message: "Thêm chuyến thành công",
          description: "Đây sẽ là một chuyến đi thú vị",
        });
      })
      .addCase(addNewTravels.pending, (state, action) => {
        state.statusAddTravels = "loading";
      })
      .addCase(addNewTravels.rejected, (state, action) => {
        state.statusAddTravels = "error";
        publicToast({
          type: "error",
          message: "Thêm chuyến thất bại",
          description: "Có một số lỗi đã xảy ra, vui lòng thử lại!",
        });
      })
      //Delete travel
      .addCase(deleteTravel.fulfilled, (state, action) => {
        state.successDelete = !state.successDelete;
        state.statusDeleteTravels = "success";
        publicToast({
          type: "success",
          message: "Xóa chuyến đi thành công",
          description: "Hãy cân nhắc trước khi xóa các chuyến đi",
        });
      })
      .addCase(deleteTravel.pending, (state, action) => {
        state.statusDeleteTravels = "loading";
      })
      .addCase(deleteTravel.rejected, (state, action) => {
        state.statusDeleteTravels = "error";
        publicToast({
          type: "error",
          message: "Xóa chuyến thất bại",
          description: "Có một số lỗi đã xảy ra, vui lòng thử lại!",
        });
      })
      //Change travel
      .addCase(changeTravel.fulfilled, (state, action) => {
        state.successChange = !state.successChange;
        state.statusChangeTravel = "success";
        publicToast({
          type: "success",
          message: "Sửa chuyến đi thành công",
          description: "Hãy thêm chuyến đi mới nếu nó cần thiết",
        });
      })
      .addCase(changeTravel.pending, (state, action) => {
        state.statusChangeTravel = "loading";
      })
      .addCase(changeTravel.rejected, (state, action) => {
        state.statusChangeTravel = "error";
        publicToast({
          type: "error",
          message: "Sửa chuyến thất bại",
          description: "Có một số lỗi đã xảy ra, vui lòng thử lại!",
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
