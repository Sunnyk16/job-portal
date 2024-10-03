import express from 'express';
import { getComapny, getComapnyById,  registerCompany, updateCompany } from '../controllers/company.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router =express.Router();

router.route('/register').post(isAuthenticated,registerCompany);
router.route('/get').get(isAuthenticated,getComapny);
router.route('/get/:id').get(isAuthenticated,getComapnyById);
router.route('/update/:id').put(isAuthenticated,updateCompany);


export default router;