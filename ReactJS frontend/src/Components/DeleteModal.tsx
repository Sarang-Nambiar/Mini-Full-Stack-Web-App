import React, { useContext } from "react";
import { AppContext } from "../App";
import { Button, Modal } from "rsuite";
import { toast } from "react-toastify";
import axios from "axios";

interface UserDetails {
    id: number;
    fullName: string;
    birthday: string;
    email: string;
  }
  
interface DeleteContextProps {
    user: UserDetails;
  dispatch: React.Dispatch<any>;
}

const DeleteModal = () => {
  const { user, dispatch } = useContext(AppContext)! as DeleteContextProps; // to avoid ts error and declare that it is not null.

  const deleteUser = async (id: number) => {
    await axios.delete(`http://localhost:3000/users/${id}`).then((response) => {
      toast.success("User Deleted Successfully");
    }).catch((error) => { 
      toast.error("Something went wrong. Please Try again.");
    })
  };

  return (
    <>
      <Modal
        open={true}
        backdrop="static"
        keyboard={false}
        onClose={() => dispatch({ type: "CLOSE_MODAL" })}
      >
        <Modal.Header>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ color: "black" }}>
            Are you sure you want to delete this user?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            appearance="primary"
            color="red"
            onClick={() => {
              deleteUser(user.id);
              dispatch({ type: "CLOSE_MODAL" });
            }}
          >
            Delete
          </Button>
          <Button
            appearance="subtle"
            onClick={() => dispatch({ type: "CLOSE_MODAL" })}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModal;
