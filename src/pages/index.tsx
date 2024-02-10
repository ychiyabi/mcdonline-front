
import { Inter } from "next/font/google";
import { useState } from "react";
import styles from "@/styles/Home.module.css";
import McdGenerator from "@/components/McdGenerator";
import EntityGenerator from "@/components/EntityGenerator";
import Navbar from "@/components/Navbar";
import FlexibleLine from '@/components/FlexibleLine';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [divPosition, setDivPosition] = useState({ x: 0, y: 0 });

  const handleLinePositionChange = (position) => {
    setDivPosition(position);
  };
  return (
    <>
      <Navbar />
      <FlexibleLine onPositionChange={handleLinePositionChange} />
      <div
        style={{
          position: 'absolute',
          left: `${divPosition.x}px`,
          top: `${divPosition.y}px`,
          width: '50px',
          height: '50px',
          backgroundColor: 'red',
        }}
      >
        {/* Your content */}
      </div>
      <McdGenerator />
      {/* <EntityGenerator /> */}
    </>
  );
}
