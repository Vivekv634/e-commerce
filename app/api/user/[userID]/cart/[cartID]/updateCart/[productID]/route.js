import { db } from "@/app/config/firebase.config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
    try {
        const body = await request.json();
        const { cartID, productID } = params;
        await updateCart(cartID, productID, body.count);
        return NextResponse.json({ status: true, result: 'Cart Updated!' });
    } catch (error) {
        return NextResponse.json({ status: false, result: error.message });
    }
}

const updateCart = async (cartID, productID, count) => {
    const cartRef = doc(db, 'cart', cartID);
    const cartSnapShot = await getDoc(cartRef);
    const cartData = await cartSnapShot.data().cartData.map(item => {
        if (item.productID == productID) {
            return {
                ...item, productCount:count
            };
        }
        return item;
    })
    await updateDoc(cartRef, { cartData: cartData });
}