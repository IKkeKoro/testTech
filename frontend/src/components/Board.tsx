import { EscrowCard } from "./EscrowCard";
import { useState, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";


export function Board(data: any) {
    const [searchValue, setSearchValue] = useState("");
    const [items, setItems] = useState<any>(data)
    useEffect(() => {
        items.length > 0 ? (setItems(items)) : setItems(data.escrows);
    }, []);

    let filtredEscrwors: any = []
    function filterEscrow(searchValue: string, data: any){
        filtredEscrwors = []
        let byAddress = true
        if (parseInt(searchValue) || searchValue == '0'){
            byAddress = false
        }
        for(let i=0; i < data.length; i++){
            if (byAddress){
                if(data[i].seller.toString() == searchValue) {
                    filtredEscrwors.push(data[i])
                }
            } else {
                if(Number(data[i].id) == parseInt(searchValue)  ) {
                    filtredEscrwors.push(data[i])
                    break
                }
            }
        }
        if(filtredEscrwors.length > 0)
            setItems(filtredEscrwors)
        else
            setItems(data)
    }

    function CardList({ onCardClick }: { onCardClick: (id: bigint) => void }) {
        return (
            <>
                {items.length > 0 && items.map((item: any, index: any) => {
                    return (
                        <EscrowCard key={item.id} id={BigInt(item.id)} data={data.escrows[item.id]} onClick={() => onCardClick(BigInt(items.length - index))} />
                    ) 
                })}
            </>
        );
    }

    return (
        <Flex style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <Flex mb="12px" spaceX={'10px'}>
            </Flex>
            <Input
                bgColor={"whiteAlpha.700"}
                width={'310px'}
                value={searchValue}
                onChange={(e) => {
                    setSearchValue(e.target.value.toString());
                    filterEscrow(e.target.value.toString(), data.escrows)
                }}
                placeholder="Search escrow by Index or Seller Address"
                mb="8"
                rounded={"16px"}
            />
            <CardList  onCardClick={() => {}} />
        </Flex>
    );
}