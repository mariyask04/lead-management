"use client";

export default function StatsCards({ stats }) {
    if (!stats) return null;

    const cards = [
        { title: "Total", value: stats.totalLeads },
        { title: "New", value: stats.newLeads },
        { title: "Contacted", value: stats.contacted },
        { title: "Qualified", value: stats.qualified },
        { title: "Proposal", value: stats.proposalSent },
        { title: "Won", value: stats.won },
        { title: "Lost", value: stats.lost },
    ];

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: "15px",
                marginBottom: "30px",
            }}
        >
            {cards.map((card) => (
                <div
                    key={card.title}
                    style={{
                        border: "1px solid #ddd",
                        padding: "20px",
                        borderRadius: "8px",
                    }}
                >
                    <h4>{card.title}</h4>
                    <h2>{card.value}</h2>
                </div>
            ))}
        </div>
    );
}