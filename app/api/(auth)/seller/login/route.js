import { auth } from "@/app/config/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { email, password } = await request.json();
        const response = await signInWithEmailAndPassword(auth, email, password);
        return NextResponse.json({ "status": true, "result": response });
    } catch (error) {
        return NextResponse.json({ "status": false, "result": error.message });
    }

}