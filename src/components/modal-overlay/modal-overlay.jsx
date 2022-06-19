import React, { useEffect, useState } from "react";
import { isPropertySignature } from "typescript";
import styles from "./modal-overlay.module.css";

export default function ModalOverlay(props) {
  return <div className={styles.overlay} onClick={props.closeModal}></div>;
}
