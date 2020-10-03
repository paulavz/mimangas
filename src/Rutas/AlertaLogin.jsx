import React, { useState, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import PropTypes from "prop-types";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AlertaLogin({ isOpen, children }) {
  const [open, setOpen] = useState(0);

  const aumentarOpen = () => {
    setOpen(open + 1);
  };

  useEffect(aumentarOpen, [isOpen]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(open - 1);
  };

  return (
    <Snackbar
      open={open > 1}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity="error">
        {children}
      </Alert>
    </Snackbar>
  );
}

AlertaLogin.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};
