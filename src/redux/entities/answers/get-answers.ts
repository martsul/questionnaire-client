import { createAsyncThunk } from "@reduxjs/toolkit";
import { simpleApi } from "../../../api";
import { endpoints } from "../../../constants/config";
import { ApiResponse } from "../../../types/api-response";
import { GetAnswerResponse } from "../../../types/form/get-answer-response";

export const getAnswers = createAsyncThunk(
    "answers/getAnswers",
    async (answerId: number, { rejectWithValue }) => {
        try {
            const response: ApiResponse<GetAnswerResponse> =
                await simpleApi.get(endpoints.answer, {
                    params: { answerId },
                });
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
