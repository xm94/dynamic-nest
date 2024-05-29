import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchStudents, Student } from "@/redux/studentSlice";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const dispatch: AppDispatch = useDispatch();
  const allStudents = useSelector((state: RootState) => state.students.students);



  useEffect(() => {

        dispatch(fetchStudents());

}, [dispatch]);


  return (
    <>
      <div>
        <h1>Students</h1>
        { allStudents.map((value: Student, index: number) => (
                    <div>
                        <br></br>
                        
                        <h3 >{value.name} - ID# {value.id}</h3>
                        <p>{value.email}</p>

                    </div>
                ))}
      </div>

    </>
  );
}
