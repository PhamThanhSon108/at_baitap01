import { Button, Input, Modal } from "antd";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { changeTravel } from "../../redux/TravelSlice";
import { TravelProps } from "../../type";

const ChangeTravelModal = ({
  Travel,
  isModalOpen,
  setIsModalOpen,
}: {
  Travel: TravelProps;
  isModalOpen: boolean;
  setIsModalOpen: any;
}) => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState<string | undefined>(Travel?.title); // We are initializing useStates if book variable has title or author.
  const [author, setAuthor] = useState<string | undefined>(Travel?.author);
  const loadingAddTravels = useAppSelector(
    (state) => state.travel.statusAddTravels
  );
  const handleChangeTravel = () => {
    if (title?.trim() === Travel.title && author?.trim() === Travel.author) {
      return;
    }
    if (title?.trim() && author?.trim()) {
      dispatch(changeTravel({ id: Travel.id, title: title, author: author }));
      setTitle("");
      setAuthor("");
    }
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (title?.trim() && author?.trim()) {
      handleChangeTravel();
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Chỉnh sửa chuyến"
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

export default React.memo(ChangeTravelModal);
