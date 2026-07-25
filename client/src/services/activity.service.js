import api from "./api";

export const getActivities = async (leadId) => {
    const { data } = await api.get(`/activity/${leadId}`);
    return data;
};