import React from "react";
import { useState } from "react";
import DisplayMessages from "./DisplayMessages"

function Options(props)
{
  const { wave , allMess, checked } = props
   const pathway = (x,y) => {
     
     switch(x)
     {case 100:wave(true,y);break;
     case 200:wave(false,y);break;
     default:console.log("switch pages")
     }
     setVoted(!voted)
    
  }
   
  
  const [voted, setVoted] = useState(false)
   const [tez, setTez] = useState("Add thoughts!");
   const handleChange = event => {
    setTez(event.target.value)
    
  };
  return (
              !voted? <div>
                          <div className="bio">
                          Choose an emoji and you creatures can collectively decide if you are civilised or savages
                          </div>
                          
                          <div className = "options">
                              <button className="waveButton" onClick={()=>pathway(100,tez)}>
                                <span role="img" aria-label="alien-head">👽</span>
                              </button>
                              <button className="waveButton" onClick={()=>pathway(200,tez)}>
                                <span role="img" aria-label="alien-ship">🛸</span>
                              </button>
                          </div>
                          <form>
                          <input className ="textboz"  value={tez} onChange= {handleChange} id = "Tex"/>
                          </form>
                      </div>                    
                      :<div>
                          <div className="bio">
                          Trick question! Y'all are clearly civilised if you're capable of understanding polls!
                          </div>
                          <div className = "progress">
                            <b className ="face" id = "F1"><span role="img" aria-label="alien-head">👽</span></b> 
                            <b className ="ship" id = "S1"> <span role="img" aria-label="alien-ship">🛸</span></b>
                          </div>
                        <div className = "optionz"  >
                          <button className="waveButton" style={{fontSize: "24px"}} onClick={()=>pathway(-1,"nah")}>
                              Vote Again!
                            </button>
                            
                        </div>
                        
                         <DisplayMessages allMess = {allMess} clicked = {checked}/>
                        
                      </div>
                       
  );
}

export default Options;