import { db } from "@/app/config/firebase.config";
import { deleteDoc, doc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
    try {
        const { productID } = params;
        deleteProduct(productID);
        return NextResponse.json({ "status": true, "result": 'Product Deleted!' });
    } catch (error) {
        console.error("Error deleting product:", error);
        return NextResponse.json({ "status": false, "result": error.message });
    }
}

const deleteProduct = async (productID) => {
    const productRef = doc(db, 'products', productID);
    await deleteDoc(productRef);
};
