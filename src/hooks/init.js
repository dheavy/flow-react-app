import {atomFamily, useRecoilState} from 'recoil';
import {isInitialized} from '../flow/is-initialized.script';
import {initAccount} from '../flow/init-account.tx';

const IDLE = 'IDLE';
const PROCESSING = 'PROCESSING';

// atomFamily returns a memoized function constructing atoms.
// Defines behavior of atom once and construct new atoms based on an ID.
const $profile = atomFamily({
  key: 'INIT::PROFILE::STATE',
  default: null
});

const $profileStatus = atomFamily({
  key: 'INIT::PROFILE::STATUS',
  default: PROCESSING
});

export function useInit(address) {
  const [profile, setProfile] = useRecoilState($profile(address));
  const [status, setStatus] = useRecoilState($profileStatus(address));

  // Checks if supplied address is initialized.
  async function check() {
    setStatus(PROCESSING);
    // `isInitialized` throws error if address is null.
    if (address !== null) await isInitialized(address).then(setProfile);
    setStatus(IDLE);
  }

  async function exec() {
    setStatus(PROCESSING);
    await initAccount();
    setStatus(IDLE);
    await check();
  }

  return {
    profile,
    check,
    exec,
    isIdle: status === IDLE,
    isProcessing: status === PROCESSING,
    status,
    IDLE,
    PROCESSING
  };
}
