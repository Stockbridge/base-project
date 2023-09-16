import React from "react";
import Head from "next/head";
import { Main } from "../components/Main";

export default function Home() {
  return (
    <>
      <Head>
        <title>Stockbridge - Base Project</title>
      </Head>
      <Main>
        <h1>This is a starter project</h1>
      </Main>
    </>
  );
}
