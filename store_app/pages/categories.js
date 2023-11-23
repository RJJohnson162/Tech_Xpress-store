import styled from "styled-components";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Categories";
import { Product } from "@/models/Product";
import Center from "@/components/Center";
import { useState } from "react";
import ProductsGrid from "@/components/ProductsGrid";

const Bg = styled.div`
    background-color: #222;
    color: #fff;
    padding: 0;
    min-height: 100vh;
    padding-bottom: 20px;
`;

const Container = styled.div`
    overflow: hidden;
    display: flex;
    position: sticky;
    top: 65px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;
    z-index: 2;
    background-color: #222;
    overflow-x: auto;
    cursor: pointer;
    margin-bottom: 20px;
    max-width: 790px;
    @media screen and (max-width: 667px){
        top: 70px;
    }
`;

const StyledDiv = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 0 20px;
    @media screen and (max-width: 542px){
        max-width: 300px;
    }
    @media screen and (min-width: 543px)and (max-width: 845px){
        max-width: 550px;
    }
`;

const CategoryBox = styled.span`
    width: auto;
    white-space: nowrap;
    padding: 5px 10px;
    color: ${(props) => (props.active ? "#fff" : "")};
    border-bottom: ${(props) => (props.active ? "2px solid #01c241" : "")};
    border-left: ${(props) => (props.active ? "1px solid #01c241" : "1px solid")};
    border-radius: 30px;
    transition: ease-in-out 0.2s;
    &:not(:first-child) {
        margin-left: 3px;
    }
    &:hover {
        border-left: 1px solid #01c241;
        border-bottom: 2px solid #01c241;
        color: #fff;
    }
`;

export default function CategoriesPage({ categories, products }) {
    const [selectedCategoryId, setSelectedCategoryId] = useState(
        categories.length > 0 ? categories[0]._id : null
    );

    const handleCategoryClick = (categoryId) => {
        setSelectedCategoryId(categoryId);
    };

    // Filter products based on the selected category
    const filteredProducts = products.filter(
        (product) => product.category.toString() === selectedCategoryId
    );

    return (
        <Bg>
            <Center>
                <Header />
                <Container>
                    <StyledDiv>
                        {categories.map((category) => (
                            <CategoryBox
                                key={category._id}
                                active={selectedCategoryId === category._id}
                                onClick={() =>
                                    handleCategoryClick(category._id)
                                }
                            >
                                {category.name}
                            </CategoryBox>
                        ))}
                    </StyledDiv>
                </Container>
                <ProductsGrid products={filteredProducts} />
            </Center>
        </Bg>
    );
}

export async function getServerSideProps() {
    try {
        await mongooseConnect();
        const categories = await Category.find({}, null, { sort: { _id: -1 } });
        const products = await Product.find({}, null, { sort: { _id: -1 } });

        // Find the first category with associated products
        const selectedCategoryId = categories.find((category) =>
            products.some((p) => p.category.toString() === category._id)
        )
            ? categories.find((category) =>
                  products.some((p) => p.category.toString() === category._id)
              )._id
            : null;

        return {
            props: {
                categories: JSON.parse(JSON.stringify(categories)),
                products: JSON.parse(JSON.stringify(products)),
                selectedCategoryId,
            },
        };
    } catch (error) {
        console.error("Error fetching data:", error.message);

        return {
            props: {
                categories: [],
                products: [],
                selectedCategoryId: null,
            },
        };
    }
}
