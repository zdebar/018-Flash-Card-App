import { useEffect, useState } from "react";

export default function Library() {
    const [lectures, setLectures] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchedLectures = [
            {
                "id": 1,
                "name": "Představování"
            },
            {
                "id": 2,
                "name": "Rodina"
            }
        ];
        setLectures(fetchedLectures);
        setLoading(false);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <ul>
                {lectures.map((lecture) => (
                    <li key={lecture.id}>{lecture.id} : {lecture.name}</li>
                ))}
            </ul>
        </div>
    );
}