import Header from "@/components/Header";
import Featured from "@/components/Featured";
import { Product } from "@/models/Product";
import { Category } from "@/models/Categories";
import { mongooseConnect } from "@/lib/mongoose";
import NewProducts from "@/components/NewProducts";
import styled from "styled-components";

const Bg = styled.div`
    background-color: #222;
    color: #fff;
    padding: 0;
    min-height: 100vh;
`;

export default function HomePage({ featuredProduct, newProducts }) {
    return (
        <Bg>
            <Header />
            <Featured product={featuredProduct} />
            <NewProducts products={newProducts} />
        </Bg>
    );
}

export async function getServerSideProps() {
    await mongooseConnect();

    // Fetch a random product
    const randomProduct = await Product.aggregate([{ $sample: { size: 1 } }]);
    const featuredProduct = randomProduct[0];

    // Fetch new products
    const newProducts = await Product.find({}, null, {
        sort: { _id: -1 },
        limit: 12,
    });

    return {
        props: {
            featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
            newProducts: JSON.parse(JSON.stringify(newProducts)),
        },
    };
}
