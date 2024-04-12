import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

const SearchBar = ({ onInputChange }) => {
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
                className=" w-[300px] sm:w-[200px] lg:w-[350px]"
            />
        </div>
    );
};

export default SearchBar;
