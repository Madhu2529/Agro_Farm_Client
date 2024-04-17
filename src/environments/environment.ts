

const HOSTNAME: string = "localhost";
const PORT_NUMBER: number = 8080;
const APPLICATION_NAME = "/AgroFarm"

export const environment = {
    production: false,
    updateCustomerAPI: 'http://' + HOSTNAME + ':' + PORT_NUMBER + APPLICATION_NAME + '/customer-api',
    customerAPIUrl: 'http://' + HOSTNAME + ':' + PORT_NUMBER + APPLICATION_NAME + '/customer-api',
    customerCartUrl: 'http://' + HOSTNAME + ':' + PORT_NUMBER + APPLICATION_NAME + '/cart-api',
    customerProductAPI: 'http://' + HOSTNAME + ':' + PORT_NUMBER + APPLICATION_NAME + '/product-api',
    cardAPIUrl: 'http://' + HOSTNAME + ':' + PORT_NUMBER + APPLICATION_NAME + '/payment-api',
    orderAPIUrl: 'http://' + HOSTNAME + ':' + PORT_NUMBER + APPLICATION_NAME + '/order-api'
};