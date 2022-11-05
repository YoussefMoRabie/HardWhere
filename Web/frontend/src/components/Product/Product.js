import { useParams } from "react-router-dom";

const Product = () => {
    const {id}=useParams();
    return (  
        <h2>{`Product${id}`}</h2>
    );
}
 
export default Product;