import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

type onInputChange = (s : string) => void;

const SearchBar = ({ onInputChange } : {onInputChange : onInputChange}) => {
    const [search, setSearch] = useState("");
   

    useEffect(() => { 

        const debounce = setTimeout(() => {
            onInputChange(search);
        }, 500);

        return () => {
            clearInterval(debounce)
        }
    },[search])
    return (
        <div>
            <Input
                value={search}
                onChange={e =>  setSearch(e.target.value)}
                type="text"
                placeholder="Search by name"
                className=" w-[300px] sm:w-[200px] lg:w-[350px] dark:border-gray-700"
            />
        </div>
    );
};

export default SearchBar;
