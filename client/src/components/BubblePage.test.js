import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import BubblePage from './BubblePage';

import { fetchBubbleData as mockFetchBubbleData } from '../api/fetchBubbleData';


jest.mock('../api/fetchBubbleData');

const mockBubbleData = [
  {
    color: "aliceblue",
    code: {
      hex: "#f0f8ff"
    },
    id: 1
  },
  {
    color: "limegreen",
    code: {
      hex: "#99ddbc"
    },
    id: 2
  },
  {
    color: "aqua",
    code: {
      hex: "#00ffff"
    },
    id: 3
  },
]

test("Fetches data and renders the bubbles", async () => {
  // Finish this test

  mockFetchBubbleData.mockResolvedValueOnce({ mockBubbleData, });
  const { debug, getAllByText } = render(<BubblePage />);
  screen.debug();


expect(getAllByText(/colors/i)).toHaveLength(3);
  await waitFor(() => expect(mockFetchBubbleData).toHaveBeenCalledTimes(1))

});


/*
import component
ARRANGE - render component
ACT - simulate an event
ASSERT - run the test
*/


//screen.findAllByTestId