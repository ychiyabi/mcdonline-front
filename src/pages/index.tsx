
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import McdGenerator from "@/components/McdGenerator";
import EntityGenerator from "@/components/EntityGenerator";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Navbar />
      <McdGenerator />
      {/* <EntityGenerator /> */}
    </>
  );
}
