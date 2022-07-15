import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { prisma } from '../../services/prisma';
import { stripe } from '../../services/stripe';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ statusCode: 405, message: 'Method Not Allowed' });
  }

  const session = await unstable_getServerSession(req, res, authOptions);

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: session?.user?.email?.toString(),
    },
  });

  let stripeCustomerId = user.stripeCustomerId;

  if (!stripeCustomerId) {
    const stripeCustomer = await stripe.customers.create({
      email: session?.user?.email?.toString(),
    });

    await prisma.user.update({
      where: {
        email: session?.user?.email?.toString(),
      },
      data: {
        stripeCustomerId: stripeCustomer.id,
      },
    });

    stripeCustomerId = stripeCustomer.id;
  }

  const stripeCheckoutSession = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    payment_method_types: ['card'],
    billing_address_collection: 'required',
    line_items: [
      {
        price: 'price_1LKnGaLwlCQVJ3ag8pVhCUi4',
        quantity: 1,
      },
    ],
    mode: 'subscription',
    allow_promotion_codes: true,
    success_url: process.env.STRIPE_SUCCESS_URL!,
    cancel_url: process.env.STRIPE_CANCEL_URL!,
  });

  return res.status(200).json({ sessionId: stripeCheckoutSession.id });
}
