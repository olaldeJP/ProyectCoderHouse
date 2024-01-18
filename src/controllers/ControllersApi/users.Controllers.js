export async function sesionActual(req, res) {
  try {
    res.status(200).json({ status: "success", payload: req.user });
  } catch (error) {
    res.status(404).json({ status: "error", message: error.message });
  }
}
