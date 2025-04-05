import express from 'express';
import * as revenueController from '../../controllers/stats/revenue.controller'; // Named import
import { validateRequestQuery } from '../../middlewares/validation.middleware'; // Correct function
import revenueValidation from '../../validations/stats/revenue.validation'; // Default import
import { authenticate, isStaffOrAdmin } from '../../middlewares/auth.middleware'; // Correct path

const router = express.Router();

// Apply authentication and authorization middleware to all stat routes
router.use(authenticate, isStaffOrAdmin);

/**
 * @swagger
 * tags:
 *   name: Statistics - Revenue
 *   description: Revenue and order related statistics
 */

/**
 * @swagger
 * /stats/revenue/summary:
 *   get:
 *     summary: Get revenue and order summary
 *     tags: [Statistics - Revenue]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [daily, weekly, monthly, yearly, custom]
 *         description: Time period (defaults to last 30 days)
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date (YYYY-MM-DD) - required if period=custom
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date (YYYY-MM-DD) - required if period=custom
 *     responses:
 *       200:
 *         description: Revenue summary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 startDate:
 *                   type: string
 *                   format: date-time
 *                 endDate:
 *                   type: string
 *                   format: date-time
 *                 totalRevenue:
 *                   type: number
 *                 totalOrders:
 *                   type: integer
 *                 averageOrderValue:
 *                   type: number
 */
router.get('/summary', validateRequestQuery(revenueValidation.getRevenueSummary.query), revenueController.getRevenueSummary); // Pass the .query schema

/**
 * @swagger
 * /stats/revenue/by-payment-method:
 *   get:
 *     summary: Get revenue breakdown by payment method
 *     tags: [Statistics - Revenue]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [daily, weekly, monthly, yearly, custom]
 *         description: Time period (defaults to last 30 days)
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date (YYYY-MM-DD) - required if period=custom
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date (YYYY-MM-DD) - required if period=custom
 *     responses:
 *       200:
 *         description: Revenue breakdown
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 startDate:
 *                   type: string
 *                   format: date-time
 *                 endDate:
 *                   type: string
 *                   format: date-time
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       paymentMethod:
 *                         type: string
 *                       totalRevenue:
 *                         type: number
 *                       orderCount:
 *                         type: integer
 */
router.get('/by-payment-method', validateRequestQuery(revenueValidation.getRevenueByPaymentMethod.query), revenueController.getRevenueByPaymentMethod); // Pass the .query schema

/**
 * @swagger
 * /stats/revenue/orders/by-status:
 *   get:
 *     summary: Get order count and value breakdown by order status
 *     tags: [Statistics - Revenue]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [daily, weekly, monthly, yearly, custom]
 *         description: Time period (defaults to last 30 days)
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date (YYYY-MM-DD) - required if period=custom
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date (YYYY-MM-DD) - required if period=custom
 *     responses:
 *       200:
 *         description: Order status breakdown
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 startDate:
 *                   type: string
 *                   format: date-time
 *                 endDate:
 *                   type: string
 *                   format: date-time
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       status:
 *                         type: string
 *                       orderCount:
 *                         type: integer
 *                       totalValue:
 *                         type: number
 */
router.get('/orders/by-status', validateRequestQuery(revenueValidation.getOrdersByStatus.query), revenueController.getOrdersByStatus); // Pass the .query schema

/**
 * @swagger
 * /stats/revenue/orders/by-payment-status:
 *   get:
 *     summary: Get order count and value breakdown by payment status
 *     tags: [Statistics - Revenue]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [daily, weekly, monthly, yearly, custom]
 *         description: Time period (defaults to last 30 days)
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date (YYYY-MM-DD) - required if period=custom
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date (YYYY-MM-DD) - required if period=custom
 *     responses:
 *       200:
 *         description: Payment status breakdown
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 startDate:
 *                   type: string
 *                   format: date-time
 *                 endDate:
 *                   type: string
 *                   format: date-time
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       paymentStatus:
 *                         type: string
 *                       orderCount:
 *                         type: integer
 *                       totalValue:
 *                         type: number
 */
router.get('/orders/by-payment-status', validateRequestQuery(revenueValidation.getOrdersByPaymentStatus.query), revenueController.getOrdersByPaymentStatus); // Pass the .query schema

/**
 * @swagger
 * /stats/revenue/orders/financials:
 *   get:
 *     summary: Get total shipping fees and discounts for orders
 *     tags: [Statistics - Revenue]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [daily, weekly, monthly, yearly, custom]
 *         description: Time period (defaults to last 30 days)
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date (YYYY-MM-DD) - required if period=custom
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date (YYYY-MM-DD) - required if period=custom
 *     responses:
 *       200:
 *         description: Order financial summary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 startDate:
 *                   type: string
 *                   format: date-time
 *                 endDate:
 *                   type: string
 *                   format: date-time
 *                 totalShippingFee:
 *                   type: number
 *                 totalDiscountAmount:
 *                   type: number
 */
router.get('/orders/financials', validateRequestQuery(revenueValidation.getOrderFinancials.query), revenueController.getOrderFinancials); // Pass the .query schema


export default router;