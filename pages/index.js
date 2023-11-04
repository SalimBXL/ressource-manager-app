import Newsletter from "@/components/Newsletter";
import ResourceHighlight from "@/components/ResourceHighlight";
import ResourceList from "@/components/ResourceList";
import Layout from "./Layout";
import axios from "axios";

const Home = ({resources}) => {

  return (
    <Layout>
      <ResourceHighlight
        resources = {resources.slice(0, 2)}
      />
      <Newsletter />
      <ResourceList
        resources = {resources.slice(2)}
      />
    </Layout>
  );
}

export async function getServerSideProps() {
  const data = await axios
    .get(`${process.env.API_URL}/resources`)
    .then(response => response.data)
    .catch();

  return {
    props: {
      resources: data
    }
  }
}

export default Home