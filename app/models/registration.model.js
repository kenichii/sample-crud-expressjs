module.exports = mongoose => {
    const Registration = mongoose.model(
        "registration",
        mongoose.Schema(
            {
                title: String,
                description: String,
                published: Boolean
            },
            { timestamps: true }
        )
    );
    return Registration;
};
