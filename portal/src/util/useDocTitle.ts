import React from "react";

const useDocTitle = (title: string) => {
    const [docTitle, setDoctitle] = React.useState<string>(title);

    React.useEffect(() => {
        document.title = docTitle;
    }, [docTitle]);

    return [docTitle, setDoctitle];
};

export { useDocTitle };