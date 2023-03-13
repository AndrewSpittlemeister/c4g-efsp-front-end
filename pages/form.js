import styles from '@/styles/Home.module.css'
import React, { useState } from "react"

export default function Contact() {
  const [formData, setFormData] = useState({
    lastname: "",
    middlename: "",
    firstname: "",
    dob: "",
    agencyname: "",
    juriscdiction: "",
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

  const submitForm = (e) => {
    // We don't want the page to refresh
    e.preventDefault()

    const formURL = e.target.action
    const data = new FormData()

    // Turn our formData state into data we can use with a form submission
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    })

    // POST the data to the URL of the form
    fetch(formURL, {
      method: "POST",
      body: data,
      headers: {
        'accept': 'application/json',
      },
    }).then((response) => response.json())      
    .then((data) => {   // Do something here after receiving response from database: To see data from db remove onSubmit and use only action on form
      setFormData({ 
        name: "", 
        email: "", 
        message: "" 
      })
      alert(data.result);
      console.log('')
      setFormSuccess(true)
      setFormSuccessMessage(data.submission_text)
      
    })
  }

  return (
    <div style={{width: '80%', minWidth: "250px"}}>
      <div className={styles.container}><h1>Application Form</h1></div>
      {formSuccess ? 
        <div className={styles.container}>{formSuccessMessage}</div> 
        : 
        <form method="POST" action="/api/submitApplication" onSubmit={submitForm} style={{overflow: 'hidden'}}>
          <div className={styles.container}>
            <label>Last Name: </label>
            <span style={{display: "block", overflow: "hidden", marginTop: "5px"}}>
              <input type="text" name="lastname" style={{width: '100%'}} onChange={handleInput} value={formData.lastname} />
            </span>
          </div>

          <div className={styles.container}>
            <label>Middle Name: </label>
            <span style={{display: "block", overflow: "hidden", marginTop: "5px"}}>
              <input type="text" name="middlename" style={{width: '100%'}} onChange={handleInput} value={formData.middlename} />
            </span>
          </div>

          <div className={styles.container}>
            <label>First Name: </label>
            <span style={{display: "block", overflow: "hidden", marginTop: "5px"}}>
              <input type="text" name="firstname" style={{width: '100%'}} onChange={handleInput} value={formData.firstname} />
            </span>
          </div>

          <div className={styles.container}>
            <label>Date of Birth: </label>
            <span style={{display: "block", overflow: "hidden", marginTop: "5px"}}>
              <input type="text" name="dob" style={{width: '100%'}} onChange={handleInput} value={formData.dob} />
            </span>
          </div>

          <div className={styles.container}>
            <label>Agency Name: </label>
            <span style={{display: "block", overflow: "hidden", marginTop: "5px"}}>
              <input type="text" name="agencyname" style={{width: '100%'}} onChange={handleInput} value={formData.agencyname} />
            </span>
          </div>

          <div className={styles.container}>
            <label>Jurisdiction: </label>
            <span style={{display: "block", overflow: "hidden", marginTop: "5px"}}>
              <input type="text" name="jurisdiction" style={{width: '100%'}} onChange={handleInput} value={formData.jurisdiction} />
            </span>
          </div>

          <div className={styles.container}>
            <label>Assistance Type: </label>
            <span style={{display: "block", overflow: "hidden", marginTop: "5px"}}>
              <input type="text" name="assistancetype" style={{width: '100%'}} onChange={handleInput} value={formData.assistancetype} />
            </span>
          </div>

          <div className={styles.container}>
            <label>One month Amount: </label>
            <span style={{display: "block", overflow: "hidden", marginTop: "5px"}}>
              <input type="text" name="onemonthamt" style={{width: '100%'}} onChange={handleInput} value={formData.onemonthamt} />
            </span>
          </div>

          <div className={styles.container}>
            <label>Amount of Service: </label>
            <span style={{display: "block", overflow: "hidden", marginTop: "5px"}}>
              <input type="text" name="serviceamt" style={{width: '100%'}} onChange={handleInput} value={formData.serviceamt} />
            </span>
          </div>

          <div className={styles.container}>
            <label>Direct/Indirect: </label>
            <span style={{display: "block", overflow: "hidden", marginTop: "5px"}}>
              <input type="text" name="directIndirect" style={{width: '100%'}} onChange={handleInput} value={formData.directIndirect} />
            </span>
          </div>

          <div className={styles.container}>
            <label>Vendor: </label>
            <span style={{display: "block", overflow: "hidden", marginTop: "5px"}}>
              <input type="text" name="vendor" style={{width: '100%'}} onChange={handleInput} value={formData.vendor} />
            </span>
          </div>

          <div className={styles.container}>
            <label>Email: </label>
            <span style={{display: "block", overflow: "hidden", marginTop: "5px"}}>
              <input type="text" name="email" style={{width: '100%'}} onChange={handleInput} value={formData.email} />
            </span>
          </div>

          <div className={styles.container}>
            <label>Additional Message: </label>
            <span style={{display: "block", overflow: "hidden", marginTop: "5px"}}>
              <textarea name="message" style={{width: '100%'}} onChange={handleInput} value={formData.message}></textarea>
            </span>
          </div>

          <button className={styles.button} style={{marginTop: '10px', marginBottom: "10px"}} type="submit">Process Information</button>
        </form>
      }
    </div>
  )
}