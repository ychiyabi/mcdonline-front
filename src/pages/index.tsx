
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
  const [updated, setUpdated] = useState(false);
  const [stateOfMcdGenerator, setStateOfMcdGenerator] = useState(false);
  const [stateOfMcdDetails, setStateOfMcdDetails] = useState(false);
  const updateState = () => {
    setUpdated(!updated);
  }
  const updateStateOfMcdGenerator = () => {
    setStateOfMcdGenerator(!stateOfMcdGenerator)
  }
  const updateStateOfMcdDetails = () => {
    setStateOfMcdDetails(!stateOfMcdDetails)
  }
  return (
    <>

      <Navbar />
      <a href="http://localhost:8080/oauth2/authorization/google">Authenticate</a>

      <div className="row">
        <div className="col-2 bg-secondary">
          <McdDetails updator={updateStateOfMcdGenerator} statesended={stateOfMcdDetails} />
        </div>
        <div className="col-10">
          <McdGenerator updator={updateStateOfMcdDetails} statesended={stateOfMcdGenerator} />
        </div>
      </div>

      {/* <EntityRelationship /> */}

      {/* <EntityGenerator /> */}
    </>
  );
}



