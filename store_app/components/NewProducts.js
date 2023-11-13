import styled from "styled-components";
import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";

const Title = styled.h2`
    font-size: 2rem;
    margin: 30px 0 20px;
    font-weight: normal;
`;
const Bg = styled.div`
    background-color: #222;
    color: #fff;
    padding: 50px 0;
`;

export default function NewProducts({ products }) {
    return (
        <Bg>
            <Center>
                <Title>New Arrivals</Title>
                <ProductsGrid products={products} />
            </Center>
        </Bg>
    );
}
