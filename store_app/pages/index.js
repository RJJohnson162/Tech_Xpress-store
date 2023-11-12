import { mongooseConnect } from "@/lib/mongoose";
import Featured from "@/components/Featured";
import Header from "@/components/Header";
import { Product } from "@/models/Product";

// Define your HomePage component
const HomePage = ({ featuredProduct }) => {
    return (
        <div>
            <Header />
            <Featured product={featuredProduct} />
        </div>
    );
};

// Define the server-side props fetching function
export async function getServerSideProps() {
    try {
        const featuredProductId = "65241a7aa1bad47106869f42";
        await mongooseConnect();

        console.log("Before findById");
        const featuredProduct = await Product.findById(featuredProductId);
        console.log("After findById", featuredProduct);
        return {
            props: {
                featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
            },
        };
    } catch (error) {
        console.error("Error during server-side rendering:", error);

        return {
            props: {
                featuredProduct: null, // Set featuredProduct to null in case of an error
            },
        };
    }
}

// Export the HomePage component as the default export
export default HomePage;
