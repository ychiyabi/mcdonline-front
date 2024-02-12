
import { Inter } from "next/font/google";
import { useState } from "react";
import styles from "@/styles/Home.module.css";
import McdGenerator from "@/components/McdGenerator";
import EntityGenerator from "@/components/EntityGenerator";
import Navbar from "@/components/Navbar";
import EntityRelationship from "@/components/EntityRelationship";
import McdDetails from "@/components/McdDetails";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [divPosition, setDivPosition] = useState({ x: 0, y: 0 });

  const handleLinePositionChange = (position) => {
    setDivPosition(position);
  };
  return (
    <>
      <Navbar />
      <div className="row">
        <div className="col-3 bg-secondary">
          <McdDetails />
        </div>
        <div className="col-9">
          <McdGenerator />
        </div>
      </div>

      {/* <EntityRelationship /> */}

      {/* <EntityGenerator /> */}
    </>
  );
}
