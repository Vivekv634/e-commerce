import { db } from "@/app/config/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const { cartID } = params;
        const result = await getCartData(cartID);
        return NextResponse.json({ status: true, result: result });
    } catch (error) {
        return NextResponse.json({ status: false, result: error.message });
    }
}

const getCartData = async (cartID) => {
    const cartRef = doc(db, 'cart', cartID);
    const querySnapShot = await getDoc(cartRef);
    return querySnapShot.data();
}