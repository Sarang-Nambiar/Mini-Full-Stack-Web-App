import "rsuite/dist/rsuite-no-reset.min.css";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";
import Card from "./Components/Card";
import DeleteModal from "./Components/DeleteModal";
import CreateModal from "./Components/CreateModal";
import EditModal from "./Components/EditModal";
import { ToastContainer } from 'react-toastify';

const AppContext = React.createContext(null);

interface UserDetails {
  id: number;
  fullName: string;
  birthday: string;
  email: string;
}

const reducer = (state: any, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case "SHOW_DELETE_MODAL":
      return {
        ...state,
        user: payload.user,
        showDeleteModal: true,
        showCreateModal: false,
        showEditModal: false
      };
    case "SHOW_CREATE_MODAL":
      return {
        ...state,
        showDeleteModal: false,
        showCreateModal: true,
        showEditModal: false
      };
    case "SHOW_EDIT_MODAL":
      return {
        ...state,
        user: payload.user,
        showDeleteModal: false,
        showCreateModal: false,
        showEditModal: true
      };
    default:
      return {
        ...state,
        showDeleteModal: false,
        showCreateModal: false,
        showEditModal: false
      };
  }
};
const initialState = {
  user: {},
  showDeleteModal: false,
  showCreateModal: false,
  showEditModal: false,
};

function App() {
  const [userDetails, setUserDetails] = useState<Array<UserDetails>>([]);

  const [state, dispatch] = useReducer(reducer, initialState);

  const getUsers = async () => {
    await axios.get("http://localhost:3000/users/").then((response) => {
      setUserDetails(response.data);
    });
  };

  useEffect(() => {
    getUsers();
  });

  return (
    <AppContext.Provider value={{ user: state.user, dispatch } as any}>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={false}
        pauseOnHover={true}
      />
      {state.showDeleteModal && <DeleteModal/>}
      {state.showCreateModal && <CreateModal/>}
      {state.showEditModal && <EditModal/>}
      <div className="container">
        <h1>Welcome</h1>
        <h2>Users List</h2>
        <Card userDetails={userDetails}/>
      </div>
    </AppContext.Provider>
  );
}

export { AppContext };
export default App;
