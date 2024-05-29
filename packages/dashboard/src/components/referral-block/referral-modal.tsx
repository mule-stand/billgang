// import { Modal, Label } from 'flowbite-react'
// import { useState } from 'react'

// import { Info } from '../../assets/icons.js'
// import {Button} from '../../common/button.js'
// import {Input} from '../../common/input.js'

// const customTheme = {
//   content: {
//     inner:
//       'relative flex max-h-[90dvh] flex-col bg-white shadow dark:bg-gray-700 rounded-3xl',
//   },
//   header: {
//     close: {
//       base: 'ml-auto inline-flex items-center text-textSecondary',
//       icon: 'h-[25px] w-[25px]',
//     },
//   },
// }

// const ReferralModal = () => {
//   const [open, setOpen] = useState(false)

//   const showModal = () => {
//     setOpen(true)
//   }

//   const handleCancel = () => {
//     setOpen(false)
//   }

//   return (
//     <>
//       <Button onClick={showModal}>Join the referral program </Button>
//       <Modal theme={customTheme} dismissible show={open} onClose={handleCancel}>
//         <Modal.Header className="p-[16px_24px] border-borderDefault ">
//           <div className="text-xl font-bold">Create an affiliate code</div>
//         </Modal.Header>
//         <Modal.Body className="p-[16px_24px]">
//           <Label
//             className="text-sm text-textSecondary"
//             htmlFor="affiliateCode"
//             value="Affiliate Code"
//           />
//           <Input
//             className="mt-[6px] mb-4"
//             id="affiliateCode"
//             placeholder="Enter code here (e.g Join)"
//           />
//           <div className="p-3 bg-surface0 flex rounded-xl items-center">
//             <div className="h-[20px] w-[20px] mr-[10px] flex-center">
//               <Info />
//             </div>
//             <div className="text-sm text-textSecondary">
//               Once you join our referral program, you’ll gain access to special
//               deals, rewards, and potentially earn a percentage (%) of revenue.
//             </div>
//           </div>
//         </Modal.Body>
//         <Modal.Footer className="justify-end border-none p-[16px_24px]">
//           <Button type="secondary" onClick={handleCancel}>
//             Cancel
//           </Button>
//           <Button onClick={handleCancel}>Create</Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   )
// }

// export default ReferralModal