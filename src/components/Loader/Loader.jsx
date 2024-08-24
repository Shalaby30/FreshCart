import React from "react";
import styles from "./Loader.module.css";
import { ThreeDots } from "react-loader-spinner";
export default function Loader() {
  return (
    <div className="container mx-auto h-screen">
      <div className="flex justify-center items-center">
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </div>
  );
}
