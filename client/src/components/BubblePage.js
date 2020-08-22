import React, { useState, useEffect } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { fetchBubbleData } from "../api/fetchBubbleData";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);


  useEffect(() => {

    fetchBubbleData()
      .then(res => {
        console.log(res)
        setColorList(res.data);
      })
      .catch(err => console.log('Failed to get data:', err));

    // axiosWithAuth()
    //   .get('/api/colors')
    //   .then(res => {
    //     console.log(res);
    //     setColorList(res.data);
    //   })
    //   .catch(err => console.log('Failed to get data:', err));
  }, []);

  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  return (
    <>
      <div
        className='colors-wrap' data-testid="testbubblepage"
      >
        <ColorList colors={colorList} updateColors={setColorList} />
      </div>
      <div
        className="bubble-wrap" data-testid="testbubblepage"
      >
        <Bubbles colors={colorList} />
      </div>
    </>
  );
};

export default BubblePage;
