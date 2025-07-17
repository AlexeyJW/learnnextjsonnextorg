 import { db } from "@/app/cafe/lib/firebase";
 //import { collection, getDocs } from "firebase/firestore";
 import { NextResponse } from "next/server";

// export async function GET() {
//   const snapshot = await getDocs(collection(db, "Order"));
//   const data = snapshot.docs.map((doc) => doc.data());
//   return NextResponse.json(data);
// }

import { collection, onSnapshot, getDocs } from 'firebase/firestore';

export async function GET() {
    try {
      const snapshot = await getDocs(collection(db, 'Order'));
      const cafes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return NextResponse.json(cafes);
    } catch (error) {
      return NextResponse.json(
        { error: "Помилка сервера" },
        { status: 500 }
      );
    }
  }
GET(); // Call this to start listening for changes!