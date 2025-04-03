import "./App.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useSnackbar } from "@mui/base/useSnackbar";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";

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

  const { getRootProps, onClickAway } = useSnackbar({
    onClose: handleClose,
    open,
    autoHideDuration: 5000,
  });

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
    handleOpen();
  };

  const hideList = () => {
    setAllProducts([]);
  };

  return (
    <div>
      <div>
        <form onSubmit={signUpForm.handleSubmit(handleSignUp)}>
          <div>
            <label>Name:</label>
            <input
              {...signUpForm.register("name", { required: true })}
              autoComplete="username"
            />
          </div>
          <div>
            <label>email:</label>
            <input
              {...signUpForm.register("email", { required: true })}
              autoComplete="username"
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              {...signUpForm.register("password", { required: true })}
              autoComplete="username"
            />
          </div>
          <button type="submit">CREATE</button>
        </form>
      </div>
      <div>
        <form onSubmit={logInForm.handleSubmit(handleLogIn)}>
          <div>
            <label>email:</label>
            <input
              {...logInForm.register("email", { required: true })}
              autoComplete="username"
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              {...logInForm.register("password", { required: true })}
              autoComplete="username"
            />
          </div>
          <button type="submit">LOG IN</button>
        </form>
        <button onClick={handleLogOut}>LOG OUT</button>
      </div>
      <div>
        <form onSubmit={newProductForm.handleSubmit(handleCreateProduct)}>
          <div>
            <label>Name:</label>
            <input
              {...newProductForm.register("name", { required: true })}
              autoComplete="username"
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              {...newProductForm.register("priceInPLNgr", { required: true })}
              autoComplete="username"
            />
          </div>
          <div>
            <label>Is in stock:</label>
            <input
              {...newProductForm.register("isInStock", { required: true })}
              autoComplete="username"
            />
          </div>
          <button type="submit">CREATE</button>
        </form>
      </div>
      <div>
        <button onClick={getAllProducts}>LIST ALL PRODUCTS</button>
        <button onClick={hideList}>HIDE LIST</button>
        <div>
          {allProducts.map((product) => (
            <div>{product.name}</div>
          ))}
        </div>
      </div>
      {open ? (
        <ClickAwayListener onClickAway={onClickAway}>
          <div {...getRootProps()}>{snackbarMessage}</div>
        </ClickAwayListener>
      ) : null}
    </div>
  );
}

export default App;
