import { type } from 'os'
import React, { useEffect, useState } from 'react'
type debounceType = {
    time: number,
    value: string
}
export default function useDebounce(props: debounceType) {
  const [debounceValue, setDebounceValue] = useState(props.value);

    useEffect(() => {
        const handleClear = setTimeout(() => {
            setDebounceValue(props.value);
        }, props.time | 0);
        return () => clearTimeout(handleClear);
    }, [props.value]);
    return debounceValue;
}
