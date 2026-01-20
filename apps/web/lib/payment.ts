export function loadRazorpayScript(src: string = "https://checkout.razorpay.com/v1/checkout.js"): Promise<boolean> {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}
