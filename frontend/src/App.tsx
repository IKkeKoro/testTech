import "./App.css";
import { Flex, Box, Button as ChakraButton, Center, Link } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { TonConnectButton } from "@tonconnect/ui-react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "@twa-dev/sdk";
import { Board } from "./components/Board";
import  { useState } from "react";
import { DetailedEscrow } from "./components/DetailedEscrow";
import { useEffect } from "react";
import { useEvent } from "./hooks/useEvent";
import { CreateEscrow } from "./components/CreateEscrow";
export function App() {
    const [data, setData] = useState<any>(null);
    async function fetchData() {
        const eventData = await useEvent();
        setData(eventData);
    }
    useEffect(() => {
        fetchData();
    }, []);
  const [showBoard, setShowBoard] = useState(true);
  const color = useColorModeValue("black", "white");
  const bgGradient = useColorModeValue("linear-gradient(135deg, #f0f0f0 0%, #d0d0d0 100%)", "linear-gradient(135deg, #303030 800%, #202020 100%)");

  return (
    <Router>
    <Box bg="rgba(255, 255, 255, 0.5)" color={color} bgImage={bgGradient} minH="100vh" p="20px" transition="background-color 0.3s ease, color 0.3s ease" style={{ backdropFilter: "blur(100px)" }}>
    {data === null ? <Flex justify={'center'}>Loading...</Flex> : 
      <Center >
          <Flex direction="column" gap="16px">
          <Flex justify="center" gap="10px">
              {window.location.pathname !== "/" ? (
              <Link href={`/`}>
                <ChakraButton bgColor="black" color="white" borderRadius="20px">
                Show Board
                </ChakraButton>
              </Link>
              ) : (
                <Link href={`/create/`}>
                  <ChakraButton bgColor="black" color="white" borderRadius="20px" onClick={() => {
                  setShowBoard(!showBoard);
                  }}>
                  {"Create Escrow"}
                  </ChakraButton>
                </Link>
              )}
              <TonConnectButton  />
              
            </Flex>

            <Routes>
              <Route path={"/"} element={
                <Flex direction="column" align="center" spaceY={4}>
                  <Board {...data}/>
                </Flex>
              } />
              <Route path={`/escrow/:id`} element={<DetailedEscrow {...data}/>} />
              <Route path={`/create/`} element={<CreateEscrow {...data}/>} />
            </Routes>
          </Flex>
        
      </Center>}
    </Box>
    </Router>
  );
}

export default App;
