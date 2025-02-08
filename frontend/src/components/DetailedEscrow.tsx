import { Address } from "ton-core";
import {Button as ChakraButton} from "@chakra-ui/react";
import { useJettonContract } from "../hooks/useJettonWallet";
import { useEscrow } from "../hooks/useEscrow";
import { useParams } from "react-router-dom";
import { fromNano } from "ton-core";
import {
  Box,
  Flex,
  Text as ChakraText,
  Heading,
  Link
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

export type ProjectData =  {
  $$type: "ProjectData";
  voted: bigint;
  invested: bigint;
  required: bigint;
  withdrawn: bigint;
  income: bigint;
  owner: Address;
  id: bigint;
  data: {
      $$type: "Data";
      title: string;
      description: string;
      image: string;
      link: string;
  };
} | undefined

export function DetailedEscrow(data: any) {

  const { id } = useParams<{ id: string }>();
  const {escrowAddress,contractData, sendPayInTons, sendApproveByGuarantor, sendApproveByUser}= useEscrow(data.escrows[id!].address);
  const {transfer} = useJettonContract()
  const escrowIdEvent = data.escrows[id!]
  return (
    <>
    {contractData === null  ? <Flex justify={'center'}>Loading...</Flex> : 
    <Box
      {...cardStyles}
    >
        
        <Flex direction="column" height="100%" spaceY={'20px'}> 
          
          <Heading as="h3" size="lg" mt="4">{`id ${id}`}</Heading>
          <Box borderBottom="1px solid" borderColor="gray.200" mt="2" />

          <Flex mt="4" justify="space-between" >

            <Text fontWeight="bold" color="gray.600">Price:  </Text>
            <Text>{fromNano(escrowIdEvent.price!)} {escrowIdEvent.tonOrUsdt! == 0 ? " Ton" : " Usdt"}</Text>
          </Flex >
           
            </Flex>
            <Flex mt="2" justify="space-between">
            <Text fontWeight="bold" color="gray.600">Seller: </Text>
            <Link color={"blue.400"}   
              href={`https://testnet.tonviewer.com/${escrowIdEvent.seller!.toString()}`}>
              <Text color={"blue.400"} ml="auto">{`${escrowIdEvent.seller!.toString().slice(0, 4)}...${escrowIdEvent.seller!.toString().slice(-4)}`}</Text>
            </Link>
            </Flex>
            <Flex mt="2" justify="space-between">
            <Text fontWeight="bold" color="gray.600">Buyer: </Text>
            
            {contractData?.buyerAddress != undefined  ? 
              <Link color={"blue.400"}
                href={`https://testnet.tonviewer.com/${contractData?.buyerAddress?.toString()}`}>
                <Text color={"blue.400"} ml="auto">{`${contractData?.buyerAddress?.toString().slice(0, 4)}...${contractData?.buyerAddress?.toString().slice(-4)}`}</Text>
              </Link> : 
              <Text color={"gray.400"} ml="auto">{ 'no one'}</Text>
            }

            </Flex>
            <Flex mt="2" justify="space-between">
            <Text fontWeight="bold" color="gray.600">Contract: </Text>
            <Link color={"blue.400"}   
              href={`https://testnet.tonviewer.com/${escrowIdEvent?.address?.toString()}`}>
              <Text color={"blue.400"} ml="auto">{`${escrowIdEvent?.address?.toString().slice(0, 4)}...${escrowIdEvent?.address?.toString().slice(-4)}`}</Text>
            </Link>
            </Flex>
            <Flex mt="2" justify="space-between">
            <Text fontWeight="bold" color="gray.600">Status:  </Text>
            <Text>{contractData?.status! === 0n ? "Active" : contractData?.status! === 1n ?  "Paid" : "Approved"}</Text>
            </Flex>
          {Number(contractData?.status!) < 2 ? (<Flex justify="flex-end" align="center" width="100%">
                <ChakraButton minW={'40%'} bgColor={'black'} color={'white'} borderRadius="18px" type="button" mt={"24px"}
                 onClick={() => {
                      if (Number(contractData?.status!) === 0) {
                        if(contractData.tonOrUsdt == 0n)
                          sendPayInTons()
                        else 
                          transfer(contractData.price, escrowAddress!.toString())
                      } else if (Number(contractData?.status!) === 1) {
                          sendApproveByUser();
                      }
                  }}              
                >
                  {Number(contractData?.status!) === 0 ? "Pay" : "Approve"}  
                </ChakraButton>
          </Flex>) : (<></>)}

    </Box>}
    </>
  );
}
