import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import moment from "moment";
import { InputText } from 'primereact/inputtext';

const SingleUserPromptsSavedPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [chataiid, setChataiid] = useState([]);
    const [saveduserid, setSaveduserid] = useState([]);
    const [configid, setConfigid] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("userPromptsSaved")
            .get(urlParams.singleUserPromptsSavedId, { query: { $populate: ["chataiid","saveduserid","configid"] }})
            .then((res) => {
                set_entity(res || {});
                const chataiid = Array.isArray(res.chataiid)
            ? res.chataiid.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.chataiid
                ? [{ _id: res.chataiid._id, name: res.chataiid.name }]
                : [];
        setChataiid(chataiid);
                const saveduserid = Array.isArray(res.saveduserid)
            ? res.saveduserid.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.saveduserid
                ? [{ _id: res.saveduserid._id, name: res.saveduserid.name }]
                : [];
        setSaveduserid(saveduserid);
                const configid = Array.isArray(res.configid)
            ? res.configid.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.configid
                ? [{ _id: res.configid._id, name: res.configid.name }]
                : [];
        setConfigid(configid);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "UserPromptsSaved", type: "error", message: error.message || "Failed get userPromptsSaved" });
            });
    }, [props,urlParams.singleUserPromptsSavedId]);


    const goBack = () => {
        navigate(-1, { replace: true });
    };

    return (
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">UserPromptsSaved</h3>
                </div>
                <p>userPromptsSaved/{urlParams.singleUserPromptsSavedId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="grid col-10">
                <div className="card w-full">
            <label className="text-sm text-primary">User</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.saveduserid?.name}</p></div>
                    <label className="text-sm text-primary">Config</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.configid?.name}</p></div>
                    <label className="text-sm text-primary">Prompt</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.prompt}</p></div>
                    <label className="text-sm text-primary">Others</label>
                    <div className="ml-3"><p className="m-0 ml-3" >{_entity?.others}</p></div>
            <label className="text-sm">ChatAi</label>
            {chataiid.map((elem) => (
                    <Link key={elem._id} to={`/chatai/${elem._id}`}>
                        <div className="card">
                            <p>{elem.name}</p>
                        </div>
                    </Link>
                ))}
            <label className="text-sm">User</label>
            {saveduserid.map((elem) => (
                    <Link key={elem._id} to={`/users/${elem._id}`}>
                        <div className="card">
                            <p>{elem.name}</p>
                        </div>
                    </Link>
                ))}
            <label className="text-sm">Config</label>
            {configid.map((elem) => (
                    <Link key={elem._id} to={`/config/${elem._id}`}>
                        <div className="card">
                            <p>{elem.name}</p>
                        </div>
                    </Link>
                ))}
                    <label className="text-sm text-primary">created</label>
                    <div className="ml-3">
                        <p className="m-0 ml-3">{moment(_entity?.createdAt).fromNow()}</p>
                    </div>
                    <label className="text-sm text-primary">updated</label>
                    <div className="ml-3">
                        <p className="m-0 ml-3">{moment(_entity?.updatedAt).fromNow()}</p>
                    </div>
                    <label className="text-sm text-primary">createdBy</label>
                    <div className="ml-3">
                      <p className="m-0 ml-3">{_entity?.createdBy?.name}</p>
                    </div>
                    <label className="text-sm text-primary">lastUpdatedBy</label>
                    <div className="ml-3">
                      <p className="m-0 ml-3">{_entity?.updatedBy?.name}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapState = (state) => {
    return {};
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
    //
});

export default connect(mapState, mapDispatch)(SingleUserPromptsSavedPage);
