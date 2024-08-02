"use client";

import { useUserAuth } from "./_utils/auth-context";
import Link from "next/link";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  return (
    <div>
      <h1> <b>Shopping List App </b> </h1>
      <br></br>
      <p>{user ? "Press the bottom button to sign out" : "Please sign in"}</p>
      {user && user.displayName}
      <p>
        { user ? (
          <button onClick={firebaseSignOut}>Sign Out</button>
        ) : (
          <button onClick={gitHubSignIn}>Sign In with GitHub</button>
      )}
      </p>
      <br></br>
      <p> <Link href="week-10/shopping-list/">Shopping List Link HERE</Link> </p>

    </div>
  );
}
