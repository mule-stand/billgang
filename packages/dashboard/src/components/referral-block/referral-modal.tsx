import * as Ariakit from '@ariakit/react'

import { Info } from '../../assets/icons.js'
import { Button } from '../../common/button.js'
import { Input } from '../../common/input.js'
import { Modal } from '../../common/modal.js'

const ReferralModal = () => {
  const formStore = Ariakit.useFormStore({
    defaultValues: { referralCode: '' },
  })

  const dialogStore = Ariakit.useDialogStore({ defaultOpen: false })

  formStore.useSubmit(() => {
    dialogStore.hide()
  })
  return (
    <>
      <Button onClick={dialogStore.show}>Join the referral program </Button>
      <Modal store={dialogStore} title="Create an affiliate code">
        <Ariakit.Form store={formStore}>
          <Ariakit.FormLabel
            className="text-sm text-textSecondary"
            name={formStore.names.referralCode}
          >
            Affiliate Code
          </Ariakit.FormLabel>
          <Ariakit.FormInput
            name={formStore.names.referralCode}
            render={
              <Input
                className="mb-4"
                placeholder="Enter code here (e.g Join)"
              />
            }
          />

          <div className="p-3 bg-surface0 flex rounded-xl items-center mb-8">
            <div className="h-[20px] w-[20px] mr-[10px] flex-center">
              <Info />
            </div>
            <div className="text-sm text-textSecondary">
              Once you join our referral program, you’ll gain access to special
              deals, rewards, and potentially earn a percentage (%) of revenue.
            </div>
          </div>
          <div className="justify-end flex">
            <Ariakit.DialogDismiss
              render={
                <Button variant="secondary" className="mr-3">
                  Cancel
                </Button>
              }
            />
            <Ariakit.FormSubmit render={<Button>Create</Button>} />
          </div>
        </Ariakit.Form>
      </Modal>
    </>
  )
}

export default ReferralModal
