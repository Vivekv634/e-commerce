import { categoryDB } from "@/app/config/firebase.config";
import { addDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(request) {
    const body = await request.json();
    const data = {
        'categoryName': body.categoryName,
        'categoryDescription':body.categoryDescription,
        'categoryDisplayImage':body.categoryDisplayImage,
    }
    await addDoc(categoryDB, data);
    return NextResponse.json({ status: true });
}