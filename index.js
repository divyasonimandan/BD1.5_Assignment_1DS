const express = require('express');
const cors= require('cors');

const app = express();
const port = 3000;

app.use(express.static('static'));
app.use(cors());

// server-side values
let taxRate = 5; // 5%
let discountPercentage = 10; // 10%
let loyaltyRate = 2; // 2 points per $1


// Endpoint 1: Calculate the total price of items in the cart.

function getTotalCartPrice(item1Price, item2Price, item3Price) {
  return totalCartPrice = item1Price + item2Price + item3Price;
}

app.get('/cart-total', (req, res) => {
  let item1Price = parseFloat(req.query.item1Price);
  let item2Price = parseFloat(req.query.item2Price);
  let item3Price = parseFloat(req.query.item3Price);

  res.send(getTotalCartPrice(item1Price, item2Price, item3Price).toString())
})

// Endpoint 2 : Apply a discount based on membership status.

function getMembershipDiscount(isMember, cartTotal) {
   if (isMember) {
    return cartTotal - (cartTotal * (discountPercentage/100))
  } else {
    return cartTotal
  }
}

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === "true";

  res.send(getMembershipDiscount(isMember, cartTotal).toString());
})

// Endpoint 3 : Calculate tax on the cart total.

function getCalculatedTax(cartTotal) {
  return calculatedTax = cartTotal * (taxRate /100);
}

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
 
  res.send(getCalculatedTax(cartTotal).toString());
})

// Endpoint 4 : Estimate delivery time based on shipping method.

function getDeliveryTime(shippingMethod, distance) {
  if (shippingMethod) {
    return distance / 100 
  } else {
   return distance / 50 
  }
}

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = (req.query.shippingMethod === "express");
  let distance = parseFloat(req.query.distance);
  
  res.send(getDeliveryTime(shippingMethod, distance).toString())
})


// Endpoint 5 : Calculate the shipping cost based on weight and distance.

function getShippingCost(distance, weight) {
return shippingCost = weight * distance * 0.1;
}


app.get('/shipping-cost', (req, res) => {
  let distance = parseFloat(req.query.distance);
  let weight = parseFloat(req.query.weight);
  
  res.send(getShippingCost(distance, weight).toString())
})

// Endpoint 6 : Calculate loyalty points earned from a purchase.

function getLoyaltyPoints(purchaseAmount) {
  return loyaltyPoints = purchaseAmount * loyaltyRate;
}

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  
  res.send(getLoyaltyPoints(purchaseAmount).toString());
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
