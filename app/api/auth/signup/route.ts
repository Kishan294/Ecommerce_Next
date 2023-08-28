import mongooseConnection from "@/lib/MongoDbConnect";
import { NextRequest, NextResponse } from "next/server";
import Users from "@/models/User";
import bcryptjs from "bcryptjs";

export const POST = async (req: NextRequest, res: NextResponse) => {
  await mongooseConnection();

  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password)
      return NextResponse.json(
        { message: "Please provide all fields" },
        { status: 400 }
      );

    //   User already exist
    const user = await Users.findOne({ email });

    if (user)
      return NextResponse.json(
        { message: "User already exist" },
        { status: 400 }
      );

    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await Users.create({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    return NextResponse.json(savedUser, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
};
