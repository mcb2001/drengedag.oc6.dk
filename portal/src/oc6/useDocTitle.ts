import React from "react";

export const useDocTitle = (title: string) => {
    const [docTitle, setDoctitle] = React.useState<string>(title);

    React.useEffect(() => {
        document.title = docTitle + " - oc6";
    }, [docTitle]);

    return [docTitle, setDoctitle];
};