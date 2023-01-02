import React from 'react';
import { useRouter } from 'next/router';
const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export async function getServerSideProps(params) {
  console.log(params);
  const order = await stripe.checkout.sessions.retrieve(
    params.query.sessionId,
    {
      expand: ['line_items'],
    }
  );
  console.log(order);

  return {
    props: { order },
  };
}

const Success = ({ order }) => {
  const router = useRouter();
  console.log(order);
  return (
    <main className='container'>
      <div className='max-w-xl p-6 mx-auto leading-10 text-center bg-white rounded shadow-xl'>
        <h1>Thank you for your purchase!</h1>
        <p>
          Email sent to:{' '}
          <span className='italic'>{order.customer_details.email}</span>
        </p>
        {/* order info */}
        <div className='mt-3'>
          {/* address */}
          <div>
            <h3 className='font-semibold'>Address</h3>
            {Object.entries(order.customer_details.address).map(
              ([key, value]) => (
                <p key={key}>
                  {key}: {value}
                </p>
              )
            )}
          </div>
          {/* products */}
          <div className='mt-3'>
            <h3 className='font-semibold'>Products</h3>
            {order.line_items.data.map((item) => (
              <div key={item.id}>
                <p>Product: {item.description}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: {item.price.unit_amount}</p>
              </div>
            ))}
          </div>
        </div>
        <button
          className='px-3 py-2 mt-3 text-white bg-gray-800 border-none hover:bg-black'
          onClick={() => router.push('/')}
        >
          Continue Shopping
        </button>
      </div>
    </main>
  );
};

export default Success;
