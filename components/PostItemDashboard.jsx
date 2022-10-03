import { useState } from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../redux/features/post/postSlice";
import { CancelButton } from "./Buttons";
import ModalYesNo from "./ModalYesNo";
import PostItem from "./PostItem";

const PostItemDashboard = ({ post }) => {
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const deleteHandler = () => {
    try {
      setModalIsOpen(false);
      dispatch(deletePost({ id: post._id }));
      console.log("Новость удалена!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex justify-center mt-5">
        <CancelButton onClick={() => setModalIsOpen(true)}>
          Удалить новость
        </CancelButton>

        <ModalYesNo
          isOpen={modalIsOpen}
          setIsOpen={setModalIsOpen}
          yesClick={deleteHandler}
          noCkick={() => setModalIsOpen(false)}
        >
          <h1>Вы действительно хотите удалить эту новость?</h1>
        </ModalYesNo>
      </div>

      <PostItem post={post} />
    </>
  );
};

export default PostItemDashboard;
