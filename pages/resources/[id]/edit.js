import Layout from "@/pages/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import ResourceForm from "@/components/ResourceForm";


const ResourceEdit = ({resource}) => {
    const router = useRouter();


    const updateResource = (formData) => {
        axios.patch("/api/resources", formData)
            .then(_ => router.push(`/resources/${resource.id}`))
            .catch((err)=> alert(err?.response.data));
    };

    return (
        <Layout>
            <div className="container">
                <div className="columns">
                    <div className="column is-8 is-offset-2">
                        <h1 className="title">Edit Resource</h1>
                        <ResourceForm 
                            onFormSubmit={updateResource}
                            initialData={resource}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({params}) {
    const resourceId = params.id;
    const url = `${process.env.API_URL}/resources/${resourceId}`; 
    const data = await axios
        .get(url)
        .then(res => res.data)
        .catch();
    
    return {
        props: {
            resource: data
        },
    }
}


export default ResourceEdit;