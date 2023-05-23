module.exports = (err, res, req, next) => {
    switch (err.name) {
        case "notFound":
            res.status(404).json({ message: "Not found" })
            break;    
        default:
            res.status(500).json({ message: "Internal server error" })
            break;
    }
}