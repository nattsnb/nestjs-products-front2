import { useForm } from "react-hook-form";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import {
  StyledButtonsDiv,
  StyledDiv,
  StyledLabel,
  StyledListDiv,
  StyledTitleDiv,
  StyledVerticalDiv,
} from "./App.styled.tsx";

function App() {
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const signUpForm = useForm();
  const logInForm = useForm();
  const newProductForm = useForm();
  const [allProducts, setAllProducts] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSignUp = async (data) => {
    const response = await fetch(
      "http://localhost:3000/authentication/sign-up",
      {
        method: "POST",
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
    );
    const responseJson = await response.json();
    console.log(responseJson);
    if (response.status === 201) {
      setSnackbarMessage(`User ${data.name} was created.`);
    } else {
      setSnackbarMessage("Error creating user");
    }
    handleOpen();
  };

  const handleLogIn = async (data) => {
    const response = await fetch(
      "http://localhost:3000/authentication/log-in",
      {
        method: "POST",
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
    );
    const responseJson = await response.json();
    console.log(responseJson);
    if (response.status === 200) {
      setSnackbarMessage(`User logged in.`);
    } else {
      setSnackbarMessage(`Error logging in user.`);
    }
    handleOpen();
  };

  const handleLogOut = async () => {
    const response = await fetch(
      "http://localhost:3000/authentication/log-out",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
    );
    console.log(response);
    if (response.status === 200) {
      setSnackbarMessage(`User logged out.`);
    } else {
      setSnackbarMessage(`Error logging out user.`);
    }
    handleOpen();
  };

  const handleCreateProduct = async (data) => {
    console.log(data);
    const response = await fetch("http://localhost:3000/products", {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        priceInPLNgr: data.priceInPLNgr,
        isInStock: data.isInStock,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const responseJson = await response.json();
    console.log(responseJson);
    if (response.status === 201) {
      setSnackbarMessage(`Product ${data.name} created.`);
    } else {
      setSnackbarMessage(`Error creating product.`);
    }
    handleOpen();
  };

  const getAllProducts = async () => {
    const response = await fetch("http://localhost:3000/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const responseJson = await response.json();
    console.log(responseJson);
    if (response.status === 200) {
      setAllProducts(responseJson);
    } else {
      setSnackbarMessage(`Error producing list product.`);
    }
  };

  const hideList = () => {
    setAllProducts([]);
  };

  return (
    <div>
      <p>create user</p>
      <StyledTitleDiv>
        <form onSubmit={signUpForm.handleSubmit(handleSignUp)}>
          <StyledDiv>
            <StyledLabel>Name:</StyledLabel>
            <input
              {...signUpForm.register("name", { required: true })}
              autoComplete="username"
            />
          </StyledDiv>
          <StyledDiv>
            <StyledLabel>email:</StyledLabel>
            <input
              {...signUpForm.register("email", { required: true })}
              autoComplete="username"
            />
          </StyledDiv>
          <StyledDiv>
            <StyledLabel>Password:</StyledLabel>
            <input
              {...signUpForm.register("password", { required: true })}
              autoComplete="username"
            />
          </StyledDiv>
          <StyledButtonsDiv>
            <button type="submit">CREATE</button>
          </StyledButtonsDiv>
        </form>
      </StyledTitleDiv>
      <p>log in/out</p>
      <StyledTitleDiv>
        <form onSubmit={logInForm.handleSubmit(handleLogIn)}>
          <StyledDiv>
            <StyledLabel>email:</StyledLabel>
            <input
              {...logInForm.register("email", { required: true })}
              autoComplete="username"
            />
          </StyledDiv>
          <StyledDiv>
            <StyledLabel>Password:</StyledLabel>
            <input
              {...logInForm.register("password", { required: true })}
              autoComplete="username"
            />
          </StyledDiv>
          <StyledButtonsDiv>
            <button type="submit">LOG IN</button>
            <button type="button" onClick={handleLogOut}>
              LOG OUT
            </button>
          </StyledButtonsDiv>
        </form>
      </StyledTitleDiv>
      <p>create product</p>
      <StyledTitleDiv>
        <form onSubmit={newProductForm.handleSubmit(handleCreateProduct)}>
          <StyledDiv>
            <StyledLabel>Name:</StyledLabel>
            <input
              {...newProductForm.register("name", { required: true })}
              autoComplete="username"
            />
          </StyledDiv>
          <StyledDiv>
            <StyledLabel>Price:</StyledLabel>
            <input
              {...newProductForm.register("priceInPLNgr", { required: true })}
              autoComplete="username"
            />
          </StyledDiv>
          <StyledDiv>
            <StyledLabel>Is in stock:</StyledLabel>
            <input
              {...newProductForm.register("isInStock", { required: true })}
              autoComplete="username"
            />
          </StyledDiv>
          <StyledButtonsDiv>
            <button type="submit">CREATE</button>
          </StyledButtonsDiv>
        </form>
      </StyledTitleDiv>
      <p>product list</p>
      <StyledVerticalDiv>
        <div>
          <button onClick={getAllProducts}>LIST ALL PRODUCTS</button>
          <button onClick={hideList}>HIDE LIST</button>
        </div>
        <StyledListDiv>
          {allProducts.map((product) => (
            <div key={product.id}>{product.name}</div>
          ))}
        </StyledListDiv>
      </StyledVerticalDiv>
      <ClickAwayListener onClickAway={handleClose}>
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          message={snackbarMessage}
        />
      </ClickAwayListener>
    </div>
  );
}

export default App;
