"use client"
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { warn, notify } from "@/app/layout";
import { baseApiUrl } from "@/app/layout";


export default function VerifyToken() {

    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const searchParams = useSearchParams();
    const router = useRouter();

    const getToken = () => {
        const token = searchParams.get('token');
        return token
    }
    
    useEffect(() => {
        const verifyToken = async (e) => {
            setLoading(true)

            try {
                const token = getToken();
                const res = await fetch(`${baseApiUrl}/auth/verify-token?token=${token}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                });

                if (res.ok) {
                    console.log(res);
                    setResponse(res.data.message);
                    setLoading(false);
                    setTimeout(() => {
                        router.push("/auth/signin")
                    }, 2000);
                } else {
                    console.log(res);
                }
            } catch (err) {
                setError(err.response.data.detail);
                setLoading(false);
            }
        }
        verifyToken();
    }, []);

    if (error) {
		warn(`${error}`);
	}

	if (response) {
		notify(`${response}`)
	}

    return (
        <Suspense fallback={<p>Loading...</p>}>
            <section className="h-[100vh]">
                {loading ? <p className="text-[50px] text-center">Loading...</p> : ''}
                <ToastContainer />
            </section>
        </Suspense>
    )
}
