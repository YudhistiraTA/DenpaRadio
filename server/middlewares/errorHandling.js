module.exports = (err, req, res, next) => {
    switch (err.name) {
        case "notFound":
            res.status(404).json({ message: "Not found" })
            break;    
        default:
            console.log(err);
            res.status(500).json({ message: "Internal server error" })
            break;
    }
}