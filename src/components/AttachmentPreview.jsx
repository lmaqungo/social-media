import CancelIcon from '../icons/CancelIcon'

const AttachmentPreview = ({ preview, setPreview, setAttachment }) => {

    function removeAttachment() {
        setPreview("")
        setAttachment(null)
    }

  return (
    <div className='flex gap-2 items-start '>
        <img className='max-w-7/10 rounded-md ' src={preview} alt='preview' />
        <CancelIcon action={removeAttachment} />
    </div>
  )
}

export default AttachmentPreview