import styles from '@/styles/Home.module.css'
import React, { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router';

export default function Contact() {
    const router = useRouter();
    const { data: session } = useSession();
    const [formData, setFormData] = useState({
        lastname: "",
        middlename: "",
        firstname: "",
        dob: "",
        agencyname: "",
        jurisdiction: "",
        assistancetype: "",
        onemonthamt: "",
        serviceamt: "",
        directIndirect: "",
        vendor: "",
        email: "",
        message: ""
    });

    const [formSuccess, setFormSuccess] = useState(false)
    const [formSuccessMessage, setFormSuccessMessage] = useState("")

    const handleInput = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;

        setFormData((prevState) => ({
            ...prevState,
            [fieldName]: fieldValue
        }));
    }

    const submitForm = async (e) => {
        // We don't want the page to refresh
        e.preventDefault()

        const data = new FormData()

        // Turn our formData state into data we can use with a form submission
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        })

        // POST the data to the URL of the form
        console.log('Sending form data: ', formData);
        router.push(
            {
                pathname: "/confirmation",
                query: formData
            }
        );
        // const res = await fetch('/api/form', {
        //     method: "POST",
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(formData),
        // });

        // if (res.status == 200) {
        //     const application = await res.json()
        //     console.log('result', application);
        //     setFormData({
        //         name: "",
        //         email: "",
        //         message: ""
        //     });

        //     alert(`Application has been ${application.result}`)
        //     document.getElementById("application-form").reset();
        // }

    }

    return (
        session ? (
            <div style={{ width: '80%', minWidth: "250px" }} >
                <div className={styles.container}><h1>Application Form</h1></div>
                {
                    formSuccess ?
                        <div className={styles.container}>{formSuccessMessage}</div>
                        :
                        <form id="application-form" onSubmit={submitForm} style={{ overflow: 'hidden' }}>
                            <div className={styles.container}>
                                <label className={styles.required}>Last Name: </label>
                                <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                    <input type="text" required={true} name="lastname" style={{ width: '100%' }} onChange={handleInput} value={formData.lastname} />
                                </span>
                            </div>

                            <div className={styles.container}>
                                <label>Middle Name: </label>
                                <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                    <input type="text" name="middlename" style={{ width: '100%' }} onChange={handleInput} value={formData.middlename} />
                                </span>
                            </div>

                            <div className={styles.container}>
                                <label className={styles.required}>First Name: </label>
                                <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                    <input type="text" required={true} name="firstname" style={{ width: '100%' }} onChange={handleInput} value={formData.firstname} />
                                </span>
                            </div>

                            <div className={styles.container}>
                                <label className={styles.required}>Date of Birth: </label>
                                <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                    <input type="date" required={true} name="dob" style={{ width: '100%' }} onChange={handleInput} value={formData.dob} />
                                </span>
                            </div>

                            <div className={styles.container}>
                                <label>Agency Name: </label>
                                <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                    <input type="text" name="agencyname" style={{ width: '100%' }} onChange={handleInput} value={formData.agencyname} />
                                </span>
                            </div>

                            <div className={styles.container}>
                                <label>Jurisdiction: </label>
                                <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                    <input type="text" name="jurisdiction" style={{ width: '100%' }} onChange={handleInput} value={formData.jurisdiction} />
                                </span>
                            </div>

                            <div className={styles.container}>
                                <label className={styles.required}>Assistance Type: </label>
                                <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                    <input type="text" required={true} name="assistancetype" style={{ width: '100%' }} onChange={handleInput} value={formData.assistancetype} />
                                </span>
                            </div>

                            <div className={styles.container}>
                                <label>One month Amount: </label>
                                <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                    <input type="number" name="onemonthamt" step="0.01" style={{ width: '100%' }} onChange={handleInput} value={formData.onemonthamt} />
                                </span>
                            </div>

                            <div className={styles.container}>
                                <label>Amount of Service: </label>
                                <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                    <input type="number" name="serviceamt" step="0.01" style={{ width: '100%' }} onChange={handleInput} value={formData.serviceamt} />
                                </span>
                            </div>

                            <div className={styles.container}>
                                <fieldset>
                                    <legend>Direct/Indirect:</legend>

                                    <div>
                                        <input type="radio" id="direct" name='directIndirect' value="direct" onChange={handleInput} />
                                        <label for="direct">Direct</label>
                                    </div>

                                    <div>
                                        <input type="radio" id="indirect" name='directIndirect' value="indirect" onChange={handleInput} />
                                        <label for="indirect">In Direct</label>
                                    </div>
                                </fieldset>

                                {/* <label> </label>
                                <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                    <input type="text" name="directIndirect" style={{ width: '100%' }} onChange={handleInput} />
                                </span> */}
                            </div>

                            <div className={styles.container}>
                                <label>Vendor: </label>
                                <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                    <input type="text" name="vendor" style={{ width: '100%' }} onChange={handleInput} value={formData.vendor} />
                                </span>
                            </div>

                            <div className={styles.container}>
                                <label className={styles.required}>Email: </label>
                                <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                    <input type="email" required={true} name="email" style={{ width: '100%' }} onChange={handleInput} value={formData.email} />
                                </span>
                            </div>

                            <div className={styles.container}>
                                <label>Additional Message: </label>
                                <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                    <textarea name="message" style={{ width: '100%' }} onChange={handleInput} value={formData.message}></textarea>
                                </span>
                            </div>

                            <button className={styles.button} style={{ marginTop: '10px', marginBottom: "10px" }} type="submit">Process Information</button>
                        </form>
                }
            </div >
        ) : "Invalid credentials, Please login again"
    )
}