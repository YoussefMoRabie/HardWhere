import { useParams } from "react-router-dom";


const SearchResults = () => {
  
 const {searchVal}=useParams();
  return (
    <div>{searchVal}</div>
    );
}
 
export default SearchResults;