import axios from "axios";

export default async function(req, res) {

    const method = req.method.toLowerCase();
    const body = req.body;

    if (method === "get") {
        const data = await axios
            .get(`${process.env.API_URL}/resources`)
            .then(response => response.data)
            .catch();
        return res.send(data);
    }

    

    if (method === "post" || "patch") {
        const {id, title, timeToFinish, priority} = body;
        let url = `${process.env.API_URL}/resources`;
        
        if (
            !title || 
            !timeToFinish || 
            !priority
        ) {
            return res.status(422).send("Data are missing");
        }

        if (method === "patch") {
            url += `/${id}`;
        }

        try {
            const  axiosResponse = await axios[method](url, body);
            return res.send(axiosResponse.data);
        } catch {
            return res.status(422).send("Data cannot be stored!");
        }
    }
}