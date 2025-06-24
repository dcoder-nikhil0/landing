document.addEventListener("DOMContentLoaded", () => {
  // Plan details
  const plans = {
    starterPlan: { amount: 49 * 100, credits: 50, label: "Starter Pack" },
    proPlan: { amount: 129 * 100, credits: 150, label: "Pro Pack" },
    elitePlan: { amount: 199 * 100, credits: 300, label: "Elite Pack" },
  };

  // Attach handler to each button
  Object.keys(plans).forEach((planId) => {
    document.getElementById(planId).addEventListener("click", () => {
      handlePayment(planId);
    });
  });

  function handlePayment(planId) {
    const plan = plans[planId];

    const options = {
      key: "rzp_test_Y8a6fqfSTWXTuO", // Replace with your Razorpay test/live key
      amount: plan.amount,
      currency: "INR",
      name: "Smart Summarizer",
      description: plan.label,
      image: "icon.png", // optional
      handler: function (response) {
        console.log("✅ Payment Success:", response);

        chrome.storage.local.get(["purchasedCredits"], (data) => {
          const previous = data.purchasedCredits ?? 0;
          chrome.storage.local.set(
            {
              purchasedCredits: previous + plan.credits,
            },
            () => {
              alert(`✅ ${plan.credits} credits added to your account!`);
            }
          );
        });
      },
      prefill: {
        name: "",
        email: "",
      },
      theme: {
        color: "#00ff99",
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  }
});
