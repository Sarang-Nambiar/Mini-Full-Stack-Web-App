import React, { useContext } from "react";
import { Modal, Button } from "rsuite";
import { Form } from "react-bootstrap";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../App";

interface UserDetails {
  id: number;
  fullName: string;
  birthday: string;
  email: string;
}

interface ContextProps {
  user: UserDetails;
  dispatch: React.Dispatch<any>;
}

const EditModal = () => {
  const { user, dispatch } = useContext(AppContext)! as ContextProps;

  const now = new Date();
  const validationSchema = yup.object({
    fullName: yup.string(),
    email: yup.string(),
    birthday: yup.date().max(now.toDateString()),
    id: yup.number().positive().integer(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: any) => {
    axios
      .put(`http://localhost:3000/users`, {
        id: data.id,
        fullName: data.fullName,
        birthday: `${data.birthday.getFullYear()}/${data.birthday.getMonth()}/${data.birthday.getDate()}`,
        email: data.email,
      })
      .then((response) => {
        toast.success("User Updated Successfully");
      })
      .catch((error) => {
        toast.error("Something went wrong. Please Try again.");
      });

    dispatch({ type: "CLOSE_MODAL" });
  };

  return (
    <Modal open={true} onClose={() => dispatch({ type: "CLOSE_MODAL" })}>
      <Modal.Header>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <div className="create-user-form">
            <Form.Group style={{ width: "40%" }}>
              <Form.Label style={{ color: "black" }}>ID</Form.Label>
              <Controller
                control={control}
                name="id"
                defaultValue={user.id}
                render={() => (
                  <Form.Control
                    placeholder={user.id.toString()}
                    readOnly
                  />
                )}
              />
            </Form.Group>
            <Form.Group style={{ width: "40%" }}>
              <Form.Label style={{ color: "black" }}>Full Name</Form.Label>
              <Controller
                control={control}
                name="fullName"
                defaultValue={user.fullName}
                render={({ field: { onChange } }) => (
                  <Form.Control
                    placeholder="Enter your Full Name"
                    onChange={onChange}
                    isInvalid={!!errors.fullName}
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                {errors.fullName?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group style={{ width: "40%" }}>
              <Form.Label style={{ color: "black" }}>Birthday</Form.Label>
              <Controller
                control={control}
                name="birthday"
                defaultValue={new Date(user.birthday)}
                render={({ field: { onChange } }) => (
                  <Form.Control
                    type="date"
                    placeholder="Enter your Birthday"
                    onChange={onChange}
                    data-date-form
                    isInvalid={!!errors.birthday}
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                {errors.birthday?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group style={{ width: "40%" }}>
              <Form.Label style={{ color: "black" }}>Email</Form.Label>
              <Controller
                control={control}
                name="email"
                defaultValue={user.email}
                render={({ field: { onChange } }) => (
                  <Form.Control
                    placeholder="Enter your Email"
                    onChange={onChange}
                    isInvalid={!!errors.email}
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            appearance="subtle"
            onClick={() => dispatch({ type: "CLOSE_MODAL" })}
          >
            Cancel
          </Button>
          <Button appearance="primary" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditModal;
