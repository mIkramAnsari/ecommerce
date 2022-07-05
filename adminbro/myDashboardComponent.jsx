import { Box, Text } from "@adminjs/design-system";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Dashboard = () => {
  const [sellers, setsellers] = useState(); 
  const [buyers, setbuyers] = useState(); 
  const [products, setproducts] = useState();
  const [orders, setorders] = useState();
  
  useEffect(async () => {
    let response1 = await axios.get(`/user/stats`);
    setsellers(response1.data.data.sellers); 
    setbuyers(response1.data.data.buyers);
    setproducts(response1.data.data.products);
    setorders(response1.data.data.orders);
    

  }, []);

  return (
    //Parent Box
    <Box style={{ padding: "20px" }}>
      <Box>
        <Box width={[1, 1, 1, 1]} variant="card">
          {" "}
          <Text
            lineHeight="1"
            fontFamily="fantasy"
            fontSize="40px"
            textAlign="center"
            color="blue"
          >
            Welcome on E-commerce Admin Board 
          </Text>{" "}
        </Box>
      </Box>
      {/* Box to show  number of Registered Users */}
      <Box>
        <Box width={[1, 1, 1, 1]} variant="card">
          {" "}
          <Text
            lineHeight="2"
            fontFamily="fantasy"
            fontSize="20px"
            textAlign="center"
          >
            Registered Users <br/>
            Sellers:  {sellers} <br/>
            Buyers:   {buyers}
          </Text>{" "}
        </Box>
      </Box>
      <Box>
        <Box width={[1, 1, 1, 1]} variant="card">
          {" "}
          <Text
            lineHeight="2"
            fontFamily="fantasy"
            fontSize="20px"
            textAlign="center"
          >
            Registered products: {products}
          </Text>{" "}
        </Box>
      </Box>
      <Box>
        <Box width={[1, 1, 1, 1]} variant="card">
          {" "}
          <Text
            lineHeight="2"
            fontFamily="fantasy"
            fontSize="20px"
            textAlign="center"
          >
            Registered orders: {orders}
          </Text>{" "}
        </Box>
      </Box>
    </Box> //End Parent Box
  );
};
export default Dashboard;
