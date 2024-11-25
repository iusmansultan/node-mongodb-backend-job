import express from 'express';
import { getUsers } from '../services/userService';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { limit, page, sortBy, search } = req.query;
        const result = await getUsers({
            limit: Number(limit),
            page: Number(page),
            sortBy: String(sortBy),
            search: search ? JSON.parse(String(search)) : {},
        });
        res.json(result);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
