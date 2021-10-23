import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/home.module.css";
import Map from "./../components/Map";

const initPos = {
  x: 129.073532,
  y: 32.967488,
  // x: -68.137343,
  // y: 45.137451,
};

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>(仮)五島マップ</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Map center={[initPos.x, initPos.y]} zoom={11} />
    </div>
  );
};

export default Home;
