import mongooseConnection from "@/lib/MongoDbConnect";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "bson";

const handle = async (req: NextRequest, res: NextResponse) => {
  const { method } = req;
  const { title, description, price } = await req.json();
  await mongooseConnection();

  if (method === "POST") {
    const product = await Product.create({
      title,
      description,
      price,
    });
    return new Response(JSON.stringify(product));
  }
};

export { handle as POST };

export const GET = async (req: NextRequest, res: NextResponse) => {
  await mongooseConnection();
  const id = req.nextUrl.searchParams.get("id");
  if (id) {
    const product = await Product.findById(id);
    return new Response(JSON.stringify(product));
  } else {
    const products = await Product.find();
    return new Response(JSON.stringify(products));
  }
};

export const DELETE = async (req: NextRequest) => {
  await mongooseConnection();
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (id) {
      await Product.findByIdAndDelete(id);
      return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
    }
  } catch (error) {
    console.log(error);
  }
};
export const PUT = async (req: NextRequest) => {
  await mongooseConnection();
  try {
    const { title, description, price } = await req.json();
    const id = req.nextUrl.searchParams.get("id");
    if (id) {
      await Product.findByIdAndUpdate(id, {
        title,
        description,
        price,
      });
      return NextResponse.json({ message: "Topic Updated" }, { status: 200 });
    }
  } catch (error) {
    console.log(error);
  }
};
