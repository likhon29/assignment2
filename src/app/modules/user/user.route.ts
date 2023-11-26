import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/', UserControllers.createUser);
router.get('/', UserControllers.getAllUsers);

router.get('/:userId', UserControllers.getSingleUser);
router.delete('/:userId', UserControllers.deleteUserFromDB)


router.put('/:userId', UserControllers.updateUserInfo);
router.put('/:userId/orders', UserControllers.addProductsToUserOrders);
router.get('/:userId/orders', UserControllers.getAllOrdersOfUser);
router.get(
    '/:userId/orders/total-price',
    UserControllers.getTotalPriceOfOrders,
);
export const UserRoutes = router;