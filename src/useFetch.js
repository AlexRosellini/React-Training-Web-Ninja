import {useState, useEffect} from 'react'

const useFetch = (url) => {

    const [data, setdata] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)


    useEffect(() => {

    const abortCont = new AbortController();
    setTimeout(() => {
       fetch(url, {signal: abortCont.signal})
           .then((res) => {
               if(res.ok) {
                   return res.json();
               } else {
                   throw Error('Could not fetch API data.')
               }
           }) 
           .then((data) => {
               console.log(data);
               setdata(data);
               setIsPending(false);
               setError(null);
           })
           .catch(err => {
               if (err.name === 'AbortError') {
                   console.log('Fetch Aborted')
               } else {
               setError(err.message);
               setIsPending(false)
               }
           })
           }, 100);
           return () => abortCont.abort();
         }, [url]);

         return {data, isPending, error}
}

export default useFetch;