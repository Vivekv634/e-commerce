import { db } from "@/app/config/firebase.config";
import { doc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    try {
        const body = await request.json();
        const { productID } = params;
        await updateProduct(productID, body);
        return NextResponse.json({ "status": true, "result": 'Product Updated!' });
    } catch (error) {
        return NextResponse.json({ "status": false, "result": error.message });
    }
}

const updateProduct = async (productID, body) => {
    const productRef = doc(db, 'products', productID);
    await updateDoc(productRef, {
        productName: body.productName,
        productDescription: body.productDescription,
        productPrice: body.productPrice,
        productDiscount: body.productDiscount,
        productQuantity: body.productQuantity,
        productDimension: body.productDimension,
        productRating: body.productRating,
        productWeight: body.productWeight,
        categoryID: body.categoryID,
        brandID: body.brandID,
        productImageAddress: body.productImageAddress
    });
};
