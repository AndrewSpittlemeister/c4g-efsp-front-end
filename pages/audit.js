import styles from '@/styles/Home.module.css'
import styled from 'styled-components'
import React, { useEffect, useState, useMemo } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router';
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, useSortBy, usePagination } from 'react-table'

const Styles = styled.div`
  padding: 1rem;
  flex-direction: left;

  div {
    button {
        font-size:10 rem;
        padding: 0.5rem;
        margin-bottom: 2rem;
        align-items: right;
    }
  }
  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
  `

function SliderColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
}) {
    // Calculate the min and max
    // using the preFilteredRows

    const [min, max] = useMemo(() => {
        let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
        let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
        preFilteredRows.forEach(row => {
            min = Math.min(row.values[id], min)
            max = Math.max(row.values[id], max)
        })
        return [min, max]
    }, [id, preFilteredRows])

    return (
        <>
            <input
                type="range"
                min={min}
                max={max}
                value={filterValue || min}
                onChange={e => {
                    setFilter(parseInt(e.target.value, 10))
                }}
            />
            <button onClick={() => setFilter(undefined)}>Off</button>
        </>
    )
}

function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
}) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
        const options = new Set()
        preFilteredRows.forEach(row => {
            options.add(row.values[id])
        })
        return [...options.values()]
    }, [id, preFilteredRows])

    // Render a multi-select box
    return (
        <select
            value={filterValue}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
        >
            <option value="">All</option>
            {options.map((option, i) => (
                <option key={i} value={option}>
                    {option}
                </option>
            ))}
        </select>
    )
}

function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
}) {
    const count = preFilteredRows.length

    return (
        <input
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
            }}
            placeholder={`Search ${count} records...`}
        />
    )
}

