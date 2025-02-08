import { EscrowData } from "../hooks/useEvent";
import { fromNano } from "ton-core";
import {
  Box,
  Flex,
  Button,
  Text as ChakraText,
  Heading,
  Link, 
} from "@chakra-ui/react";


const Text = (props: any) => (
  <ChakraText 
      fontSize="md" 
      color="gray.700" 
      lineHeight="tall" 
      fontWeight="normal" 
      {...props} 
  />
);


interface ProjectCardProps {
  id: bigint;
  onClick: () => void;
  data: EscrowData
}

export function EscrowCard(props: ProjectCardProps) {
  const { id, data } = props;
  const cardStyles = {
    borderWidth: "0.1px",
    borderRadius: "36px",
    overflow: "hidden",
    p: "6",
    boxShadow: "lg",
    bg: "white",
    color: "black",
    width: "320px",
    height: "100%",
    transition: "transform 0.3s, filter 0.3s",
    background: "white",
    backgroundSize: "200% 200%",
    _hover: {
      transform: "scale(1.03)",
    },
    marginBottom: "24px",
  };
 
  return (
    <Box
      {...cardStyles}
    >
        <Flex direction="column" height="100%" >  
          <Heading as="h3" size="lg" mt="4">{`id ${id}`}</Heading>
          <Box borderBottom="1px solid" borderColor="gray.200" mt="2" />

          <Flex mt="4" justify="space-between">

          <Text fontWeight="bold" color="gray.600">Price:  </Text>
          <Text>{fromNano(data.price)} {data.tonOrUsdt === 0 ? " Ton" : " Usdt"}</Text>
          </Flex >
           
            </Flex>
            <Flex mt="2" justify="space-between">
              <Text fontWeight="bold" color="gray.600">Seller: </Text>
              <Link color={"blue.400"}   
                href={`https://testnet.tonviewer.com/${data.seller}`}>
                <Text color={"blue.400"} ml="auto">{`${data!.seller.toString().slice(0, 4)}...${data!.seller.toString().slice(-4)}`}</Text>
              </Link>
            </Flex>
            <Flex mt="2" justify="space-between">
              <Text fontWeight="bold" color="gray.600">Contract: </Text>
              <Link color={"blue.400"}   
                href={`https://testnet.tonviewer.com/${data.address}`}>
                <Text color={"blue.400"} ml="auto">{`${data!.address.toString().slice(0, 4)}...${data!.address.toString().slice(-4)}`}</Text>
              </Link>
            </Flex>
          <Flex justify="flex-end" align="center" width="100%">
            <Link mt="4" href={`/escrow/${id}`}>
                <Button bgColor={'black'} color={'white'} borderRadius="18px">
                Read More
                </Button>
            </Link>

            </Flex>
    </Box>
    
  );
}
