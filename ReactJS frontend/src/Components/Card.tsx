import React, { useContext } from "react";
import "./Card.css";
import { Grid, Divider } from "@mui/material";
import { AppContext } from "../App";
import { Button } from "rsuite";

interface UserDetails {
  id: number;
  fullName: string;
  birthday: string;
  email: string;
}

interface ContextProps {
  dispatch: React.Dispatch<any>;
}

interface CardProps {
  userDetails: Array<UserDetails>;
}

const Card = (props: CardProps) => {
  const { dispatch } = useContext(AppContext)! as ContextProps;
  return (
    <div className="card">
      <div className="card-container">
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <h2>ID</h2>
          </Grid>
          <Grid item xs={3}>
            <h2>Full Name</h2>
          </Grid>
          <Grid item xs={3}>
            <h2>Email</h2>
          </Grid>
          <Grid item xs={2}>
            <h2>Birthday</h2>
          </Grid>
          <Grid item xs={2}>
            <h2>Actions</h2>
          </Grid>
          <Divider />
          {!!props.userDetails ? (
            props.userDetails.map((user) => (
              <React.Fragment key={user.email}>
                <Grid item xs={2}>
                  <span>{user.id}</span>
                </Grid>
                <Grid item xs={3}>
                  <span>{user.fullName}</span>
                </Grid>
                <Grid item xs={3}>
                  <span>{user.email}</span>
                </Grid>
                <Grid item xs={2}>
                  <span>{user.birthday}</span>
                </Grid>
                <Grid item xs={2}>
                  <div className="btn-flex">
                    <Button
                      appearance="primary"
                      color="blue"
                      onClick={() =>
                        dispatch({ type: "SHOW_EDIT_MODAL", payload: { user } })
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      appearance="primary"
                      color="red"
                      onClick={() =>
                        dispatch({
                          type: "SHOW_DELETE_MODAL",
                          payload: { user },
                        })
                      }
                    >
                      Delete
                    </Button>
                  </div>
                </Grid>
              </React.Fragment>
            ))
          ) : (
            <Grid item xs={12}>
              <p style={{ color: "black" }}>No users found</p>
            </Grid>
          )}
        </Grid>
      </div>
      <div className="create-btn">
        <Button
          appearance="primary"
          onClick={() => dispatch({ type: "SHOW_CREATE_MODAL" })}
        >
          Create User
        </Button>
      </div>
    </div>
  );
};

export default Card;
