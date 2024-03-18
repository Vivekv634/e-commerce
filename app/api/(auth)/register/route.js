import { NextResponse } from "next/server";
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, cartDB, customerDB } from "@/app/config/firebase.config";
import { addDoc } from "firebase/firestore";

export async function POST(request) {
    try {
        const { name, email, password } = await request.json();
        const response = await registerUser(name, email, password);
        return NextResponse.json({ "status": true, result: response });
    } catch (error) {
        return NextResponse.json({ "status": false, result: error.message })
    }
}

const registerUser = async (name, email, password) => {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    const userSchema = {
        name: name,
        email: email,
        authID: response.user.uid
    }
    const user = await addDoc(customerDB, userSchema);
    const userCartSchema = {
        customerID: user.id,
        cartData: []
    }
    await addDoc(cartDB, userCartSchema);
    return response;
}