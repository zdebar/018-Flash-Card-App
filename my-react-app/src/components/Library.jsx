import { useEffect, useState } from "react";

export default function Library() {
    const [lectures, setLectures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    useEffect(() => {
        const CACHE_EXPIRY_TIME = 24 * 60 * 60 * 1000; // check every 24 hours for update

        const fetchLectures = async () => {
            // local storage
            const cachedLectures = localStorage.getItem("lectures");
            const cacheTimestamp = localStorage.getItem("lectures_timestamp");
            
            if (cachedLectures && cacheTimestamp && Date.now() - parseInt(cacheTimestamp) < CACHE_EXPIRY_TIME) {
                setLectures(JSON.parse(cachedLectures));
                setLoading(false);
                return;
            }

            // fetch API
            try {
                const response = await fetch("http://localhost:3000/api/lectures");
                if (response.ok) {
                    const data = await response.json();
                    setLectures(data);
                    localStorage.setItem("lectures", JSON.stringify(data));
                    localStorage.setItem("lectures_timestamp", Date.now().toString());
                } else {
                    throw new Error(`Failed to fetch lectures: ${response.status}`);
                }
            } catch (error) {
                console.error('Error fetching lectures:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLectures();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <ul>
                {lectures.map((lecture) => (
                    <li key={lecture.id}>
                        {lecture.id} : {lecture.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
