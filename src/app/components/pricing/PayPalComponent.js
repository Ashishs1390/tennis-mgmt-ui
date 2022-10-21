import { get, post } from "../../api/axios.api";
import { useEffect } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";

const ButtonWrapper = ({ type }) => {
    const [{ options }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                intent: "subscription",
            },
        });
    }, [type]);

    return (<PayPalButtons
        createSubscription={(data, actions) => {
            return actions.subscription
                .create({
                    plan_id: "P-75X13699FF2899931MNJHWWA",
                })
                // .then((orderId) => {
                //     // Your code here after create the order
                //     console.log(orderId);
                //     return orderId;
                // });
        }}
        onApprove={(data, actions) => {
            console.log(actions);
            console.log(data);
            if (data.orderID) {
                const order_id = data.orderID;
                post('/api/tennismgmt/pricing', { order_id: order_id, isPayment: 'true' }).then((x) => {
                    console.log('flag updated successfully');
                })
            }
           
        }}
        style={{
            label: "subscribe",
        }}
    />);
}
const PayPalComponent = () => {
    return (
        // <PayPalScriptProvider options={{ "client-id": "Afa9Q7X_p4Fl_aGzAdv2Gr5r5ci7BTPi-24ycMROROc2Ilup0GZ9oEzsCKuwuY9amEwUxmbB14lMLyCp" }}>
        //     <PayPalButtons
        //         createOrder={(data, actions) => {
        //             return actions.order.create({
        //                 purchase_units: [
        //                     {
        //                         amount: {
        //                             value: "5",
        //                         },
        //                     },
        //                 ],
        //             });
        //         }}
        //         onApprove={(data, actions) => {
        //             return actions.order.capture().then((details) => {
        //                 console.log(details);
        //                 const name = details.payer.name.given_name;
        //                 alert(`Transaction completed by ${name}`);
        //                 if (details.status === 'COMPLETED') {
        //                     const merchant_id = details.purchase_units[0].payee.merchant_id;
        //                     post('/api/tennismgmt/pricing', { merchant_id: merchant_id, isPayment: 'true' }).then((x) => {
        //                         console.log('flag updated successfully');
        //                     })
        //                 }
        //             });
        //         }}
        //     />
        // </PayPalScriptProvider>
        <PayPalScriptProvider
            options={{
                "client-id": "AWZZHYqrjiKpPSMF11GT_2f6YiBbCoEUWcm92uglg-I0Sq0C5LdrpwM-VW6ZZ_tMFHDv0Y0iRWHJmBQX",
                components: "buttons",
                intent: "subscription",
                vault: true,
            }}
        >
            <ButtonWrapper type="subscription" />
        </PayPalScriptProvider>
  )  
};

export default PayPalComponent;
