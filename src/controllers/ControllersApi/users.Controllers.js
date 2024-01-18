export async function sesionActual(req, res) {
  try {
    if (req.user) {
      return res.status(200).json({ status: "success", user: req.user });
    }
    throw new Error("UNAUTHORIZED USER");
  } catch (error) {
    return res.status(404).json({ status: "error", message: error.message });
  }
}
