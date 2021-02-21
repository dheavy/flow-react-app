import React from 'react';
import {useCurrentUser} from './hooks/current-user';

function WithAuth() {
  const currentUser = useCurrentUser();
  return !currentUser.loggedIn ? null : (
    <div>
      <span>{currentUser.addr ?? 'No address'}</span>
      <button onClick={currentUser.logOut}>Log Out</button>
    </div>
  );
}

function SansAuth() {
  const currentUser = useCurrentUser();
  return currentUser.loggedIn ? null : (
    <div>
      <button onClick={currentUser.logIn}>Log In</button>
      <button onClick={currentUser.signUp}>Sign Up</button>
    </div>
  );
}

export function AuthCluster() {
  return (
    <>
      <WithAuth />
      <SansAuth />
    </>
  );
}
