import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiResponse } from "../../../types/api-response";
import { LastForm } from "../../../types/last-from";
import { PopularForm } from "../../../types/popular-form";
import { PopularType } from "../../../types/popular-tag";
import { simpleApi } from "../../../api";
import { endpoints } from "../../../constants/config";

type Response = {
    lastForms: LastForm[];
    popularForms: PopularForm[];
    popularTags: PopularType[];
};

export const getHomePage = createAsyncThunk(
    "homePage/getHomePage",
    async (_, { rejectWithValue }) => {
        try {
            const response: ApiResponse<Response> = await simpleApi.get(
                endpoints.home
            );

            if (!response.data) {
                return rejectWithValue("No Data");
            }

            return response.data;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error);
        }
    }
);
