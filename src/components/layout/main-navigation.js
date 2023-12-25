import Link from 'next/link';
import { getSession, useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import classes from './main-navigation.module.css';
import { useEffect, useState } from 'react';

function MainNavigation() {
  const { data: session, status } = useSession();

  const logoutHandler = async () => {
    signOut();
  }

  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
          {!session && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {session && status === 'authenticated' && (
            <>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={() => logoutHandler()}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
