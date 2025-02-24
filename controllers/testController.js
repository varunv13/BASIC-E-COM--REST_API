const testController = (req, res) => {
    try {
        return res.status(200).json({ message: "It's working" });
    } catch (error) {
        return res.status(500).json({ message: "Server Error" })
    }
}

export { testController };