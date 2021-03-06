import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import Image from "next/image";

import { IItem } from "./Item.types";
import { mapCurrency, mapCondition } from "~/utils";
import NotFound from "~/components/shared/NotFound";

const Wrapper = styled.div`
  width: 750px;
  height: fit-content;
  background-color: #fff;
  padding: 8px;
  border-radius: 4px;
`;

const ImageInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ItemInfo = styled.div`
  width: 250px;
  margin-top: 24px;
  margin-left: 24px;

  & > p,
  & > h1,
  & > h4 {
    margin: 4px 0;
  }
`;

const Condition = styled.p`
  font-size: 14px;
`;

const Price = styled.h1`
  font-weight: 300;
`;

const Button = styled.button`
  height: 40px;
  width: 100%;
  margin-top: 16px;
  background-color: #3483fa;
  cursor: pointer;
  border-radius: 6px;
  border-color: transparent;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  padding: 0 24px;
  text-align: center;
  text-transform: capitalize;
`;

const Description = styled.div`
  width: 550px;
  margin-left: 24px;
`;

const StyledP = styled.p`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.8);
`;

const Item: React.FC<IItem> = (props) => {
  const item = props.item;

  return (
    <React.Fragment>
      {item ? (
        <Wrapper>
          <ImageInfoWrapper>
            <Image src={item.picture} alt="item-img" width={450} height={450} />
            <ItemInfo>
              <Condition>
                {mapCondition[item.condition]}
                {item.sold_quantity > 0 && ` - ${item.sold_quantity} vendidos`}
              </Condition>
              <h4>{item.title}</h4>
              <Price>
                {mapCurrency[item.price.currency]}&nbsp;
                {item.price.amount.toLocaleString("de-DE")}
              </Price>
              <Button>comprar</Button>
            </ItemInfo>
          </ImageInfoWrapper>
          <Description>
            <h2>Descripción del producto</h2>
            <StyledP>{item.description}</StyledP>
          </Description>
        </Wrapper>
      ) : (
        <NotFound text="No se encontro el producto que está buscando." />
      )}
    </React.Fragment>
  );
};

export default observer(Item);
