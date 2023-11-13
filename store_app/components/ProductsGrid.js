import styled from "styled-components";
import ProductBox from "@/components/ProductBox";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-bottom: 20px;
  @media screen and (min-width: 540px) and (max-width: 821px) {
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }
  @media screen and (min-width: 821px){
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export default function ProductsGrid({products}) {
  return (
    <StyledProductsGrid>
      {products?.length > 0 && products.map(product => (
        <ProductBox key={product._id} {...product} />
      ))}
    </StyledProductsGrid>
  );
}