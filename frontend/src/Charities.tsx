import { FunctionComponent } from "react";
import { Button } from "react-bootstrap";
import ReactDOM from "react-dom";
import styles from "./css/Charities.module.css";
import { useState } from 'react';


export const Charities: FunctionComponent = () => {
  const [num, setNum] = useState("");
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");//number 
  return (
    <div className={styles.charitiesDiv}>
      <div className={styles.frameDiv}>
      
        <div className={styles.cLARITABLEDiv}>
          <span className={styles.cLARITABLSpan}>CLARITABL</span>
          <span className={styles.eSpan}>E</span>
        </div>
        <div className={styles.hOMEDiv}>
          <span className={styles.hOMESpan}>HOME</span>
          <span className={styles.cLARITABLSpan}>{` `}</span>
        </div>
        <div className={styles.cHARITYDiv}>CHARITY</div>
        <div className={styles.tRACKDiv}>TRACK</div>
      </div>
      <div className={styles.cARD1Div}>
        <div className={styles.frameDiv1}>
          <div className={styles.rectangleDiv} ><input type="number"  min="1" 
          value={num}
          onChange={(e) => setNum(e.target.value)} />
          <div>You are willing to donate :{num}</div></div>
          
          <Button className={styles.rAISENOWDiv}>RAISE NOW</Button>
          
          <div className={styles.rectangleDiv1} />
        </div>
        <div className={styles.eDUCATIONDiv}>EDUCATION</div>
      </div>
      <div className={styles.cARD2Div}>
        <div className={styles.frameDiv2}>
          <div className={styles.frameDiv3}>
           
            <div className={styles.rectangleDiv1} />
            <div className={styles.rectangleDiv} ><input type="number"  min="1" 
          value={num1}
          onChange={(e) => setNum1(e.target.value)} />
          <div>You are willing to donate :{num1}</div></div>
            <Button className={styles.rAISENOWDiv}>RAISE NOW</Button>
          </div>
          <div className={styles.gIRLCHILDEMPOWERMENT}>
            GIRL CHILD EMPOWERMENT
          </div>
        </div>
      </div>
      <div className={styles.cARD3Div}>
        <div className={styles.frameDiv2}>
          <div className={styles.frameDiv3}>
            
            <div className={styles.rectangleDiv} ><input type="number" min="1" 
          value={num2}
          onChange={(e) => setNum2(e.target.value)} />
          <div>You are willing to donate :{num2}</div></div>
            <Button className={styles.rAISENOWDiv}>RAISE NOW</Button>
            <div className={styles.rectangleDiv1} />
          </div>
          <div className={styles.sENDHELPTOUKRAINE}>SEND HELP TO UKRAINE</div>
        </div>
      </div>
    </div>
  );
};
const rootElement = document.getElementById("root");
ReactDOM.render(<Charities />, rootElement);