function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <span>
            Search:{' '}
            <input
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records...`}
                style={{
                    fontSize: '1.1rem',
                    border: '0',
                }}
            />
        </span>
    )
}

function Table({ columns, data }) {

    const defaultColumn = React.useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: DefaultColumnFilter,
        }),
        []
    )


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page
        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        prepareRow,
        visibleColumns,
        preGlobalFilteredRows,
        setGlobalFilter,
        state: { pageIndex, pageSize, filters, globalFilter },
        setAllFilters,
    } = useTable(
        {
            columns,
            data,
            defaultColumn, // Be sure to pass the defaultColumn option
            initialState: { pageIndex: 0 },
            autoResetFilters: true,
        },
        useFilters, // useFilters!
        useGlobalFilter, // useGlobalFilter!
        useSortBy,
        usePagination
    )

    return (
        <>
            <div>
                <button onClick={() => setAllFilters([])}>Reset All Filters</button>
            </div>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup, i) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                            {headerGroup.headers.map((column, j) => (
                                // Add the sorting props to control sorting. For this example
                                // we can add them into the header props
                                <th {...column.getHeaderProps(column.getSortByToggleProps())} key={j}>
                                    {column.render('Header')}
                                    {/* Add a sort direction indicator */}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                    </span>


                                </th>

                            ))}
                        </tr>
                    ))}

                    {headerGroups.map((headerGroup, i) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                            {headerGroup.headers.map((column, j) => (
                                <th {...column.getHeaderProps()} key={j}>
                                    {/* Render the columns filter UI */}
                                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                                </th>
                            ))}
                        </tr>
                    ))}
                    <tr>
                        <th
                            colSpan={visibleColumns.length}
                            style={{
                                textAlign: 'left',
                            }}
                        >
                            <GlobalFilter
                                preGlobalFilteredRows={preGlobalFilteredRows}
                                globalFilter={globalFilter}
                                setGlobalFilter={setGlobalFilter}
                            />
                        </th>
                    </tr>
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(
                        (row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} key={i}>
                                    {row.cells.map((cell, j) => {
                                        return (
                                            <td {...cell.getCellProps()} key={j}>{cell.render('Cell')}</td>
                                        )
                                    })}
                                </tr>
                            )
                        }
                    )}
                </tbody>
            </table>
            <br />
            {/* <div>Showing the first {rows.length <= 20 ? rows.length : 20} results of {rows.length} entries</div> */}

            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>{' '}
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
                    | Go to page:{' '}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(page)
                        }}
                        style={{ width: '100px' }}
                    />
                </span>{' '}
                <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <pre>
                    <code>{console.log(JSON.stringify(filters, null, 2))}</code>
                    <code>
                        {console.log(JSON.stringify(
                            {
                                pageIndex,
                                pageSize,
                                pageCount,
                                canNextPage,
                                canPreviousPage,
                            },
                            null,
                            2
                        ))}
                    </code>
                </pre>
            </div>
        </>
    )
}

function filterGreaterThan(rows, id, filterValue) {
    return rows.filter(row => {
        const rowValue = row.values[id]
        return rowValue >= filterValue
    })
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = val => typeof val !== 'number'

export default function ConfirmationPage({ params }) {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [allRecords, setAllRecords] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [formData, setFormData] = useState({ "applicationID": 0 });
    const [removeUserFormData, setRemoveUserFormData] = useState([]);
    const [addUserFormData, setAddUserFormData] = useState([]);
    const [userRole, setUserRole] = useState("invalid");

    useEffect(
        () => {
            async function fetchUserRole() {
                if ((router.isReady) && (status === "authenticated")) {
                    let res = await fetch(
                        `/api/getUserRole?email=${session.user.email}`,
                        {
                            method: "GET",
                            headers: {
                                "accept": "application/json",
                            },
                        },
                    );
                    let res_json = await res.json();

                    console.log(`Role for ${session.user.email}: `, res_json);

                    if (res_json.hasOwnProperty('result')) {
                        setUserRole(res_json["result"]);
                    }
                }
            }
            fetchUserRole();
        },
        [router.isReady, status]
    );

    const userColumns = React.useMemo(
        () => [
            {
                Header: 'Registered Users',
                columns: [
                    {
                        Header: 'Email',
                        accessor: 'email',
                    },
                    {
                        Header: 'Role',
                        accessor: 'role',
                    },
                ],
            },
        ],
        []
    )

    const columns = React.useMemo(
        () => [
            {
                Header: 'ID',
                columns: [
                    {
                        Header: 'Application ID',
                        accessor: 'ApplicationId',
                        Filter: SliderColumnFilter,
                        filter: filterGreaterThan,
                    },
                ],
            },
            {
                Header: 'Name',
                columns: [
                    {
                        Header: 'First Name',
                        accessor: 'FirstName',
                    },
                    {
                        Header: 'Middle Name',
                        accessor: 'MiddleName',
                    },
                    {
                        Header: 'Last Name',
                        accessor: 'LastName',
                    },
                ],
            },
            {
                Header: 'Additional Information',
                columns: [
                    {
                        Header: 'Date Of Birth',
                        accessor: 'DOB',
                    },
                    {
                        Header: 'Street Address',
                        accessor: 'StreetAddress',
                    },
                    {
                        Header: 'City',
                        accessor: 'City',
                        Filter: SelectColumnFilter,
                        filter: 'includes',
                    },
                    {
                        Header: 'Country',
                        accessor: 'Country',
                        Filter: SelectColumnFilter,
                        filter: 'includes',
                    },
                    {
                        Header: 'Postal Code',
                        accessor: 'PostalCode',
                    },
                    {
                        Header: 'Application Date',
                        accessor: 'RequestDate',
                    },
                ],
            },
            {
                Header: 'Agency Information',
                columns: [
                    {
                        Header: 'LRO Number',
                        accessor: 'LRONumber',
                    },
                    {
                        Header: 'Agency Name',
                        accessor: 'LROAgencyName',
                    },
                    {
                        Header: 'Agency Email',
                        accessor: 'LROEmail',
                    },
                    {
                        Header: 'Jurisdiction',
                        accessor: 'Jurisdiction',
                    },
                ],
            },
            {
                Header: 'Funding Information',
                columns: [
                    {
                        Header: 'Payment Vendor',
                        accessor: 'PaymentVendor',
                    },
                    {
                        Header: 'Funding Phase',
                        accessor: 'FundingPhase',
                    },
                    {
                        Header: 'Monthly Rent ($)',
                        accessor: 'MonthlyRentAmt',
                    },
                    {
                        Header: 'LRO Monthly Rent ($)',
                        accessor: 'MonthyRentAmt_LRO',
                    },
                    {
                        Header: 'Monthly Mortgage ($)',
                        accessor: 'MonthlyMortgageAmt',
                    },
                    {
                        Header: 'LRO Monthly Mortgage ($)',
                        accessor: 'MonthlyMortgageAmt_LRO',
                    },
                    {
                        Header: 'Lodging Night Count',
                        accessor: 'LodgingNightCount',
                    },
                    {
                        Header: 'Lodging Nightly Cost ($)',
                        accessor: 'LodgingCostPerNight',
                    },
                    {
                        Header: 'LRO Lodging Nightly Cost ($)',
                        accessor: 'LodgingCostPerNight_LRO',
                    },
                    {
                        Header: 'Monthly Gas ($)',
                        accessor: 'MonthlyGasAmt',
                    },
                    {
                        Header: 'LRO Monthly Gas ($)',
                        accessor: 'MonthlyGasAmt_LRO',
                    },
                    {
                        Header: 'Monthly Electric ($)',
                        accessor: 'MonthlyElectricityAmt',
                    },
                    {
                        Header: 'LRO Monthly Electric ($)',
                        accessor: 'MonthlyElectricityAmt_LRO',
                    },
                    {
                        Header: 'Monthly Water ($)',
                        accessor: 'MonthlyWaterAmt',
                    },
                    {
                        Header: 'LRO Monthly Water ($)',
                        accessor: 'MonthlyWaterAmt_LRO',
                    },
                ],
            },
        ],
        []
    )

    useEffect(
        () => {
            async function onStatusChange() {
                console.log(`status is: ${status}`);
            }
            onStatusChange();
        },
        [status]
    )

    useEffect(
        () => {
            async function getAllRecords() {
                if (router.isReady) {

                    let records_res = await fetch(
                        `/api/gatherAllRecords`,
                        {
                            method: "GET",
                            headers: {
                                "accept": "application/json",
                            },
                        },
                    );
                    let records = await records_res.json();

                    console.log("Setting All Applicant Records");
                    console.log(records);
                    setAllRecords(records.result);
                } else {
                    setAllRecords([]);
                }
            }
            async function getAllUsers() {
                if (router.isReady) {

                    let res_users = await fetch(
                        `/api/getUsers`,
                        {
                            method: "GET",
                            headers: {
                                "accept": "application/json",
                            },
                        },
                    );
                    let users = await res_users.json();

                    console.log("Setting All Users");
                    console.log(users);
                    setAllUsers(users.result);
                } else {
                    setAllUsers([]);
                }
            }
            getAllRecords();
            getAllUsers();
        },
        [router.isReady]
    );

    const handleRemoveUserInput = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;

        setRemoveUserFormData((prevState) => ({
            ...prevState,
            [fieldName]: fieldValue
        }));
    }

    const submitRemoveUserForm = async (e) => {
        // We don't want the page to refresh
        e.preventDefault();

        if (removeUserFormData.hasOwnProperty("email")) {
            let res = await fetch(
                `/api/removeUser?email=${removeUserFormData.email}`,
                {
                    method: "GET",
                    headers: {
                        "accept": "application/json",
                    },
                },
            );
            let res_json = await res.json();
            console.log(`remove user call response status: ${res.status}`);
            alert(res_json.result);
        } else {
            alert("An error has occurred in parsing this form, please refresh the page.");
        }

        window.location.reload();
    }

    const handleAddUserInput = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;

        setAddUserFormData((prevState) => ({
            ...prevState,
            [fieldName]: fieldValue
        }));
    }

    const submitAddUserForm = async (e) => {
        // We don't want the page to refresh
        e.preventDefault();

        if ((addUserFormData.hasOwnProperty("email")) && (addUserFormData.hasOwnProperty("role"))) {
            let res = await fetch(
                `/api/addUser?email=${addUserFormData.email}&role=${addUserFormData.role}`,
                {
                    method: "POST",
                    headers: {
                        "accept": "application/json",
                    },
                },
            );
            let res_json = await res.json();
            console.log(`add user call response status: ${res.status}`);
            alert(res_json.result);
        } else {
            alert("An error has occurred in parsing this form, please refresh the page.");
        }

        window.location.reload();
    }

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
        e.preventDefault();

        if (formData.hasOwnProperty("applicationID")) {
            let res = await fetch(
                `/api/removeRecord?identity=${formData.applicationID}`,
                {
                    method: "GET",
                    headers: {
                        "accept": "application/json",
                    },
                },
            );
            let res_json = await res.json();
            console.log(`remove record call response status: ${res.status}`);
            alert(res_json.result);
        } else {
            alert("An error has occurred in parsing this form, please refresh the page.");
        }

        window.location.reload();
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
    } else {
        if (userRole != "admin") {
            return (
                <main className={styles.main}>
                    <h1>Insufficient Privileges {`(${userRole})`}</h1>
                    <br></br>
                    <div className={styles.card}>
                        <p>This page requires admin-level privileges to access, sign in with a different account with these privileges to use this page.</p>
                        <br></br>
                        <button className={styles.button} style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: "10px", marginBottom: "5px" }} onClick={() => router.push('/')}>
                            Return Home
                        </button>
                    </div>
                </main>
            )
        } else {
            return (
                <main className={styles.auditmain}>
                    <h1>Audit</h1>
                    <div style={{display: "flex"}}>
                        <div className={styles.container} style={{ width: '30%', minWidth: "250px" }}>
                            <h2 style={{ marginTop: '10px', marginBottom: "10px" }}>Add User</h2>
                            <p style={{ marginTop: '10px', marginBottom: "10px" }}>
                                {"Add a user via the email address and role."}
                            </p>
                            <form id="add-user-form" onSubmit={submitAddUserForm} style={{ overflow: 'hidden' }}>
                                <div className={styles.container}>
                                    <label className={styles.required}>User Email: </label>
                                    <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                        <input type="email" required={true} name="email" style={{ width: '100%' }} onChange={handleAddUserInput} value={addUserFormData.email}/>
                                    </span>
                                </div>
                                <div className={styles.container}>
                                    <label className={styles.required}>User Role: </label>
                                    <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                        <select type="text" name="role" style={{ width: '100%' }} onChange={handleAddUserInput} value={addUserFormData.role} >
                                            <option value=""></option>
                                            <option value="agent">agent</option>
                                            <option value="admin">admin</option>
                                        </select>
                                    </span>
                                </div>
                                <button className={styles.button} style={{ marginTop: '10px', marginBottom: "10px" }} type="submit">Submit</button>
                            </form>
                        </div>
                        <div className={styles.container} style={{ width: '30%', minWidth: "250px" }}>
                            <h2 style={{ marginTop: '10px', marginBottom: "10px" }}>Remove User</h2>
                            <p style={{ marginTop: '10px', marginBottom: "10px" }}>
                                {"Remove a user via the email address."}
                            </p>
                            <form id="remove-user-form" onSubmit={submitRemoveUserForm} style={{ overflow: 'hidden' }}>
                                <div className={styles.container}>
                                    <label className={styles.required}>User Email: </label>
                                    <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                        <input type="email" required={true} name="email" style={{ width: '100%' }} onChange={handleRemoveUserInput} value={removeUserFormData.email}/>
                                    </span>
                                </div>
                                <button className={styles.button} style={{ marginTop: '10px', marginBottom: "10px" }} type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                    <h2 style={{ marginTop: '10px', marginBottom: "10px" }}>Explore Users</h2>
                    <Styles>
                        <Table columns={userColumns} data={allUsers} />
                    </Styles>
                    <div className={styles.container} style={{ width: '30%', minWidth: "250px" }}>
                        <h2 style={{ marginTop: '10px', marginBottom: "10px" }}>Remove Record</h2>
                        <p style={{ marginTop: '10px', marginBottom: "10px" }}>
                            {"Remove a record (equivalent to a row in the table below) by it's \"ApplicationID\" field."}
                        </p>
                        <form id="remove-record-form" onSubmit={submitForm} style={{ overflow: 'hidden' }}>
                            <div className={styles.container}>
                                <label className={styles.required}>Application ID: </label>
                                <span style={{ display: "block", overflow: "hidden", marginTop: "5px" }}>
                                    <input type="number" required={true} name="applicationID" style={{ width: '100%' }} onChange={handleInput} value={formData.applicationID}/>
                                </span>
                            </div>
                            <button className={styles.button} style={{ marginTop: '10px', marginBottom: "10px" }} type="submit">Submit</button>
                        </form>
                    </div>
                    <h2 style={{ marginTop: '10px', marginBottom: "10px" }}>Explore Records</h2>
                    <Styles>
                        <Table columns={columns} data={allRecords} />
                    </Styles>
                </main>
            );
        }
    }
}
