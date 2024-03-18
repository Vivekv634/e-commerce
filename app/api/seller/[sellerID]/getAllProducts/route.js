import { db } from "@/app/config/firebase.config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const { sellerID } = params;
        let result = [];
        result = await getAllProducts(sellerID);
        return NextResponse.json({ "status": false, "result": result });
    } catch (error) {
        return NextResponse.json({ "status": false, "result": error.message });
    }
}

const getAllProducts = async (sellerID) => {
    let result = [];
    const docsSnapshot = await getDocs(collection(db, "sellers"));
    await Promise.all(docsSnapshot.docs.map(async (doc) => {
        if (doc.id === sellerID) {
            const q = query(collection(db, "products"), where("sellerID", "==", sellerID));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                result.push({ "productID": doc.id, "productData": doc.data() });
            });
        }
    }));
    return result;
}