const Clipboard = (props: any) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="54"
            height="54"
            fill="none"
            viewBox="0 0 54 54"
            {...props}
        >
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="1.5"
                d="M18 27.45h15.75M18 36.45h9.855M22.5 13.5h9C36 13.5 36 11.25 36 9c0-4.5-2.25-4.5-4.5-4.5h-9c-2.25 0-4.5 0-4.5 4.5s2.25 4.5 4.5 4.5z"
            ></path>
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="1.5"
                d="M36 9.045c7.492.405 11.25 3.172 11.25 13.455V36c0 9-2.25 13.5-13.5 13.5h-13.5C9 49.5 6.75 45 6.75 36V22.5C6.75 12.24 10.508 9.45 18 9.045"
            ></path>
        </svg>
    )
}

export default Clipboard