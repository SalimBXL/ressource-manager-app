import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";

const ActiveResource = () => {
    const [resource, setResource] = useState({});
    const [minutes, setMinutes] = useState();

    useEffect(() => {
        async function fetchResource() {
            const resource = await axios
                .get("/api/activeresource")
                .then(res => res.data);

            const timeToFinish = parseInt(resource.timeToFinish, 10);
            const activationTime = moment(resource.activationTime);
            const elapsedTime = moment().diff(activationTime, "minutes");
            const updatedTimeToFinish = timeToFinish - elapsedTime;
            
            if (updatedTimeToFinish >= 0) {
                resource.timeToFinish = updatedTimeToFinish;
                setMinutes(updatedTimeToFinish);
            }

            setResource(resource);
        }
        fetchResource();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setMinutes(prev => prev -1);
        }, 60000);
        if (minutes < 0) { clearInterval(interval) }
        return () => clearInterval(interval);
    }, [minutes]);

    const completeResource = () => {
        axios
            .patch("/api/resources", {...resource, status: "complete"})
            .then(_=> location.reload())
            .catch(_ => alert("Cannot complete the resource!"));
    }

    const hasResource = resource && resource.id;

    return (
    <div className="active-resource">
        <h1 className="resource-name">
            {hasResource 
                ? resource.title
                : "No Resource Active"
            }
        </h1>
        <div className="time-wrapper">
            <h2 
                className="elapsed-time">
                { hasResource && 
                    (minutes > 0 
                        ? `${resource.timeToFinish} min`
                        : <button
                            onClick={completeResource}
                            className="button is-success">
                            Click and Done!    
                            </button>
                    )
                }
            </h2>
        </div>
        {
            hasResource 
                ? <Link 
                    href={`/resources/${resource.id}`}
                    className="button">
                    Go to resource
                    </Link>
                : <Link 
                    href="/"
                    className="button">
                    Go to resources
                </Link> 
        }
        
    </div>);
}
 
export default ActiveResource;