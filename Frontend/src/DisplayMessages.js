import React from "react";

function DisplayMessages(props)
{
  
  const { allMess, clicked } = props
  
  const reversedItems = allMess.map(item => item).reverse();
 if(clicked) {return(<div>
  {
  reversedItems.map((messagez, index) => {
                                return (
                                  <div className="dataContainer">
                                  <div key={index}>
                                  <h3 style ={{margin:"2px"}}>Message: {messagez.message}</h3>
                                    <div>Address: {messagez.address}</div>
                                    <div>Time: {messagez.timestamp.toString()}</div>
                                    <div>Voted: {messagez.who}</div>                                  
                                  </div>
                                  </div>)
                              })
    
    
  }
  
  </div>)}
  else {return(<div className = "dataContainer" style={{display:"flex", textAlign:"center"}}>Transaction Processing</div>)}
                      
}

export default DisplayMessages