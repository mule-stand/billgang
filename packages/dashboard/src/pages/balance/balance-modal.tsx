import * as Ariakit from '@ariakit/react'

import { z } from 'zod'

import { Button } from '../../common/button.js'
import { IconWrapper } from '../../common/icon-wrapper.js'
import { Input } from '../../common/input.js'
import { Modal } from '../../common/modal.js'

import {
  ApplePayGooglePay,
  CashApp,
  Cryptocurrency,
  DebitCreditCard,
  DocumentCloud,
  Dollar,
  Fire,
  PayPal,
  Plus,
  ShieldSearch,
} from '../../assets/icons.js'
import { ccn } from '../../utils/index.js'
import { validateFormStore } from '../../utils/validateFormStore.js'

const payMethods = [
  {
    name: 'Cryptocurrency',
    icon: <Cryptocurrency />,
  },
  {
    name: 'Debit / Credit Card',
    icon: <DebitCreditCard />,
  },
  {
    name: 'Cash App',
    icon: <CashApp />,
  },
  {
    name: 'PayPal',
    icon: <PayPal />,
  },
  {
    name: 'Apple Pay / Google Pay',
    icon: <ApplePayGooglePay />,
  },
]

const balanceValidation = z.object({
  amount: z.coerce
    .number({ message: 'The balance field should be number.' })
    .min(1, { message: 'The balance field cannot be empty.' }),
  payMethod: z.string().min(1, { message: 'Select pay method' }),
})

export const BalanceModal = () => {
  const formStore = Ariakit.useFormStore({
    defaultValues: { amount: '', payMethod: '' },
  })

  const dialogStore = Ariakit.useDialogStore({ defaultOpen: false })
  formStore.useSubmit(() => {
    dialogStore.hide()
  })
  const payMethod = formStore.useValue(formStore.names.payMethod)

  formStore.useValidate((state) =>
    validateFormStore(state, balanceValidation, formStore),
  )
  return (
    <>
      <Button
        onClick={dialogStore.show}
        className="mr-4 flex-center mb-2 md:mb-0 w-full md:w-auto"
      >
        <IconWrapper color="surface100" Icon={Plus} />
        <span className="ml-1">Add balance</span>
      </Button>
      <Modal store={dialogStore} title="Top Up Account Balance">
        <Ariakit.Form store={formStore}>
          <Ariakit.FormLabel
            className="text-sm text-textSecondary"
            name={formStore.names.amount}
          >
            Enter Amount
          </Ariakit.FormLabel>
          <Ariakit.FormInput
            name={formStore.names.amount}
            render={
              <Input className="mb-3" placeholder="0" icon={<Dollar />} />
            }
          />
          <Ariakit.FormError
            className="text-signalDanger mb-4"
            name={formStore.names.amount}
          />

          <div className="text-sm text-brandDefault py-2 px-3 inline-flex bg-surface0 rounded-xl mb-4">
            <Fire />
            <div className="ml-2">
              Enter another $13 and receive an additional bonus of 25%
            </div>
          </div>
          <div className="mb-10 pt-6 border-borderDefault border-t w-full grid gap-3 grid-cols-2">
            {payMethods.map((e, index) => (
              <button
                type="button"
                key={e.name}
                className={ccn(
                  'p-4 rounded-2xl border flex flex-col justify-start',
                  payMethod === e.name
                    ? 'border-brandDefault'
                    : 'border-borderDefault',
                  payMethods.length - 1 === index && 'col-span-2',
                )}
                onClick={() =>
                  formStore.setValue(formStore.names.payMethod, e.name)
                }
              >
                <div className="mb-4">{e.icon}</div>
                <div>{e.name}</div>
              </button>
            ))}
          </div>
          <Ariakit.FormError
            className="text-signalDanger mb-4"
            name={formStore.names.payMethod}
          />
          <Ariakit.FormSubmit
            render={
              <Button className="w-full mb-4 h-11 py-3">
                Continue to Checkout
              </Button>
            }
          />

          <div className="p-3 bg-surface0 flex rounded-xl items-center mb-4">
            <div className="h-[20px] w-[20px] mr-[10px] flex-center">
              <DocumentCloud />
            </div>
            <div className="text-xs text-textSecondary">
              By continuing to checkout, you agree to our terms of service and
              allow us to charge your payment method for this order.
            </div>
          </div>
          <div className="p-3 bg-surface0 flex rounded-xl items-center">
            <div className="h-[20px] w-[20px] mr-[10px] flex-center">
              <ShieldSearch />
            </div>
            <div className="text-xs text-textSecondary">
              Your data is secured by extended validation SSL certificates
              (256-bit encryption). This complies with the strongest payment
              security standard available today.
            </div>
          </div>
        </Ariakit.Form>
      </Modal>
    </>
  )
}
