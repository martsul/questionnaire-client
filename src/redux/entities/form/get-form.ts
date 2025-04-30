import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../api";
import { ApiResponse } from "../../../types/api-response";
import { endpoints } from "../../../constants/config";
import { FormEntities } from "../../../types/form/form-entities";

type Data = { formId: number; userId?: number };

export const getForm = createAsyncThunk(
    "form/getForm",
    async (data: Data, { rejectWithValue }) => {
        try {
            const response: ApiResponse<FormEntities> = await api.get(
                endpoints.form,
                { params: { formId: data.formId, userId: data.userId } }
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
