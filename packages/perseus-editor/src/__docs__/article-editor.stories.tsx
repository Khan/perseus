import {ApiOptions} from "@khanacademy/perseus";
import * as React from "react";
import {useRef, useState} from "react";

import ArticleEditor from "../article-editor";
import {registerAllWidgetsAndEditorsForTesting} from "../util/register-all-widgets-and-editors-for-testing";

registerAllWidgetsAndEditorsForTesting();

export default {
    title: "Perseus/Editors/ArticleEditor",
};

export const Base = (): React.ReactElement => {
    const [state, setState] = useState();
    const articleEditorRef = useRef();

    function handleChange(value) {
        setState(value.json);
    }

    function serialize() {
        // eslint-disable-next-line no-console
        console.log((articleEditorRef.current as any).serialize());
    }

    return (
        <>
            <button onClick={serialize}>Serialize</button>
            <hr />
            <ArticleEditor
                apiOptions={ApiOptions.defaults}
                imageUploader={() => {}}
                json={state}
                onChange={handleChange}
                previewURL="/perseus/frame"
                ref={articleEditorRef as any}
            />
        </>
    );
};
