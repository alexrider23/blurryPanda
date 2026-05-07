import { React, setState, useState, useEffect, useCallback }from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';

import { Box, Container, Typography, Button, Card, CardContent, List, ListItem, ListItemText, ListItemIcon} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { Navigate, useNavigate  } from "react-router-dom";

const stripePromise = loadStripe('pk_test_51OctgSIxRtvRO5SiUl1TOJkGC7eZrluwR85KgdCOaWpfk3Ghx53ddMqMcyLAcaWHkUkxOazKsTQgDCMAkx1QjC8X00eOLCtm8s'); // starts with pk_

// TODO: The price ids should not be hardcoded in from the frontend but retrieved from backend. (Ben)
export function CheckoutAndPricing() {
  const subscription_prices = [
    {
      id: 'price_1OmgOxIxRtvRO5Siiptp8Zmg',
      name: 'Basic Plan',
      amount_monthly: 0,
      amount_yearly: 0,
      features: ['10 Generation per month', 
      'Get feedback from community',
      'Text to Image',
      'Template Access',
      'Follow other creators',
      'Queue artwork generation'
      ]
    },
    {
      id: 'price_1OmgPcIxRtvRO5Si6yr1IUfm',
      name: 'Pro Plan',
      amount_monthly: 16,
      amount_yearly: 100,
      features: ['Unlimited Generations',
      'Fast Generation Speed',
      'Lorem ipsum',
      'Lorem ipsum',
      'Lorem ipsum'
      ]
    },
    {
      id: 'price_1OmgQNIxRtvRO5SioiYVUEdW',
      name: 'Premium Plan',
      amount_monthly: 24,
      amount_yearly: 200,
      features: ['Priority Support',
      'Ultra fast generations',
      'Access to Premium models'
      ]
    },

  ];

  const credit_prices = [
    {
      id: 'price_1OmgRJIxRtvRO5SiYMSaDQw1',
      name: 'Credits: 5000',
      amount: 10,
    },
    {
      id: 'price_1OmgRXIxRtvRO5SibIwpxdRe',
      name: 'Credits: 12000',
      amount: 20,
    },
    {
      id: 'price_1OmgRtIxRtvRO5Si7N0HFc64',
      name: 'Credits: 30000',
      amount: 40,
    },
  ];

  const { isAuthenticated, loginWithRedirect, getAccessTokenSilently, user} = useAuth0();
  const [redirectToCheckout, setRedirectToCheckout] = useState(false);
  const [selectedPriceId, setSelectedPriceId] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [isMonthly, setIsMonthly] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated && user) {
        const token = await getAccessTokenSilently({
          audience: `https://dev-7wje8o2ffd0q20mn.us.auth0.com/api/v2/`,
          scope: "read:user"
        });
        if (redirectToCheckout && selectedPriceId) {
          let endpoint = isMonthly
            ? "http://localhost:3000/payment/create-subscription-session"
            : "http://localhost:3000/payment/create-one-time-payment-session";
  
          fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
            body: JSON.stringify({ userId: user.sub, priceId: selectedPriceId })
            })
            .then((res) => res.json())
            .then((data) => {
                setClientSecret(data.clientSecret);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
          }
        }
      }
      fetchData();
  }, [getAccessTokenSilently, isAuthenticated, user, redirectToCheckout, selectedPriceId, isMonthly]);
  
  const handleSubscribe = (priceId) => {
    if (!isAuthenticated) {
      loginWithRedirect();
    } else {
      setIsMonthly(true);
      setSelectedPriceId(priceId);
      setRedirectToCheckout(true);
    }
  };

  const handleOneTimePayment = (priceId) => {
    if (!isAuthenticated) {
      loginWithRedirect();
    } else {
      setIsMonthly(false);
      setSelectedPriceId(priceId);
      setRedirectToCheckout(true);
    }
  };
  

  let displayed_prices = subscription_prices;
  if (!isMonthly) {
      displayed_prices = subscription_prices.filter(
      (price) => price.name !== "Basic Plan"
    );
  }
  

  const handleToggleBillingCycle = () => {
    setIsMonthly(!isMonthly);
  };
   
  if (redirectToCheckout) {
    return (
      <div id="pricing">
        {clientSecret && (
          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={{clientSecret}}
          >
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        )}
      </div>
    );
  }

  return (
    <div>
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: "center", mb: 10 }}>
          <Box sx={{ mb: 4}}>
            <Typography variant="h4" component="h1" gutterBottom>
              Pricing Plans
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Choose the plan that's right for your needs
            </Typography>
          <Button variant="contained" onClick={handleToggleBillingCycle}>
              {isMonthly ? "Billed Yearly" : "Billed Monthly"}
          </Button>
          </Box>
          <Box sx={{display: 'flex', justifyContent: 'space-between' }}>
            {displayed_prices.map((price) => (
              <Card key={price.id} sx={{ flexBasis: '30%', border: '1px solid #e0e0e0'}}>
                <CardContent>
                  <Typography variant="h5" component="h2" sx={{ mb: 2, mt: 2}}>
                    {price.name}
                  </Typography>
                  <Typography variant="h3" sx={{ mb: 2}}>
                    ${isMonthly ? price.amount_monthly.toFixed(2) : price.amount_yearly.toFixed(2)} / {isMonthly ? "month" : "year"}
                  </Typography>
                  <Button variant="contained" sx={{ bgcolor: 'black', color: 'white', mb: 3}} onClick={() => handleSubscribe(price.id)}>Get Started</Button>
                  <List sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start'}}>
                    {price.features.map((feature, index) => (
                      <ListItem key={index} disablePadding>
                        <ListItemIcon>
                          <CheckCircleIcon sx={{ color: '#031c42'}}/>
                        </ListItemIcon>
                        <ListItemText primary={feature} primaryTypographyProps={{ fontSize: '0.75rem'}}/>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        <Box sx={{ textAlign: 'center'}}>
          <Box sx={{ mb: 4}}>
            <Typography variant="h4" component="h1" gutterButtom>
              Purchase one-time credits
            </Typography>
            <Typography variant="subtitle1" gutterButtom>
              Buy one-time credits that don't expire
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
            {credit_prices.map((price) => (
              <Card key={price.id} sx={{ flexBasis: '30%', border: '1px solid #e0e0e0'}}>
                <CardContent>
                  <Typography variant="h3" sx={{ mb: 2, mt: 2}}>
                    ${price.amount.toFixed(2)}
                  </Typography>
                  <Typography variant="h5" component="h2" sx={{ mb: 2}}>
                    {price.name}
                  </Typography>
                  <Button variant="contained" sx={{ bgcolor: 'black', color: 'white'}} onClick={() => handleOneTimePayment(price.id)}>Buy now</Button>
                </CardContent>  
              </Card>
            ))}
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export function Return() {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');

  
    fetch(`http://localhost:3000/payment/session-status?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
      });
  }, []);


  if (status === 'open') {
    return (
      <Navigate to="/pricing" />
    )
  }

  if (status === 'complete') {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to {customerEmail}.

          If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    )
  }

  return null;
}
