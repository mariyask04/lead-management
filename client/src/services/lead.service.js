import api from "./api";

export const getLeadStats = async () => {
    const { data } = await api.get("/leads/stats");
    return data;
};

export const getLeads = async ({
    page = 1,
    limit = 10,
    search = "",
    status = "",
} = {}) => {
    const { data } = await api.get("/leads", {
        params: {
            page,
            limit,
            search,
            status,
        },
    });

    return data;
};

export const getLeadById = async (id) => {
    const { data } = await api.get(`/leads/${id}`);
    return data;
};

export const updateLeadStatus = async (id, status) => {
    const { data } = await api.patch(`/leads/${id}/status`, {
        status,
    });

    return data;
};

export const assignLead = async (id, assignedTo) => {
    const { data } = await api.patch(`/leads/${id}/assign`, {
        assignedTo,
    });

    return data;
};

export const createLead = async (LeadData) => {
    const { data } = await api.post("/leads", LeadData);
    return data;
}

export const updateLead = async (id, data) => {
    const response = await api.patch(`/leads/${id}`, data);
    return response.data;
};

export const deleteLead = async (id) => {
    const response = await api.delete(`/leads/${id}`);
    return response.data;
};