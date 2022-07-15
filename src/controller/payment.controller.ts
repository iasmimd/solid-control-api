import { Request, Response } from 'express';
import { AppError } from '../errors/AppError';
import PaymentService from '../service/payment.service';
const mercadopago = require('mercadopago');
class PaymentController {
  static async create(req: Request, res: Response) {
    const { id, email, description, amount } = req.params;

    const getFullUrl = (req: Request) => {
      const url = req.protocol + '://' + req.get('host');
      return url;
    };

    const item = PaymentService.createPaymentService(
      id,
      email,
      description,
      amount
    );

    mercadopago.configure({
      sandbox: process.env.SANDBOX == 'true' ? true : false,
      access_token: process.env.MP_ACCESS_TOKEN,
    });

    const purchaseOrder = {
      items: [item],
      payer: {
        email: email,
      },
      auto_return: 'all',
      external_reference: id,
      payment_method: 'all',
      payment_type_id: 'all',
      back_urls: {
        success: getFullUrl(req) + '/payments/success',
        pending: getFullUrl(req) + '/payments/pending',
        failure: getFullUrl(req) + '/payments/failure',
      },
    };

    try {
      const preference = await mercadopago.preferences.create(purchaseOrder);
      return res.redirect(`${preference.body.init_point}`);
    } catch (err) {
      if (err instanceof AppError) {
        return res.send(err.message);
      }
    }
  }
}

export default PaymentController;
