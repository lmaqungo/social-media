
const CancelIcon = ({ action, size=10 }) => {
  
  return (
    <>
        <svg onClick={action} className={`transition p-2 size-${size} rounded-full hover:bg-hover-grey cursor-pointer"  xmlns="http://www.w3.org/2000/svg`} viewBox="0 -960 960 960" fill="#FFFFFF"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
    </>
  )
}

export default CancelIcon