// "Your React app feels slow and janky when a user types in a search box that filters a large list. How do you fix this? Walk me through your approach."


// Debouncing 

const [query, setQuery] = useState("");
const [debouncedQuery, setDebouncedQuery] = useState("");


const useEffect(() => {
    const timer = setTimeout(()=>{
        setDebouncedQuery(query)
    },300)

    return () => clearTimeout(timer)
}, [query]);


//Solution 2 — useMemo for local filtering

// If the list is already loaded, don't re-filter on every render. Memoise the filtered result.

const filteredList = useMemo(() => {
  return largeList.filter(item => 
    item.name.toLowerCase().includes(debouncedQuery.toLowerCase())
  );
}, [debouncedQuery, largeList]);

//Solution 3 — useTransition (React 18)

// Mark the filtering as non-urgent so typing stays smooth.

const [isPending, startTransition] = useTransition();

const handleSearch = (value) => {
  setQuery(value); // urgent — updates input immediately
  startTransition(() => {
    setFilteredList(largeList.filter(...)); // non-urgent — can wait
  });
};
