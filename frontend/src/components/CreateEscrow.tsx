
import { Box, Text, VStack, Button as ChakraButton, Flex, Input } from "@chakra-ui/react";
import { useState } from "react";
import { Switch } from "../components/ui/switch"
import { fee, deployPrice } from "../hooks/addresses";
import { useEscrowDeployer } from "../hooks/useDeployer";
const cardStyles = {
    borderWidth: "0.2px",
    borderRadius: "36px",
    overflow: "hidden",
    p: "6",
    boxShadow: "lg",
    bg: "white",
    color: "black",
    width: "360px",
    height: "100%",

    transition: "transform 0.3s, filter 0.3s",
    background: "white",
    backgroundSize: "200% 200%",
    _hover: {
      transform: "scale(1.03)",
    },
    marginBottom: "24px",
  };

export function CreateEscrow(data: any) {
    const [menuValue, setMenuValue] = useState("0");
    const {sendDeployEscrow} = useEscrowDeployer();
    const [checked, setChecked] = useState(false)
    return (
        <Box height={"full"}  >
            <VStack alignItems="stretch" height="100%" maxHeight="100%">
                <Box
                 {...cardStyles} maxHeight={"10%"}  display="flex" justifyContent="center" alignItems="center"
                >
                    <Text fontSize="lg" fontWeight="bold" color="black.600">New escrow index: {data.escrows.length}</Text>
                </Box>
                <Box {...cardStyles}
                >
                    <Flex direction="column" justifyContent="space-between" height="100%" spaceY={"26px"}>
                        <Box display="flex" justifyContent="space-between">
                            <Text fontWeight={'bold'} color="gray.600" mt={'2px'}>Price: </Text> 
                            <Input  
                                    type="number"
                                    width={"40%"}
                                    height={'30px'}
                                    value={menuValue}   
                                    onChange={(e) => {
                                        const value = Number(e.target.value);
                                        setMenuValue(value.toString());
                                    }}
                                    placeholder="price"
                                    mr="2"
                                    rounded={"16px"}
                                />
                            <Switch border={'20px'} checked={checked} onCheckedChange={(e: any) => {setChecked(e.checked)}}>{checked ? "Tons" : "Usdt"}</Switch>    
                        </Box>
     
                        <Box display="flex" justifyContent="space-between">
                            <Text fontWeight={'bold'} color="gray.600">Price to deploy: </Text> 
                            <Text fontWeight={'bold'} color="gray.600" mr={'3'}>{Number(deployPrice)} Tons </Text> 
                        </Box>
  
                        <Box display="flex" justifyContent="space-between">
                        <Text fontWeight={'bold'} color="gray.600">Guarantor fee: </Text>  
                        <Text fontWeight={'bold'} color="gray.600" mr={'3'}>{Number(fee)}% </Text> 
                        </Box>
                        <Flex spaceX={"40px"} mt={"20px"}>
                            <ChakraButton
                                minWidth="160px"
                                borderRadius="18px"
                                mt={'2px'}
                                bg="black"
                                color="white"
                                colorScheme="teal"
                                _hover={{ boxShadow: "xl", transform: "scale(1.02)" }}
                                transition="all 0.2s"
                                ml="auto"
                                onClick={() => sendDeployEscrow(menuValue, checked ? 0 : 1)}
                            >
                                Create escrow
                            </ChakraButton>
                        </Flex>              
                    </Flex>
                </Box>
            </VStack>
        </Box>
    );
}
