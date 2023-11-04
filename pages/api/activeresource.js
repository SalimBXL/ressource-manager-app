import axios from "axios";

export default async function(req, res) {
    const resource = await axios
        .get(`${process.env.API_URL}/activeresource`)
        .then(response => response.data);

    return res.send(resource);
}