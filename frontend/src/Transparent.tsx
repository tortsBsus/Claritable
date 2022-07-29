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
      <div className={styles.trackdiv}>
        <div className={styles.myAddress}>My Address :</div>
        <div className={styles.nameOfCharity}>Name of charity :</div>
        <div className={styles.fOODDiv}>FOOD :</div>
        <div className={styles.mEDICINEDiv}>MEDICINE :</div>
        <div className={styles.moneyLEFT}>Money LEFT :</div>
        <div className={styles.x9c820c0412BDB5aee3175ACad7963Div}>
          0x9c820c0412BDB5aee3175ACad79631C097C0081C
        </div>
        <div className={styles.eFJEIOJFOWJEFEJFIEJFDiv}>
          EFJEIOJFOWJEFEJFIEJF
        </div>
        <div className={styles.div}>81</div>
        <div className={styles.div1}>81</div>
        <div className={styles.div2}>81</div>
      </div>
    </div>
  );
};
