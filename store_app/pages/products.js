import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";

const Bg = styled.div`
    background-color: #222;
    color: #fff;
    padding: 50px 0;
    min-height: 100vh;
`;

export default function ProductsPage({ products }) {
    return (
        <>
            <Header />
            <Bg>
                <Center>
                    <Title>All products</Title>
                    <ProductsGrid products={products} />
                </Center>
            </Bg>
        </>
    );
}

export async function getServerSideProps() {
    await mongooseConnect();
    const products = await Product.find({}, null, { sort: { _id: -1 } });
    return {
        props: {
            products: JSON.parse(JSON.stringify(products)),
        },
    };
}
