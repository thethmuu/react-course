import { isTypeNode } from 'graphql';

const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function stripeHandler(req, res) {
  if (req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        shipping_address_collection: {
          allowed_countries: ['MM', 'SG', 'US', 'TH'],
        },
        shipping_options: [
          { shipping_rate: 'shr_1MJx4aFTFxqgVMnb1DPgu1VH' },
          {
            shipping_rate: 'shr_1MJwsrFTFxqgVMnbc0YCOYvE',
          },
        ],
        allow_promotion_codes: true,
        line_items: req.body.map((item) => {
          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.title,
                images: [item.image.data.attributes.formats.thumbnail.url],
              },
              unit_amount: item.price * 100,
            },
            quantity: item.quantity,
            adjustable_quantity: {
              enabled: true,
              minimum: 1
            }
          };
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      });
      res.status(200).json(session);
    } catch (error) {
      res.status(error.statusCode || 500).json(error.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');
  }
}
