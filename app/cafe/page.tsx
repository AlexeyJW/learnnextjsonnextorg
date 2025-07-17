'use client';
import Button from "@mui/joy/Button";
import Link from "next/link";
import { db } from "@/app/cafe/lib/firebase";
import { collection, onSnapshot } from 'firebase/firestore';

export default function Page() {
   
     async function fetchCafeData() {
        // onSnapshot(collection(db, "Order"), (snapshot) => {
        //     snapshot.docs.forEach((doc) => {
        //       console.log(doc.id, " => ", doc.data());
        //     });
        //   }, (error) => {
        //     console.error("Error listening for changes: ", error);
        //   });

        try {
            const response = await fetch('/cafe/api/firebase');
            const data = await response.json();
            console.log("Дані з Firestore:", data);
          } catch (error) {
            console.error("Помилка:", error);
          }
          }
    return (
        <>
            <h1>Cafe</h1>
    
            <div className='flex flex-col justify-center items-center gap-4'>
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="border border-zinc-800 w-16 text-center"
                    
                    >
                        <Link href={`/cafe/${index + 1}`}>
                            Table {index + 1}
                        </Link>
                      
                    </div>
                ))}
               
            </div>
            <Button onClick={fetchCafeData}>Db</Button>
        </>
        
        
    )
}
