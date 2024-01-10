const { Router } = require("express");
const mercadopago = require("mercadopago");
const dotenv = require("dotenv");
dotenv.config();
const Mercado_Pago = Router();

mercadopago.configure({
  access_token: process.env.ACESS_TOKEN || "",
});

Mercado_Pago.post("/", async (req, res) => {
  const arrayDeProductos = req.body;
  const newArray = arrayDeProductos.map((e) => {
    return {
      title: e.title,
      unit_price: e.unit_price,
      currency_id: "ARS",
      description: e.description,
      quantity: e.quantity,
    };
  });
  try {
    const preference = {
      items: newArray,

      back_urls: {
        success: "http://localhost:3000/success/",
        failure: "http://localhost:3000/fallo",
      },
      auto_return: "approved",
    };

    const respons = await mercadopago.preferences.create(preference);
    console.log(respons);

    res.status(200).json(respons.response.init_point);
  } catch (error) {
    console.log(error.menssage);
    res.status(500).json({ message: "error en el post" });
  }
});

module.exports = Mercado_Pago;
