import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/Transparent.module.css";

export const Transparent: FunctionComponent = () => {
  const navigate = useNavigate();

  const onHOMETextClick = useCallback(() => {
    navigate("/desktop-2");
  }, [navigate]);

  const onCHARITYTextClick = useCallback(() => {
    navigate("/charities");
  }, [navigate]);

  return (
    <div className={styles.transparentDiv}>
      <div className={styles.frameDiv}>
        
        <div className={styles.cLARITABLEDiv}>
          <span className={styles.cLARITABLSpan}>CLARITABL</span>
          <span className={styles.eSpan}>E</span>
        </div>
        <div className={styles.hOMEDiv} onClick={onHOMETextClick}>
          <span className={styles.hOMESpan}>HOME</span>
          <span className={styles.cLARITABLSpan}>{` `}</span>
        </div>
        <div className={styles.cHARITYDiv} onClick={onCHARITYTextClick}>
          CHARITY
        </div>
        <div className={styles.tRACKDiv}>TRACK</div>
        
      </div>
      <div className={styles.trackdiv} style={{  justifyContent: "space-between" }}>
       Please click on the button  to redirect to view all the transactions
       <a href="https://rinkeby.etherscan.io/address/0x7013C014bDec413cD873e97740F58E2Ba821Af70" target="_blank" rel="noreferrer">
                  TRANSACTIONS 
        </a>
      </div>
    </div>
  );
};
