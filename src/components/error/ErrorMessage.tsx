const ErrorMessage = ({ message }: { message: string }) => {
    return (
        <p className=" text-end text-red-500 dark:text-red-700 text-xs mt-1">
            {message}
        </p>
    );
};

export default ErrorMessage;
