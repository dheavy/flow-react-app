import * as fcl from '@onflow/fcl';

export async function initAccount() {
  const txId = await fcl
    .send([
      fcl.transaction`
        import Profile from 0xProfile

        transaction {
          let address: Address

          prepare(account: AuthAccount) {
            // Save address for the post check.
            self.address = account.address

            // Initialized account if it hasn't been already.
            if (!Profile.check(self.address)) {
              // Create and store Profile in users account.
              account.save(<- Profile.new(), to: Profile.privatePath)

              // Create public capability letting applications read the profile's info.
              account.link<&Profile.Base{Profile.Public}>(Profile.publicPath, target: Profile.privatePath)
            }
          }

          // Verify account has been initialized.
          post {
            Profile.check(self.address): "Account was not initialized"
          }
        }
      `,
      fcl.payer(fcl.authz),             // Current user responsible for paying transaction.
      fcl.proposer(fcl.authz),          // Current user acting as the nonce.
      fcl.authorizations([fcl.authz]),  // Current user will be first AuthAccount.
      fcl.limit(35)                     // Set compute limit.
    ])
    .then(fcl.decode);

  return fcl.tx(txId).onceSealed();
}
