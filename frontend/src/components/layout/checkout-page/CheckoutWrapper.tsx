import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutPage from '../../../pages/CheckoutScreen';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../store/configureStore';
import { setBasket } from '../../../slices/basketSlice';
import axiosApi from '../../../api/AxiosApi';
import { useState } from 'react';
import Loading from '../../common/Loading';

const stripePromise = loadStripe('pk_test_51OleI4IOKQIgT1PnI41bvndvmKB7VGk6D2G0Gdjo1Ywh0CP436VAt3leDdWL9jvNKkqlnpeAgXBgf4twcMGSYOHC00TwWqdAJF');

export default function CheckoutWrapper() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosApi.Payments.createPaymentIntent()
      .then(basket => dispatch(setBasket(basket)))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
  }, [dispatch]);

  if (loading) return <Loading />

  return (
    <Elements stripe={stripePromise}>
      <CheckoutPage />
    </Elements>
  )
}
