import React, { FC } from "react";
import styles from "./Loader.module.scss";

interface LoaderProps {}

const Loader: FC<LoaderProps> = () => <div className={styles.layout}>
    <div className={styles.Loader}></div>
</div>;

export default Loader;
