import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/Center";
import { useContext, useState } from "react";
import { CartContext } from "@/components/CartContext";
import BarsIcon from "@/components/icons/Bars";

const StyledHeader = styled.header`
    background-color: #222;
    position: sticky;
    top: 0;
    z-index: 3;
`;
const Logo = styled(Link)`
    color: #0cf049;
    font-size: 1.4rem;
    font-weight: bold;
    text-decoration: none;
    position: relative;
    z-index: 3;
`;
const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
`;
const StyledNav = styled.nav`
    ${(props) =>
        props.mobileNavActive
            ? `
    display: block;
  `
            : `
    display: none;
  `}
    gap: 15px;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 70px 20px 20px;
    background-color: #222;
    @media screen and (min-width: 768px) {
        display: flex;
        position: static;
        padding: 0;
    }
`;
const NavLink = styled(Link)`
    display: block;
    color: #11c241;
    border-radius: 10px;
    text-decoration: none;
    padding: 15px 10px;
    transition: 0.5s;

    @media screen and (min-width: 768px) {
        padding: 0;
    }
    @media screen and (max-width: 768px) {
        &:hover {
            background-color: #fff;
            color: #000;
        }
    }
`;

const CartCircle = styled.span`
    border-radius: 50%;
    width: 6px;
    height: 6px; /* Set the height to the same value as the width for a perfect circle */
    background-color: #fff;
    color: #01a249;
    padding: 3px 6px; /* Use a colon instead of an equal sign */
`;


const NavButton = styled.button`
    background-color: transparent;
    width: 30px;
    height: 30px;
    border: 0;
    color: white;
    cursor: pointer;
    position: relative;
    z-index: 3;
    @media screen and (min-width: 768px) {
        display: none;
    }
`;

export default function Header() {
    const { cartProducts } = useContext(CartContext);
    const [mobileNavActive, setMobileNavActive] = useState(false);
    return (
        <StyledHeader>
            <Center>
                <Wrapper>
                    <Logo href={"/"}>
                        {/* <img src={images.logo3} alt="Logo" /> */}
                        Tech-Xpress store
                    </Logo>
                    <StyledNav mobileNavActive={mobileNavActive}>
                        <NavLink href={"/"}>Home</NavLink>
                        <NavLink href={"/products"}>All products</NavLink>
                        <NavLink href={"/categories"}>Categories</NavLink>
                        <NavLink href={"/account"}>Account</NavLink>
                        <NavLink href={"/cart"}>
                            Cart <CartCircle>{cartProducts.length}</CartCircle>
                        </NavLink>
                    </StyledNav>
                    <NavButton
                        onClick={() => setMobileNavActive((prev) => !prev)}
                    >
                        <BarsIcon />
                    </NavButton>
                </Wrapper>
            </Center>
        </StyledHeader>
    );
}
