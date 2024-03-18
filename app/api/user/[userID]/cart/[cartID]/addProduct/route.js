import { db } from "@/app/config/firebase.config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
    try {
        const body = await request.json();
        const { cartID } = params;
        await addProduct(cartID, body);
        return NextResponse.json({ status: true, result: "Product added to cart!" });
    } catch (error) {
        return NextResponse.json({ status: false, result: error.message });
    }
}

const addProduct = async (cartID, body) => {
    const cartRef = doc(db, 'cart', cartID);
    const cartSnap = await getDoc(cartRef);
    if (cartSnap.exists()) {
        await updateDoc(cartRef,
            {
                cartData: [...cartSnap.data().cartData,
                {
                    productCount: body.productCount,
                    productID: body.productID
                }
                ]
            }
        )
    }
}