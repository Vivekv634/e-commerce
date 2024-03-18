import { auth, sellerDB } from "@/app/config/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();
        const response = await registerSeller(body);
        return NextResponse.json({ "status": true, "result": response });
    } catch (error) {
        return NextResponse.json({ "status": false, "result": error.message })
    }
}

const registerSeller = async (body) => {
    const response = await createUserWithEmailAndPassword(auth, body.email, body.password);
    const sellerData = {
        personal_info: {
            name: body.name,
            email: body.email,
            contact_no: body.contact_no,
            address: body.address,
            auth_id: response.user.uid
        },
        business_info: {
            business_name: body.business_name,
            business_address: body.business_address,
            business_contact_no: body.business_contact_no,
            business_email: body.business_email,
            business_desp: body.business_desp
        },
        bank_info: {
            bank_name: body.bank_name,
            bank_branch_name: body.bank_branch_name,
            account_holder_name: body.account_holder_name,
            account_no: body.account_no
        }
    }
    await addDoc(sellerDB, sellerData);
    return response;
}