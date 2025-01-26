
import { Inter } from "next/font/google";
import { useState } from "react";
import McdGenerator from "@/components/McdGenerator";
import Navbar from "@/components/Navbar";
import McdDetails from "@/components/McdDetails";
import Main from "@/components/Main";

const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  const [divPosition, setDivPosition] = useState({ x: 0, y: 0 });

  const handleLinePositionChange = (position) => {
    setDivPosition(position);
  };
  const [updated, setUpdated] = useState(false);
  const [stateOfMcdGenerator, setStateOfMcdGenerator] = useState(false);
  const [stateOfMcdDetails, setStateOfMcdDetails] = useState(false);
  const [authenticationRetour, setAuthenticationRetour] = useState(false);
  const updateState = () => {
    setUpdated(!updated);
  }
  const updateStateOfMcdGenerator = () => {
    setStateOfMcdGenerator(!stateOfMcdGenerator)
  }
  const updateStateOfMcdDetails = () => {
    setStateOfMcdDetails(!stateOfMcdDetails)
  }

  const updateEtatDeAuthentification = (etat: boolean) => {
    setAuthenticationRetour(etat);
  }
  return (
    <>
      <h1>hello</h1>

      <Navbar authentifier={authenticationRetour} />

      {!authenticationRetour ? <Main etatDeRetour={updateEtatDeAuthentification} /> :

        <div className="row mt-3">
          <div className="col-2 bg-secondary">
            <McdDetails updator={updateStateOfMcdGenerator} statesended={stateOfMcdDetails} />
          </div>
          <div className="col-10">
            <McdGenerator updator={updateStateOfMcdDetails} statesended={stateOfMcdGenerator} />
          </div>
        </div>
      }
    </>
  );
}



