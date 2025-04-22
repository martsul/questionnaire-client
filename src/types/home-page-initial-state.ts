import { LastForm } from "./last-from";
import { PopularForm } from "./popular-form";
import { PopularType } from "./popular-tag";
import { RequestStatus } from "./request-status";

export type HomePageInitialState = {
    lastForms: LastForm[];
    popularForms: PopularForm[];
    popularTags: PopularType[];
    requestStatus: RequestStatus;
};
