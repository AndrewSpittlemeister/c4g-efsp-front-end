import styles from '@/styles/Home.module.css'
import React, { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router';
import getUserRole from "@/lib/users";

export default function Contact() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [formData, setFormData] = useState({
        applicantFirstName: "",
        applicantMiddleName: "",
        applicantLastName: "",
        applicantDOB: "",
        applicantStreetAddress: "",
        applicantCity: "",
        applicantPostalCode: "",
        applicantCountry: "",
        lroNumber: "",
        lroEmail: "",
        agencyName: "",
        jurisdiction: "",
        fundingPhase: "",
        paymentVendor: "",
        monthlyRent: 0.0,
        monthlyRentLRO: 0.0,
        monthlyMortgage: 0.0,
        monthlyMortgageLRO: 0.0,
        lodgingNightCount: 0,
        lodgingNightCost: 0.0,
        lodgingNightCostLRO: 0.0,
        monthlyGas: 0.0,
        monthlyGasLRO: 0.0,
        monthlyElectric: 0.0,
        monthlyElectricLRO: 0.0,
        monthlyWater: 0.0,
        monthlyWaterLRO: 0.0,
        directIndirect: "",
    });

    const [formSuccess, setFormSuccess] = useState(false)
    const [formSuccessMessage, setFormSuccessMessage] = useState("")
    const [householdMembers, setHouseholdMembers] = useState([])

    async function addMember() {
        setHouseholdMembers([...householdMembers, { firstName: "", middleName: "", lastName: "", dob: "" }]);
    }

    const handleInput = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;

        setFormData((prevState) => ({
            ...prevState,
            [fieldName]: fieldValue
        }));
    }

    const handleMemberInput = (i, e) => {
        let newHouseholdMembers = [...householdMembers];
        newHouseholdMembers[i][e.target.name] = e.target.value;
        setHouseholdMembers(newHouseholdMembers);
    }

    const submitForm = async (e) => {
        // We don't want the page to refresh
        e.preventDefault()

        let data = {...formData};
        for (let i = 0; i < householdMembers.length; i++) {
            for (let k in householdMembers[i]) {
                let fieldkey = `householdMember_${i}_${k}`;
                let fieldVal = householdMembers[i][k];
                data[fieldkey] = fieldVal;
            }
        }

        // POST the data to the URL of the form
        console.log('Sending form data: ', data);
        console.log('with household members: ', householdMembers);
        router.push(
            {
                pathname: "/confirmation",
                query: data
            }
        );
    }

    if (status != "authenticated") {
        return (
            <main className={styles.main}>
                <h1>Page Requires Authentication</h1>
                <br></br>
                <div className={styles.card}>
                    <p>Navigate to the home page and sign-in first.</p>
                    <br></br>
                    <button className={styles.button} style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: "10px", marginBottom: "5px" }} onClick={() => router.push('/')}>
                        Return Home
                    </button>
                </div>
            </main>
        )
    }
    if (!["agent", "admin"].includes(getUserRole(session.user.email))) {
        return (
            <main className={styles.main}>
                <h1>Insufficient Privileges</h1>
                <br></br>
                <div className={styles.card}>
                    <p>This page requires agent-level or admin-level privileges to access, sign in with a different account with these privileges to use this page.</p>
                    <br></br>
                    <button className={styles.button} style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: "10px", marginBottom: "5px" }} onClick={() => router.push('/')}>
                        Return Home
                    </button>
                </div>
            </main>
        )
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
                                <label className={styles.required}>Applicant First Name: </label>
                                <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                    <input type="text" required={true} name="applicantFirstName" style={{ width: '100%' }} onChange={handleInput} value={formData.applicantFirstName} />
                                </span>
                            </div>

                            <div className={styles.container}>
                                <label>Applicant Middle Name: </label>
                                <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                    <input type="text" name="applicantMiddleName" style={{ width: '100%' }} onChange={handleInput} value={formData.applicantMiddleName} />
                                </span>
                            </div>

                            <div className={styles.container}>
                                <label className={styles.required}>Applicant Last Name: </label>
                                <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                    <input type="text" required={true} name="applicantLastName" style={{ width: '100%' }} onChange={handleInput} value={formData.applicantLastName} />
                                </span>
                            </div>

                            <div className={styles.container}>
                                <label className={styles.required}>Applicant Date of Birth: </label>
                                <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                    <input type="date" required={true} name="applicantDOB" style={{ width: '100%' }} onChange={handleInput} value={formData.applicantDOB} />
                                </span>
                            </div>

                            <div className={styles.container}>
                                <label className={styles.required}>Applicant Street Address: </label>
                                <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                    <input type="text" required={true} name="applicantStreetAddress" style={{ width: '100%' }} onChange={handleInput} value={formData.applicantStreetAddress} />
                                </span>
                            </div>

                            <div className={styles.container}>
                                <label className={styles.required}>Applicant City: </label>
                                <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                    <input type="text" required={true} name="applicantCity" style={{ width: '100%' }} onChange={handleInput} value={formData.applicantCity} />
                                </span>
                            </div>

                            <div className={styles.container}>
                                <label className={styles.required}>Applicant Postal Code: </label>
                                <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                    <input type="text" required={true} name="applicantPostalCode" style={{ width: '100%' }} onChange={handleInput} value={formData.applicantPostalCode} />
                                </span>
                            </div>

                            <div className={styles.container}>
                                <label className={styles.required}>Applicant Country: </label>
                                <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                    <input type="text" required={true} name="applicantCountry" style={{ width: '100%' }} onChange={handleInput} value={formData.applicantCountry} />
                                </span>
                            </div>

                            <div className={styles.container}>
                                <label className={styles.required}>LRO Number: </label>
                                <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                    <input type="number" required={true} name="lroNumber" style={{ width: '100%' }} onChange={handleInput} value={formData.lroNumber} />
                                </span>
                            </div>

                            <div className={styles.container}>
                                <label>Agency Name: </label>
                                <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                    <input type="text" name="agencyName" style={{ width: '100%' }} onChange={handleInput} value={formData.agencyName} />
                                </span>
                            </div>

                            <div className={styles.container}>
                                <label className={styles.required}>LRO Email: </label>
                                <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                    <input type="email" required={true} name="lroEmail" style={{ width: '100%' }} onChange={handleInput} value={formData.lroEmail} />
                                </span>
                            </div>

                            <div className={styles.container}>
                                <label>Jurisdiction: </label>
                                <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                    <select type="text" name="jurisdiction" style={{ width: '100%' }} onChange={handleInput} value={formData.jurisdiction} >
                                        <option value=""></option>
                                        <option value="Atlanta/Fulton/DeKalb">Atlanta/Fulton/DeKalb</option>
                                        <option value="Coweta">Coweta</option>
                                        <option value="Douglas">Douglas</option>
                                        <option value="Gwinnett">Gwinnett</option>
                                        <option value="Rockdale">Rockdale</option>
                                        <option value="Cherokee">Cherokee</option>
                                        <option value="Paulding">Paulding</option>
                                        <option value="Fayette">Fayette</option>
                                    </select>
                                </span>
                            </div>

                            <div className={styles.container}>
                                <label>Funding Phase: </label>
                                <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                    <select type="text" name="fundingPhase" style={{ width: '100%' }} onChange={handleInput} value={formData.fundingPhase} >
                                        <option value=""></option>
                                        <option value="ARPA-R">ARPA-R</option>
                                        {
                                            Array.from({length:62},(v,k)=>k+39).map(
                                                (phase) => {
                                                    return <option key={phase} value={`${phase}`}>{`${phase}`}</option>
                                                }
                                            )
                                        }
                                    </select>
                                </span>
                            </div>

                            <div className={styles.container}>
                                <label>Payment Vendor: </label>
                                <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                    <input type="text" name="paymentVendor" style={{ width: '100%' }} onChange={handleInput} value={formData.paymentVendor} />
                                </span>
                            </div>

                            <div className={styles.container}>
                                <label>One Month Rent ($): </label>
                                <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                    <input type="number" name="monthlyRent" step="0.01" style={{ width: '100%' }} onChange={handleInput} value={formData.monthlyRent} />
                                </span>
                            </div>
                            <div className={styles.container}>
                                <label>LRO Funded One Month Rent ($): </label>
                                <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                    <input type="number" name="monthlyRentLRO" step="0.01" style={{ width: '100%' }} onChange={handleInput} value={formData.monthlyRentLRO} />
                                </span>
                            </div>

                            <div className={styles.container}>
                                <label>One Month Mortgage ($): </label>
                                <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                    <input type="number" name="monthlyMortgage" step="0.01" style={{ width: '100%' }} onChange={handleInput} value={formData.monthlyMortgage} />
                                </span>
                            </div>
                            <div className={styles.container}>
                                <label>LRO Funded One Month Mortgage ($): </label>
                                <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                    <input type="number" name="monthlyMortgageLRO" step="0.01" style={{ width: '100%' }} onChange={handleInput} value={formData.monthlyMortgageLRO} />
                                </span>
                            </div>

                            <div className={styles.container}>
                                <label>Lodging Night Count: </label>
                                <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                    <input type="number" name="lodgingNightCount" step="1" style={{ width: '100%' }} onChange={handleInput} value={formData.lodgingNightCount} />
                                </span>
                            </div>
                            <div className={styles.container}>
                                <label>Lodging Night Cost ($): </label>
                                <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                    <input type="number" name="lodgingNightCost" step="0.01" style={{ width: '100%' }} onChange={handleInput} value={formData.lodgingNightCost} />
                                </span>
                            </div>
                            <div className={styles.container}>
                                <label>LRO Funded Lodging Night Cost ($): </label>
                                <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                    <input type="number" name="lodgingNightCostLRO" step="0.01" style={{ width: '100%' }} onChange={handleInput} value={formData.lodgingNightCostLRO} />
                                </span>
                            </div>

                            <div className={styles.container}>
                                <label>One Month Gas ($): </label>
                                <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                    <input type="number" name="monthlyGas" step="0.01" style={{ width: '100%' }} onChange={handleInput} value={formData.monthlyGas} />
                                </span>
                            </div>
                            <div className={styles.container}>
                                <label>LRO Funded One Month Gas ($): </label>
                                <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                    <input type="number" name="monthlyGasLRO" step="0.01" style={{ width: '100%' }} onChange={handleInput} value={formData.monthlyGasLRO} />
                                </span>
                            </div>

                            <div className={styles.container}>
                                <label>One Month Electric ($): </label>
                                <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                    <input type="number" name="monthlyElectric" step="0.01" style={{ width: '100%' }} onChange={handleInput} value={formData.monthlyElectric} />
                                </span>
                            </div>
                            <div className={styles.container}>
                                <label>LRO Funded One Month Electric ($): </label>
                                <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                    <input type="number" name="monthlyElectricLRO" step="0.01" style={{ width: '100%' }} onChange={handleInput} value={formData.monthlyElectricLRO} />
                                </span>
                            </div>
                            
                            <div className={styles.container}>
                                <label>One Month Water ($): </label>
                                <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                    <input type="number" name="monthlyWater" step="0.01" style={{ width: '100%' }} onChange={handleInput} value={formData.monthlyWater} />
                                </span>
                            </div>
                            <div className={styles.container}>
                                <label>LRO Funded One Month Water ($): </label>
                                <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                    <input type="number" name="monthlyWaterLRO" step="0.01" style={{ width: '100%' }} onChange={handleInput} value={formData.monthlyWaterLRO} />
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
                                        <label for="indirect">Indirect</label>
                                    </div>
                                </fieldset>
                            </div>

                            <div className={styles.container}>
                                <h3>Additional Household Members</h3>
                                {
                                    householdMembers.map(
                                        (element, index) => {
                                            return (
                                                <div key={index}>
                                                    <br></br>
                                                    <label>First Name: </label>
                                                    <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                                        <input type="text" required={true} name="firstName" style={{ width: '100%' }} onChange={e => handleMemberInput(index, e)} value={element.firstName} />
                                                    </span>
                                                    <label>Middle Name (optional): </label>
                                                    <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                                        <input type="text" required={false} name="middleName" style={{ width: '100%' }} onChange={e => handleMemberInput(index, e)} value={element.middleName || ""} />
                                                    </span>
                                                    <label>Last Name: </label>
                                                    <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                                        <input type="text" required={true} name="lastName" style={{ width: '100%' }} onChange={e => handleMemberInput(index, e)} value={element.lastName} />
                                                    </span>
                                                    <label className={styles.required}>Date of Birth: </label>
                                                    <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                                        <input type="date" required={true} name="dob" style={{ width: '100%' }} onChange={e => handleMemberInput(index, e)} value={element.dob} />
                                                    </span>
                                                </div>
                                            )
                                        }
                                    )
                                }
                                <button className={styles.button} style={{marginLeft: 'auto', marginRight: 'auto', marginTop: "5px", marginBottom: "5px"}} onClick={() => addMember()}>Add</button>
                            </div>

                            <button className={styles.button} style={{ marginTop: '10px', marginBottom: "10px" }} type="submit">Process Information</button>
                        </form>
                }
            </div >
        ) : "Invalid credentials, Please login again"
    )
}