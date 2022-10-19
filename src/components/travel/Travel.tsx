import React, { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  deleteTravel,
  getTravels,
  searchTravel,
} from "../../redux/TravelSlice";

import useDebounce from "../../hooks/useDebounce";
import {
  Alert,
  Button,
  Col,
  Input,
  List,
  Row,
  Space,
  Spin,
  Typography,
} from "antd";
import AddTravelModal from "../modal/AddTravelModal";
import styles from "./Travel.module.scss";
import { type } from "@testing-library/user-event/dist/type";
import { TravelProps } from "../../type";
import ChangeTravelModal from "../modal/ChangeTravelModal";
const { Search } = Input;

export default function Travel() {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedDelete, setSelectedDelete] = useState<string>("");
  const [travelChange, setTravelChange] = useState<TravelProps | undefined>();

  const searchKey = useAppSelector((state) => state.travel.searchKey);
  const travels = useAppSelector((state) => state.travel.travelList).filter(
    (travel) => travel.title?.includes(searchKey)
  );
  const loadingTravels = useAppSelector(
    (state) => state.travel.statusGetTravels
  );
  const statusDeleteTravel = useAppSelector(
    (state) => state.travel.statusDeleteTravels
  );
  const successAddTravel = useAppSelector((state) => state.travel.successAdd);
  const successDeleteTravel = useAppSelector(
    (state) => state.travel.successDelete
  );
  const successChangeTravel = useAppSelector(
    (state) => state.travel.successChange
  );
  const statusChangeTravel = useAppSelector(
    (state) => state.travel.statusChangeTravel
  );
  const [search, setSearch] = useState<string>("");

  const debounce = useDebounce({ time: 500, value: search });

  const handleDeleteTravel = (travel: TravelProps) => {
    dispatch(deleteTravel(travel.id));
  };
  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    dispatch(searchTravel({ key: debounce }));
  }, [debounce]);

  useEffect(() => {
    dispatch(getTravels());
    setTravelChange(undefined);
  }, [successAddTravel, successDeleteTravel, successChangeTravel]);

  return (
    <>
      {travelChange && isModalOpen && (
        <ChangeTravelModal
          Travel={travelChange}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      <div className={styles.wrap}>
        <div className={styles["wrap__search"]}>
          <Search
            className={`${styles.search__travel} ${styles["ant-btn"]}`}
            // value={search}
            placeholder="input search text"
            onChange={handleSearch}
          />
          <AddTravelModal />
        </div>

        <Typography.Title className={styles["title"]}>
          Danh sách chuyến đi
        </Typography.Title>
        <List style={{ width: "500px" }}>
          {loadingTravels !== "loading" ? (
            travels.length > 0 ? (
              travels.map((travel) => (
                <List.Item
                  key={travel.id}
                  style={{ display: "flex", width: "100%" }}
                >
                  <div style={{ flexGrow: "1", textAlign: "start" }}>
                    <span>{travel.title}</span>
                  </div>
                  <Button
                    loading={
                      travelChange?.id === travel.id &&
                      statusChangeTravel === "loading"
                    }
                    type="ghost"
                    onClick={() => {
                      setTravelChange(travel);
                      setIsModalOpen(true);
                    }}
                    style={{ marginRight: "10px" }}
                  >
                    Sửa
                  </Button>
                  <Button
                    loading={
                      statusDeleteTravel === "loading" &&
                      travel.id === selectedDelete
                    }
                    type="ghost"
                    onClick={() => {
                      setSelectedDelete(travel.id);
                      handleDeleteTravel(travel);
                    }}
                  >
                    Xóa
                  </Button>
                </List.Item>
              ))
            ) : (
              <Alert
                type="warning"
                message="Không có chuyến du lịch nào được tìm thấy"
                closable
                showIcon
              />
            )
          ) : (
            <Spin />
          )}
        </List>
      </div>
    </>
  );
}
