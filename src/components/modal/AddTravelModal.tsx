import { Button, Input, Modal } from "antd";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addNewTravels } from "../../redux/TravelSlice";
import { v4 as uuidv4 } from "uuid";
const AddTravelModal = () => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState<string | undefined>(""); // We are initializing useStates if book variable has title or author.
  const [author, setAuthor] = useState<string | undefined>("");
  const loadingAddTravels = useAppSelector(
    (state) => state.travel.statusAddTravels
  );

  const handleAddTravel = () => {
    if (title?.trim() && author?.trim()) {
      // dispatch(addNewTravel({ id: uuidv4(), title: title, author: author }));
      dispatch(addNewTravels({ id: uuidv4(), title: title, author: author }));
      setTitle("");
      setAuthor("");
    }
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (title?.trim() && author?.trim()) {
      handleAddTravel();
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        loading={loadingAddTravels === "loading"}
        type="primary"
        onClick={showModal}
      >
        Thêm chuyến đi
      </Button>
      <Modal
        title="Thêm chuyến đi"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          style={{ marginBottom: "15px" }}
          type="text"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Tiêu đề"
        />

        <Input
          type="text"
          name="author"
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
          placeholder="Người dẫn chuyến"
        />
      </Modal>
    </>
  );
};

export default React.memo(AddTravelModal);
