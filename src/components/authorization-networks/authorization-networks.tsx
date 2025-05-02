import { GITHUB_AUTH } from "../../constants/config";

export const AuthorizationNetworks = () => {
    return (
        <div>
            <a className="fs-3" href={GITHUB_AUTH}>
                <i className="bi bi-github"></i>
            </a>
        </div>
    );
};
