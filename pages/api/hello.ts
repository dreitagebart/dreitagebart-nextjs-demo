import { NextApiRequest, NextApiResponse } from "next"

const api = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ text: "Hello" })
}

export default api
