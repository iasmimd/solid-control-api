import { Request, Response } from 'express';
import { AppError } from '../errors/AppError';
import PaymentService from '../service/payment.service';

const mercadopago = require('mercadopago');
class PaymentController {
  static async create(req: Request, res: Response) {
    const user = req.user;
    const getFullUrl = (req: Request) => {
      const url = req.protocol + '://' + req.get('host');
      return url;
    };

    const item = await PaymentService.createPaymentService(user.id, user.email);

    mercadopago.configure({
      sandbox: process.env.SANDBOX == 'true' ? true : false,
      access_token: process.env.MP_ACCESS_TOKEN,
    });

    const purchaseOrder = {
      items: [item],
      payer: {
        email: user.email,
      },
      auto_return: 'all',
      external_reference: user.id,
      payment_method: 'all',
      payment_type_id: 'all',
      back_urls: {
        success:
          'https://solid-control-api.herokuapp.com' + '/payments/success',
        pending:
          'https://solid-control-api.herokuapp.com' + '/payments/pending',
        failure:
          'https://solid-control-api.herokuapp.com' + '/payments/failure',
      },
    };

    try {
      const preference = await mercadopago.preferences.create(purchaseOrder);
      return res.json({ payment_link: `${preference.body.init_point}` });
    } catch (err) {
      if (err instanceof AppError) {
        return res.send(err.message);
      }
    }
  }
}

export default PaymentController;
