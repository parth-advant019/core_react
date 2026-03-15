import { Outlet } from "react-router-dom";
import MainHeader from "./MainHeader";
import { useState } from "react";
import NewPost from "./NewPost";
import Modal from "./Modal";

function RootLayout() {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  function showModalHandler() {
    setModalIsVisible(true);
  }

  function hideModalHandler() {
    setModalIsVisible(false);
  }
  return (
    <>
      <MainHeader onCreatePost={showModalHandler} />

      {modalIsVisible && (
        <Modal onClose={hideModalHandler}>
          <NewPost onCancel={hideModalHandler} />
        </Modal>
      )}

      <Outlet />
    </>
  );
}

export default RootLayout;
