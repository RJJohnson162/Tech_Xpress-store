import Center from "@/components/Center";
import styled from "styled-components";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import React from "react";

const Bg = styled.div`
    background-color: #222;
    color: #fff;
    padding: 50px 0;
`;
const Title = styled.h1`
    margin: 0;
    font-weight: normal;
    font-size: 1.5rem;
    @media screen and (min-width: 768px) {
        font-size: 3rem;
    }
`;
const Desc = styled.p`
    color: #aaa;
    font-size: 0.8rem;
`;
const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
    img {
        max-width: 100%;
        max-height: 200px;
        display: block;
        margin: 0 auto;
    }
    div:nth-child(1) {
        order: 2;
    }
    @media screen and (min-width: 768px) {
        grid-template-columns: 1.1fr 0.9fr;
        div:nth-child(1) {
            order: 0;
        }
        img {
            max-width: 100%;
        }
    }
`;
const Column = styled.div`
    display: flex;
    align-items: center;
`;
const ButtonsWrapper = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 25px;
`;

const Featured = ({ product }) => {
    if (!product) {
        // Display an error message if the product is not available
        return (
            <Bg>
                <Center>
                    <Title>ERROR</Title>
                    <Desc>Unable to retrieve the featured product.</Desc>
                </Center>
            </Bg>
        );
    }

    // Display the product information if available
    return (
        <Bg>
            <Center>
                <ColumnsWrapper>
                    <Column>
                        <div>
                            <Title>{product.title}</Title>
                            <Desc>
                                {product.description}
                                <ButtonsWrapper>
                                    <Button white Outline size="l">
                                        Read More
                                    </Button>
                                    <Button primary size="l">
                                        <CartIcon />
                                        Add to Cart
                                    </Button>
                                </ButtonsWrapper>
                            </Desc>
                        </div>
                    </Column>

                    <Column>
                    <img src={product.images && product.images.length > 0 ? product.images[0] : ''} alt={product.title} />
                    </Column>
                </ColumnsWrapper>
            </Center>
        </Bg>
    );
};

export default Featured;
