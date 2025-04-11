import { createAsyncThunk } from "@reduxjs/toolkit";
import { simpleApi } from "../../../api";
import { ApiResponse } from "../../../types/api-response";
import { endpoints } from "../../../constants/config";
import { FormEntities } from "../../../types/form/form-entities";

export const getForm = createAsyncThunk(
    "form/getForm",
    async (id: number, { rejectWithValue }) => {
        try {
            const response: ApiResponse<FormEntities> = await simpleApi.get(
                endpoints.form,
                { params: { id } }
            );

            if (!response.data.head) {
                return rejectWithValue("No Data");
            }

            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error);
        }
    }
);
