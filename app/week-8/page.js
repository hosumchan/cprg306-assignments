"use client";

import { useUserAuth } from "./_utils/auth-context";
import Link from "next/link";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  return (
    <div>
      <h1>Week 8</h1>
      <p>{user ? "Hi there!" : "Please sign in"}</p>
      {user && (
        <>
          <p>Welcome, {user.displayName} ({user.email})</p>
          <p><button onClick={firebaseSignOut}>Sign Out</button></p>
          <p><Link href="/week-8/shopping-list">Go to Shopping List</Link></p>
        </>
      )}
      {!user && (
        <p><button onClick={gitHubSignIn}>Sign In with GitHub</button></p>
      )}
    </div>
  );
}
