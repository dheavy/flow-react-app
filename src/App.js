import React from 'react';
import {AuthCluster} from './auth-cluster';
import {InitCluster} from './init-cluster';
import {ProfileCluster} from './profile-cluster';
import {useCurrentUser} from './hooks/current-user';

export default function App() {
  const currentUser = useCurrentUser();

  return (
    <>
      <AuthCluster />
      <ProfileCluster address={currentUser.addr} />
      <ProfileCluster address='0xba1132bc08f82fe2'/>
      <ProfileCluster address='0xf117a8efa34ffd58'/>
      <InitCluster address={currentUser.addr} />
    </>
  );
}
