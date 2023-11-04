import Link from "next/link";
import ResourceLabel from "./ResourceLabel";
import moment from "moment";

const ResourceHighlight = ({resources}) => {
    return (
        <section className="hero ">
            <div className="hero-body">
                <div className="container">
                    {resources.map(({title, createdAt, description, status, id}) => {
                        const activeResource = status === "active" ? "Active" : null;
                        return (
                            <section key={id} className="section">
                                <div className="columns">
                                    <div className="column is-8 is-offset-2">
                                        <div className="content is-medium">
                                            <h2 
                                                className="subtitle is-4 has-text-grey">
                                                {moment(createdAt).format("LLL")}
                                                <ResourceLabel status={status} />
                                            </h2>
                                            <h1
                                                className="title">
                                                {title}
                                            </h1>
                                            <p
                                                className="mb-2">
                                                {description}
                                            </p>
                                            <Link 
                                                className="button is-text"
                                                href={`/resources/${id}`}>
                                                Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )
                    })}
                    <div className="is-divider"></div>                        
                </div>
            </div>
        </section>
    )
}

export default ResourceHighlight;