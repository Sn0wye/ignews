import { prisma } from '../../../services/prisma';
import { stripe } from '../../../services/stripe';

export async function saveSubscription(
  subscriptionId: string,
  stripeCustomerId: string,
  createAction = false
) {
  const user = await prisma.user.findUniqueOrThrow({
    select: {
      id: true,
    },
    where: {
      stripeCustomerId,
    },
  });

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const subscriptionData = {
    id: subscription.id,
    userId: user.id,
    priceId: subscription.items.data[0].price.id,
    status: subscription.status,
  };

  if (createAction) {
    await prisma.subscription.create({
      data: subscriptionData,
    });
  } else {
    await prisma.subscription.update({
      where: {
        id: subscription.id,
      },
      data: subscriptionData,
    });
  }
}
