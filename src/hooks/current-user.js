import {useEffect} from 'react';
import {atom, useSetRecoilState, useRecoilValue} from 'recoil';
import * as fcl from '@onflow/fcl';

export const $currentUser = atom({
  key: 'CURRENT_USER',
  default() {
    return {
      addr: null,
      cid: null,
      loggedIn: null
    };
  }
});

export function CurrentUserSubscription() {
  const setCurrentUser = useSetRecoilState($currentUser);
  useEffect(() => fcl.currentUser().subscribe(setCurrentUser), [setCurrentUser]);
  return null;
}

export function useCurrentUser() {
  const currentUser = useRecoilValue($currentUser);
  return {
    ...currentUser,
    logOut: fcl.unauthenticate,
    logIn: fcl.logIn,
    signUp: fcl.signUp
  };
}
