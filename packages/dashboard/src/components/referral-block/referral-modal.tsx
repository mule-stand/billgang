import * as Ariakit from '@ariakit/react'

import { useState } from 'react'

import { Info } from '../../assets/icons.js'
import { CrossIcon } from '../../assets/icons.js'
import { Button } from '../../common/button.js'
import { Dialog } from '../../common/dialog.js'
import { Input } from '../../common/input.js'
const ReferralModal = () => {
  const [open, setOpen] = useState(false)

  const showModal = () => {
    setOpen(true)
  }

  const handleCancel = () => {
    setOpen(false)
  }
  const formStore = Ariakit.useFormStore({
    defaultValues: { referralCode: '' },
  })
  return (
    <>
      <Button onClick={showModal}>Join the referral program </Button>

      <Ariakit.Dialog
        open={open}
        onClose={handleCancel}
        render={<Dialog />}
        backdrop={<div className="bg-[rgba(37,37,37,0.24)]" />}
      >
        <Ariakit.Form store={formStore}>
          <div className="py-4 px-6 border-borderDefault border-b flex">
            <div className="text-xl font-bold">Create an affiliate code</div>
            <button type="button" className="ml-auto" onClick={handleCancel}>
              <CrossIcon />
            </button>
          </div>
          <div className="py-4 px-6">
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

            <div className="p-3 bg-surface0 flex rounded-xl items-center">
              <div className="h-[20px] w-[20px] mr-[10px] flex-center">
                <Info />
              </div>
              <div className="text-sm text-textSecondary">
                Once you join our referral program, you’ll gain access to
                special deals, rewards, and potentially earn a percentage (%) of
                revenue.
              </div>
            </div>
          </div>
          <div className="justify-end flex py-4 px-6">
            <Button variant="secondary" onClick={handleCancel} className="mr-3">
              Cancel
            </Button>
            <Button onClick={handleCancel}>Create</Button>
          </div>
        </Ariakit.Form>
      </Ariakit.Dialog>
    </>
  )
}

export default ReferralModal
