// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    name: string;
};

export default function handler(_req: NextApiRequest, res: NextApiResponse<Data>): void {
    const successCode: number = 200;
    res.status(successCode).json({ name: 'John Doe' });
}
