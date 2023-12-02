import React, { useContext } from "react";
import { Button, Modal } from "rsuite";
import { AppContext } from "../App";
import { Form } from "react-bootstrap";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { toast } from "react-toastify";
import "./CreateModal.css";

interface ContextProps {
  dispatch: React.Dispatch<any>;
}

const CreateModal = () => {
  const { dispatch } = useContext(AppContext)! as ContextProps;
  const now = new Date();
  const validationSchema = yup.object({
    fullName: yup.string().required("Full name is required"),
    email: yup.string().required("Email is required"),
    birthday: yup
      .date()
      .required("Birthday is required")
      .max(now.toDateString()),
    id: yup.number().required("ID is required").positive().integer(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  //basically createUser function
  const onSubmit = (data: any) => {
    axios.post("http://localhost:3000/users", {
      id: data.id,
      fullName: data.fullName,
      birthday: `${data.birthday.getFullYear()}/${data.birthday.getMonth()}/${data.birthday.getDate()}`,
      email: data.email,
    }).then((response) => {
      toast.success("User Created Successfully");
    }).catch((error) => {
      toast.error("Something went wrong. Please Try again.");
    }) // creating a post request to create the user
    dispatch({ type: "CLOSE_MODAL" });
  };

  return (
    <Modal open={true} onClose={() => dispatch({ type: "CLOSE_MODAL" })}>
      <Modal.Header>
        <Modal.Title>Create User</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <div className="create-user-form">
            <Form.Group style={{ width: "40%" }}>
              <Form.Label style={{color:"black"}}>ID</Form.Label>
              <Controller
                control={control}
                name="id"
                render={({ field: { onChange } }) => (
                  <Form.Control
                    placeholder="Enter your id"
                    onChange={onChange}
                    isInvalid={!!errors.id}
                  />
                )}
              />
              <Form.Control.Feedback type="invalid">
                {errors.id?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group style={{ width: "40%" }}>
              <Form.Label style={{color:"black"}}>Full Name</Form.Label>
              <Controller
                control={control}
                name="fullName"
                defaultValue=""
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
              <Form.Label style={{color:"black"}}>Birthday</Form.Label>
              <Controller
                control={control}
                name="birthday"
                defaultValue={now}
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
              <Form.Label style={{color:"black"}}>Email</Form.Label>
              <Controller
                control={control}
                name="email"
                defaultValue=""
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
          <Button
            appearance="primary"
            type="submit"
          >
            Create
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CreateModal;
