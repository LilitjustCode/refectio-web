import React from 'react'

function CustomCheckbox({checked, onClick}) {
  return (
    <div>
        {checked === false ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={onClick}>
            <rect x="0.5" y="0.5" width="15" height="15" rx="3.5" fill="white" stroke="#D4D4D4"/>
            </svg>
            : <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={onClick}>
            <rect width="16" height="16" rx="4" fill="#68CD67"/>
            <rect width="16" height="16" rx="4" stroke="#D4D4D4"/>
            <path d="M5.81326 8.00004C5.68816 7.88753 5.52514 7.82649 5.35691 7.82915C5.18868 7.83182 5.02768 7.898 4.9062 8.01441C4.78473 8.13083 4.71176 8.28887 4.70194 8.45683C4.69212 8.6248 4.74618 8.79027 4.85326 8.92004L6.33326 10.4734C6.39523 10.5384 6.46969 10.5902 6.55217 10.6257C6.63465 10.6612 6.72346 10.6797 6.81326 10.68C6.90259 10.6806 6.99111 10.6631 7.07357 10.6288C7.15602 10.5944 7.23074 10.5438 7.29326 10.48L11.8133 5.81337C11.8745 5.75034 11.9228 5.67585 11.9553 5.59416C11.9878 5.51247 12.0039 5.42519 12.0027 5.33728C12.0014 5.24937 11.9829 5.16257 11.9481 5.08183C11.9133 5.00109 11.863 4.92799 11.7999 4.86671C11.7369 4.80542 11.6624 4.75716 11.5807 4.72466C11.499 4.69216 11.4117 4.67607 11.3238 4.67731C11.2359 4.67855 11.1491 4.69709 11.0684 4.73188C10.9876 4.76666 10.9145 4.81701 10.8533 4.88004L6.81993 9.05337L5.81326 8.00004Z" fill="white"/>
            </svg>
        }
    </div>
  )
}

export default CustomCheckbox