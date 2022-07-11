import React, { Children, useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./modal.module.css";
import { createPortal } from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay.jsx";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const popup = document.querySelector("#popup");

export default function Modal(props) {
  const escClose = (e) => {
    if (e.key === "Escape") {
      props.closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", escClose);
    return () => {
      document.removeEventListener("keydown", escClose);
    };
  }, []);

  return createPortal(
    <>
      <div className={styles.popup}>
        <div className={styles.close_box}>
          <CloseIcon onClick={props.closeModal} />
        </div>
        {props.children}
      </div>

      <ModalOverlay closeModal={props.closeModal} />
    </>,
    popup
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func,
};
