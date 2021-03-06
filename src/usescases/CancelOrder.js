'use strict';

const moment = require('moment');

class CancelCart {
    constructor(cartRepository, emailProvider) {
        this.cartRepository = cartRepository;
        this.emailProvider = emailProvider;
    }

    setCart(cart) {
        this.cart = cart;
    }

    execute() {
        this.setCartState();
        this.setCartDateTimeUpdated();
        var updatedCart = this.cancelCart();
        this.sendEmailCancelationCart();
        return updatedCart;
    }

    cancelCart() {
        return this.cartRepository.setState(this.cart);
    }

    setCartState() {
        this.cart.state = "inactive";
    }

    setCartDateTimeUpdated() {
        this.cart.datetimeupdated = moment().format('YYYYMMDDHHmmss');
    }

    sendEmailCancelationCart() {
        this.emailProvider.setEmailData(this.setEmailData());
        this.emailProvider.execute();
    }

    setEmailData() {
        var emailData = {
            info: {
                to: this.cart.customer.email,
                htmlBody: this.createEmailBodyFromCart(),
                subject: "Se ha cancelado tu pedido! ✔🛒🛒🛒",
                text: "Este es el detalle de la cancelación tu pedido"
            }
        };

        return emailData;
    }

    createEmailBodyFromCart() {

        var htmlBody = "<center><table class='deviceWidth' style='min-width: 100%;' role='presentation' bcart='0' width='100%' cellspacing='0' cellpadding='0' align='center'><tbody><tr><td id='bodyCell' style='max-width: 100%; min-width: 100%; width: 100%;' align='center' valign='top' width='100%'><table id='templateContainer' style='bcart: 1px solid #888888; text-align: left; max-width: 602px; font-family: Lato, sans-serif; height: auto;' role='presentation' bcart='0' width='531' cellspacing='0' cellpadding='0'><tbody><tr style='height: auto;'><td style='padding: 40px 20px 0px 30px; width: 445px; height: 371px; line-height: 100% !important;' align='center' valign='top' bgcolor='#ffffff'><table bcart='0' width='100%' cellspacing='0' cellpadding='0'><tbody><tr><td style='text-align: left; width: 475px; padding: 0px; margin: 0px; display: inline-block !important;' colspan='4' valign='top'><h2 style='font-size: 20px; font-weight: 400; margin-bottom: 10px; font-family: Lato, sans-serif; width: 100%; line-height: 100% !important; margin-top: 0;'>Detalles de tu compra <strong>N&ordm; <a style='color: #333333;'>@code</a></strong></h2></td></tr><tr><td class='cart-detail-col' style='text-align: left; padding: 20px 0px 0px; margin: 0px; max-width: 25%; width: 118.75px; display: inline-block !important;' valign='top'><p style='width: 100%; font-size: 14px; font-weight: 400; margin-bottom: 5px; font-family: Lato, sans-serif; text-align: left; color: #666666;'>Realizada por:</p><p style='width: 100%; font-size: 14px; font-weight: bold; font-family: Lato, sans-serif; text-transform: capitalize; text-align: left;'>@customer.fullname</p></td><td class='cart-detail-col' style='text-align: left; padding: 20px 0px 0px; margin: 0px; max-width: 27%; width: 128.25px; display: inline-block !important;' valign='top'><p style='width: 100%; font-size: 14px; font-weight: 400; margin-bottom: 5px; font-family: Lato, sans-serif; text-align: left; color: #666666;'>Fecha de solicitud:</p><p style='width: 100%; font-size: 14px; font-weight: bold; font-family: Lato, sans-serif; text-align: left;'><a style='color: #333333;'>@datetime</a></p></td><td class='cart-detail-col' style='text-align: left; padding: 20px 0px 0px; margin: 0px; max-width: 24%; width: 114px; display: inline-block !important;' valign='top'><p style='width: 100%; font-size: 14px; font-weight: 400; margin-bottom: 5px; font-family: Lato, sans-serif; text-align: left; color: #666666;'>Medio de pago:</p><p style='width: 100%; font-size: 14px; font-weight: bold; font-family: Lato, sans-serif; text-align: left;'>@methodpayment</p></td><td class='cart-detail-col' style='text-align: left; padding: 20px 0px 0px; margin: 0px; max-width: 24%; width: 114px; display: inline-block !important;' valign='top'><p style='width: 100%; font-size: 14px; font-weight: 400; margin-bottom: 5px; font-family: Lato, sans-serif; text-align: left; color: #666666;'>Cuotas:</p><p style='width: 100%; font-size: 14px; font-weight: bold; font-family: Lato, sans-serif; text-align: left;'>1</p></td></tr><tr><td class='cart-detail-col' style='text-align: left; padding: 20px 0px 0px; margin: 0px; font-weight: 300; font-family: Lato, sans-serif; max-width: 25%; width: 118.75px; display: inline-block !important;' valign='top'><p style='width: 100%; font-size: 14px; font-weight: 400; margin-bottom: 5px; font-family: Lato, sans-serif; text-align: left; color: #666666;'>Sub-total:</p><p style='width: 100%; font-size: 14px; font-weight: bold; font-family: Lato, sans-serif; text-align: left;'><a style='color: #333333;'>$ @totalvalue</a></p></td><td class='cart-detail-col' style='text-align: left; padding: 20px 0px 0px; margin: 0px; max-width: 27%; width: 128.25px; display: inline-block !important;' valign='top'><p style='width: 100%; font-size: 14px; font-weight: 400; margin-bottom: 5px; font-family: Lato, sans-serif; text-align: left; color: #666666;'>Descuento:</p><p style='width: 100%; font-size: 14px; font-weight: bold; font-family: Lato, sans-serif; text-align: left;'><a style='color: #333333;'>$ 0</a></p></td><td class='cart-detail-col' style='text-align: left; padding: 20px 0px 0px; margin: 0px; max-width: 24%; width: 114px; display: inline-block !important;' valign='top'><p style='width: 100%; font-size: 14px; font-weight: 400; margin-bottom: 5px; font-family: Lato, sans-serif; text-align: left; color: #666666;'>Costo despacho:</p><p style='width: 100%; font-size: 14px; font-weight: bold; font-family: Lato, sans-serif; text-align: left;'><a style='color: #333333;'>$ 0</a></p></td><td class='cart-detail-col' style='text-align: left; padding: 20px 0px 0px; margin: 0px; max-width: 24%; width: 114px; display: inline-block !important;' valign='top'><p style='width: 100%; font-size: 14px; font-weight: 400; margin-bottom: 5px; font-family: Lato, sans-serif; text-align: left; color: #666666;'>Total:</p><p style='width: 100%; font-size: 14px; font-weight: bold; font-family: Lato, sans-serif; color: #e4022d; text-align: left;'><strong><a style='color: #e4022d;'>$ @totalvalue</a></strong></p></td></tr><!-- BEGIN DESPACHO DAD // --><tr><td style='text-align: left; width: 475px; display: inline-block !important; line-height: 100% !important;' colspan='4' valign='top'><h2 style='font-size: 20px; font-weight: 400; margin-bottom: 10px; margin-top: 20px; font-family: Lato, sans-serif; line-height: 100% !important;'>Despacho a domicilio</h2></td></tr><tr><td style='text-align: left; padding-top: 10px; padding-bottom: 20px; bcart-bottom: 1px solid #e9e9e9; width: 475px; display: inline-block !important; line-height: 120% !important;' colspan='4' valign='top'><p style='font-size: 14px; font-weight: bold; margin-bottom: 5px; font-family: Lato, sans-serif; line-height: 120% !important; margin-top: 0;'>Direcci&oacute;n: <span style='font-size: 14px; font-weight: 400; color: #666666;'>@address</span></p></td></tr></tbody></table></td></tr><tr style='height: auto;'><td style='padding: 20px 30px 30px; height: 39px; width: 435px;' align='center' valign='top' bgcolor='#ffffff'><table bcart='0' width='100%' cellspacing='0' cellpadding='0'><tbody><tr><td style='text-align: left;' colspan='4' valign='top'><h2 style='font-size: 20px; font-weight: 400; margin-bottom: 20px; font-family: Lato, sans-serif;'>Producto(s)</h2></td></tr></tbody></table>@products</td></tr></tbody></table></td></tr></tbody></table></center>";
        var htmlProduct = "<table class='product_mail' bcart='0' width='100%' cellspacing='0' cellpadding='0'><tbody><tr style='bcart-radius: 3px !important;'><td class='product_mail-image' style='padding: 20px 4%; bcart: 1px solid #E9E9E9; bcart-right: 0 none;' valign='top' width='25%'><a href='#'><img src='@image' alt='' width='100%' /></a></td><td style='padding: 20px 0; bcart-top: 1px solid #E9E9E9; bcart-bottom: 1px solid #E9E9E9;' valign='top' width='2%' height='100%'>&nbsp;</td><td class='product_mail-info' style='padding: 20px 0; bcart-top: 1px solid #E9E9E9; bcart-bottom: 1px solid #E9E9E9; text-align: left;' valign='top' width='33%'><h4 style='color: #333333; font-family: Lato, sans-serif; font-size: 14px; font-weight: 400; margin-bottom: 3px; text-align: left; text-transform: uppercase; margin-top: 0; line-height: 130% !important;'><a style='color: #333333;'>@name</a></h4><p style='color: #e4022d; font-family: Lato, sans-serif; font-size: 14px; font-weight: bold; text-align: left; margin-top: 0; margin-bottom: 0; line-height: 100% !important;'><a style='color: #e4022d;'>$ @price</a></p><p style='color: #333333; font-family: Lato, sans-serif; font-size: 12px; font-weight: bold; margin-top: 3px; text-align: left; margin-bottom: 0;'>Cantidad: <a style='color: #333333;'>@quantity</a></p><p style='color: #333333; font-family: Lato, sans-serif; font-size: 12px; font-weight: 300; margin-top: 0; margin-bottom: 0; text-align: left;'>C&oacute;digo: <a style='color: #333333;'>@code</a></p></td><td style='padding: 20px 0; bcart-bottom: 1px solid #E9E9E9; bcart-top: 1px solid #E9E9E9;' valign='top' width='2%' height='100%'>&nbsp;</td><td class='product_mail-date-ico' style='padding-top: 23px; bcart-bottom: 1px solid #E9E9E9; bcart-top: 1px solid #E9E9E9;' align='right' valign='top' width='10%'><img style='margin-bottom: 30px; vertical-align: bottom;' src='http://www.falabella.com/static/site/content/emails/MailOperacionales/delivery-green.png' alt='' width='32' height='18' /></td><td style='padding: 20px 0; bcart-bottom: 1px solid #E9E9E9; bcart-top: 1px solid #E9E9E9;' valign='top' width='2%' height='100%'>&nbsp;</td><td class='product_mail-date' style='padding: 20px 20px 20px 0; bcart: 1px solid #E9E9E9; bcart-left: 0 none; text-align: left; margin-top: 0;' align='right' valign='top' width='26%'><p style='color: #333333; font-size: 12px; font-weight: 300; text-align: left; font-family: Lato, sans-serif; margin-top: 0;'>Fecha entrega: <br /><span style='font-weight: bold;'>@datetime</span></p></td></tr></tbody></table>";
        var htmlProducts = '';

        this.cart.products.forEach(element => {
            var htmlProductTemp = htmlProduct;

            htmlProductTemp = htmlProductTemp.replace('@code', element.code);
            htmlProductTemp = htmlProductTemp.replace('@image', element.image);
            htmlProductTemp = htmlProductTemp.replace('@price', element.price);
            htmlProductTemp = htmlProductTemp.replace('@name', element.name);
            htmlProductTemp = htmlProductTemp.replace('@quantity', element.quantity);
            htmlProductTemp = htmlProductTemp.replace('@datetime', this.cart.datetimeupdated);

            htmlProducts = htmlProducts.concat(htmlProductTemp);
        });

        htmlBody = htmlBody.replace('@code', this.cart.code);
        htmlBody = htmlBody.replace('@datetime', this.cart.datetimeupdated);
        htmlBody = htmlBody.replace('@customer.fullname', this.cart.customer.firstName.concat(' ').concat(this.cart.customer.lastName));
        htmlBody = htmlBody.replace('@address', this.cart.address);
        htmlBody = htmlBody.replace('@totalvalue', this.cart.totalvalue);
        htmlBody = htmlBody.replace('@totalvalue', this.cart.totalvalue);
        htmlBody = htmlBody.replace('@methodpayment', this.cart.methodpayment);
        htmlBody = htmlBody.replace('@products', htmlProducts);

        return htmlBody;
    }
}

module.exports = CancelCart;
