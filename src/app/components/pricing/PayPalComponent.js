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
                    plan_id: "P-9YV83304XY091001FMM2JZ7A",
                })
                .then((orderId) => {
                    // Your code here after create the order
                    return orderId;
                });
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
                "client-id": "Af4Z6QMz5Or2YhRaAeJrotvYNPoQArQVOMkruS-B7oBrmgJSnCCqc3IeieIVs5bZ4fjWvveDg_9F01WE",
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