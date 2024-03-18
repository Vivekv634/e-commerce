import { db, productDB } from "@/app/config/firebase.config";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
    try {
        const { sellerID } = params;
        const body = await request.json();
        const result = await addProduct(sellerID, body);
        return NextResponse.json({ status: true, result: result });
    } catch (error) {
        return NextResponse.json({ status: false, result: error.message });
    }
}

const addProduct = async (sellerID, body) => {
    let response;
    const querySnapshot = await getDocs(collection(db, "sellers"));
    const promises = querySnapshot.docs.map(async (doc) => {
        if (doc.id === sellerID) {
            const productData = {
                productName: body.productName,
                productDescription: body.productDescription,
                productPrice: body.productPrice,
                productDiscount: body.productDiscount,
                productQuantity: body.productQuantity,
                productDimension: body.productDimension,
                productRating: body.productRating,
                productWeight: body.productWeight,
                sellerID: sellerID,
                categoryID: body.categoryID,
                brandID: body.brandID,
                productImageAddress: body.productImageAddress
            };
            response = await addDoc(productDB, productData);
        }
    });
    await Promise.all(promises);
    return response;
};
