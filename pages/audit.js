import styles from '@/styles/Home.module.css'
import React, { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router';
import getUserRole from "@/lib/users";


export default function ConfirmationPage({ params }) {
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(
        () => {
            async function onStatusChange() {
                console.log(`status is: ${status}`);
            }
            onStatusChange();
        }, 
        [status]
    )

    if (status != "authenticated") {
        return (
            <main className={styles.main}>
                <h1>Page Requires Authentication</h1>
                <br></br>
                <div className={styles.card}>
                    <p>Navigate to the home page and sign-in first.</p>
                    <br></br>
                    <button className={styles.button} style={{marginLeft: 'auto', marginRight: 'auto', marginTop: "10px", marginBottom: "5px"}} onClick={() => router.push('/')}>
                        Return Home
                    </button>
                </div>
            </main>
        )
    } else {
        if (getUserRole(session.user.email) != "admin") {
            return (
                <main className={styles.main}>
                    <h1>Insufficient Privileges</h1>
                    <br></br>
                    <div className={styles.card}>
                        <p>This page requires admin-level privileges to access, sign in with a different account with these privileges to use this page.</p>
                        <br></br>
                        <button className={styles.button} style={{marginLeft: 'auto', marginRight: 'auto', marginTop: "10px", marginBottom: "5px"}} onClick={() => router.push('/')}>
                            Return Home
                        </button>
                    </div>
                </main>
            )
        } else {
            return (
                <main className={styles.main}>
                    <h1>Audit Records</h1>
                </main>
            );
        }
    }
}