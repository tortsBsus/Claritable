import { FunctionComponent } from "react";
import styles from "./css/Charities.module.css";

export const Charities: FunctionComponent = () => {
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
          <div className={styles.rectangleDiv} />
          <div className={styles.rAISENOWDiv}>RAISE NOW</div>
          <div className={styles.rectangleDiv1} />
        </div>
        <div className={styles.eDUCATIONDiv}>EDUCATION</div>
      </div>
      <div className={styles.cARD2Div}>
        <div className={styles.frameDiv2}>
          <div className={styles.frameDiv3}>
            <div className={styles.rectangleDiv} />
            <div className={styles.rectangleDiv1} />
            <div className={styles.rAISENOWDiv}>RAISE NOW</div>
          </div>
          <div className={styles.gIRLCHILDEMPOWERMENT}>
            GIRL CHILD EMPOWERMENT
          </div>
        </div>
      </div>
      <div className={styles.cARD3Div}>
        <div className={styles.frameDiv2}>
          <div className={styles.frameDiv3}>
            <div className={styles.rectangleDiv} />
            <div className={styles.rAISENOWDiv}>RAISE NOW</div>
            <div className={styles.rectangleDiv1} />
          </div>
          <div className={styles.sENDHELPTOUKRAINE}>SEND HELP TO UKRAINE</div>
        </div>
      </div>
    </div>
  );
};
