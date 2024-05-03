const Filter = (props: any) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="none"
            viewBox="0 0 28 28"
            {...props}
        >
            <path
                stroke="#4E4E4E"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="1.5"
                d="M6.3 2.45h15.4a2.34 2.34 0 012.334 2.333V7.35c0 .933-.584 2.1-1.167 2.683l-5.017 4.434c-.7.583-1.167 1.75-1.167 2.683v5.017c0 .7-.466 1.633-1.05 1.983L14 25.2c-1.517.933-3.617-.117-3.617-1.983v-6.184c0-.816-.466-1.866-.933-2.45L5.017 9.917c-.584-.584-1.05-1.634-1.05-2.334V4.9c0-1.4 1.05-2.45 2.333-2.45z"
            ></path>
        </svg>
    )
}

export default Filter