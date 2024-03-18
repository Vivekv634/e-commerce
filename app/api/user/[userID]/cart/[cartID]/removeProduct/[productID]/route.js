import { db } from "@/app/config/firebase.config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
    try {
        const { cartID, productID } = params;
        await removeProduct(cartID, productID);
        return NextResponse.json({ status: true, result: "Product Removed!" });
    } catch (error) {
        return NextResponse.json({ status: false, result: error.message });
    }
}

const removeProduct = async (cartID, productID) => {
    const cartRef = doc(db, 'cart', cartID);
    const cartSnapShot = await getDoc(cartRef);
    const cartData = await cartSnapShot.data().cartData.filter(item => item.productID !== productID);
    await updateDoc(cartRef, { cartData: cartData });
}