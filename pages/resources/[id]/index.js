import axios from "axios";
import Layout from "../../Layout";
import Link from "next/link";
import ResourceLabel from "@/components/ResourceLabel";
import moment from "moment";

const ResourceDetail = ({resource}) => {
    const {createdAt, title, description, link, priority, status, timeToFinish, id} = resource;
    const resource_url = `/resources/${id}/edit`;

    const activateResource = () => {
        axios
            .patch("/api/resources", {...resource, status: "active"})
            .then(_=> location.reload())
            .catch(_ => alert("Cannot activate the resource!"));
    }
    
    return (
        <Layout>
            <section className="hero ">
                <div className="hero-body">
                    <div className="container">
                        <section className="section">
                            <div className="columns">
                                <div className="column is-8 is-offset-2">
                                    <div className="content is-medium">
                                        <h2 
                                            className="subtitle is-4 has-text-grey">
                                            {moment(createdAt).format("LLL")}
                                            <ResourceLabel status={status} />
                                        </h2>
                                        <h1 className="title">{title}</h1>
                                        <p>{description}</p>
                                        <p>Time to finish : {timeToFinish} min</p>
                                        <p>
                                            Prioriry : {priority}
                                            <Link 
                                                className="ml-3"
                                                href={link}>
                                                {link}
                                            </Link>
                                        </p>

                                        { status === "inactive" && 
                                            <>
                                                <Link 
                                                    href={resource_url}
                                                    className="button is-warning">
                                                    Update
                                                </Link>
                                                <button
                                                    onClick={activateResource} 
                                                    className="button is-success ml-2">
                                                    Activate
                                                </button>
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>
                        </section>
                        <div className="is-divider"></div>                        
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export async function getServerSideProps({params}) {
    const resourceId = params.id;
    const url = `${process.env.API_URL}/resources/${resourceId}`; 
    const data = await axios
        .get(url)
        .then(resData => resData.data)
        .catch();
    
    return {
        props: {
            resource: data
        },
    }
}

export default ResourceDetail;