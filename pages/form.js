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
    .then((data) => {
      setFormData({ 
        name: "", 
        email: "", 
        message: "" 
      })

      setFormSuccess(true)
      setFormSuccessMessage(data.submission_text)
    })
  }

  return (
    <div>
      <h1>Application form</h1>
      {formSuccess ? 
        <div>{formSuccessMessage}</div> 
        : 
        <form method="POST" action="https://www.formbackend.com/f/664decaabbf1c319" onSubmit={submitForm}>
        <div>
          <label>Last Name</label>
          <input type="text" name="name" onChange={handleInput} value={formData.lastname} />
        </div>

        <div>
            <label>Middle Name</label>
            <input type="text" name="name" onChange={handleInput} value={formData.middlename} />
          </div>

          <div>
            <label>First Name</label>
            <input type="text" name="name" onChange={handleInput} value={formData.firstname} />
          </div>

          <div>
            <label>Date of Birth</label>
            <input type="text" name="name" onChange={handleInput} value={formData.dob} />
          </div>

          <div>
            <label>Agency Name</label>
            <input type="text" name="name" onChange={handleInput} value={formData.agencyname} />
          </div>

          <div>
            <label>juriscdiction</label>
            <input type="text" name="email" onChange={handleInput} value={formData.juriscdiction} />
          </div>

          <div>
            <label>Assistance Type</label>
            <input type="text" name="email" onChange={handleInput} value={formData.assistancetype} />
          </div>

          <div>
            <label>One month Amount</label>
            <input type="text" name="email" onChange={handleInput} value={formData.onemonthamt} />
          </div>

          <div>
            <label>Amoutn of Service </label>
            <input type="text" name="email" onChange={handleInput} value={formData.serviceamt} />
          </div>

          <div>
            <label>Direct/Indirect</label>
            <input type="text" name="email" onChange={handleInput} value={formData.directIndirect} />
          </div>

          <div>
            <label>Vendor</label>
            <input type="text" name="email" onChange={handleInput} value={formData.vendor} />
          </div>

          <div>
            <label>Email</label>
            <input type="text" name="email" onChange={handleInput} value={formData.email} />
          </div>

          <div>
            <label>Additional Message</label>
            <textarea name="message" onChange={handleInput} value={formData.message}></textarea>
          </div>

          <button type="submit">Process Information</button>
        </form>
      }
    </div>
  )
}