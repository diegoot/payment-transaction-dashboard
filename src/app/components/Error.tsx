interface ErrorProps {
    title: string;
    detail: string;
}

const Error = ({ title, detail }: ErrorProps) => {
    return (
        <div id="error" className="fixed bottom-4 right-4 z-50 w-full max-w-xs">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 shadow-lg">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <h3 className="text-lg font-medium text-red-800">
                            {title}
                        </h3>
                        <p className="mt-1 text-sm text-red-700">
                            {detail}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Error;