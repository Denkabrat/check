const Bookmark = (props: any) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="29"
            fill="none"
            viewBox="0 0 28 29"
            {...props}
        >
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M19.623 2.833H8.376a4.514 4.514 0 00-4.503 4.504v16.438c0 2.1 1.505 2.987 3.348 1.972l5.694-3.162c.606-.338 1.586-.338 2.181 0l5.694 3.162c1.843 1.026 3.348.14 3.348-1.972V7.337c-.012-2.474-2.03-4.504-4.515-4.504z"
            ></path>
        </svg>
    )
}

export default Bookmark