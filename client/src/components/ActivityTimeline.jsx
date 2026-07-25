"use client";

export default function ActivityTimeline({
    activities,
}) {
    return (
        <div
            style={{
                marginTop: "40px",
                border: "1px solid #ddd",
                padding: "20px",
            }}
        >
            <h2>Activity Timeline</h2>

            {activities.length === 0 ? (
                <p>No activity found.</p>
            ) : (
                activities.map((activity) => (
                    <div
                        key={activity._id}
                        style={{
                            marginBottom: "18px",
                            paddingBottom: "12px",
                            borderBottom:
                                "1px solid #eee",
                        }}
                    >
                        <strong>
                            {activity.action}
                        </strong>

                        <br />

                        <small>
                            {activity.user?.name ||
                                "System"}

                            {" • "}

                            {new Date(
                                activity.createdAt
                            ).toLocaleString()}
                        </small>
                    </div>
                ))
            )}
        </div>
    );
}