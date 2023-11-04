import { useState } from "react";

const DEFAULT_DATA = {
    title: "",
    description: "",
    link: "",
    priority: "2",
    timeToFinish: 60
}

const ResourceForm = ({onFormSubmit, initialData}) => {
    const [form, setForm] = useState(initialData || DEFAULT_DATA);

    const submitForm = () => onFormSubmit(form);
    const resetForm = () => setForm(DEFAULT_DATA);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm({...form, [name]: value})
    }

    return (
        <div className="resource-form">
            <form>
                <div className="field">
                    <label className="label">Title</label>
                    <div className="control">
                        <input 
                            className="input" 
                            type="text" 
                            placeholder=""
                            value={form.title}
                            name="title"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Description</label>
                    <div className="control">
                        <textarea 
                            className="input"
                            lines="5"
                            placeholder="A short description. Not mandatory."
                            value={form.description}
                            name="description"
                            onChange={handleChange}
                        >
                        </textarea>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Link</label>
                    <div className="control">
                        <input 
                            className="input" 
                            type="url" 
                            placeholder="http://"
                            value={form.link}
                            name="link"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="field">      
                    <label className="label">Priority</label>
                    <div className="control">
                        <div className="select">
                            <select 
                                value={form.priority}
                                name="priority"
                                onChange={handleChange}
                                >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Time to Finish</label>
                    <div className="control">
                        <input 
                            className="input" 
                            type="number"
                            placeholder="60"
                            value={form.timeToFinish}
                            name="timeToFinish"
                            onChange={handleChange}
                        />
                    </div>
                    <p className="help">Time in minutes</p>
                </div>
                <div className="field is-grouped">
                    <div className="control">
                        <button
                            type="button"
                            onClick={submitForm} 
                            className="button is-link">
                            Submit
                        </button>
                    </div>
                    <div className="control">
                        <button
                            type="button"
                            onClick={resetForm} 
                            className="button is-link is-light">
                            Reset Form
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ResourceForm;