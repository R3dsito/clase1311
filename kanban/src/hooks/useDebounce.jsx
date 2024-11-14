import { useEffect, useState } from "react";

function useDebounce(value, delay){
    const [deboundedValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value)
        }, delay);
        return () => {
            clearTimeout(handler)
        }
    }, [delay, value])

    return deboundedValue;
}

export default useDebounce;