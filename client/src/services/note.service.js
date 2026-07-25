import api from "./api";

export const getNotes = async (leadId) => {
    const { data } = await api.get(`/notes/${leadId}`);
    return data;
};

export const addNote = async (leadId, content) => {
    const { data } = await api.post(
        `/notes/${leadId}`,
        {
            content,
        }
    );

    return data;
};