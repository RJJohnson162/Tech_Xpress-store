import styled from "styled-components";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import Link from "next/link";
import {useContext} from "react";
import {CartContext} from "@/components/CartContext";

const ProductWrapper = styled.div`
  box-shadow: 10px 10px 10px #111,
              -5px -5px 20px #111;
  padding: 10px;
  border-radius: 15px;
  background-color: #222;
  transition: ease 1s;
  &:hover{
    box-shadow: 10px 10px 10px #111,
              -5px -5px 20px #111;
    transform: scale(1.02) translateY(-1px) translateX(-1px);
  }
`;

const BlackBox = styled(Link)`
  background-color: #222;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  div{
    width: 100%;
    height: 100%;
    img{
      border-radius: 10px;
      width: 190px;
      height: 140px;
    }
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size:.9rem;
  color: #00ff44;
  text-decoration:none;
  margin:0;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
  Title{
    flex-wrap: no-wrap;
  }
`;

const PriceRow = styled.div`
  display: block;
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  }
  align-items: center;
  justify-content:space-between;
  margin-top:2px;
`;

const Price = styled.div`
  color: #fff;
  padding: 5px;
  font-size: 1rem;
  font-weight:400;
  text-align: right;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight:600;
    text-align: left;
  }
`;

export default function ProductBox({_id,title,description,price,images}) {
  const {addProduct} = useContext(CartContext);
  const url = '/product/'+_id;
  return (
    <ProductWrapper>
      <BlackBox href={url}>
        <div>
          <img src={images?.[0]} alt=""/>
        </div>
      </BlackBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>
            Kshs. {price}
          </Price>
          <Button block onClick={() => addProduct(_id)} primary>
            <CartIcon/>
            Add to cart
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}