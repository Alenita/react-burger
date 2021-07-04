import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data,setData] = useState([]);
    const [hasError, setHasError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        fetch(url)
            .then((res) => {
                if(!res.ok) {
                    throw Error('Could not fetch the data')
                }
                return res.json()
            })
            .then(res => setData(res.data))
            .catch(err => setHasError(err.message))
            .finally(() => setIsLoading(false))
    },[url])
    return { data, hasError, isLoading };
}

export default useFetch;