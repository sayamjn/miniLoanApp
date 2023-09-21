function toggleLoanApplication() 
{
    let loanFormContainer = document.getElementById("loan-form-container");
    
    if (loanFormContainer.style.display === "none" || loanFormContainer.style.display === "") {
        loanFormContainer.style.display = "block";
    } else {
        loanFormContainer.style.display = "none";
    }
}

function closeLoanApplication() {
    let loanFormContainer = document.getElementById("loan-form-container");
    loanFormContainer.style.display = "none";
}

// JavaScript for loan.js
function toggleDashboards(selectedDashboard) 
{
    // Created an object to store dashboard elements by their IDs
    const dashboards = 
    {
        'customer-dashboard' : document.getElementById("customer-dashboard"),
        'loan-dashboard' : document.getElementById("loan-dashboard"),
        'paid-payment' : document.getElementById("paid-payment"),
        'pending-payment' : document.getElementById("pending-payment"),
    }

    // Hide all dashboards by default
    for (const dashboardId in dashboards) 
    {
        dashboards[dashboardId].style.display = 'none';
    }

    // Display the selected dashboard, if it exists
    if (dashboards[selectedDashboard]) 
    {
        dashboards[selectedDashboard].style.display = 'block';
    }
}
