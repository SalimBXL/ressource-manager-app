import Link from "next/link";
import ResourceLabel from "./ResourceLabel";
import moment from "moment";

const ResourceList = ({resources}) => {

    const renderResources = () => 
        resources.map(({createdAt, title, description, id, status}) => {
            const activeResource = status === "active" ? "Active" : "";
            return (
                <div key={id} className="column is-5 is-offset-1 ">
                    <div className="content is-medium">
                        <h2 
                            className="subtitle is-5 has-text-grey">
                            {moment(createdAt).format("LLL")}
                            <ResourceLabel status={status} />
                        </h2>
                        <h1 
                            className="title has-text-black is-3">
                            {title}
                        </h1>
                        <p className="has-text-dark mb-2">{description}</p>
                        <Link 
                            className="button is-text"
                            href={`/resources/${id}`}>
                            Details
                        </Link>
                    </div>
                </div>
            )
        })

    return (
        <section className="hero ">
            <div className="hero-body">
                <div className="container">
                    <section className="section">
                        <div className="columns is-multiline is-variable is-8">
                            {renderResources()}
                        </div>
                    </section>
                </div>
            </div>
        </section>
    )
}

export default ResourceList;