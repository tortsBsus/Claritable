import { connect } from "http2";
import { FunctionComponent, useCallback } from "react";
import { NavigateOptions, useNavigate, Link } from "react-router-dom";
import styles from "./css/Desktop2.module.css";
//import ( ethers ) from "ethers";


export const Desktop2: FunctionComponent = () => {


  const navigate = useNavigate();

  // const onDONATENOWTextClick = useCallback(() => {
  // navigate("/charities");
  // }, [navigate]);

  // const onDONATENOWText1Click = useCallback(() => {
  //     navigate("/charities");
   // }, [navigate]);

  // const onCHARITYTextClick = useCallback(() => {
  //     navigate("/charities");
  // }, [navigate]);

  // const onABOUTUSTEXTClick = useCallback(() => {
  //   navigate("/aboutus");
  // }, [navigate]);


  const onPAGE3ContainerClick = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='frameContainer1']");
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);


  const onPAGE4ContainerClick = useCallback(() => {
    const anchor = document.querySelector(
      "[data-scroll-to='unsplashelFgCXiq1BgImage']"
    );
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  const onPAGE2ContainerClick = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='frameContainer']");
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);


  const onTRACKTextClick = useCallback(() => {
    navigate("/transparent");
  }, [navigate]);

  const onFrameContainer7Click = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='pAGE2Container']");
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);






















  return (
    <div className={styles.desktop2}>
      <div className={styles.pAGE3Div} onClick={onPAGE3ContainerClick}>
        <div className={styles.frameDiv} data-scroll-to="frameContainer">
          <div className={styles.frameDiv1}>
            <div className={styles.gIRLCHILDEMPOWERMENT}>
              <span className={styles.gIRLCHILDEMPOWERMENTContainer}>
                <span className={styles.gIRLCHILDEMPOWERMEN}>
                  GIRL CHILD EMPOWERMEN
                </span>
                <span className={styles.tSpan}>T</span>
              </span>
            </div>
            <div className={styles.closeTo53OfGirlsInTheA}>
              Close to 53% of girls in the age group of 5 to 9 years are
              illiterate. More than 50% of girls fail to enroll in school; those
              that do are likely to drop out by the age of 12. Sponsor the
              education of girl children. Support them with necessities like
              tuition fees, school supplies, footwear, and transport. Educated
              girls become empowered women who empower societies.
            </div>
          </div>
          <img
            className={styles.unsplashuaPaEM7MiQQIcon}
            alt=""
            src="unsplashuapaem7miqq@2x.png"
          />
        </div>
        <div className={styles.frameDiv2}>
          <div className={styles.rectangleDiv} />
          <div className={styles.dONATENOWDiv} onClick={()=>{navigate("/charities");}}>
            DONATE NOW
          </div>
        </div>
      </div>
      <div className={styles.pAGE4Div} onClick={onPAGE4ContainerClick}>
        <div className={styles.frameDiv3} data-scroll-to="frameContainer1">
          <img className={styles.intersectIcon} alt="" src="intersect@2x.png" />
          <div className={styles.frameDiv4}>
            <div className={styles.sENDHELPTOUKRAINE}>SEND HELP TO UKRAINE</div>
            <div className={styles.itHasBeenMonthsSinceRussi}>
              It has been months since Russia declared war on Ukraine and the
              crisis continues to escalate. With no end in sight, the people of
              Ukraine continue to face ongoing food and water shortages, risk of
              physical injury, lack of medical care, and safe shelter. Donate to
              help us provide urgent aid to those impacted by the war, including
              Ukrainian refugees who fled their homes with few resources. You
              can provide medical aid, protect children’s welfare, supply safe
              drinking water, food, and shelter, support millions of refugees,
              and provide other life-saving support.Provide the Ukrainian people
              with critical relief to survive this humanitarian crisis today.
            </div>
          </div>
          <img
            className={styles.unsplashuaPaEM7MiQQIcon1}
            alt=""
            src="unsplashuapaem7miqq1@2x.png"
          />
        </div>
        <div className={styles.frameDiv5}>
          <div className={styles.rectangleDiv} />
          <div className={styles.dONATENOWDiv2} onClick={()=>{navigate("/charities");}}>
            DONATE NOW
          </div>
        </div>
      </div>
      <div className={styles.pAGE5Div}>
        <img
          className={styles.unsplashelFgCXiq1BgIcon}
          alt=""
          src="unsplashelfgcxiq1bg@2x.png"
          data-scroll-to="unsplashelFgCXiq1BgImage"
        />
        <div className={styles.frameDiv6}>
          <div className={styles.contactUsClaritablegmail}>
            <span className={styles.gIRLCHILDEMPOWERMENTContainer}>
              <p className={styles.contactUs}>
                Contact us - claritable@gmail.com
              </p>
              <p className={styles.t49549P}>9948t-49549</p>
            </span>
          </div>
        </div>
        <div className={styles.bECOMEADIFFERANCE}>BECOME A DIFFERANCE</div>
      </div>
      <div
        className={styles.pAGE2Div}
        data-scroll-to="pAGE2Container"
        onClick={onPAGE2ContainerClick}
      >
        <div className={styles.frameDiv7}>
          <div className={styles.eDUCATIONDiv}>EDUCATION</div>
          <div className={styles.in11ChildrenGoToWorkWhen}>
            1 in 11 children go to work when they should be in school. When it
            is hard to afford necessities like food, shelter, and clothing;
            education becomes a luxury that the poor give up. Illiteracy then
            leads to further poverty. Donate for child education in India,
            support them with fees, school supplies, footwear, transport and
            opportunities to showcase their talents.
          </div>
        </div>
        <img
          className={styles.unsplashuaPaEM7MiQQIcon2}
          alt=""
          src="unsplashuapaem7miqq2@2x.png"
        />
        <div className={styles.dONATENOWDiv1} onClick={()=>{navigate("/charities");}}>
          DONATE NOW
        </div>
      </div>
      <div className={styles.pAGE1Div}>
        <img
          className={styles.unsplashw6caoaJzXIEIcon}
          alt=""
          src="unsplashw6caoajzxie@2x.png"
        />
        <div className={styles.frameDiv8} onClick={onFrameContainer7Click}>
          <div className={styles.aboutusDiv}>
            <div className={styles.rectangleDiv} />
            <div className={styles.aBOUTUSDiv} onClick={()=>{navigate("/aboutus");}}>
              ABOUT US
            </div>
          </div>
          <div
            className={styles.nowYouCanDonateWithATrus}
          >{`Now you can donate with a trust since we since `}</div>
          <div className={styles.lENDAHANDTOBRINGASMILE}>
            LEND A HAND TO BRING A SMILE
          </div>
          <div className={styles.frameDiv9}>
            <div className={styles.cLARITABLEDiv}>
              <span className={styles.cLARITABLSpan}>CLARITABL</span>
              <span className={styles.eSpan}>E</span>
            </div>
            <div className={styles.hOMEDiv}>
              <span className={styles.hOMESpan}>HOME</span>
              <span className={styles.cLARITABLSpan}>{` `}</span>
            </div>
            <div className={styles.cHARITYDiv} onClick={()=>{navigate("/charities");}}>
              CHARITY
            </div>
            <div className={styles.tRACKDiv} onClick={onTRACKTextClick}>
              TRACK
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
