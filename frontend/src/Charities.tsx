import { FunctionComponent } from "react";
import { Button } from "react-bootstrap";
import ReactDOM from "react-dom";
import styles from "./css/Charities.module.css";
import { useState } from "react";
import abi from "./utils/abi.json";
import { ethers }  from "ethers";
declare let window: any;

export const Charities: FunctionComponent = () => {
  const [num, setNum] = useState("");
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState(""); //number
  const contractAddress = "0x7013C014bDec413cD873e97740F58E2Ba821Af70";
  const contractABI = abi.abi;


  //function 3
  const wave = async () => {
  
    console.log("entered wave function");
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const alienContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        try {
          const Txn = await alienContract.faceInc("message",{ gasLimit: 300000 });

          console.log("Mining...", Txn.hash);

          await Txn.wait();
          console.log("Mined and paid! ", Txn.hash);
      }
      catch (error) {
          alert("Wait 2 mins between votes! Refresh page and try again!");
          return;
      }


      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log("the error? " + error);
    }
  };

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
          <div className={styles.rectangleDiv}>
            <input className={styles.input}
              type="number"
              min="1"
              value={num}
              onChange={(e) => setNum(e.target.value)}
            />
            <div>You are willing to donate :{num}</div>
          </div>

          <Button className={styles.rAISENOWDiv} onClick = {wave}>RAISE NOW</Button>

          <div className={styles.rectangleDiv1} />
        </div>
        <div className={styles.eDUCATIONDiv}>EDUCATION</div>
      </div>
      <div className={styles.cARD2Div}>
        <div className={styles.frameDiv2}>
          <div className={styles.frameDiv3}>
            <div className={styles.rectangleDiv1} />
            <div className={styles.rectangleDiv}>
              <input className={styles.input}
                type="number"
                min="1"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
              />
              <div>You are willing to donate :{num1}</div>
            </div>
            <Button className={styles.rAISENOWDiv} onClick = {wave}>RAISE NOW</Button>
          </div>
          <div className={styles.gIRLCHILDEMPOWERMENT}>
            GIRL CHILD EMPOWERMENT
          </div>
        </div>
      </div>
      <div className={styles.cARD3Div}>
        <div className={styles.frameDiv2}>
          <div className={styles.frameDiv3}>
            <div className={styles.rectangleDiv}>
              <input className={styles.input}
                type="number"
                min="1"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
              />
              <div>You are willing to donate :{num2}</div>
            </div>
            <Button className={styles.rAISENOWDiv} onClick = {wave}>RAISE NOW</Button>
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
